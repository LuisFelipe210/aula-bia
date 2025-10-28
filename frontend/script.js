document.addEventListener('DOMContentLoaded', () => {
    // --- VARIÁVEIS GLOBAIS ---
    let mathContent = {};
    let flashcards = [];

    // --- ELEMENTOS DO DOM ---
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const profileBtn = document.getElementById('profile-btn');
    const authModal = document.getElementById('auth-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register-form');
    const showLoginLink = document.getElementById('show-register-form'); // Corrigido
    const showLoginLinkAuth = document.getElementById('show-login-form'); // Renomeado para evitar conflito

    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    const mainNav = document.getElementById('main-nav');
    const mainContents = document.querySelectorAll('.main-content');
    const levelNav = document.getElementById('level-nav');
    const gradesNavContainer = document.getElementById('grades-nav-container');
    const topicsContentContainer = document.getElementById('topics-content-container');
    const flashcardArea = document.getElementById('flashcard-area');
    const profileArea = document.getElementById('profile-area');
    const flashcardsGrid = document.getElementById('flashcards-grid');

    let currentLevel = 'fundamental1';
    let currentGrade = 'ano1';

    // --- LÓGICA DE AUTENTICAÇÃO E ESTADO DA UI ---
    function updateAuthState(isLoggedIn) {
        if (isLoggedIn) {
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            profileBtn.classList.remove('hidden');
        } else {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            profileBtn.classList.add('hidden');
            localStorage.removeItem('token');
        }
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
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
            <div class="accordion-item mb-4" data-topic-id="${topic._id}" data-topic-title="${topic.title}">
                <button class="accordion-button w-full text-left flex justify-between items-center">
                    <span>${topic.title}</span>
                    <i class="ph-duotone ph-caret-down icon"></i>
                </button>
                <div class="accordion-content">
                    <div class="prose max-w-none">${topic.content || ''}</div>
                    <div class="mt-6 space-y-4">
                        ${(topic.questions || []).map(q => `
                            <div class="question-block p-4" data-correct-answer="${q.correctAnswer}" data-question-text="${q.text}">
                                <p class="font-semibold text-slate-300">${q.text}</p>
                                <div class="question-options">
                                    ${(q.options || []).map(option => `
                                        <button class="option-button" data-option="${option}">${option}</button>
                                    `).join('')}
                                </div>
                                <div class="feedback-message mt-3 text-sm font-medium"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderFlashcards = () => {
        flashcardsGrid.innerHTML = flashcards.map(card => `
            <div class="flashcard"><div class="flashcard-inner"><div class="flashcard-front"><h3 class="text-xl font-bold text-center">${card.front}</h3></div><div class="flashcard-back text-center"><h4 class="text-2xl font-semibold">${card.back}</h4><p class="text-sm mt-3 px-2">${card.explanation}</p></div></div></div>
        `).join('');
    };

    const updateContent = () => {
        renderGradesNav();
        renderTopicsContent();
    };

    // --- MANIPULADORES DE EVENTOS ---

    // Autenticação
    loginBtn.addEventListener('click', () => authModal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => authModal.classList.add('hidden'));

    logoutBtn.addEventListener('click', () => {
        updateAuthState(false);
        // Alert removido. A mudança de estado da UI e a navegação para a home já indicam sucesso.
        mainNav.querySelector('button[data-target="content-area"]').click();
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.reset();
        loginError.style.display = 'none';
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLinkAuth.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.reset();
        registerError.style.display = 'none';
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        // Limpa possíveis estilos de sucesso de um registro anterior
        loginError.style.display = 'none';
        loginError.style.cssText = '';
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        registerError.style.display = 'none';
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await response.json();
        if (data.status === 'ok') {
            // Exibe mensagem de sucesso no modal do login (substituindo o alert)
            loginError.textContent = 'Registro bem-sucedido! Agora você pode fazer login.';
            loginError.style.color = '#34D399'; // Cor de sucesso (baseada no feedback-correct)
            loginError.style.backgroundColor = 'rgba(52, 211, 153, 0.2)';
            loginError.style.border = '1px solid #34D399';
            loginError.style.display = 'block';

            // Muda para o formulário de login
            showLoginLinkAuth.click();
        } else {
            registerError.textContent = data.error;
            registerError.style.display = 'block';
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Garante que a mensagem de sucesso ou erro anterior seja limpa/resetada antes da tentativa
        loginError.style.display = 'none';
        loginError.style.cssText = '';

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await response.json();
        if (data.status === 'ok') {
            localStorage.setItem('token', data.data);
            updateAuthState(true);
            authModal.classList.add('hidden');
            loginForm.reset();
        } else {
            // Volta para os estilos de erro originais em caso de falha de login
            loginError.textContent = data.error;
            loginError.style.display = 'block';
            // Garante que o CSS original do .error-message seja aplicado (removendo inline styles de sucesso)
        }
    });

    // Navegação Principal
    mainNav.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.target) {
            // Se clicar no botão de perfil, carrega os dados
            if (button.id === 'profile-btn') {
                loadProfileData();
            }
            mainNav.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            mainContents.forEach(content => content.classList.toggle('hidden', content.id !== button.dataset.target));
        }
    });

    levelNav.addEventListener('click', (e) => { const button = e.target.closest('button'); if (button && button.dataset.level && button.dataset.level !== currentLevel) { currentLevel = button.dataset.level; currentGrade = Object.keys(mathContent[currentLevel].grades)[0]; levelNav.querySelector('.level-tab.active')?.classList.remove('active'); button.classList.add('active'); updateContent(); } });
    gradesNavContainer.addEventListener('click', (e) => { const button = e.target.closest('button'); if (button && button.dataset.grade && button.dataset.grade !== currentGrade) { currentGrade = button.dataset.grade; gradesNavContainer.querySelector('.grade-tab.active')?.classList.remove('active'); button.classList.add('active'); renderTopicsContent(); } });
    flashcardArea.addEventListener('click', (e) => { const flashcard = e.target.closest('.flashcard'); if (flashcard) { flashcard.classList.toggle('is-flipped'); } });

    // Conteúdo (Accordion e Questões)
    topicsContentContainer.addEventListener('click', e => {
        const target = e.target;
        const accordionButton = target.closest('.accordion-button');
        if (accordionButton) {
            accordionButton.classList.toggle('open');
        }

        if (target.classList.contains('option-button')) {
            const questionBlock = target.closest('.question-block');
            const optionsContainer = target.parentElement;
            if (optionsContainer.classList.contains('answered')) return;
            optionsContainer.classList.add('answered');

            const userAnswer = target.dataset.option;
            const correctAnswer = questionBlock.dataset.correctAnswer;
            const feedback = questionBlock.querySelector('.feedback-message');
            const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

            const token = localStorage.getItem('token'); // Verifica o token

            // Aplica o feedback visual
            if (isCorrect) {
                target.classList.add('correct');
                feedback.textContent = 'Correto! ✨';
                feedback.classList.add('feedback-correct');
            } else {
                target.classList.add('incorrect');
                feedback.textContent = `Incorreto. A resposta certa era "${correctAnswer}".`;
                feedback.classList.add('feedback-incorrect');
                const allOptions = optionsContainer.querySelectorAll('.option-button');
                allOptions.forEach(btn => {
                    if (btn.dataset.option.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
                        btn.classList.add('correct');
                    }
                });
            }

            // --- MENSAGEM PARA LOGAR ---
            if (!token) {
                // Se não estiver logado, adiciona a frase ao feedback
                feedback.textContent += ' (Faça login/Registre-se para salvar o progresso! 🔒)';
            }
            // --- FIM DA MENSAGEM ---

            const accordionItem = target.closest('.accordion-item');
            const topicId = accordionItem.dataset.topicId;
            const topicTitle = accordionItem.dataset.topicTitle;
            const questionText = questionBlock.dataset.questionText;

            // saveAnswerProgress verifica internamente o token e salva se estiver logado
            saveAnswerProgress(topicId, topicTitle, questionText, userAnswer, isCorrect);
        }
    });

    // --- LÓGICA DE PERFIL E PROGRESSO ---
    async function saveAnswerProgress(topicId, topicTitle, questionText, userAnswer, isCorrect) {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            await fetch('/api/progress/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ topicId, topicTitle, questionText, userAnswer, isCorrect })
            });
        } catch (error) {
            console.error("Falha ao salvar o progresso:", error);
        }
    }

    async function loadProfileData() {
        const token = localStorage.getItem('token');
        if (!token) {
            profileArea.innerHTML = '<h2 class="text-center">Faça login para ver seu progresso.</h2>';
            return;
        }
        try {
            const response = await fetch('/api/progress/me', { headers: { 'Authorization': `Bearer ${token}` } });
            if (!response.ok) throw new Error('Falha ao buscar dados do perfil.');
            // O backend agora retorna answerHistory E stats pré-calculados
            const { answerHistory, stats } = await response.json();

            const statsContainer = document.getElementById('profile-stats-container');
            // Apenas itera sobre os stats que vieram prontos do servidor
            if (!stats || stats.length === 0) {
                statsContainer.innerHTML = '<p class="text-slate-400 text-center">Nenhuma estatística disponível. Comece a responder às questões!</p>';
            } else {
                statsContainer.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">` + stats.map(item => {
                    const percent = item.percent; // Usa a percentagem já calculada pelo backend
                    return `
                        <div class="stat-card">
                            <h4>${item.grade}</h4>
                            <div class="stat-number ${percent >= 60 ? 'text-green-400' : 'text-red-400'}">${percent}%</div>
                            <div class="stat-details">
                                <span class="correct-text">${item.correct} acertos</span> de ${item.total} questões
                            </div>
                        </div>
                    `;
                }).join('') + `</div>`;
            }

            const historyContainer = document.getElementById('profile-history-container');
            // Apenas itera sobre o histórico
            if (!answerHistory || answerHistory.length === 0) {
                historyContainer.innerHTML = '<p class="text-slate-400 text-center">Seu histórico de respostas aparecerá aqui.</p>';
            } else {
                historyContainer.innerHTML = [...answerHistory].reverse().map(item => `
                    <div class="history-item ${item.isCorrect ? 'is-correct' : 'is-incorrect'}">
                        <div>
                            <p class="font-semibold">${item.topicTitle}</p>
                            <p class="text-sm text-slate-400">${item.questionText}</p>
                        </div>
                        <span class="font-bold text-sm ${item.isCorrect ? 'correct-text' : 'incorrect-text'}">
                            ${item.isCorrect ? 'Correto' : 'Incorreto'}
                        </span>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
            profileArea.innerHTML = '<h2 class="text-center text-red-500 mt-10">Não foi possível carregar o seu progresso.</h2>';
        }
    }

    // --- INICIALIZAÇÃO DA APLICAÇÃO ---
    async function initializeApp() {
        // 1. Verifica o estado de login PRIMEIRO
        const token = localStorage.getItem('token');
        updateAuthState(!!token);

        // 2. DEPOIS, carrega o conteúdo principal
        try {
            const response = await fetch('/api/content');
            if (!response.ok) {
                throw new Error(`O servidor respondeu com um erro: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            mathContent = data.mathContent;
            flashcards = data.flashcards;
            updateContent();
            renderFlashcards();
        } catch (error) {
            console.error("Falha na inicialização do conteúdo:", error);
            document.querySelector('.main-content-area').innerHTML = '<h2 class="text-center text-red-500 text-2xl mt-10">Oops! Não foi possível carregar o conteúdo.</h2>';
        }
    }

    initializeApp();
});