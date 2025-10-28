function getFlashcardData() {
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
    return flashcards;
}

module.exports = getFlashcardData;