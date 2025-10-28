const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar rotas
const authRoutes = require('./routes/authRoutes');
const contentRoutes = require('./routes/contentRoutes');
const progressRoutes = require('./routes/progressRoutes');
const enemRouter = require('./routes/enemRoutes'); // Importa a nova rota ENEM

const app = express();
const port = 3000;

app.use(express.json());

// --- CONEXÃO COM O BANCO DE DADOS ---
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log('Conectado ao MongoDB com sucesso!');
    })
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// --- SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND ---
const frontendPath = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendPath));

// --- USAR AS ROTAS DA API ---
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/enem', enemRouter); // Usa a nova rota ENEM

// --- ROTA "APANHA-TUDO" (DEVE SER A ÚLTIMA) ---
app.get('/*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});