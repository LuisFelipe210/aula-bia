function getFullDataObject() {
    const mathContent = {
        fundamental1: {
            label: "Fundamental I",
            grades: {
                ano1: {
                    label: "1º Ano",
                    topics: [
                        { title: "Números Naturais e Contagem", content: `...`, questions: [{ text: "Uma cesta tem 9 laranjas e outra tem 6. Qual o número na cesta que tem mais?", options: ["6", "9", "15", "Ambas", "Nenhuma"], correctAnswer: "9" }] },
                        { title: "Introdução à Adição e Subtração", content: `...`, questions: [{ text: "Havia 8 pássaros em uma árvore. Chegaram mais 4. Quantos pássaros há agora?", options: ["10", "11", "12", "4", "2"], correctAnswer: "12" }] },
                        { title: "Figuras Geométricas Planas", content: `...`, questions: [{ text: "A roda de um carro lembra qual figura geométrica?", options: ["Quadrado", "Triângulo", "Círculo", "Retângulo", "Losango"], correctAnswer: "Círculo" }] },
                        { title: "Medidas (Noções Iniciais)", content: `...`, questions: [{ text: "O que é mais pesado: uma pena ou um tijolo?", options: ["A pena", "O tijolo", "Têm o mesmo peso", "Depende do tamanho", "Nenhum dos dois"], correctAnswer: "O tijolo" }] }
                    ]
                },
                ano2: {
                    label: "2º Ano",
                    topics: [
                        { title: "Sistema de Numeração Decimal (Centena)", content: `...`, questions: [{ text: "No número 681, qual algarismo está na casa das dezenas?", options: ["6", "8", "1", "Nenhum", "O número 80"], correctAnswer: "8" }] },
                        { title: "Introdução à Multiplicação e Divisão", content: `...`, questions: [{ text: "Se um caderno custa R$ 8, quanto custarão 4 cadernos?", options: ["R$ 12", "R$ 24", "R$ 32", "R$ 36", "R$ 40"], correctAnswer: "R$ 32" }] }, // CORRIGIDO
                        { title: "Sistema Monetário Brasileiro", content: `...`, questions: [{ text: "Você comprou um suco de R$ 4 e pagou com uma nota de R$ 10. Quanto recebeu de troco?", options: ["R$ 5", "R$ 6", "R$ 7", "R$ 14", "R$ 4"], correctAnswer: "R$ 6" }] }, // CORRIGIDO
                        { title: "Medidas de Tempo (Calendário e Hora)", content: `...`, questions: [{ text: "Um ano tem quantos meses?", options: ["10", "11", "12", "13", "24"], correctAnswer: "12" }] }
                    ]
                },
                ano3: {
                    label: "3º Ano",
                    topics: [
                        { title: "Frações (Ideia de Parte-Todo)", content: `...`, questions: [{ text: "Uma barra de chocolate tem 10 pedaços. Se você comeu 4, que fração representa a parte que você comeu?", options: ["4/6", "6/10", "4/10", "10/4", "1/4"], correctAnswer: "4/10" }] },
                        { title: "Medidas de Perímetro e Área (Malha Quadriculada)", content: `...`, questions: [{ text: "Um quadrado tem lado de 5 cm. Qual é o seu perímetro?", options: ["10 cm", "15 cm", "20 cm", "25 cm", "30 cm"], correctAnswer: "20 cm" }] }, // CORRIGIDO
                        { title: "Tabelas e Gráficos Simples", content: `...`, questions: [{ text: "Em um gráfico, a coluna de 'gatos' vai até o número 10 e a de 'cachorros' até o 15. Qual animal tem a maior quantidade?", options: ["Gatos", "Cachorros", "Ambos têm 25", "Não sei", "Peixes"], correctAnswer: "Cachorros" }] }
                    ]
                },
                ano4: {
                    label: "4º Ano",
                    topics: [
                        { title: "Números Decimais", content: `...`, questions: [{ text: "Quanto é 12,5 + 3,45?", options: ["15,95", "15,50", "4,70", "16,00", "159,5"], correctAnswer: "15.95" }] },
                        { title: "Cálculo de Área (Quadrados e Retângulos)", content: `...`, questions: [{ text: "Qual a área de um terreno retangular que mede 20 metros de comprimento por 10 metros de largura?", options: ["30 m²", "60 m²", "100 m²", "200 m²", "2000 m²"], correctAnswer: "200 m²" }] }, // CORRIGIDO
                        { title: "Ângulos (Reto, Agudo e Obtuso)", content: `...`, questions: [{ text: "O ângulo formado pelos ponteiros de um relógio às 3 horas é reto, agudo ou obtuso?", options: ["Agudo", "Obtuso", "Reto", "Raso", "Nenhuma das anteriores"], correctAnswer: "Reto" }] }
                    ]
                },
                ano5: {
                    label: "5º Ano",
                    topics: [
                        { title: "Porcentagem", content: `...`, questions: [{ text: "Uma TV de R$ 2000 teve um desconto de 10%. Qual o valor do desconto em reais?", options: ["R$ 20", "R$ 100", "R$ 1800", "R$ 200", "R$ 1990"], correctAnswer: "R$ 200" }] }, // CORRIGIDO
                        { title: "Volume de Blocos Retangulares", content: `...`, questions: [{ text: "Uma caixa de sapatos mede 30 cm de comprimento, 20 cm de largura e 10 cm de altura. Qual o seu volume?", options: ["60 cm³", "600 cm³", "6000 cm³", "60000 cm³", "6000 m³"], correctAnswer: "6000 cm³" }] }, // CORRIGIDO
                        { title: "Medidas de Grandeza", content: `...`, questions: [{ text: "Uma garrafa de refrigerante tem 2 litros. Isso equivale a quantos mililitros (mL)?", options: ["20 mL", "200 mL", "2000 mL", "20000 mL", "0.2 mL"], correctAnswer: "2000 mL" }] } // CORRIGIDO
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
                        { title: "Múltiplos, Divisores, MDC e MMC", content: `...`, questions: [{ text: "Qual o MMC entre 12 e 15?", options: ["3", "30", "60", "120", "180"], correctAnswer: "60" }] },
                        { title: "Operações com Frações", content: `...`, questions: [{ text: "Quanto é 1/2 + 1/4?", options: ["1/6", "2/6", "3/4", "2/4", "1/8"], correctAnswer: "3/4" }] },
                        { title: "Polígonos e Sólidos Geométricos", content: `...`, questions: [{ text: "Quantas faces tem um cubo?", options: ["4", "6", "8", "10", "12"], correctAnswer: "6" }] }
                    ]
                },
                ano7: {
                    label: "7º Ano",
                    topics: [
                        { title: "Números Inteiros (Positivos e Negativos)", content: `...`, questions: [{ text: "Uma pessoa está no 5º andar, desce 8 andares. Em qual andar ela para?", options: ["-2", "-3", "3", "13", "Térreo"], correctAnswer: "-3" }] },
                        { title: "Equações de 1º Grau", content: `...`, questions: [{ text: "Qual o valor de x na equação 4x - 5 = 15?", options: ["4", "5", "10", "15", "20"], correctAnswer: "5" }] },
                        { title: "Ângulos e Triângulos", content: `...`, questions: [{ text: "Dois ângulos de um triângulo medem 50° e 70°. Qual a medida do terceiro ângulo?", options: ["40°", "50°", "60°", "70°", "80°"], correctAnswer: "60°" }] } // CORRIGIDO
                    ]
                },
                ano8: {
                    label: "8º Ano",
                    topics: [
                        { title: "Teorema de Pitágoras", content: `...`, questions: [{ text: "Os catetos de um triângulo retângulo medem 6 cm e 8 cm. Qual a medida da hipotenusa?", options: ["10 cm", "12 cm", "14 cm", "20 cm", "100 cm"], correctAnswer: "10 cm" }] }, // CORRIGIDO
                        { title: "Produtos Notáveis e Fatoração", content: `...`, questions: [{ text: "Qual o resultado de (x - 4)²?", options: ["x² - 16", "x² + 16", "x² - 8x - 16", "x² - 8x + 16", "x² + 8x + 16"], correctAnswer: "x² - 8x + 16" }] },
                        { title: "Sistemas de Equações de 1º Grau", content: `...`, questions: [{ text: "Resolva o sistema: x + y = 10 e x - y = 4. Qual o valor de x?", options: ["3", "5", "6", "7", "14"], correctAnswer: "7" }] }
                    ]
                },
                ano9: {
                    label: "9º Ano",
                    topics: [
                        { title: "Equação de 2º Grau e Fórmula de Bhaskara", content: `...`, questions: [{ text: "Qual é a maior raiz da equação x² - 8x + 15 = 0?", options: ["-3", "-5", "3", "5", "8"], correctAnswer: "5" }] },
                        { title: "Trigonometria no Triângulo Retângulo", content: `...`, questions: [{ text: "Em um triângulo retângulo, o cateto oposto a um ângulo de 30° mede 10 cm. Se o sen(30°)=0,5, qual o comprimento da hipotenusa?", options: ["5 cm", "10 cm", "15 cm", "20 cm", "25 cm"], correctAnswer: "20 cm" }] }, // CORRIGIDO
                        { title: "Semelhança de Triângulos e Teorema de Tales", content: `...`, questions: [{ text: "Um prédio de 30m de altura projeta uma sombra de 10m. No mesmo instante, um poste ao lado projeta uma sombra de 2m. Qual a altura do poste?", options: ["4m", "5m", "6m", "8m", "15m"], correctAnswer: "6m" }] } // CORRIGIDO
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
                        { title: "Funções: Afim e Quadrática", content: `...`, questions: [{ text: "Na função f(x) = 2x - 10, qual é o valor de x para o qual f(x) = 0?", options: ["-10", "-5", "2", "5", "10"], correctAnswer: "5" }] },
                        { title: "Análise Combinatória", content: `...`, questions: [{ text: "De quantas formas 3 pessoas podem sentar em 5 cadeiras em fila? (Arranjo)", options: ["15", "20", "60", "120", "125"], correctAnswer: "60" }] },
                        { title: "Probabilidade", content: `...`, questions: [{ text: "Qual a probabilidade de tirar um número par ao lançar um dado de 6 faces?", options: ["1/6", "1/3", "1/2", "2/3", "5/6"], correctAnswer: "1/2" }] }
                    ]
                },
                serie2: {
                    label: "2ª Série",
                    topics: [
                        { title: "Logaritmos", content: `...`, questions: [{ text: "Qual é o valor de log₂(32)?", options: ["3", "4", "5", "8", "16"], correctAnswer: "5" }] },
                        { title: "Progressões Aritmética (PA) e Geométrica (PG)", content: `...`, questions: [{ text: "Qual é o 20º termo da PA (3, 7, 11, ...)?", options: ["75", "79", "83", "87", "91"], correctAnswer: "79" }] },
                        { title: "Matrizes, Determinantes e Sistemas Lineares", content: `...`, questions: [{ text: "Qual o determinante da matriz [[2, 3], [4, 5]]?", options: ["2", "-2", "12", "22", "-22"], correctAnswer: "-2" }] }
                    ]
                },
                serie3: {
                    label: "3ª Série",
                    topics: [
                        { title: "Geometria Analítica: Ponto, Reta e Circunferência", content: `...`, questions: [{ text: "Qual a distância entre os pontos A(1, 2) e B(4, 6)?", options: ["3", "4", "5", "6", "7"], correctAnswer: "5" }] },
                        { title: "Números Complexos", content: `...`, questions: [{ text: "Qual o resultado de (3+4i) + (2-i)?", options: ["5+5i", "5+3i", "1+3i", "1+5i", "6i"], correctAnswer: "5+3i" }] },
                        { title: "Polinômios e Equações Algébricas", content: `...`, questions: [{ text: "Se as raízes da equação x² - 7x + 10 = 0 são 2 e 5, qual a soma das raízes?", options: ["-7", "-5", "3", "7", "10"], correctAnswer: "7" }] }
                    ]
                }
            }
        }
    };

    return { mathContent };
}
module.exports = getFullDataObject;