const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORTANTE: Carrega as variáveis de ambiente do ficheiro .env
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = 3000;

app.use(express.json());

// --- CONEXÃO COM O BANCO DE DADOS ---
// Agora, as variáveis vêm do ficheiro .env através de process.env
const dbURI = process.env.DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// O resto do ficheiro permanece exatamente o mesmo
mongoose.connect(dbURI)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
        seedDatabase();
    })
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// --- SCHEMAS E MODELS (Sem alterações) ---
// ... (cole aqui os seus schemas e models de User, Topic e Flashcard como estavam antes)
const userSchema = new mongoose.Schema({ email: { type: String, required: true, unique: true, lowercase: true }, password: { type: String, required: true }, progress: { type: Map, of: { correct: { type: Number, default: 0 }, total: { type: Number, default: 0 } } } }, { timestamps: true });
const User = mongoose.model('User', userSchema);
const topicSchema = new mongoose.Schema({ level: String, grade: String, gradeLabel: String, title: String, content: String, questions: [{ text: String, options: [String], correctAnswer: String }] });
const Topic = mongoose.model('Topic', topicSchema);
const flashcardSchema = new mongoose.Schema({ front: String, back: String, explanation: String });
const Flashcard = mongoose.model('Flashcard', flashcardSchema);


// --- SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND ---
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// --- ROTAS DE API (Sem alterações) ---
// ... (cole aqui as suas rotas de API /api/auth/register, /api/auth/login, /api/content)
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    if (!password || typeof password !== 'string' || password.length < 6) { return res.status(400).json({ status: 'error', error: 'A senha deve ter pelo menos 6 caracteres.' }); }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword });
        res.json({ status: 'ok' });
    } catch (error) {
        if (error.code === 11000) { return res.status(400).json({ status: 'error', error: 'Este e-mail já está em uso.' }); }
        res.status(500).json({ status: 'error', error: 'Erro no servidor.' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) { return res.status(401).json({ status: 'error', error: 'Usuário ou senha inválidos' }); }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
        return res.json({ status: 'ok', data: token });
    }
    res.status(401).json({ status: 'error', error: 'Usuário ou senha inválidos' });
});

app.get('/api/content', async (req, res) => {
    try {
        const topicsFromDB = await Topic.find({});
        const flashcardsFromDB = await Flashcard.find({});
        const mathContent = {};
        topicsFromDB.forEach(topic => {
            if (!mathContent[topic.level]) { mathContent[topic.level] = { label: topic.level === 'fundamental1' ? 'Fundamental I' : (topic.level === 'fundamental2' ? 'Fundamental II' : 'Ensino Médio'), grades: {} }; }
            if (!mathContent[topic.level].grades[topic.grade]) { mathContent[topic.level].grades[topic.grade] = { label: topic.gradeLabel, topics: [] }; }
            mathContent[topic.level].grades[topic.grade].topics.push({ _id: topic._id, title: topic.title, content: topic.content, questions: topic.questions });
        });
        res.json({ mathContent: mathContent, flashcards: flashcardsFromDB });
    } catch (error) {
        console.error("Erro ao buscar dados do banco de dados:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

// --- ROTA "APANHA-TUDO" ---
app.get('/*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// --- LÓGICA DO SEEDER (Sem alterações) ---
// ... (cole aqui toda a sua lógica de seeder e a função getFullDataObject)
async function seedDatabase() { try { const topicCount = await Topic.countDocuments(); if (topicCount === 0) { console.log('Nenhum tópico encontrado. Populando o banco de dados com novas questões...'); const { topicsToInsert, flashcards } = getInitialData(); await Topic.deleteMany({}); await Flashcard.deleteMany({}); await Topic.insertMany(topicsToInsert); await Flashcard.insertMany(flashcards); console.log('Banco de dados populado com sucesso!'); } else { console.log('O banco de dados já está populado.'); } } catch (error) { console.error('Erro ao popular o banco de dados:', error); } }
function getInitialData() { const { mathContent, flashcards } = getFullDataObject(); const topicsToInsert = []; for (const levelKey in mathContent) { const level = mathContent[levelKey]; for (const gradeKey in level.grades) { const grade = level.grades[gradeKey]; grade.topics.forEach(topic => { topicsToInsert.push({ level: levelKey, grade: gradeKey, gradeLabel: grade.label, title: topic.title, content: topic.content, questions: topic.questions }); }); } } return { topicsToInsert, flashcards }; }
function getFullDataObject() {
    const mathContent = {
        fundamental1: {
            label: "Fundamental I",
            grades: {
                ano1: {
                    label: "1º Ano",
                    topics: [
                        { title: "Números Naturais e Contagem", content: `Nesta fase, o foco é a <strong>alfabetização matemática</strong>...`, questions: [{ text: "Uma cesta tem 9 laranjas e outra tem 6. Qual o número na cesta que tem mais?", options: ["6", "9", "Ambas", "Nenhuma"], correctAnswer: "9" }] },
                        { title: "Introdução à Adição e Subtração", content: `As primeiras operações matemáticas estão ligadas a ações do dia a dia...`, questions: [{ text: "Havia 8 pássaros em uma árvore. Chegaram mais 4. Quantos pássaros há agora?", options: ["10", "11", "12", "4"], correctAnswer: "12" }] },
                        { title: "Figuras Geométricas Planas", content: `O objetivo é reconhecer formas no mundo ao nosso redor...`, questions: [{ text: "A roda de um carro lembra qual figura geométrica?", options: ["Quadrado", "Triângulo", "Círculo", "Retângulo"], correctAnswer: "Círculo" }] },
                        { title: "Medidas (Noções Iniciais)", content: `Aqui, desenvolvemos a capacidade de comparar objetos...`, questions: [{ text: "O que é mais pesado: uma pena ou um tijolo?", options: ["A pena", "O tijolo", "Têm o mesmo peso", "Depende do tamanho"], correctAnswer: "O tijolo" }] }
                    ]
                },
                ano2: {
                    label: "2º Ano",
                    topics: [
                        { title: "Sistema de Numeração Decimal (Centena)", content: `Aprofundamos a compreensão de que nosso sistema numérico é posicional...`, questions: [{ text: "No número 681, qual algarismo está na casa das dezenas?", options: ["6", "8", "1", "Nenhum"], correctAnswer: "8" }] },
                        { title: "Introdução à Multiplicação e Divisão", content: `Avançamos das ideias de juntar e tirar para operações mais complexas...`, questions: [{ text: "Se um caderno custa R$ 8, quanto custarão 4 cadernos?", options: ["R$ 12", "R$ 24", "R$ 32", "R$ 36"], correctAnswer: "32" }] },
                        { title: "Sistema Monetário Brasileiro", content: `O foco é o uso prático do dinheiro...`, questions: [{ text: "Você comprou um suco de R$ 4 e pagou com uma nota de R$ 10. Quanto recebeu de troco?", options: ["R$ 5", "R$ 6", "R$ 7", "R$ 14"], correctAnswer: "6" }] },
                        { title: "Medidas de Tempo (Calendário e Hora)", content: `Aprofundamos a medição do tempo...`, questions: [{ text: "Um ano tem quantos meses?", options: ["10", "11", "12", "24"], correctAnswer: "12" }] }
                    ]
                },
                ano3: {
                    label: "3º Ano",
                    topics: [
                        { title: "Frações (Ideia de Parte-Todo)", content: `Uma fração representa uma ou mais partes de algo que foi dividido...`, questions: [{ text: "Uma barra de chocolate tem 10 pedaços. Se você comeu 4, que fração representa a parte que você comeu?", options: ["4/6", "6/10", "4/10", "10/4"], correctAnswer: "4/10" }] },
                        { title: "Medidas de Perímetro e Área (Malha Quadriculada)", content: `Introduzimos formalmente dois conceitos importantes em geometria...`, questions: [{ text: "Um quadrado tem lado de 5 cm. Qual é o seu perímetro?", options: ["10 cm", "15 cm", "20 cm", "25 cm"], correctAnswer: "20" }] },
                        { title: "Tabelas e Gráficos Simples", content: `Aprender a organizar e interpretar dados é uma habilidade crucial...`, questions: [{ text: "Em um gráfico, a coluna de 'gatos' vai até o número 10 e a de 'cachorros' até o 15. Qual animal tem a maior quantidade?", options: ["Gatos", "Cachorros", "Ambos", "Não sei"], correctAnswer: "Cachorros" }] }
                    ]
                },
                ano4: {
                    label: "4º Ano",
                    topics: [
                        { title: "Números Decimais", content: `Números decimais são usados para representar quantidades que não são inteiras...`, questions: [{ text: "Quanto é 12,5 + 3,45?", options: ["15,95", "15,50", "4,70", "16,00"], correctAnswer: "15.95" }] },
                        { title: "Cálculo de Área (Quadrados e Retângulos)", content: `Formalizamos o cálculo de área sem a necessidade da malha quadriculada...`, questions: [{ text: "Qual a área de um terreno retangular que mede 20 metros de comprimento por 10 metros de largura?", options: ["30 m²", "60 m²", "100 m²", "200 m²"], correctAnswer: "200" }] },
                        { title: "Ângulos (Reto, Agudo e Obtuso)", content: `Um ângulo é a 'abertura' entre duas retas que se encontram...`, questions: [{ text: "O ângulo formado pelos ponteiros de um relógio às 3 horas é reto, agudo ou obtuso?", options: ["Agudo", "Obtuso", "Reto", "Nenhuma das anteriores"], correctAnswer: "Reto" }] }
                    ]
                },
                ano5: {
                    label: "5º Ano",
                    topics: [
                        { title: "Porcentagem", content: `A porcentagem é uma forma de representar uma parte de um todo...`, questions: [{ text: "Uma TV de R$ 2000 teve um desconto de 10%. Qual o valor do desconto em reais?", options: ["R$ 20", "R$ 100", "R$ 1800", "R$ 200"], correctAnswer: "200" }] },
                        { title: "Volume de Blocos Retangulares", content: `O volume é a medida do espaço tridimensional que um objeto ocupa...`, questions: [{ text: "Uma caixa de sapatos mede 30 cm de comprimento, 20 cm de largura e 10 cm de altura. Qual o seu volume?", options: ["60 cm³", "600 cm³", "6000 cm³", "60000 cm³"], correctAnswer: "6000" }] },
                        { title: "Medidas de Grandeza", content: `Neste ponto, focamos em resolver problemas que envolvem diferentes grandezas...`, questions: [{ text: "Uma garrafa de refrigerante tem 2 litros. Isso equivale a quantos mililitros (mL)?", options: ["20 mL", "200 mL", "2000 mL", "20000 mL"], correctAnswer: "2000" }] }
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
                        { title: "Múltiplos, Divisores, MDC e MMC", content: `...`, questions: [{ text: "Qual o MMC entre 12 e 15?", options: ["3", "30", "60", "180"], correctAnswer: "60" }] },
                        { title: "Operações com Frações", content: `...`, questions: [{ text: "Quanto é 1/2 + 1/4?", options: ["1/6", "2/6", "3/4", "2/4"], correctAnswer: "3/4" }] },
                        { title: "Polígonos e Sólidos Geométricos", content: `...`, questions: [{ text: "Quantas faces tem um cubo?", options: ["4", "6", "8", "12"], correctAnswer: "6" }] }
                    ]
                },
                ano7: {
                    label: "7º Ano",
                    topics: [
                        { title: "Números Inteiros (Positivos e Negativos)", content: `...`, questions: [{ text: "Uma pessoa está no 5º andar, desce 8 andares. Em qual andar ela para?", options: ["-2", "-3", "3", "13"], correctAnswer: "-3" }] },
                        { title: "Equações de 1º Grau", content: `...`, questions: [{ text: "Qual o valor de x na equação 4x - 5 = 15?", options: ["4", "5", "10", "20"], correctAnswer: "5" }] },
                        { title: "Ângulos e Triângulos", content: `...`, questions: [{ text: "Dois ângulos de um triângulo medem 50° e 70°. Qual a medida do terceiro ângulo?", options: ["50°", "60°", "70°", "80°"], correctAnswer: "60" }] }
                    ]
                },
                ano8: {
                    label: "8º Ano",
                    topics: [
                        { title: "Teorema de Pitágoras", content: `...`, questions: [{ text: "Os catetos de um triângulo retângulo medem 6 cm e 8 cm. Qual a medida da hipotenusa?", options: ["10 cm", "12 cm", "14 cm", "24 cm"], correctAnswer: "10" }] },
                        { title: "Produtos Notáveis e Fatoração", content: `...`, questions: [{ text: "Qual o resultado de (x - 4)²?", options: ["x² - 16", "x² + 16", "x² - 8x + 16", "x² + 8x + 16"], correctAnswer: "x^2 - 8x + 16" }] },
                        { title: "Sistemas de Equações de 1º Grau", content: `...`, questions: [{ text: "Resolva o sistema: x + y = 10 e x - y = 4. Qual o valor de x?", options: ["3", "5", "6", "7"], correctAnswer: "7" }] }
                    ]
                },
                ano9: {
                    label: "9º Ano",
                    topics: [
                        { title: "Equação de 2º Grau e Fórmula de Bhaskara", content: `...`, questions: [{ text: "Quais são as raízes da equação x² - 8x + 15 = 0? (digite a maior raiz)", options: ["3", "5", "8", "15"], correctAnswer: "5" }] },
                        { title: "Trigonometria no Triângulo Retângulo", content: `...`, questions: [{ text: "Em um triângulo retângulo, o cateto oposto a um ângulo de 30° mede 10 cm. Se o sen(30°)=0,5, qual o comprimento da hipotenusa?", options: ["5 cm", "10 cm", "15 cm", "20 cm"], correctAnswer: "20" }] },
                        { title: "Semelhança de Triângulos e Teorema de Tales", content: `...`, questions: [{ text: "Um prédio de 30m de altura projeta uma sombra de 10m. No mesmo instante, um poste ao lado projeta uma sombra de 2m. Qual a altura do poste?", options: ["4m", "5m", "6m", "8m"], correctAnswer: "6" }] }
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
                        { title: "Funções: Afim e Quadrática", content: `...`, questions: [{ text: "Na função f(x) = 2x - 10, qual é o valor de x para o qual f(x) = 0?", options: ["-10", "-5", "5", "10"], correctAnswer: "5" }] },
                        { title: "Análise Combinatória", content: `...`, questions: [{ text: "De quantas formas 3 pessoas podem sentar em 5 cadeiras em fila? (Arranjo)", options: ["15", "60", "120", "125"], correctAnswer: "60" }] },
                        { title: "Probabilidade", content: `...`, questions: [{ text: "Qual a probabilidade de tirar um número par ao lançar um dado de 6 faces?", options: ["1/6", "1/3", "1/2", "2/3"], correctAnswer: "1/2" }] }
                    ]
                },
                serie2: {
                    label: "2ª Série",
                    topics: [
                        { title: "Logaritmos", content: `...`, questions: [{ text: "Qual é o valor de log₂(32)?", options: ["3", "4", "5", "8"], correctAnswer: "5" }] },
                        { title: "Progressões Aritmética (PA) e Geométrica (PG)", content: `...`, questions: [{ text: "Qual é o 20º termo da PA (3, 7, 11, ...)?", options: ["75", "79", "83", "87"], correctAnswer: "79" }] },
                        { title: "Matrizes, Determinantes e Sistemas Lineares", content: `...`, questions: [{ text: "Qual o determinante da matriz [[2, 3], [4, 5]]?", options: ["2", "-2", "22", "-22"], correctAnswer: "-2" }] }
                    ]
                },
                serie3: {
                    label: "3ª Série",
                    topics: [
                        { title: "Geometria Analítica: Ponto, Reta e Circunferência", content: `...`, questions: [{ text: "Qual a distância entre os pontos A(1, 2) e B(4, 6)?", options: ["3", "4", "5", "7"], correctAnswer: "5" }] },
                        { title: "Números Complexos", content: `...`, questions: [{ text: "Qual o resultado de (3+4i) + (2-i)?", options: ["5+5i", "5+3i", "1+3i", "1+5i"], correctAnswer: "5+3i" }] },
                        { title: "Polinômios e Equações Algébricas", content: `...`, questions: [{ text: "Se as raízes da equação x² - 7x + 10 = 0 são 2 e 5, qual a soma das raízes?", options: ["-7", "5", "7", "10"], correctAnswer: "7" }] }
                    ]
                }
            }
        }
    };
    const flashcards = [
        { front: "Área do Retângulo", back: "<code>A = b ⋅ h</code>", explanation: "Área = base × altura." },
        { front: "Área do Triângulo", back: "<code>A = (b ⋅ h) / 2</code>", explanation: "Área = (base × altura) / 2." },
        { front: "Área do Círculo", back: "<code>A = π ⋅ r²</code>", explanation: "Área = pi × raio²." },
        { front: "Comprimento da Circunferência", back: "<code>C = 2 ⋅ π ⋅ r</code>", explanation: "Comprimento = 2 × pi × raio." },
        { front: "Teorema de Pitágoras", back: "<code>a² + b² = c²</code>", explanation: "A soma dos quadrados dos catetos é igual ao quadrado da hipotenusa." },
        { front: "Fórmula de Bhaskara", back: "<code>x = [-b ± √Δ] / 2a</code>", explanation: "Usada para encontrar as raízes de uma equação do 2º grau (Δ = b²-4ac)." },
        { front: "Seno", back: "<code>sen(α) = CO / H</code>", explanation: "Seno = Cateto Oposto / Hipotenusa." },
        { front: "Cosseno", back: "<code>cos(α) = CA / H</code>", explanation: "Cosseno = Cateto Adjacente / Hipotenusa." },
        { front: "Tangente", back: "<code>tan(α) = CO / CA</code>", explanation: "Tangente = Cateto Oposto / Cateto Adjacente." },
        { front: "Lei dos Senos", back: "<code>a/sen(A) = b/sen(B)</code>", explanation: "A razão entre um lado e o seno do ângulo oposto é constante." },
        { front: "Lei dos Cossenos", back: "<code>a² = b² + c² - 2bc⋅cos(A)</code>", explanation: "Relaciona um lado com os outros dois e o ângulo entre eles." },
        { front: "Termo Geral de uma P.A.", back: "<code>aₙ = a₁ + (n-1)r</code>", explanation: "Calcula qualquer termo de uma Progressão Aritmética." },
        { front: "Soma de uma P.A.", back: "<code>Sₙ = [(a₁ + aₙ)n] / 2</code>", explanation: "Calcula a soma dos 'n' primeiros termos de uma P.A." },
        { front: "Termo Geral de uma P.G.", back: "<code>aₙ = a₁ ⋅ qⁿ⁻¹</code>", explanation: "Calcula qualquer termo de uma Progressão Geométrica." },
        { front: "Juros Compostos", back: "<code>M = C ⋅ (1+i)ᵗ</code>", explanation: "Calcula o montante (M) a partir do capital (C), taxa (i) e tempo (t)." },
        { front: "Análise Combinatória (Combinação)", back: "<code>C(n,p) = n! / [p!(n-p)!]</code>", explanation: "Fórmula da Combinação, usada quando a ordem não importa." },
        { front: "Análise Combinatória (Arranjo)", back: "<code>A(n,p) = n! / (n-p)!</code>", explanation: "Fórmula do Arranjo, usada quando a ordem importa." },
        { front: "Distância entre Pontos", back: "<code>d = √[(x₂-x₁)² + (y₂-y₁)²]</code>", explanation: "Calcula a distância entre dois pontos no plano cartesiano." },
        { front: "Equação da Reta (Reduzida)", back: "<code>y = mx + q</code>", explanation: "'m' é o coeficiente angular e 'q' é o coeficiente linear." },
        { front: "Equação da Circunferência", back: "<code>(x-a)² + (y-b)² = r²</code>", explanation: "Define uma circunferência com centro C(a, b) e raio 'r'." },
        { front: "Volume do Cubo", back: "<code>V = a³</code>", explanation: "Volume = aresta elevada ao cubo." },
        { front: "Volume do Paralelepípedo", back: "<code>V = c ⋅ l ⋅ h</code>", explanation: "Volume = comprimento × largura × altura." },
        { front: "Volume do Cilindro", back: "<code>V = π ⋅ r² ⋅ h</code>", explanation: "Volume = Área da base (círculo) × altura." },
        { front: "Volume da Esfera", back: "<code>V = (4/3) ⋅ π ⋅ r³</code>", explanation: "Volume = (4/3) × pi × raio ao cubo." }
    ];

    return { mathContent, flashcards };
}