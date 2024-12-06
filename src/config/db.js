const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '원격 MySQL 호스트',
    user: 'MySQL 사용자명',
    password: 'MySQL 비밀번호',
    database: 'saramin',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
