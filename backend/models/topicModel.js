const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    level: String,
    grade: String,
    gradeLabel: String,
    title: String,
    content: String,
    questions: [{
        text: String,
        options: [String],
        correctAnswer: String
    }]
});

const Topic = mongoose.model('Topic', topicSchema);

// Vamos exportar também o schema e modelo de Flashcard aqui para simplificar
const flashcardSchema = new mongoose.Schema({
    front: String,
    back: String,
    explanation: String
});
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

module.exports = { Topic, Flashcard };