const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const jobRoutes = require('./src/routes/jobs');
const authRoutes = require('./src/routes/auth');

const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/jobPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// Swagger 설정
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: 'API documentation for the job portal',
    },
  },
  apis: ['./routes/*.js'], // API 파일 경로
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우트 설정
app.use('/jobs', jobRoutes);
app.use('/auth', authRoutes);

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://0.0.0.0:${PORT}`));
