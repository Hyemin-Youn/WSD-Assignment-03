const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

router.post('/register', (req, res) => {
  res.json({ message: 'Registration successful' });
});

module.exports = router;
