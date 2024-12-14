const express = require('express');
const mongoose = require('mongoose');
const Job = require('./models/Job');
const swaggerUi = require('swagger-ui-express'); // Swagger 패키지 불러오기
const swaggerDocs = require('./swagger'); // swagger.js 파일 불러오기

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://127.0.0.1:27017/jobs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Swagger 문서화
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Welcome to the Job API!');
});

// 채용 공고 목록 조회 API
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find(); // MongoDB에서 데이터 조회
    res.json({ status: 'success', data: jobs }); // 데이터 반환
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
