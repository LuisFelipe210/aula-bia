const express = require('express');
const router = express.Router();

const ENEM_TOPIC_ID = "60a9c8f5f1b1c34a8e2f4d6d";
const ENEM_API_BASE_URL = "https://api.enem.dev/v1/exams";

// Importa fetch dependendo da versão do Node.js
let fetch;
try {
    // Node.js 18+ tem fetch nativo
    fetch = globalThis.fetch;
} catch (e) {
    // Node.js < 18 precisa do node-fetch
    fetch = require('node-fetch');
}

/**
 * Busca questões de matemática do ENEM usando a API oficial do ENEM.dev
 * @param {number} year - Ano do ENEM (ex: 2020)
 * @param {number} limit - Número máximo de questões a retornar
 * @returns {Array} - Array de questões formatadas
 */
async function fetchEnemMathQuestions(year = 2020, limit = 10) {
    try {
        console.log(`Buscando questões do ENEM ${year} na API...`);

        // Faz requisição à API do ENEM.dev
        const url = `${ENEM_API_BASE_URL}/${year}`;
        console.log(`URL da requisição: ${url}`);

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API ENEM retornou status ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Total de questões recebidas: ${data.questions?.length || 0}`);

        // Valida estrutura da resposta
        if (!data || !Array.isArray(data.questions)) {
            throw new Error("Formato de resposta inválido da API ENEM.");
        }

        // Filtra apenas questões de matemática e limita quantidade
        const mathQuestions = data.questions
            .filter(q => {
                // Verifica se discipline existe e é matemática
                const discipline = q.discipline?.toLowerCase() || '';
                return discipline === 'matematica' || discipline === 'matemática';
            })
            .slice(0, limit);

        console.log(`Questões de matemática encontradas: ${mathQuestions.length}`);

        if (mathQuestions.length === 0) {
            console.warn(`Nenhuma questão de matemática encontrada para o ano ${year}`);
            return [];
        }

        // Formata questões para o padrão do seu sistema
        const formattedQuestions = mathQuestions.map((q, index) => {
            try {
                // Log da estrutura da questão para debug
                console.log(`\nQuestão ${index + 1}:`, JSON.stringify(q, null, 2));

                // Monta as opções com letra + texto
                const alternatives = q.alternatives || [];
                console.log(`Alternativas encontradas: ${alternatives.length}`);

                const options = alternatives.map(alt => {
                    // Tenta diferentes formatos possíveis
                    const letter = alt.letter || alt.option || '';
                    const text = alt.text || alt.description || alt.content || '';
                    return `${letter}) ${text}`.trim();
                });

                // Identifica a resposta correta
                const correctAlt = alternatives.find(alt =>
                    alt.isCorrect === true ||
                    alt.correct === true ||
                    alt.is_correct === true
                );

                const correctAnswer = correctAlt
                    ? `${correctAlt.letter || correctAlt.option || ''}) ${correctAlt.text || correctAlt.description || ''}`.trim()
                    : (options.length > 0 ? options[0] : '');

                console.log(`Resposta correta: ${correctAnswer}`);

                // Monta o conteúdo HTML completo
                let fullContent = `<p><strong>${q.title || q.question || 'Questão ENEM'}</strong></p>`;

                // Adiciona contexto/enunciado se existir
                const context = q.context || q.text || q.statement || '';
                if (context) {
                    fullContent += `<p class="mb-4">${context}</p>`;
                }

                // Adiciona imagens se existirem
                const files = q.files || q.images || [];
                if (Array.isArray(files) && files.length > 0) {
                    files.forEach(file => {
                        const url = typeof file === 'string' ? file : (file.url || file.src);
                        if (url) {
                            fullContent += `<img src="${url}" alt="Imagem da questão" class="my-4 rounded-md max-w-full" />`;
                        }
                    });
                }

                // Adiciona introdução das alternativas se existir
                const intro = q.alternativesIntroduction || q.alternatives_introduction || '';
                if (intro) {
                    fullContent += `<p class="mt-4 font-medium">${intro}</p>`;
                }

                // Verifica se tem alternativas válidas
                if (options.length === 0 || options.every(o => o.length <= 2)) {
                    console.warn(`⚠️ Questão ${index + 1} sem alternativas válidas. Pulando...`);
                    return null;
                }

                return {
                    _id: ENEM_TOPIC_ID,
                    title: `Questão ${q.index || index + 1} | ENEM ${year} - Matemática`,
                    content: fullContent,
                    questions: [
                        {
                            text: intro || "Selecione a alternativa correta:",
                            options: options,
                            correctAnswer: correctAnswer
                        }
                    ]
                };
            } catch (error) {
                console.error(`❌ Erro ao formatar questão ${index + 1}:`, error);
                console.error('Dados da questão:', q);
                return null;
            }
        }).filter(q => q !== null); // Remove questões que falharam na formatação

        console.log(`Questões formatadas com sucesso: ${formattedQuestions.length}`);
        return formattedQuestions;

    } catch (error) {
        console.error("Erro ao buscar questões do ENEM:", error.message);
        console.error("Stack trace:", error.stack);
        throw error;
    }
}

/**
 * Rota GET /api/enem/questions
 * Query params:
 *  - year: ano do ENEM (padrão: 2023)
 *  - limit: número máximo de questões (padrão: 10)
 */
router.get('/questions', async (req, res) => {
    try {
        const year = parseInt(req.query.year) || 2023;
        const limit = parseInt(req.query.limit) || 10;

        // Valida o ano (ENEM começou em 1998)
        const currentYear = new Date().getFullYear();
        if (year < 1998 || year > currentYear) {
            return res.status(400).json({
                status: 'error',
                message: `Ano inválido. Use um ano entre 1998 e ${currentYear}.`
            });
        }

        // Valida o limite
        if (limit < 1 || limit > 100) {
            return res.status(400).json({
                status: 'error',
                message: "Limite deve estar entre 1 e 100 questões."
            });
        }

        console.log(`Requisição recebida: ano=${year}, limite=${limit}`);

        const questions = await fetchEnemMathQuestions(year, limit);

        console.log(`Retornando ${questions.length} questões`);
        res.json(questions);

    } catch (error) {
        console.error("Erro na rota /api/enem/questions:", error);

        res.status(500).json({
            status: 'error',
            message: "Erro ao carregar questões do ENEM (Matemática).",
            detail: error.message,
            hint: "Verifique se a API do ENEM.dev está disponível e se há conexão com a internet."
        });
    }
});

/**
 * Rota GET /api/enem/years
 * Retorna lista de anos disponíveis
 */
router.get('/years', async (req, res) => {
    const currentYear = new Date().getFullYear();
    const years = [];

    // ENEM começou em 1998
    for (let year = currentYear; year >= 1998; year--) {
        years.push(year);
    }

    res.json({ years });
});

/**
 * Rota GET /api/enem/test
 * Testa a conexão com a API do ENEM.dev
 */
router.get('/test', async (req, res) => {
    try {
        const testYear = 2023;
        const url = `${ENEM_API_BASE_URL}/${testYear}`;

        console.log(`Testando conexão com: ${url}`);
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(500).json({
                status: 'error',
                message: `API retornou status ${response.status}`,
                url: url
            });
        }

        const data = await response.json();
        const mathQuestions = data.questions?.filter(q =>
            q.discipline?.toLowerCase() === 'matematica' ||
            q.discipline?.toLowerCase() === 'matemática'
        ) || [];

        // Pega a primeira questão de matemática como exemplo
        const sampleQuestion = mathQuestions[0] || null;

        res.json({
            status: 'ok',
            message: 'Conexão com API ENEM.dev funcionando!',
            url: url,
            totalQuestions: data.questions?.length || 0,
            mathQuestions: mathQuestions.length,
            sampleQuestion: sampleQuestion ? {
                title: sampleQuestion.title,
                index: sampleQuestion.index,
                hasAlternatives: !!sampleQuestion.alternatives,
                alternativesCount: sampleQuestion.alternatives?.length || 0,
                hasContext: !!sampleQuestion.context,
                hasFiles: !!(sampleQuestion.files && sampleQuestion.files.length > 0),
                keys: Object.keys(sampleQuestion)
            } : null
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Falha ao conectar com API ENEM.dev',
            detail: error.message
        });
    }
});

/**
 * Rota GET /api/enem/debug/:year
 * Retorna a estrutura completa de uma questão de matemática para debug
 */
router.get('/debug/:year', async (req, res) => {
    try {
        const year = parseInt(req.params.year) || 2023;
        const url = `${ENEM_API_BASE_URL}/${year}`;

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(500).json({
                status: 'error',
                message: `API retornou status ${response.status}`
            });
        }

        const data = await response.json();
        const mathQuestions = data.questions?.filter(q =>
            q.discipline?.toLowerCase() === 'matematica' ||
            q.discipline?.toLowerCase() === 'matemática'
        ) || [];

        // Retorna a primeira questão completa
        res.json({
            status: 'ok',
            year: year,
            totalMathQuestions: mathQuestions.length,
            firstQuestion: mathQuestions[0] || null
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro ao buscar questão de debug',
            detail: error.message
        });
    }
});

module.exports = router;