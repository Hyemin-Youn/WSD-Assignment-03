const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // DB 연결 풀 가져오기

const JWT_SECRET = 'your-secret-key'; // 환경 변수로 관리하는 것이 좋습니다.

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: 회원 가입 API
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *                 example: password123
 *               name:
 *                 type: string
 *                 description: 사용자 이름
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 회원가입 성공
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: 필드 누락
 *       500:
 *         description: 서버 오류
 */
// 회원가입
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (email, password, name) VALUES (?, ?, ?)';
    const [result] = await pool.execute(sql, [email, hashedPassword, name]);
    res.status(201).json({ message: '회원가입 성공', userId: result.insertId });
  } catch (err) {
    console.error('회원가입 오류:', err.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 로그인 API
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 사용자 이메일
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *                 example: password123
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그인 성공
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: 필드 누락
 *       401:
 *         description: 인증 실패
 *       500:
 *         description: 서버 오류
 */
// 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: '이메일과 비밀번호를 입력해주세요.' });
  }

  try {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await pool.execute(sql, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: '로그인 성공', token });
  } catch (err) {
    console.error('로그인 오류:', err.message);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
