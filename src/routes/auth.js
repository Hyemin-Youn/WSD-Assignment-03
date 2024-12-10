const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// 회원 가입
router.post('/register', (req, res) => {
    const { email, password, name } = req.body;
    // 비밀번호 암호화 및 저장 로직
    res.status(201).json({ message: 'User registered successfully' });
});

// 로그인
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // 사용자 인증 로직
    const token = jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
});

// 사용자 정보 수정
router.put('/profile', (req, res) => {
    const { name, password } = req.body;
    // 사용자 정보 수정 로직
    res.json({ message: 'Profile updated successfully' });
});

module.exports = router;
