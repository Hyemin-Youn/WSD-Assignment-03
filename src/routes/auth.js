const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 회원가입
router.post('/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send({ message: 'User registered successfully!' });
});

// 로그인
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || user.password !== req.body.password) {
    return res.status(401).send('Invalid email or password');
  }
  const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
  res.send({ token });
});

module.exports = router;
