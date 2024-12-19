const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const jobRoutes = require('./routes/jobs');
const authRoutes = require('./routes/auth');
const applicationRoutes = require('./routes/applications');
const bookmarkRoutes = require('./routes/bookmarks');

const app = express();

// Middleware 설정
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// MySQL 연결 풀 설정
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;
async function initializeDB() {
  try {
    pool = await mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log('? MySQL Connected');
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
      { url: `http://localhost:${process.env.PORT}`, description: 'Local Server' },
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

app.get('/', (req, res) => {
  res.send('Welcome to the Job Portal API! Use /api-docs for API documentation.');
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`?? Server running on http://localhost:${PORT}`));
