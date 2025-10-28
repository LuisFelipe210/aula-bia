document.addEventListener('DOMContentLoaded', () => {
    // --- VARIÁVEIS GLOBAIS ---
    // Estas variáveis agora começarão vazias. Serão preenchidas com os dados do servidor.
    let mathContent = {};
    let flashcards = [];

    // --- ELEMENTOS DO DOM ---
    const mainNav = document.getElementById('main-nav');
    const mainContents = document.querySelectorAll('.main-content');
    const levelNav = document.getElementById('level-nav');
    const gradesNavContainer = document.getElementById('grades-nav-container');
    const topicsContentContainer = document.getElementById('topics-content-container');
    const flashcardArea = document.getElementById('flashcard-area');
    const flashcardsGrid = document.getElementById('flashcards-grid');

    let currentLevel = 'fundamental1';
    let currentGrade = 'ano1';

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
    // (Estas funções permanecem inalteradas, pois apenas leem as variáveis globais)
    const renderGradesNav = () => {
        if (!mathContent[currentLevel]) return;
        const grades = mathContent[currentLevel].grades;
        gradesNavContainer.innerHTML = Object.keys(grades)
            .map(gradeKey => `<button data-grade="${gradeKey}" class="grade-tab ${gradeKey === currentGrade ? 'active' : ''}">${grades[gradeKey].label}</button>`)
            .join('');
    };

    const renderTopicsContent = () => {
        if (!mathContent[currentLevel] || !mathContent[currentLevel].grades[currentGrade]) return;
        const topics = mathContent[currentLevel].grades[currentGrade].topics;
        topicsContentContainer.innerHTML = topics.map(topic => `
            <div class="accordion-item mb-4">
                <button class="accordion-button w-full text-left flex justify-between items-center">
                    <span>${topic.title}</span>
                    <i class="ph-duotone ph-caret-down icon"></i>
                </button>
                <div class="accordion-content">
                    <div class="prose max-w-none">${topic.content}</div>
                    <div class="mt-6 space-y-4">
                        ${topic.questions.map(q => `
                            <div class="question-block p-4">
                                <p class="font-semibold text-slate-300">${q.text}</p>
                                
                                <div class="mt-2 flex flex-col gap-2">
                                    <input type="text" class="question-input w-full" placeholder="Sua resposta...">
                                    <div class="flex justify-end items-center min-h-[2rem]">
                                        <span class="feedback-message hidden text-sm mr-auto font-medium"></span>
                                        <button class="check-answer-btn" data-correct-answer="${q.correctAnswer}">Verificar</button>
                                    </div>
                                </div>
                                </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderFlashcards = () => {
        flashcardsGrid.innerHTML = flashcards.map(card => `
            <div class="flashcard">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <h3 class="text-xl font-bold text-center">${card.front}</h3>
                    </div>
                    <div class="flashcard-back text-center">
                        <h4 class="text-2xl font-semibold">${card.back}</h4>
                        <p class="text-sm mt-3 px-2">${card.explanation}</p>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const updateContent = () => {
        renderGradesNav();
        renderTopicsContent();
    };

    // --- MANIPULADORES DE EVENTOS ---
    // (Estes também permanecem inalterados)
    mainNav.addEventListener('click', e => {
        const button = e.target.closest('button');
        if (button && button.dataset.target) {
            mainNav.querySelector('.tab-button.active')?.classList.remove('active');
            button.classList.add('active');
            mainContents.forEach(content => content.classList.toggle('hidden', content.id !== button.dataset.target));
        }
    });

    levelNav.addEventListener('click', e => {
        const button = e.target.closest('button');
        if (button && button.dataset.level && button.dataset.level !== currentLevel) {
            currentLevel = button.dataset.level;
            currentGrade = Object.keys(mathContent[currentLevel].grades)[0];
            levelNav.querySelector('.level-tab.active')?.classList.remove('active');
            button.classList.add('active');
            updateContent();
        }
    });

    gradesNavContainer.addEventListener('click', e => {
        const button = e.target.closest('button');
        if (button && button.dataset.grade && button.dataset.grade !== currentGrade) {
            currentGrade = button.dataset.grade;
            gradesNavContainer.querySelector('.grade-tab.active')?.classList.remove('active');
            button.classList.add('active');
            renderTopicsContent();
        }
    });

    topicsContentContainer.addEventListener('click', e => {
        const button = e.target.closest('button');
        if (!button) return;

        if (button.classList.contains('accordion-button')) {
            button.classList.toggle('open');
        }

        if (button.classList.contains('check-answer-btn')) {
            const questionBlock = button.closest('.question-block');
            if (!questionBlock) return;

            const input = questionBlock.querySelector('.question-input');
            const feedback = questionBlock.querySelector('.feedback-message');
            const userAnswer = input.value.trim().replace(",", ".");
            const correctAnswer = button.dataset.correctAnswer;

            feedback.classList.remove('hidden', 'feedback-correct', 'feedback-incorrect');

            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                feedback.textContent = 'Correto! ✨';
                feedback.classList.add('feedback-correct');
            } else {
                feedback.textContent = 'Incorreto, tente de novo.';
                feedback.classList.add('feedback-incorrect');
            }
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Enter' && e.target.classList.contains('question-input')) {
            e.preventDefault();
            const questionBlock = e.target.closest('.question-block');
            if (questionBlock) {
                const checkButton = questionBlock.querySelector('.check-answer-btn');
                if (checkButton) {
                    checkButton.click();
                }
            }
        }
    });

    flashcardArea.addEventListener('click', e => {
        const flashcard = e.target.closest('.flashcard');
        if (flashcard) {
            flashcard.classList.toggle('is-flipped');
        }
    });

    // --- INICIALIZAÇÃO DA APLICAÇÃO ---
    async function initializeApp() {
        try {
            // 1. Busca os dados da nossa nova API no backend
            const response = await fetch('/api/content');
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do servidor.');
            }
            const data = await response.json();

            // 2. Preenche nossas variáveis globais com os dados recebidos
            mathContent = data.mathContent;
            flashcards = data.flashcards;

            // 3. Agora que temos os dados, podemos renderizar a página
            updateContent();
            renderFlashcards();

        } catch (error) {
            console.error("Falha na inicialização:", error);
            // Mostra uma mensagem de erro para o usuário na tela
            document.querySelector('main').innerHTML = '<h2 class="text-center text-red-500 text-2xl mt-10">Oops! Não foi possível carregar o conteúdo. Tente recarregar a página.</h2>';
        }
    }

    // Inicia todo o processo!
    initializeApp();
});