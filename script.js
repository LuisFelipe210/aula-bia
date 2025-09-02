document.addEventListener('DOMContentLoaded', () => {
    // --- DADOS EXPANDIDOS DA APLICAÇÃO ---
    const mathContent = {
        fundamental1: {
            label: "Fundamental I",
            grades: {
                ano1: {
                    label: "1º Ano",
                    topics: [
                        { title: "Números Naturais e Contagem", content: `Aprendemos a associar quantidades a números (<strong>alfabetização matemática</strong>). Usamos sequências (um, dois, três...) para contar, reconhecemos os algarismos (1, 2, 3) e comparamos quantidades (maior, menor, igual).`, questions: [{ text: "Uma cesta tem 9 laranjas e outra tem 6. Qual o número na cesta que tem mais?", correctAnswer: "9" }] },
                        { title: "Introdução à Adição e Subtração", content: `<strong>Adição (+)</strong> é juntar ou acrescentar. Ex: 3 maçãs + 2 maçãs = 5 maçãs. <br><strong>Subtração (-)</strong> é tirar ou comparar. Ex: Tinha 10 biscoitos, comi 3, restaram 10 - 3 = 7.`, questions: [{ text: "Havia 8 pássaros em uma árvore. Chegaram mais 4. Quantos pássaros há agora?", correctAnswer: "12" }] },
                        { title: "Figuras Geométricas Planas", content: `Reconhecimento de formas básicas no ambiente. Aprendemos a identificar e nomear o <strong>círculo</strong>, o <strong>quadrado</strong>, o <strong>triângulo</strong> e o <strong>retângulo</strong>.`, questions: [{ text: "A roda de um carro lembra qual figura geométrica?", correctAnswer: "círculo" }] },
                        { title: "Medidas (Noções Iniciais)", content: `Comparamos objetos usando termos como <strong>mais comprido/curto</strong>, <strong>maior/menor</strong>, <strong>mais pesado/leve</strong>. Também aprendemos sobre a passagem do tempo com noções de <strong>dia e noite</strong> e <strong>ontem, hoje e amanhã</strong>.`, questions: [{ text: "O que é mais pesado: uma pena ou um tijolo?", correctAnswer: "tijolo" }] }
                    ]
                },
                ano2: {
                    label: "2º Ano",
                    topics: [
                        { title: "Sistema de Numeração Decimal (Centena)", content: `Organizamos os números em grupos de 10. O valor de um algarismo depende da sua <strong>posição</strong>: Unidade (U), Dezena (D) e Centena (C). No número <strong>472</strong>, o 4 vale 400, o 7 vale 70, e o 2 vale 2.`, questions: [{ text: "No número 681, qual algarismo está na casa das dezenas?", correctAnswer: "8" }] },
                        { title: "Introdução à Multiplicação e Divisão", content: `<strong>Multiplicação (×)</strong> é uma soma de parcelas iguais. Ex: 3 caixas com 5 lápis cada é 3 × 5 = 15 lápis. <br><strong>Divisão (÷)</strong> é a ideia de repartir em partes iguais. Ex: Dividir 12 balas para 4 amigos é 12 ÷ 4 = 3 balas para cada.`, questions: [{ text: "Se um caderno custa R$ 8, quanto custarão 4 cadernos?", correctAnswer: "32" }] },
                        { title: "Sistema Monetário Brasileiro", content: `Conhecemos as <strong>cédulas e moedas</strong> do nosso dinheiro (Real). Aprendemos a fazer pequenas compras, pagamentos e a calcular o troco.`, questions: [{ text: "Você comprou um suco de R$ 4 e pagou com uma nota de R$ 10. Quanto recebeu de troco?", correctAnswer: "6" }] },
                        { title: "Medidas de Tempo (Calendário e Hora)", content: `Aprendemos a usar o <strong>calendário</strong> para ver dias, semanas e meses. Também começamos a ler as horas em relógios, focando nas <strong>horas exatas</strong>.`, questions: [{ text: "Um ano tem quantos meses?", correctAnswer: "12" }] }
                    ]
                },
                ano3: {
                    label: "3º Ano",
                    topics: [
                        { title: "Frações (Ideia de Parte-Todo)", content: `Uma fração representa partes de um todo dividido em partes <strong>iguais</strong>. Em <strong>3/8</strong>, o <strong>denominador (8)</strong> diz em quantas partes o todo foi dividido, e o <strong>numerador (3)</strong> diz quantas partes foram consideradas.`, questions: [{ text: "Uma pizza foi dividida em 8 fatias. Se você comeu 2, que fração representa a parte que comeu? (escreva como 2/8)", correctAnswer: "2/8" }] },
                        { title: "Medidas de Perímetro e Área (Malha Quadriculada)", content: `O <strong>perímetro</strong> é a soma dos lados, o contorno. A <strong>área</strong> é a superfície. Em uma malha quadriculada, contamos os quadradinhos para medir a área de uma figura.`, questions: [{ text: "Um quadrado tem lado de 5 cm. Qual é o seu perímetro?", correctAnswer: "20" }] },
                        { title: "Tabelas e Gráficos Simples", content: `Aprendemos a coletar dados e organizá-los em <strong>tabelas de dupla entrada</strong> e <strong>gráficos de colunas</strong>. Isso nos ajuda a ler e interpretar informações de forma visual.`, questions: [{ text: "Em um gráfico, a coluna de 'gatos' vai até o número 10 e a de 'cachorros' até o 15. Qual animal tem a maior quantidade?", correctAnswer: "cachorros" }] }
                    ]
                },
                ano4: {
                    label: "4º Ano",
                    topics: [
                        { title: "Números Decimais", content: `Usamos números decimais para representar valores não inteiros, como dinheiro (R$ 5,75) ou medidas (1,5 m). A <strong>vírgula</strong> separa a parte inteira da parte decimal. Para somar ou subtrair, alinhamos as vírgulas.`, questions: [{ text: "Quanto é 12,5 + 3,45?", correctAnswer: "15.95" }] },
                        { title: "Cálculo de Área (Quadrados e Retângulos)", content: `A <strong>área</strong> é a medida da superfície. Para um retângulo, a fórmula é <code>A = comprimento × largura</code>. Para um quadrado, é <code>A = lado × lado</code>.`, questions: [{ text: "Qual a área de um terreno retangular que mede 20 metros de comprimento por 10 metros de largura?", correctAnswer: "200" }] },
                        { title: "Ângulos (Reto, Agudo e Obtuso)", content: `Aprendemos a identificar ângulos. O <strong>ângulo reto</strong> mede 90° (como o canto de um livro). O <strong>ângulo agudo</strong> é menor que 90° (mais fechado). O <strong>ângulo obtuso</strong> é maior que 90° (mais aberto).`, questions: [{ text: "O ângulo formado pelos ponteiros de um relógio às 3 horas é reto, agudo ou obtuso?", correctAnswer: "reto" }] }
                    ]
                },
                ano5: {
                    label: "5º Ano",
                    topics: [
                        { title: "Porcentagem", content: `A porcentagem (%) é uma parte de 100. <strong>25%</strong> é o mesmo que 25/100 ou 0,25. Para calcular, multiplique a forma decimal pelo valor. Ex: 50% de 300 é 0,50 × 300 = 150.`, questions: [{ text: "Uma TV de R$ 2000 teve um desconto de 10%. Qual o valor do desconto em reais?", correctAnswer: "200" }] },
                        { title: "Volume de Blocos Retangulares", content: `O volume é o espaço que um objeto ocupa. A fórmula para um bloco retangular é <code>V = comprimento × largura × altura</code>. A unidade é cúbica (cm³, m³).`, questions: [{ text: "Uma caixa de sapatos mede 30 cm de comprimento, 20 cm de largura e 10 cm de altura. Qual o seu volume?", correctAnswer: "6000" }] },
                        { title: "Medidas de Grandeza", content: `Trabalhamos com conversões entre unidades de medida de <strong>comprimento</strong> (km, m, cm), <strong>massa</strong> (kg, g) e <strong>capacidade</strong> (L, mL).`, questions: [{ text: "Uma garrafa de refrigerante tem 2 litros. Isso equivale a quantos mililitros (mL)?", correctAnswer: "2000" }] }
                    ]
                }
            }
        },
        fundamental2: {
            label: "Fundamental II",
            grades: {
                ano6: {
                    label: "6º Ano",
                    topics: [
                        { title: "Múltiplos, Divisores, MDC e MMC", content: `<strong>MDC (Máximo Divisor Comum):</strong> O maior divisor entre dois ou mais números. Usado para dividir coisas em grupos iguais do maior tamanho possível. <br><strong>MMC (Mínimo Múltiplo Comum):</strong> O menor múltiplo comum (diferente de zero). Usado para encontrar quando eventos periódicos acontecerão juntos.`, questions: [{ text: "Qual o MMC entre 12 e 15?", correctAnswer: "60" }] },
                        { title: "Operações com Frações", content: `Aprendemos a <strong>somar, subtrair, multiplicar e dividir</strong> frações. Para somar e subtrair, precisamos de denominadores iguais (usando o MMC). Para multiplicar, multiplicamos os de cima e os de baixo. Para dividir, multiplicamos a primeira pelo inverso da segunda.`, questions: [{ text: "Quanto é 1/2 + 1/4?", correctAnswer: "3/4" }] },
                        { title: "Polígonos e Sólidos Geométricos", content: `Classificamos <strong>polígonos</strong> pelo número de lados (triângulos, quadriláteros, pentágonos...). Também estudamos <strong>sólidos geométricos</strong> como cubos, paralelepípedos, prismas e pirâmides, analisando suas faces, arestas e vértices.`, questions: [{ text: "Quantas faces tem um cubo?", correctAnswer: "6" }] }
                    ]
                },
                ano7: {
                    label: "7º Ano",
                    topics: [
                        { title: "Números Inteiros (Positivos e Negativos)", content: `Introdução aos números negativos. Operações de <strong>adição, subtração, multiplicação e divisão</strong> com números inteiros, entendendo a regra de sinais. Ex: <code>(-5) + 3 = -2</code> e <code>(-4) × (-2) = 8</code>.`, questions: [{ text: "Uma pessoa está no 5º andar, desce 8 andares. Em qual andar ela para?", correctAnswer: "-3" }] },
                        { title: "Equações de 1º Grau", content: `Uma equação é uma igualdade com um valor desconhecido (<strong>incógnita</strong>), geralmente 'x'. O objetivo é isolar o 'x'. Ex: Para resolver <code>2x + 10 = 20</code>, subtraímos 10 dos dois lados (<code>2x = 10</code>) e depois dividimos por 2 (<code>x = 5</code>).`, questions: [{ text: "Qual o valor de x na equação 4x - 5 = 15?", correctAnswer: "5" }] },
                        { title: "Ângulos e Triângulos", content: `Estudamos relações entre ângulos (complementares, suplementares, opostos pelo vértice). Aprendemos que a <strong>soma dos ângulos internos</strong> de qualquer triângulo é sempre <strong>180°</strong>.`, questions: [{ text: "Dois ângulos de um triângulo medem 50° e 70°. Qual a medida do terceiro ângulo?", correctAnswer: "60" }] }
                    ]
                },
                ano8: {
                    label: "8º Ano",
                    topics: [
                        { title: "Teorema de Pitágoras", content: `Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos: <code>a² + b² = c²</code>. Onde 'c' é a hipotenusa (lado oposto ao ângulo de 90°).`, questions: [{ text: "Os catetos de um triângulo retângulo medem 6 cm e 8 cm. Qual a medida da hipotenusa?", correctAnswer: "10" }] },
                        { title: "Produtos Notáveis e Fatoração", content: `<strong>Produtos Notáveis:</strong> Padrões de multiplicação como <code>(a+b)² = a² + 2ab + b²</code>. <br><strong>Fatoração</strong> é o processo inverso, de transformar uma soma em um produto. Ex: <code>x² - 9 = (x+3)(x-3)</code>.`, questions: [{ text: "Qual o resultado de (x - 4)²?", correctAnswer: "x^2 - 8x + 16" }] },
                        { title: "Sistemas de Equações de 1º Grau", content: `Usamos sistemas para encontrar a solução de duas ou mais equações ao mesmo tempo. Métodos comuns são o da <strong>substituição</strong> e o da <strong>adição</strong>.`, questions: [{ text: "Resolva o sistema: x + y = 10 e x - y = 4. Qual o valor de x?", correctAnswer: "7" }] }
                    ]
                },
                ano9: {
                    label: "9º Ano",
                    topics: [
                        { title: "Equação de 2º Grau e Fórmula de Bhaskara", content: `Uma equação de 2º grau tem a forma <code>ax² + bx + c = 0</code>. Usamos a <strong>Fórmula de Bhaskara</strong> para achar as raízes (soluções). Primeiro calculamos o Delta: <code>Δ = b² - 4ac</code>, e depois achamos 'x': <code>x = [-b ± √Δ] / 2a</code>.`, questions: [{ text: "Quais são as raízes da equação x² - 8x + 15 = 0? (digite a maior raiz)", correctAnswer: "5" }] },
                        { title: "Trigonometria no Triângulo Retângulo", content: `Relação entre ângulos e lados de um triângulo retângulo. As três razões principais são: <strong>Seno</strong> (cateto oposto / hipotenusa), <strong>Cosseno</strong> (cateto adjacente / hipotenusa) e <strong>Tangente</strong> (cateto oposto / cateto adjacente).`, questions: [{ text: "Em um triângulo retângulo, o cateto oposto a um ângulo de 30° mede 10 cm. Se o sen(30°)=0,5, qual o comprimento da hipotenusa?", correctAnswer: "20" }] },
                        { title: "Semelhança de Triângulos e Teorema de Tales", content: `Dois triângulos são <strong>semelhantes</strong> se seus ângulos correspondentes são iguais e seus lados correspondentes são proporcionais. O <strong>Teorema de Tales</strong> afirma que retas paralelas cortadas por transversais formam segmentos proporcionais.`, questions: [{ text: "Um prédio de 30m de altura projeta uma sombra de 10m. No mesmo instante, um poste ao lado projeta uma sombra de 2m. Qual a altura do poste?", correctAnswer: "6" }] }
                    ]
                }
            }
        },
        medio: {
            label: "Ensino Médio",
            grades: {
                serie1: {
                    label: "1ª Série",
                    topics: [
                        { title: "Funções: Afim e Quadrática", content: `<strong>Função Afim (1º Grau):</strong> <code>f(x) = ax + b</code>. O gráfico é uma <strong>reta</strong>. <br><strong>Função Quadrática (2º Grau):</strong> <code>f(x) = ax² + bx + c</code>. O gráfico é uma <strong>parábola</strong>. Estudamos seus zeros (raízes), vértice e concavidade.`, questions: [{ text: "Na função f(x) = 2x - 10, qual é o valor de x para o qual f(x) = 0?", correctAnswer: "5" }] },
                        { title: "Análise Combinatória", content: `Técnicas de contagem. <strong>Permutação (Pₙ = n!)</strong>: ordenar elementos. <strong>Arranjo (Aₙ,ₚ)</strong>: escolher 'p' de 'n' onde a ordem importa. <strong>Combinação (Cₙ,ₚ)</strong>: escolher 'p' de 'n' onde a ordem não importa.`, questions: [{ text: "De quantas formas 3 pessoas podem sentar em 5 cadeiras em fila? (Arranjo)", correctAnswer: "60" }] },
                        { title: "Probabilidade", content: `É o estudo das chances de um evento ocorrer. Calculada por <code>P = (casos favoráveis) / (casos possíveis)</code>.`, questions: [{ text: "Qual a probabilidade de tirar um número par ao lançar um dado de 6 faces?", correctAnswer: "1/2" }] }
                    ]
                },
                serie2: {
                    label: "2ª Série",
                    topics: [
                        { title: "Logaritmos", content: `Operação inversa da exponenciação. <code>log_b(a) = x</code> equivale a <code>bˣ = a</code>. Propriedades importantes: <code>log(M⋅N) = log(M)+log(N)</code>, <code>log(M/N) = log(M)-log(N)</code> e <code>log(Mᵏ) = k⋅log(M)</code>.`, questions: [{ text: "Qual é o valor de log₂(32)?", correctAnswer: "5" }] },
                        { title: "Progressões Aritmética (PA) e Geométrica (PG)", content: `<strong>PA:</strong> Sequência que soma uma razão (r). Termo Geral: <code>aₙ = a₁ + (n-1)r</code>. <br><strong>PG:</strong> Sequência que multiplica por uma razão (q). Termo Geral: <code>aₙ = a₁ ⋅ qⁿ⁻¹</code>.`, questions: [{ text: "Qual é o 20º termo da PA (3, 7, 11, ...)?", correctAnswer: "79" }] },
                        { title: "Matrizes, Determinantes e Sistemas Lineares", content: `<strong>Matrizes</strong> são tabelas de números. <strong>Determinante</strong> é um número associado a uma matriz quadrada. Usamos determinantes (Regra de Cramer) e escalonamento para resolver <strong>sistemas lineares</strong> com múltiplas variáveis.`, questions: [{ text: "Qual o determinante da matriz [[2, 3], [4, 5]]?", correctAnswer: "-2" }] }
                    ]
                },
                serie3: {
                    label: "3ª Série",
                    topics: [
                        { title: "Geometria Analítica: Ponto, Reta e Circunferência", content: `Estudo da geometria no plano cartesiano. Fórmulas chave: <strong>Distância entre pontos</strong>, <strong>Equação da Reta</strong> (<code>y = mx + q</code>) e <strong>Equação da Circunferência</strong> (<code>(x-a)² + (y-b)² = r²</code>).`, questions: [{ text: "Qual a distância entre os pontos A(1, 2) e B(4, 6)?", correctAnswer: "5" }] },
                        { title: "Números Complexos", content: `Surgiram para resolver raízes de números negativos. A base é a <strong>unidade imaginária (i)</strong>, onde <code>i² = -1</code>. Um número complexo 'z' tem a forma <code>z = a + bi</code> (forma algébrica) ou forma trigonométrica.`, questions: [{ text: "Qual o resultado de (3+4i) + (2-i)? (escreva como a+bi)", correctAnswer: "5+3i" }] },
                        { title: "Polinômios e Equações Algébricas", content: `Um <strong>polinômio</strong> é uma expressão da forma <code>P(x) = aₙxⁿ + ... + a₁x + a₀</code>. Estudamos suas raízes, o Teorema Fundamental da Álgebra e as Relações de Girard (soma e produto das raízes).`, questions: [{ text: "Se as raízes da equação x² - 7x + 10 = 0 são 2 e 5, qual a soma das raízes?", correctAnswer: "7" }] }
                    ]
                }
            }
        },
    };

    const flashcards = [
        { front: "Área do Retângulo", back: "<code>A = b ⋅ h</code>", explanation: "Área = base × altura." },
        { front: "Área do Círculo", back: "<code>A = π ⋅ r²</code>", explanation: "Área = pi × raio²." },
        { front: "Teorema de Pitágoras", back: "<code>a² + b² = c²</code>", explanation: "A soma dos quadrados dos catetos é igual ao quadrado da hipotenusa." },
        { front: "Fórmula de Bhaskara", back: "<code>x = [-b ± √Δ] / 2a</code>", explanation: "Usada para encontrar as raízes de uma equação do 2º grau (Δ = b²-4ac)." },
        { front: "Termo Geral de uma P.A.", back: "<code>aₙ = a₁ + (n-1)r</code>", explanation: "Calcula qualquer termo de uma Progressão Aritmética." },
        { front: "Termo Geral de uma P.G.", back: "<code>aₙ = a₁ ⋅ qⁿ⁻¹</code>", explanation: "Calcula qualquer termo de uma Progressão Geométrica." },
        { front: "Juros Compostos", back: "<code>M = C ⋅ (1+i)ᵗ</code>", explanation: "Calcula o montante (M) a partir do capital (C), taxa (i) e tempo (t)." },
        { front: "Análise Combinatória (Combinação)", back: "<code>C(n,p) = n! / [p!(n-p)!]</code>", explanation: "Fórmula da Combinação, usada quando a ordem não importa." },
        { front: "Distância entre Pontos", back: "<code>d = √[(x₂-x₁)² + (y₂-y₁)²]</code>", explanation: "Calcula a distância entre dois pontos no plano cartesiano." }
    ];

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
    const renderGradesNav = () => {
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
                                <div class="mt-2 flex items-center flex-wrap">
                                    <input type="text" class="question-input" placeholder="Sua resposta...">
                                    <button class="check-answer-btn" data-correct-answer="${q.correctAnswer}">Verificar</button>
                                    <span class="feedback-message hidden"></span>
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
            const container = button.parentElement;
            const input = container.querySelector('.question-input');
            const feedback = container.querySelector('.feedback-message');
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

    flashcardArea.addEventListener('click', e => {
        const flashcard = e.target.closest('.flashcard');
        if (flashcard) {
            flashcard.classList.toggle('is-flipped');
        }
    });

    // --- INICIALIZAÇÃO ---
    updateContent();
    renderFlashcards();
});