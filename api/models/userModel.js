const mongoose = require('mongoose');

const answerHistorySchema = new mongoose.Schema({
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
    topicTitle: { type: String, required: true },
    questionText: { type: String, required: true },
    userAnswer: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    // O histórico detalhado de cada resposta
    answerHistory: [answerHistorySchema]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;