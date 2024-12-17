const express = require('express');
const mysql = require('mysql2/promise'); // Promise 기반 MySQL2
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// 라우트 파일 가져오기
const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();

// 미들웨어 설정
app.use(express.json()); // JSON 파싱
app.use(cors());

// MySQL 연결 풀 설정
const dbConfig = {
  host: '0.0.0.0',
  user: 'yhm',
  password: 'MySQL@Secure02',
  database: 'saramin',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: 8080,
};

let pool; // 연결 풀 초기화
async function initializeDB() {
  try {
    pool = await mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log('? MySQL Connected on port 8080');
    connection.release();
  } catch (err) {
    console.error('? MySQL Connection Error:', err.message);
    process.exit(1);
  }
}
initializeDB();

// Swagger 설정
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: 'API documentation for the Job Portal project',
    },
    servers: [
      { url: 'http://0.0.0.0:80', description: 'Local Server' },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우트 설정
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/bookmarks', bookmarkRoutes);

// 루트 라우트
app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API! Use /api-docs for API documentation.');
});

// 서버 실행
const PORT = 80;
app.listen(PORT, () => console.log(`?? Server running on http://0.0.0.0:${PORT}`));
