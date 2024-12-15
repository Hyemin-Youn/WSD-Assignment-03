const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// 라우트
const jobRoutes = require('./src/routes/jobRoutes');
const authRoutes = require('./src/routes/authRoutes'); // auth 라우트가 별도로 정의된 경우

const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://0.0.0.0:8080/saramin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Swagger 설정
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: 'API documentation for the job portal',
    },
  },
  apis: ['./src/routes/*.js'], // Swagger 주석이 포함된 API 파일 경로
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우트 설정
app.use('/api/jobs', jobRoutes);
app.use('/api/auth', authRoutes); // auth 라우트 추가

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://0.0.0.0:${PORT}`));
