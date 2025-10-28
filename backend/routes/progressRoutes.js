const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const router = express.Router();

// Middleware para proteger rotas
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Não autorizado, token falhou' });
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Não autorizado, sem token' });
    }
};

// Rota para obter o progresso do usuário logado (CORRIGIDA)
router.get('/me', protect, async (req, res) => {
    try {
        // Usamos .populate() para carregar os dados do tópico junto com o histórico
        const user = await User.findById(req.user._id)
            .select('-password')
            .populate({
                path: 'answerHistory.topicId',
                model: 'Topic',
                select: 'gradeLabel' // Selecionamos apenas o campo que precisamos (gradeLabel)
            });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados do usuário.' });
    }
});

// Rota para salvar uma nova resposta
router.post('/answer', protect, async (req, res) => {
    const { topicId, topicTitle, questionText, userAnswer, isCorrect } = req.body;

    // Validação básica para garantir que todos os dados foram recebidos
    if (!topicId || !topicTitle || !questionText || !userAnswer || isCorrect === undefined) {
        return res.status(400).json({ message: 'Dados incompletos para salvar o progresso.' });
    }

    try {
        // Encontra o usuário e adiciona a nova resposta ao histórico
        await User.updateOne(
            { _id: req.user._id },
            {
                $push: {
                    answerHistory: {
                        topicId,
                        topicTitle,
                        questionText,
                        userAnswer,
                        isCorrect
                    }
                }
            }
        );
        res.status(201).json({ message: 'Progresso salvo com sucesso' });
    } catch (error) {
        console.error("Erro ao salvar progresso:", error);
        res.status(500).json({ message: 'Erro ao salvar progresso' });
    }
});

module.exports = router;