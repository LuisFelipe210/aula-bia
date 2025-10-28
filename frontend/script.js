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

    // Elementos da Sidebar Mobile
    const sidebar = document.getElementById('sidebar');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // Elementos ENEM
    const enemNavBtn = document.getElementById('enem-nav-btn');
    const enemArea = document.getElementById('enem-area');
    const enemQuestionsContainer = document.getElementById('enem-questions-container');
    const loadEnemQuestionsBtn = document.getElementById('load-enem-questions-btn');


    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register-form');
    const showLoginLinkAuth = document.getElementById('show-login-form');

    const loginEmailInput = document.getElementById('login-email');
    const registerEmailInput = document.getElementById('register-email');

    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');

    // Novos elementos para feedback do estado
    const userProfileSection = document.getElementById('user-profile-section');
    const userEmailDisplay = document.getElementById('user-email-display');


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

    // --- FUNÇÕES DE CONTROLE DA SIDEBAR ---
    function toggleSidebar() {
        sidebar.classList.toggle('open');
        const icon = menuToggleBtn.querySelector('i');
        if (sidebar.classList.contains('open')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    }

    function closeSidebar() {
        if (sidebar.classList.contains('open')) {
            toggleSidebar();
        }
    }

    // --- LÓGICA DE AUTENTICAÇÃO E ESTADO DA UI ---
    function setFeedback(element, message, isSuccess = false) {
        element.textContent = message;
        element.style.display = 'block';
        if (isSuccess) {
            element.style.color = '#34D399';
            element.style.backgroundColor = 'rgba(52, 211, 153, 0.2)';
            element.style.border = '1px solid #34D399';
        } else {
            // Volta para os estilos de erro originais
            element.style.color = '#F87171';
            element.style.backgroundColor = 'rgba(153, 27, 27, 0.3)';
            element.style.border = '1px solid #991B1B';
        }
    }

    function clearFeedback(element) {
        element.style.display = 'none';
        element.textContent = '';
        element.style.cssText = '';
    }

    function updateAuthState(isLoggedIn, userEmail = null) {
        if (isLoggedIn) {
            loginBtn.classList.add('hidden');
            logoutBtn.classList.remove('hidden');
            profileBtn.classList.remove('hidden');

            userProfileSection.classList.remove('hidden');
            userEmailDisplay.textContent = userEmail;

        } else {
            loginBtn.classList.remove('hidden');
            logoutBtn.classList.add('hidden');
            profileBtn.classList.add('hidden');
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail'); // Limpa o e-mail armazenado

            userProfileSection.classList.add('hidden');
            userEmailDisplay.textContent = '';
        }
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO ---

    // Função auxiliar para renderizar HTML de questões (usada por renderTopicsContent e loadEnemQuestions)
    const renderQuestionsHtml = (questions) => {
        return questions.map(topic => `
            <div class="accordion-item mb-4" data-topic-id="${topic._id}" data-topic-title="${topic.title}">
                <button class="accordion-button w-full text-left flex justify-between items-center open">
                    <span>${topic.title}</span>
                    <i class="ph-duotone ph-caret-down icon open"></i>
                </button>
                <div class="accordion-content" style="max-height: 10000px; padding: 0 1.5rem 1.5rem 1.5rem;">
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
    }

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

    // --- FUNÇÃO DE CARREGAMENTO ENEM ---
    async function loadEnemQuestions(append = false) {
        // Desativa o botão enquanto carrega
        loadEnemQuestionsBtn.disabled = true;
        loadEnemQuestionsBtn.innerHTML = '<i class="ph-duotone ph-spinner-gap animate-spin"></i> Carregando...';

        try {
            const year = yearSelect.value;
            const response = await fetch(`/api/enem/questions?year=${year}&limit=10`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || errorData.message || `Erro HTTP: ${response.status}`);
            }

            const newQuestions = await response.json();

            // Verifica se retornou questões
            if (!newQuestions || newQuestions.length === 0) {
                enemQuestionsContainer.innerHTML = `
                    <div class="text-center p-8">
                        <i class="ph-duotone ph-magnifying-glass text-5xl text-yellow-500 mb-4"></i>
                        <p class="text-yellow-500 text-lg mb-2">Nenhuma questão encontrada</p>
                        <p class="text-slate-400 text-sm">Não há questões de matemática para o ENEM ${year}.</p>
                        <p class="text-slate-500 text-xs mt-2">Tente selecionar outro ano no dropdown acima.</p>
                    </div>
                `;
                loadEnemQuestionsBtn.innerHTML = '<i class="ph-duotone ph-arrows-clockwise"></i> Carregar 10 Novas Questões';
                loadEnemQuestionsBtn.disabled = false;
                return;
            }

            // Renderiza questões
            if (append) {
                enemQuestionsContainer.innerHTML += renderQuestionsHtml(newQuestions);
            } else {
                enemQuestionsContainer.innerHTML = renderQuestionsHtml(newQuestions);
            }

            loadEnemQuestionsBtn.innerHTML = '<i class="ph-duotone ph-arrows-clockwise"></i> Carregar 10 Novas Questões';
            loadEnemQuestionsBtn.disabled = false;

        } catch (error) {
            console.error("Erro completo:", error);
            enemQuestionsContainer.innerHTML = `
                <div class="text-center p-8">
                    <i class="ph-duotone ph-warning text-5xl text-red-500 mb-4"></i>
                    <p class="text-red-500 text-lg mb-2">Erro ao carregar questões do ENEM</p>
                    <p class="text-slate-400 text-sm mb-4">${error.message}</p>
                    <button id="test-api-btn" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">
                        <i class="ph-duotone ph-pulse"></i> Testar Conexão com API
                    </button>
                    <p class="text-slate-500 text-xs mt-4">💡 Dica: Abra o Console (F12) para ver mais detalhes do erro</p>
                </div>
            `;

            // Adiciona evento ao botão de teste
            document.getElementById('test-api-btn')?.addEventListener('click', testApiConnection);

            loadEnemQuestionsBtn.innerHTML = '<i class="ph-duotone ph-warning"></i> Tentar Novamente';
            loadEnemQuestionsBtn.disabled = false;
        }
    }

    // Função para testar a conexão com a API
    async function testApiConnection() {
        const testBtn = document.getElementById('test-api-btn');
        if (testBtn) {
            testBtn.disabled = true;
            testBtn.innerHTML = '<i class="ph-duotone ph-spinner-gap animate-spin"></i> Testando...';
        }

        try {
            const response = await fetch('/api/enem/test');
            const data = await response.json();

            if (data.status === 'ok') {
                alert(`✅ Conexão OK!\n\nTotal de questões: ${data.totalQuestions}\nQuestões de Matemática: ${data.mathQuestions}`);
            } else {
                alert(`❌ Erro: ${data.message}\n\nDetalhes: ${data.detail || 'N/A'}`);
            }
        } catch (error) {
            alert(`❌ Falha no teste de conexão:\n\n${error.message}`);
        } finally {
            if (testBtn) {
                testBtn.disabled = false;
                testBtn.innerHTML = '<i class="ph-duotone ph-pulse"></i> Testar Conexão com API';
            }
        }
    }

    // --- ELEMENTOS DE FILTRO ENEM (apenas ano) ---
    const enemFilterContainer = document.createElement('div');
    enemFilterContainer.className = 'flex flex-wrap items-center justify-center gap-4 my-4';

    // Dropdown de ano
    const yearSelect = document.createElement('select');
    yearSelect.className = 'enem-year-select px-3 py-2 rounded bg-slate-700 text-white';
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1998; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = `ENEM ${y}`;
        yearSelect.appendChild(opt);
    }

    enemFilterContainer.appendChild(yearSelect);
    enemArea.insertBefore(enemFilterContainer, enemQuestionsContainer);

    // Evento de alteração apenas para ano
    yearSelect.addEventListener('change', loadFilteredEnemQuestions);

    async function loadFilteredEnemQuestions() {
        const year = yearSelect.value;
        loadEnemQuestionsBtn.disabled = true;
        loadEnemQuestionsBtn.innerHTML = '<i class="ph-duotone ph-spinner-gap animate-spin"></i> Carregando...';

        try {
            const response = await fetch(`/api/enem/questions?year=${year}&limit=10`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
            }

            const newQuestions = await response.json();

            if (!newQuestions || newQuestions.length === 0) {
                enemQuestionsContainer.innerHTML = `<p class="text-center text-yellow-500">Nenhuma questão de matemática encontrada para o ENEM ${year}.</p>`;
            } else {
                enemQuestionsContainer.innerHTML = renderQuestionsHtml(newQuestions);
            }

            loadEnemQuestionsBtn.innerHTML = '<i class="ph-duotone ph-arrows-clockwise"></i> Carregar Novas Questões';
            loadEnemQuestionsBtn.disabled = false;

        } catch (error) {
            console.error("Erro ao carregar questões ENEM:", error);
            enemQuestionsContainer.innerHTML = `
                <div class="text-center p-8">
                    <i class="ph-duotone ph-warning text-5xl text-red-500 mb-4"></i>
                    <p class="text-red-500 text-lg mb-2">Erro ao carregar questões</p>
                    <p class="text-slate-400 text-sm">${error.message}</p>
                </div>
            `;
            loadEnemQuestionsBtn.innerHTML = '<i class="ph-duotone ph-warning"></i> Tentar Novamente';
            loadEnemQuestionsBtn.disabled = false;
        }
    }

    // --- MANIPULADORES DE EVENTOS ---

    // Sidebar Mobile
    menuToggleBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Botão Carregar Mais ENEM
    loadEnemQuestionsBtn.addEventListener('click', () => loadEnemQuestions(false));

    // Autenticação
    loginBtn.addEventListener('click', () => {
        authModal.classList.remove('hidden');
        clearFeedback(loginError);
        clearFeedback(registerError);
        closeSidebar();
    });
    closeModalBtn.addEventListener('click', () => authModal.classList.add('hidden'));

    logoutBtn.addEventListener('click', () => {
        const userEmail = localStorage.getItem('userEmail') || 'usuário';
        updateAuthState(false);
        console.log(`Usuário ${userEmail} deslogado com sucesso.`);
        mainNav.querySelector('button[data-target="content-area"]').click();
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.reset();
        clearFeedback(loginError);
        clearFeedback(registerError);
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLinkAuth.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.reset();
        clearFeedback(registerError);
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearFeedback(registerError);
        const email = registerEmailInput.value;
        const password = document.getElementById('register-password').value;
        const response = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await response.json();
        if (data.status === 'ok') {
            setFeedback(loginError, 'Registro bem-sucedido! Agora você pode fazer login.', true);
            showLoginLinkAuth.click();
        } else {
            setFeedback(registerError, data.error, false);
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearFeedback(loginError);

        const email = loginEmailInput.value;
        const password = document.getElementById('login-password').value;
        const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        const data = await response.json();

        if (data.status === 'ok') {
            localStorage.setItem('token', data.data);
            localStorage.setItem('userEmail', email);
            updateAuthState(true, email);
            authModal.classList.add('hidden');
            loginForm.reset();
            console.log(`Usuário ${email} logado com sucesso.`);
        } else {
            setFeedback(loginError, data.error, false);
        }
    });

    // Navegação Principal (Botões Guia/Flashcards/Progresso)
    mainNav.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.target) {
            if (button.id === 'profile-btn') {
                loadProfileData();
            }
            mainNav.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            mainContents.forEach(content => content.classList.toggle('hidden', content.id !== button.dataset.target));

            // Remove 'active' do botão ENEM e desativa o Level Nav
            if (button.dataset.target !== 'enem-area') {
                enemNavBtn.classList.remove('active');
                levelNav.querySelectorAll('.level-tab').forEach(btn => btn.classList.remove('active'));
            }

            closeSidebar();
        }
    });

    // Navegação de Nível/ENEM
    levelNav.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button) {
            // Se for um botão de Nível (fundamental1, fundamental2, medio)
            if (button.dataset.level) {
                // Remove 'active' do botão ENEM
                enemNavBtn.classList.remove('active');

                if (button.dataset.level !== currentLevel) {
                    currentLevel = button.dataset.level;
                    currentGrade = Object.keys(mathContent[currentLevel].grades)[0];
                    levelNav.querySelectorAll('.level-tab').forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    updateContent();
                }
                mainContents.forEach(content => content.classList.add('hidden'));
                document.getElementById('content-area').classList.remove('hidden');
                mainNav.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                mainNav.querySelector('button[data-target="content-area"]').classList.add('active');

                // Se for o botão ENEM
            } else if (button.dataset.target === 'enem-area') {
                // Ativa o botão ENEM e desativa os botões de Nível
                levelNav.querySelectorAll('.level-tab').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Esconde a navegação de séries
                gradesNavContainer.innerHTML = '';

                // Exibe a área ENEM e esconde as outras áreas principais
                mainContents.forEach(content => content.classList.add('hidden'));
                document.getElementById('enem-area').classList.remove('hidden');
                mainNav.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                mainNav.querySelector('button[data-target="content-area"]').classList.add('active'); // Mantém a aba "Guia de Estudos" ativa para visualização

                // O ENEM é carregado na inicialização, mas garantimos o carregamento ao clicar
                loadEnemQuestions(false);
            }
            closeSidebar();
        }
    });

    gradesNavContainer.addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (button && button.dataset.grade && button.dataset.grade !== currentGrade) {
            currentGrade = button.dataset.grade;
            gradesNavContainer.querySelector('.grade-tab.active')?.classList.remove('active');
            button.classList.add('active');
            renderTopicsContent();
        }
    });

    flashcardArea.addEventListener('click', (e) => { const flashcard = e.target.closest('.flashcard'); if (flashcard) { flashcard.classList.toggle('is-flipped'); } });

    // Conteúdo (Accordion e Questões)
    topicsContentContainer.addEventListener('click', handleQuestionInteraction);
    enemQuestionsContainer.addEventListener('click', handleQuestionInteraction);

    function handleQuestionInteraction(e) {
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

            const token = localStorage.getItem('token');

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

            if (!token) {
                feedback.textContent += ' (Faça login/Registre-se para salvar o progresso! 🔒)';
            }

            const accordionItem = target.closest('.accordion-item');
            const topicId = accordionItem.dataset.topicId;
            const topicTitle = accordionItem.dataset.topicTitle;
            const questionText = questionBlock.dataset.questionText;

            saveAnswerProgress(topicId, topicTitle, questionText, userAnswer, isCorrect);
        }
    }


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

            const { answerHistory, stats } = await response.json();

            const statsContainer = document.getElementById('profile-stats-container');
            if (!stats || stats.length === 0) {
                statsContainer.innerHTML = '<p class="text-slate-400 text-center">Nenhuma estatística disponível. Comece a responder às questões!</p>';
            } else {
                statsContainer.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">` + stats.map(item => {
                    const percent = item.percent;
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
        const userEmail = localStorage.getItem('userEmail');
        updateAuthState(!!token, userEmail);

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

            // Carrega as primeiras questões ENEM na inicialização
            if (enemArea && enemArea.classList.contains('hidden')) {
                // Carrega apenas se não estiver visível (para não sobrepor o Guia de Estudos)
                loadEnemQuestions(false);
            }

        } catch (error) {
            console.error("Falha na inicialização do conteúdo:", error);
            document.querySelector('.main-content-area').innerHTML = '<h2 class="text-center text-red-500 text-2xl mt-10">Oops! Não foi possível carregar o conteúdo.</h2>';
        }
    }

    initializeApp();
});