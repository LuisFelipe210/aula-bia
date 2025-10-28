const express = require('express');
const { Topic, Flashcard } = require('../models/topicModel');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // 1. Busca todos os tópicos e flashcards no banco de dados
        const topicsFromDB = await Topic.find({});
        const flashcardsFromDB = await Flashcard.find({});

        // 2. Reorganiza os dados dos tópicos para o mesmo formato que o frontend espera
        const mathContent = {};
        topicsFromDB.forEach(topic => {
            if (!mathContent[topic.level]) {
                mathContent[topic.level] = {
                    label: topic.level === 'fundamental1' ? 'Fundamental I' : (topic.level === 'fundamental2' ? 'Fundamental II' : 'Ensino Médio'),
                    grades: {}
                };
            }
            if (!mathContent[topic.level].grades[topic.grade]) {
                mathContent[topic.level].grades[topic.grade] = {
                    label: topic.gradeLabel,
                    topics: []
                };
            }
            mathContent[topic.level].grades[topic.grade].topics.push({
                _id: topic._id, // Adiciona o ID para referência futura no progresso
                title: topic.title,
                content: topic.content,
                questions: topic.questions
            });
        });

        // 3. Envia os dados formatados
        res.json({
            mathContent: mathContent,
            flashcards: flashcardsFromDB
        });

    } catch (error) {
        console.error("Erro ao buscar dados do banco de dados:", error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
});

module.exports = router;