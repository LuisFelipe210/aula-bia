const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Corrigido para buscar da pasta models
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ status: 'error', error: 'A senha deve ter pelo menos 6 caracteres.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashedPassword });
        res.json({ status: 'ok' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ status: 'error', error: 'Este e-mail já está em uso.' });
        }
        res.status(500).json({ status: 'error', error: 'Erro no servidor.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
        return res.status(401).json({ status: 'error', error: 'Usuário ou senha inválidos.' });
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });
        return res.json({ status: 'ok', data: token });
    }

    res.status(401).json({ status: 'error', error: 'Usuário ou senha inválidos.' });
});

module.exports = router;