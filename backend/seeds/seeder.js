const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Topic, Flashcard } = require('../models/topicModel');
const User = require('../models/userModel');
const getTopicData = require('./topicData'); // ATUALIZADO
const getFlashcardData = require('./flashcardData'); // NOVO

dotenv.config({ path: __dirname + '/../.env' });

const dbURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Conectado ao MongoDB para seeding...');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        await Topic.deleteMany();
        await Flashcard.deleteMany();
        console.log('Coleções de conteúdo limpas...');

        const { mathContent } = getTopicData(); // ATUALIZADO
        const flashcards = getFlashcardData(); // NOVO

        const topicsToInsert = [];
        for (const levelKey in mathContent) {
            const level = mathContent[levelKey];
            for (const gradeKey in level.grades) {
                const grade = level.grades[gradeKey];
                grade.topics.forEach(topic => {
                    topicsToInsert.push({
                        level: levelKey,
                        grade: gradeKey,
                        gradeLabel: grade.label,
                        title: topic.title,
                        content: topic.content,
                        questions: topic.questions
                    });
                });
            }
        }

        await Topic.insertMany(topicsToInsert);
        await Flashcard.insertMany(flashcards); // USA OS DADOS DO NOVO FICHEIRO

        console.log('Dados de Tópicos e Flashcards importados com sucesso!');
        process.exit();
    } catch (error) {
        console.error('Erro ao importar dados:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Topic.deleteMany();
        await Flashcard.deleteMany();
        await User.deleteMany();
        console.log('Todos os dados (conteúdo e utilizadores) foram destruídos com sucesso!');
        process.exit();
    } catch (error) {
        console.error('Erro ao destruir dados:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}