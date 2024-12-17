const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // User 스키마

const router = express.Router();
const SECRET_KEY = 'your_secret_key'; // JWT 시크릿 키

// 회원가입
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 입력 데이터 유효성 검사
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // 이메일 중복 검사
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email is already registered' });
        }

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 생성 및 저장
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// 로그인
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 입력 데이터 유효성 검사
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // 사용자 확인
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // JWT 토큰 생성
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log in' });
    }
});

// JWT 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Bearer 토큰
    if (!token) {
        return res.status(401).json({ error: 'Access Denied: No Token Provided' });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid Token' });
    }
};

// 인증된 사용자 정보 조회
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // 비밀번호 제외
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});

// 사용자 정보 수정
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { email, password } = req.body;

        // 새 비밀번호 암호화
        let updatedFields = { email };
        if (password) {
            updatedFields.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            updatedFields,
            { new: true }
        ).select('-password'); // 비밀번호 제외

        res.status(200).json({ message: 'User profile updated', user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
});

module.exports = router;
