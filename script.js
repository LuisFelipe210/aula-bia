document.addEventListener('DOMContentLoaded', () => {
    // --- DADOS EXPANDIDOS E DETALHADOS DA APLICAÇÃO ---
    const mathContent = {
        fundamental1: {
            label: "Fundamental I",
            grades: {
                ano1: {
                    label: "1º Ano",
                    topics: [
                        { title: "Números Naturais e Contagem", content: `Nesta fase, o foco é a <strong>alfabetização matemática</strong>. É o primeiro contato com a ideia de que os números representam quantidades.<ul><li><strong>Contagem e Correspondência:</strong> Aprendemos a recitar a sequência numérica (um, dois, três...) e a associar cada número a um objeto de um conjunto. Por exemplo, ao contar 5 lápis, tocamos em cada um e falamos o número correspondente em voz alta.</li><li><strong>Leitura e Escrita de Algarismos:</strong> Reconhecemos os símbolos numéricos (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) e aprendemos a escrevê-los.</li><li><strong>Comparação de Quantidades:</strong> Desenvolvemos a noção de "maior que", "menor que" e "igual a". Comparamos grupos de objetos para ver qual tem mais, menos ou a mesma quantidade.</li></ul>`, questions: [{ text: "Uma cesta tem 9 laranjas e outra tem 6. Qual o número na cesta que tem mais?", correctAnswer: "9" }] },
                        { title: "Introdução à Adição e Subtração", content: `As primeiras operações matemáticas estão ligadas a ações do dia a dia.<br/><br/><strong>Adição (+):</strong> A ideia principal é <strong>juntar</strong> ou <strong>acrescentar</strong>.<ul><li>Exemplo (Juntar): Se Maria tem 4 bonecas e Ana tem 3, ao juntar todas, elas têm 4 + 3 = 7 bonecas.</li><li>Exemplo (Acrescentar): João já tinha 5 carrinhos e ganhou mais 2. Ele agora tem 5 + 2 = 7 carrinhos.</li></ul><strong>Subtração (-):</strong> A ideia é <strong>tirar</strong>, <strong>separar</strong> ou <strong>comparar</strong>.<ul><li>Exemplo (Tirar): Havia 10 biscoitos no pote. Pedro comeu 3. Restaram 10 - 3 = 7 biscoitos.</li><li>Exemplo (Comparar): Lucas tem 9 anos e sua irmã tem 6. A diferença de idade é 9 - 6 = 3 anos.</li></ul>`, questions: [{ text: "Havia 8 pássaros em uma árvore. Chegaram mais 4. Quantos pássaros há agora?", correctAnswer: "12" }] },
                        { title: "Figuras Geométricas Planas", content: `O objetivo é reconhecer formas no mundo ao nosso redor. Aprendemos a identificar e nomear as quatro formas básicas:<ul><li><strong>Círculo:</strong> Uma forma redonda, sem lados ou cantos, como uma moeda ou uma roda.</li><li><strong>Quadrado:</strong> Tem 4 lados de tamanhos iguais e 4 cantos retos (ângulos de 90°).</li><li><strong>Triângulo:</strong> Tem 3 lados e 3 cantos.</li><li><strong>Retângulo:</strong> Tem 4 lados e 4 cantos retos, mas os lados opostos é que são iguais entre si. Uma porta ou um livro são exemplos.</li></ul>`, questions: [{ text: "A roda de um carro lembra qual figura geométrica?", correctAnswer: "círculo" }] },
                        { title: "Medidas (Noções Iniciais)", content: `Aqui, desenvolvemos a capacidade de comparar objetos sem necessariamente usar números.<ul><li><strong>Comprimento:</strong> Usamos termos como <strong>mais comprido/curto</strong>, <strong>mais alto/baixo</strong>. Ex: "A girafa é mais alta que o cachorro".</li><li><strong>Massa (Peso):</strong> Comparamos o que é <strong>mais pesado/leve</strong>. Ex: "Uma melancia é mais pesada que uma maçã".</li><li><strong>Tempo:</strong> Começamos a organizar nossa rotina com noções de <strong>dia e noite</strong>, e a sequência de eventos com <strong>ontem, hoje e amanhã</strong>.</li></ul>`, questions: [{ text: "O que é mais pesado: uma pena ou um tijolo?", correctAnswer: "tijolo" }] }
                    ]
                },
                ano2: {
                    label: "2º Ano",
                    topics: [
                        { title: "Sistema de Numeração Decimal (Centena)", content: `Aprofundamos a compreensão de que nosso sistema numérico é posicional e organizado em grupos de 10. O valor de um algarismo depende de sua <strong>posição</strong>.<ul><li><strong>Unidade (U):</strong> Representa contagens de 1 em 1 (de 0 a 9).</li><li><strong>Dezena (D):</strong> Representa grupos de 10. Uma dezena é igual a 10 unidades.</li><li><strong>Centena (C):</strong> Representa grupos de 100. Uma centena é igual a 10 dezenas ou 100 unidades.</li></ul>Por exemplo, no número <strong>472</strong>, o 4 vale 400 (4 centenas), o 7 vale 70 (7 dezenas), e o 2 vale 2 (2 unidades). A decomposição é 400 + 70 + 2.`, questions: [{ text: "No número 681, qual algarismo está na casa das dezenas?", correctAnswer: "8" }] },
                        { title: "Introdução à Multiplicação e Divisão", content: `Avançamos das ideias de juntar e tirar para operações mais complexas.<br/><br/><strong>Multiplicação (×):</strong> É uma forma eficiente de realizar uma soma de parcelas iguais. Ex: 3 caixas com 5 lápis cada é o mesmo que 5 + 5 + 5, que simplificamos para 3 × 5 = 15 lápis. <br/><br/><strong>Divisão (÷):</strong> Surge com duas ideias principais:<ul><li><strong>Repartir em partes iguais:</strong> Dividir 12 balas para 4 amigos significa que cada um recebe 12 ÷ 4 = 3 balas.</li><li><strong>Medida (quantos grupos cabem):</strong> Quantos grupos de 4 balas eu consigo formar com 12 balas? A resposta também é 3.</li></ul>`, questions: [{ text: "Se um caderno custa R$ 8, quanto custarão 4 cadernos?", correctAnswer: "32" }] },
                        { title: "Sistema Monetário Brasileiro", content: `O foco é o uso prático do dinheiro. Conhecemos as <strong>cédulas (notas) e moedas</strong> do nosso sistema (Real - R$). Aprendemos a:<ul><li>Identificar os valores de cada nota e moeda.</li><li>Realizar pequenas compras e pagamentos.</li><li>Calcular o troco, geralmente usando a subtração ou a contagem progressiva. Ex: Se algo custa R$ 7 e pago com R$ 10, o troco é 10 - 7 = 3.</li></ul>`, questions: [{ text: "Você comprou um suco de R$ 4 e pagou com uma nota de R$ 10. Quanto recebeu de troco?", correctAnswer: "6" }] },
                        { title: "Medidas de Tempo (Calendário e Hora)", content: `Aprofundamos a medição do tempo.<ul><li><strong>Calendário:</strong> Usamos para identificar <strong>dias, semanas, meses e o ano</strong>. Aprendemos a ordem dos meses e quantos dias cada um tem.</li><li><strong>Relógio:</strong> Começamos a ler as horas em relógios analógicos e digitais, focando em <strong>horas exatas</strong> (ex: 3:00) e <strong>meia hora</strong> (ex: 3:30).</li></ul>`, questions: [{ text: "Um ano tem quantos meses?", correctAnswer: "12" }] }
                    ]
                },
                ano3: {
                    label: "3º Ano",
                    topics: [
                        { title: "Frações (Ideia de Parte-Todo)", content: `Uma fração representa uma ou mais partes de algo que foi dividido em partes <strong>iguais</strong>. Ela é escrita com dois números: <code>Numerador / Denominador</code>.<ul><li><strong>Denominador:</strong> O número de baixo. Indica em quantas partes iguais o todo foi dividido.</li><li><strong>Numerador:</strong> O número de cima. Indica quantas dessas partes foram consideradas (comidas, pintadas, etc.).</li></ul><strong>Exemplo:</strong> Se uma pizza foi dividida em 8 fatias iguais e você comeu 3, a fração que representa o que você comeu é 3/8 (lê-se "três oitavos").`, questions: [{ text: "Uma barra de chocolate tem 10 pedaços. Se você comeu 4, que fração representa a parte que você comeu? (escreva como 4/10)", correctAnswer: "4/10" }] },
                        { title: "Medidas de Perímetro e Área (Malha Quadriculada)", content: `Introduzimos formalmente dois conceitos importantes em geometria.<ul><li><strong>Perímetro:</strong> É a medida do <strong>contorno</strong> de uma figura. Para calcular, basta <strong>somar as medidas de todos os seus lados</strong>. É como se caminhássemos ao redor da figura.</li><li><strong>Área:</strong> É a medida da <strong>superfície</strong> interna de uma figura. Em uma malha quadriculada, a forma mais simples de medir a área é contando quantos quadradinhos a figura ocupa.</li></ul>`, questions: [{ text: "Um quadrado tem lado de 5 cm. Qual é o seu perímetro?", correctAnswer: "20" }] },
                        { title: "Tabelas e Gráficos Simples", content: `Aprender a organizar e interpretar dados é uma habilidade crucial.<ul><li><strong>Coleta e Organização:</strong> Realizamos pequenas pesquisas (ex: qual a fruta favorita da turma?) e organizamos os resultados.</li><li><strong>Tabelas de Dupla Entrada:</strong> Tabelas que relacionam duas informações. Por exemplo, linhas com nomes de alunos e colunas com tipos de esportes, marcando qual esporte cada um pratica.</li><li><strong>Gráficos de Colunas:</strong> Representação visual dos dados, onde a altura de cada coluna indica a frequência (quantidade) de cada categoria.</li></ul>`, questions: [{ text: "Em um gráfico, a coluna de 'gatos' vai até o número 10 e a de 'cachorros' até o 15. Qual animal tem a maior quantidade?", correctAnswer: "cachorros" }] }
                    ]
                },
                ano4: {
                    label: "4º Ano",
                    topics: [
                        { title: "Números Decimais", content: `Números decimais são usados para representar quantidades que não são inteiras, sendo uma outra forma de escrever frações com denominador 10, 100, 1000, etc. A <strong>vírgula</strong> é usada para separar a parte inteira da parte decimal.<br/><br/><strong>Exemplo:</strong> R$ 5,75 significa 5 reais e 75 centavos (75/100 de um real).<br/><br/>As casas depois da vírgula têm nomes: 1ª (<strong>décimos</strong>), 2ª (<strong>centésimos</strong>), 3ª (<strong>milésimos</strong>). Para somar ou subtrair números decimais, é fundamental alinhar as vírgulas uma embaixo da outra.`, questions: [{ text: "Quanto é 12,5 + 3,45?", correctAnswer: "15.95" }] },
                        { title: "Cálculo de Área (Quadrados e Retângulos)", content: `Formalizamos o cálculo de área sem a necessidade da malha quadriculada. A <strong>área</strong> é a medida da superfície e é calculada multiplicando-se as duas dimensões da figura. A unidade de medida é sempre "quadrada" (cm², m², etc.).<ul><li><strong>Área do Retângulo:</strong> <code>A = comprimento × largura</code>.</li><li><strong>Área do Quadrado:</strong> Como o lado é igual ao comprimento e à largura, a fórmula é <code>A = lado × lado</code> ou <code>A = lado²</code>.</li></ul>`, questions: [{ text: "Qual a área de um terreno retangular que mede 20 metros de comprimento por 10 metros de largura?", correctAnswer: "200" }] },
                        { title: "Ângulos (Reto, Agudo e Obtuso)", content: `Um ângulo é a "abertura" entre duas retas que se encontram em um ponto (vértice). Aprendemos a classificar os ângulos pela sua medida.<ul><li><strong>Ângulo Reto:</strong> Mede exatamente 90°. É o ângulo encontrado nos cantos de um quadrado ou de um livro.</li><li><strong>Ângulo Agudo:</strong> É "menor" que o ângulo reto, ou seja, mede menos de 90°. É um ângulo mais "fechado".</li><li><strong>Ângulo Obtuso:</strong> É "maior" que o ângulo reto, ou seja, mede mais de 90° e menos de 180°. É um ângulo mais "aberto".</li></ul>`, questions: [{ text: "O ângulo formado pelos ponteiros de um relógio às 3 horas é reto, agudo ou obtuso?", correctAnswer: "reto" }] }
                    ]
                },
                ano5: {
                    label: "5º Ano",
                    topics: [
                        { title: "Porcentagem", content: `A porcentagem é uma forma de representar uma parte de um todo, onde o todo é sempre 100. O símbolo é <strong>%</strong> (por cento).<br/><br/><strong>Relações:</strong> 25% é o mesmo que a fração 25/100 ou o número decimal 0,25.<br/><br/><strong>Como calcular:</strong> A forma mais fácil de calcular a porcentagem de um valor é transformar a porcentagem em decimal e multiplicar.<ul><li><strong>Exemplo:</strong> Calcular 20% de R$ 150,00. Transformamos 20% em 0,20. O cálculo é: 0,20 × 150 = 30. O desconto é de R$ 30,00.</li></ul>`, questions: [{ text: "Uma TV de R$ 2000 teve um desconto de 10%. Qual o valor do desconto em reais?", correctAnswer: "200" }] },
                        { title: "Volume de Blocos Retangulares", content: `O volume é a medida do <strong>espaço tridimensional</strong> que um objeto ocupa. A unidade de medida é sempre "cúbica" (cm³, m³, etc.), pois envolve três dimensões.<br/><br/>Para um bloco retangular (como uma caixa de sapatos ou um aquário), a fórmula é simples: <code>V = comprimento × largura × altura</code>.<br/><br/><strong>Exemplo:</strong> Uma piscina retangular tem 10 m de comprimento, 5 m de largura e 2 m de profundidade (altura). Seu volume é: V = 10 × 5 × 2 = 100 m³.`, questions: [{ text: "Uma caixa de sapatos mede 30 cm de comprimento, 20 cm de largura e 10 cm de altura. Qual o seu volume?", correctAnswer: "6000" }] },
                        { title: "Medidas de Grandeza", content: `Neste ponto, focamos em resolver problemas que envolvem diferentes grandezas e a <strong>conversão entre suas unidades</strong>.<br/><ul><li><strong>Comprimento:</strong> Relação entre quilômetro (km), metro (m), centímetro (cm) e milímetro (mm). Ex: 1 km = 1000 m; 1 m = 100 cm.</li><li><strong>Massa:</strong> Relação entre quilograma (kg), grama (g) e miligrama (mg). Ex: 1 kg = 1000 g.</li><li><strong>Capacidade:</strong> Relação entre litro (L) e mililitro (mL). Ex: 1 L = 1000 mL.</li></ul>`, questions: [{ text: "Uma garrafa de refrigerante tem 2 litros. Isso equivale a quantos mililitros (mL)?", correctAnswer: "2000" }] }
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
                        { title: "Múltiplos, Divisores, MDC e MMC", content: `<strong>Múltiplos:</strong> Os resultados da multiplicação de um número pelos naturais. Ex: M(4) = {0, 4, 8, 12, ...}.<br/><strong>Divisores:</strong> Números que dividem outro de forma exata. Ex: D(12) = {1, 2, 3, 4, 6, 12}.<br/><br/><strong>MDC (Máximo Divisor Comum):</strong> O maior número que é divisor de dois ou mais números ao mesmo tempo. É útil para problemas de divisão em grupos iguais do maior tamanho possível.<br/><br/><strong>MMC (Mínimo Múltiplo Comum):</strong> O menor múltiplo comum (diferente de zero) entre dois ou mais números. É útil para encontrar quando eventos que se repetem em intervalos diferentes acontecerão juntos novamente.`, questions: [{ text: "Qual o MMC entre 12 e 15?", correctAnswer: "60" }] },
                        { title: "Operações com Frações", content: `Consolidamos as quatro operações com frações:<ul><li><strong>Adição e Subtração:</strong> Só podemos somar ou subtrair frações com o mesmo denominador. Se forem diferentes, usamos o MMC para encontrar um denominador comum.</li><li><strong>Multiplicação:</strong> É a mais simples. Multiplicamos numerador com numerador e denominador com denominador.</li><li><strong>Divisão:</strong> Para dividir uma fração por outra, multiplicamos a primeira fração pelo inverso da segunda. Ex: (1/2) ÷ (3/4) = (1/2) × (4/3) = 4/6.</li></ul>`, questions: [{ text: "Quanto é 1/2 + 1/4?", correctAnswer: "3/4" }] },
                        { title: "Polígonos e Sólidos Geométricos", content: `<strong>Polígonos</strong> são figuras planas e fechadas formadas por segmentos de reta. Os classificamos pelo número de lados (triângulos, quadriláteros, pentágonos, hexágonos...).<br/><br/><strong>Sólidos Geométricos</strong> são objetos tridimensionais. Estudamos suas características:<ul><li><strong>Faces:</strong> As superfícies planas (os "lados" do sólido).</li><li><strong>Arestas:</strong> As linhas onde duas faces se encontram.</li><li><strong>Vértices:</strong> Os pontos onde as arestas se encontram (os "cantos").</li></ul>Exemplos de sólidos incluem cubos, paralelepípedos, prismas, pirâmides, cilindros e esferas.`, questions: [{ text: "Quantas faces tem um cubo?", correctAnswer: "6" }] }
                    ]
                },
                ano7: {
                    label: "7º Ano",
                    topics: [
                        { title: "Números Inteiros (Positivos e Negativos)", content: `Expandimos o conjunto dos números para incluir os <strong>negativos</strong>. O conjunto dos números inteiros (ℤ) é {...-3, -2, -1, 0, 1, 2, 3...}. Eles são usados para representar dívidas, temperaturas abaixo de zero, altitudes, etc.<br/><br/>Aprendemos as <strong>regras de sinais</strong> para as quatro operações:<ul><li><strong>Adição/Subtração:</strong> Sinais iguais, soma e mantém o sinal. Sinais diferentes, subtrai e mantém o sinal do maior (em módulo).</li><li><strong>Multiplicação/Divisão:</strong> Sinais iguais, resultado positivo. Sinais diferentes, resultado negativo. Ex: <code>(-4) × (-2) = +8</code> e <code>10 ÷ (-5) = -2</code>.</li></ul>`, questions: [{ text: "Uma pessoa está no 5º andar, desce 8 andares. Em qual andar ela para?", correctAnswer: "-3" }] },
                        { title: "Equações de 1º Grau", content: `Uma equação é uma igualdade matemática que possui um valor desconhecido, chamado de <strong>incógnita</strong> (geralmente representado por 'x'). O objetivo é encontrar o valor de 'x' que torna a igualdade verdadeira.<br/><br/>O princípio fundamental para resolver uma equação é o da <strong>balança</strong>: tudo o que fazemos de um lado da igualdade, devemos fazer igual do outro para manter o equilíbrio. O processo consiste em <strong>isolar a incógnita 'x'</strong>. Ex: Para resolver <code>2x + 10 = 20</code>, primeiro subtraímos 10 dos dois lados (<code>2x = 10</code>) e depois dividimos os dois lados por 2, resultando em <code>x = 5</code>.`, questions: [{ text: "Qual o valor de x na equação 4x - 5 = 15?", correctAnswer: "5" }] },
                        { title: "Ângulos e Triângulos", content: `Aprofundamos o estudo de ângulos e suas relações:<ul><li><strong>Ângulos Complementares:</strong> A soma é 90°.</li><li><strong>Ângulos Suplementares:</strong> A soma é 180°.</li><li><strong>Ângulos Opostos pelo Vértice (OPV):</strong> São iguais.</li></ul>Nos triângulos, aprendemos a propriedade mais importante: a <strong>soma dos seus ângulos internos</strong> é sempre <strong>180°</strong>. Isso nos permite descobrir a medida de um ângulo se conhecermos os outros dois. Também classificamos os triângulos quanto aos lados (equilátero, isósceles, escaleno) e aos ângulos (retângulo, acutângulo, obtusângulo).`, questions: [{ text: "Dois ângulos de um triângulo medem 50° e 70°. Qual a medida do terceiro ângulo?", correctAnswer: "60" }] }
                    ]
                },
                ano8: {
                    label: "8º Ano",
                    topics: [
                        { title: "Teorema de Pitágoras", content: `Este é um dos teoremas mais famosos da matemática e se aplica <strong>exclusivamente a triângulos retângulos</strong> (que têm um ângulo de 90°). Ele estabelece uma relação entre as medidas dos lados.<br/><br/>A fórmula é: <code>a² + b² = c²</code><br/>Onde:<ul><li><strong>a</strong> e <strong>b</strong> são os <strong>catetos</strong> (os lados que formam o ângulo de 90°).</li><li><strong>c</strong> é a <strong>hipotenusa</strong> (o lado oposto ao ângulo de 90°, sempre o maior lado).</li></ul>Se conhecemos as medidas de dois lados de um triângulo retângulo, podemos usar o teorema para encontrar a medida do terceiro.`, questions: [{ text: "Os catetos de um triângulo retângulo medem 6 cm e 8 cm. Qual a medida da hipotenusa?", correctAnswer: "10" }] },
                        { title: "Produtos Notáveis e Fatoração", content: `São ferramentas que agilizam cálculos algébricos.<br/><br/><strong>Produtos Notáveis</strong> são padrões de multiplicação que aparecem com frequência:<ul><li>Quadrado da Soma: <code>(a+b)² = a² + 2ab + b²</code></li><li>Quadrado da Diferença: <code>(a-b)² = a² - 2ab + b²</code></li><li>Produto da Soma pela Diferença: <code>(a+b)(a-b) = a² - b²</code></li></ul><strong>Fatoração</strong> é o processo inverso: transformar uma expressão algébrica (soma) em um produto de fatores. É como "desmontar" a expressão. Ex: Fatorar <code>x² - 9</code> é reconhecer que é uma diferença de quadrados, resultando em <code>(x+3)(x-3)</code>.`, questions: [{ text: "Qual o resultado de (x - 4)²?", correctAnswer: "x^2 - 8x + 16" }] },
                        { title: "Sistemas de Equações de 1º Grau", content: `Um sistema de equações é um conjunto de duas ou mais equações com duas ou mais incógnitas. O objetivo é encontrar os valores das incógnitas que satisfazem <strong>todas</strong> as equações ao mesmo tempo.<br/><br/>Os métodos mais comuns para resolver sistemas com duas equações e duas incógnitas (x e y) são:<ul><li><strong>Método da Substituição:</strong> Isolar uma incógnita em uma das equações e substituir na outra.</li><li><strong>Método da Adição:</strong> Somar as duas equações (membro a membro) de forma a eliminar uma das incógnitas.</li></ul>`, questions: [{ text: "Resolva o sistema: x + y = 10 e x - y = 4. Qual o valor de x?", correctAnswer: "7" }] }
                    ]
                },
                ano9: {
                    label: "9º Ano",
                    topics: [
                        { title: "Equação de 2º Grau e Fórmula de Bhaskara", content: `Uma equação de 2º grau é qualquer equação que pode ser escrita na forma <code>ax² + bx + c = 0</code>, onde 'a', 'b' e 'c' são coeficientes e 'a' não pode ser zero. As soluções dessa equação são chamadas de raízes.<br/><br/>Para encontrá-las, usamos a <strong>Fórmula de Bhaskara</strong>, um método universal:<ul><li><strong>1º Passo (Calcular o Discriminante - Delta):</strong> O Delta (Δ) nos diz quantas raízes a equação tem. A fórmula é: <code>Δ = b² - 4ac</code>. Se Δ > 0, há duas raízes reais. Se Δ = 0, há uma raiz real. Se Δ < 0, não há raízes reais.</li><li><strong>2º Passo (Aplicar a Fórmula de Bhaskara):</strong> Com o valor de Delta, encontramos os valores de 'x': <code>x = [-b ± √Δ] / 2a</code>. O '±' indica que faremos uma conta com '+' e outra com '-' para encontrar as duas raízes.</li></ul>`, questions: [{ text: "Quais são as raízes da equação x² - 8x + 15 = 0? (digite a maior raiz)", correctAnswer: "5" }] },
                        { title: "Trigonometria no Triângulo Retângulo", content: `A trigonometria estuda a relação entre os ângulos e os lados de um triângulo. No triângulo retângulo, temos nomes especiais para os lados: a <strong>hipotenusa</strong> (o maior lado, oposto ao ângulo de 90°) e os <strong>catetos</strong> (os outros dois lados).<br/><br/>As três razões trigonométricas fundamentais são:<ul><li><strong>Seno (sen):</strong> A razão entre o cateto oposto ao ângulo e a hipotenusa. <code>sen(α) = Cateto Oposto / Hipotenusa</code>.</li><li><strong>Cosseno (cos):</strong> A razão entre o cateto adjacente (ao lado) ao ângulo e a hipotenusa. <code>cos(α) = Cateto Adjacente / Hipotenusa</code>.</li><li><strong>Tangente (tan):</strong> A razão entre o cateto oposto e o cateto adjacente. <code>tan(α) = Cateto Oposto / Cateto Adjacente</code>.</li></ul>Essas razões são muito usadas em física, engenharia e navegação para calcular distâncias e alturas inacessíveis.`, questions: [{ text: "Em um triângulo retângulo, o cateto oposto a um ângulo de 30° mede 10 cm. Se o sen(30°)=0,5, qual o comprimento da hipotenusa?", correctAnswer: "20" }] },
                        { title: "Semelhança de Triângulos e Teorema de Tales", content: `Dois triângulos são <strong>semelhantes</strong> quando possuem os ângulos correspondentes iguais e os lados correspondentes proporcionais. Isso significa que um é uma ampliação ou redução do outro. Essa propriedade é a base para o cálculo de alturas e distâncias, como medir a altura de um prédio pela sua sombra.<br/><br/>O <strong>Teorema de Tales</strong> é uma consequência da semelhança. Ele diz que, se um feixe de retas paralelas é cortado por duas retas transversais, os segmentos formados em uma transversal são proporcionais aos segmentos correspondentes na outra. É fundamental para a cartografia e o desenho técnico.`, questions: [{ text: "Um prédio de 30m de altura projeta uma sombra de 10m. No mesmo instante, um poste ao lado projeta uma sombra de 2m. Qual a altura do poste?", correctAnswer: "6" }] }
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
                        { title: "Funções: Afim e Quadrática", content: `Uma <strong>função</strong> é uma regra que relaciona cada elemento de um conjunto (domínio) a um único elemento de outro conjunto (contradomínio).<br/><br/><strong>Função Afim (ou de 1º Grau):</strong> Tem a forma <code>f(x) = ax + b</code>. Seu gráfico é sempre uma <strong>reta</strong>. O coeficiente 'a' é a taxa de variação (inclinação da reta) e 'b' é o valor inicial (onde a reta corta o eixo y).<br/><br/><strong>Função Quadrática (ou de 2º Grau):</strong> Tem a forma <code>f(x) = ax² + bx + c</code>. Seu gráfico é uma <strong>parábola</strong>. O sinal de 'a' determina a concavidade (para cima se a>0, para baixo se a<0). As raízes da função (onde f(x)=0) são os pontos onde a parábola corta o eixo x. O <strong>vértice</strong> é o ponto de máximo ou mínimo da função.`, questions: [{ text: "Na função f(x) = 2x - 10, qual é o valor de x para o qual f(x) = 0?", correctAnswer: "5" }] },
                        { title: "Análise Combinatória", content: `É a área da matemática que estuda técnicas de contagem para determinar o número de possibilidades de um evento ocorrer, sem precisar listar todas elas. Os conceitos principais são:<ul><li><strong>Princípio Fundamental da Contagem (PFC):</strong> Se um evento pode ocorrer de 'm' maneiras e um segundo evento de 'n' maneiras, os dois juntos podem ocorrer de 'm × n' maneiras.</li><li><strong>Permutação (Pₙ = n!):</strong> Usada para calcular o número de maneiras de ordenar todos os elementos de um conjunto. Ex: Anagramas de uma palavra.</li><li><strong>Arranjo (Aₙ,ₚ):</strong> Usado para escolher 'p' elementos de um total de 'n', onde a <strong>ordem importa</strong>. Ex: Formar pódios em uma corrida.</li><li><strong>Combinação (Cₙ,ₚ):</strong> Usado para escolher 'p' elementos de 'n', onde a <strong>ordem NÃO importa</strong>. Ex: Formar comissões ou times.</li></ul>`, questions: [{ text: "De quantas formas 3 pessoas podem sentar em 5 cadeiras em fila? (Arranjo)", correctAnswer: "60" }] },
                        { title: "Probabilidade", content: `Probabilidade mede a chance de um determinado evento ocorrer. É um número entre 0 (evento impossível) e 1 (evento certo).<br/><br/>A fórmula básica é: <code>P(A) = (Número de resultados favoráveis) / (Número total de resultados possíveis)</code>.<br/><br/>Estudamos também conceitos como <strong>eventos independentes</strong> (a ocorrência de um não afeta o outro), <strong>eventos mutuamente exclusivos</strong> (não podem ocorrer ao mesmo tempo) e <strong>probabilidade condicional</strong> (a probabilidade de um evento A ocorrer, dado que um evento B já ocorreu).`, questions: [{ text: "Qual a probabilidade de tirar um número par ao lançar um dado de 6 faces?", correctAnswer: "1/2" }] }
                    ]
                },
                serie2: {
                    label: "2ª Série",
                    topics: [
                        { title: "Logaritmos", content: `O logaritmo é a operação inversa da exponenciação. A pergunta que um logaritmo responde é: "A que expoente devo elevar uma base 'b' para obter um número 'a'?". Escrevemos isso como <code>log_b(a) = x</code>, que é o mesmo que <code>bˣ = a</code>.<br/><br/><strong>Propriedades Operatórias Fundamentais:</strong><ul><li><strong>Logaritmo do Produto:</strong> <code>log(M ⋅ N) = log(M) + log(N)</code></li><li><strong>Logaritmo do Quociente:</strong> <code>log(M / N) = log(M) - log(N)</code></li><li><strong>Logaritmo da Potência:</strong> <code>log(Mᵏ) = k ⋅ log(M)</code></li></ul>Logaritmos são usados em escalas como a Richter (terremotos) e pH (acidez), além de em finanças e computação.`, questions: [{ text: "Qual é o valor de log₂(32)?", correctAnswer: "5" }] },
                        { title: "Progressões Aritmética (PA) e Geométrica (PG)", content: `Sequências numéricas com padrões específicos.<br/><br/><strong>Progressão Aritmética (PA):</strong> Uma sequência onde cada termo, a partir do segundo, é a soma do anterior com uma constante chamada <strong>razão (r)</strong>. Ex: (2, 5, 8, 11...) com r=3. A fórmula do termo geral é <code>aₙ = a₁ + (n-1)r</code>.<br/><br/><strong>Progressão Geométrica (PG):</strong> Uma sequência onde cada termo, a partir do segundo, é o produto do anterior por uma constante chamada <strong>razão (q)</strong>. Ex: (2, 6, 18, 54...) com q=3. A fórmula do termo geral é <code>aₙ = a₁ ⋅ qⁿ⁻¹</code>.`, questions: [{ text: "Qual é o 20º termo da PA (3, 7, 11, ...)?", correctAnswer: "79" }] },
                        { title: "Matrizes, Determinantes e Sistemas Lineares", content: `<strong>Matrizes</strong> são tabelas de números organizados em linhas e colunas, usadas para organizar dados e representar transformações lineares. Podemos somar, subtrair e multiplicar matrizes.<br/><strong>Determinante</strong> é um número escalar associado a uma matriz quadrada, que nos informa, por exemplo, se um sistema linear tem solução única (se o determinante for diferente de zero).<br/><strong>Sistemas Lineares</strong> são conjuntos de equações com múltiplas variáveis. Métodos como a <strong>Regra de Cramer</strong> (usando determinantes) e o <strong>escalonamento</strong> são usados para encontrar os valores das variáveis que satisfazem todas as equações simultaneamente.`, questions: [{ text: "Qual o determinante da matriz [[2, 3], [4, 5]]?", correctAnswer: "-2" }] }
                    ]
                },
                serie3: {
                    label: "3ª Série",
                    topics: [
                        { title: "Geometria Analítica: Ponto, Reta e Circunferência", content: `A Geometria Analítica une a Álgebra com a Geometria, usando um sistema de coordenadas (plano cartesiano) para descrever figuras geométricas através de equações.<br/><br/><strong>Conceitos Fundamentais:</strong><ul><li><strong>Distância entre dois pontos A(x₁, y₁) e B(x₂, y₂):</strong> <code>d = √[(x₂-x₁)² + (y₂-y₁)²]</code>, derivada do Teorema de Pitágoras.</li><li><strong>Equação da Reta:</strong> A forma mais comum é a equação reduzida <code>y = mx + q</code>, onde 'm' é o coeficiente angular (inclinação) e 'q' é o coeficiente linear (onde corta o eixo y).</li><li><strong>Equação da Circunferência:</strong> Definida por um centro C(a,b) e um raio 'r'. A equação é <code>(x-a)² + (y-b)² = r²</code>.</li></ul>`, questions: [{ text: "Qual a distância entre os pontos A(1, 2) e B(4, 6)?", correctAnswer: "5" }] },
                        { title: "Números Complexos", content: `Os números complexos surgiram para resolver equações que não tinham solução no conjunto dos números reais, como <code>x² = -1</code>. A base deste sistema é a <strong>unidade imaginária (i)</strong>, definida como <code>i = √-1</code>, de modo que <code>i² = -1</code>.<br/><br/>Um número complexo 'z' é escrito na <strong>forma algébrica</strong> como <code>z = a + bi</code>, onde 'a' é a parte real e 'b' é a parte imaginária. Podemos realizar todas as operações (soma, subtração, multiplicação, divisão) com eles. Eles também podem ser representados geometricamente no plano de Argand-Gauss e escritos na <strong>forma trigonométrica ou polar</strong>, o que facilita o cálculo de potências e raízes.`, questions: [{ text: "Qual o resultado de (3+4i) + (2-i)? (escreva como a+bi)", correctAnswer: "5+3i" }] },
                        { title: "Polinômios e Equações Algébricas", content: `Um <strong>polinômio</strong> na variável 'x' é uma expressão da forma <code>P(x) = aₙxⁿ + aₙ₋₁xⁿ⁻¹ + ... + a₁x + a₀</code>, onde os 'a' são os coeficientes. O maior expoente 'n' é o <strong>grau</strong> do polinômio.<br/><br/>Uma <strong>equação algébrica</strong> é <code>P(x) = 0</code>. O <strong>Teorema Fundamental da Álgebra</strong> afirma que todo polinômio de grau 'n' tem exatamente 'n' raízes (contando as complexas e as multiplicidades). As <strong>Relações de Girard</strong> são fórmulas que relacionam os coeficientes de um polinômio com as somas e produtos de suas raízes, sendo muito úteis para encontrar as raízes sem resolver a equação diretamente.`, questions: [{ text: "Se as raízes da equação x² - 7x + 10 = 0 são 2 e 5, qual a soma das raízes?", correctAnswer: "7" }] }
                    ]
                }
            }
        },
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
                                <div class="mt-2 flex items-center">
                                    <input type="text" class="question-input flex-1 min-w-0" placeholder="Sua resposta...">
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

    document.addEventListener('keydown', e => {
        if (e.key === 'Enter' && e.target.classList.contains('question-input')) {
            e.preventDefault();
            const checkButton = e.target.nextElementSibling;
            if (checkButton && checkButton.classList.contains('check-answer-btn')) {
                checkButton.click();
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