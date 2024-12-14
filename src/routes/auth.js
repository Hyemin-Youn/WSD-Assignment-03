const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// User 스키마 정의
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// 회원가입
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || user.password !== req.body.password) {
      return res.status(401).send('Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// 라우터 내보내기
module.exports = router;
