const mysql = require('mysql2/promise'); // mysql2의 Promise 기반 사용

// MySQL 연결 풀 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'yhm',
  password: process.env.DB_PASSWORD || 'MySQL@Secure02',
  database: process.env.DB_NAME || 'saramin',
  port: process.env.DB_PORT || 8080,
});

module.exports = pool;
