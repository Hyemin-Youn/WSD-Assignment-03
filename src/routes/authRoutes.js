const express = require('express');
const router = express.Router();

// 예시: 사용자 로그인 API
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        res.status(200).json({ message: 'Login successful', token: 'example-jwt-token' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// 예시: 사용자 정보 조회 API
router.get('/profile', (req, res) => {
    res.status(200).json({ username: 'admin', role: 'admin' });
});

module.exports = router;
