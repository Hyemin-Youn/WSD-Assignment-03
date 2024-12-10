const mysql = require('mysql');

// MySQL connection
const connection = mysql.createConnection({
  host: '113.198.66.75',
  user: 'yhm',
  password: 'MySQL@Secure02',
  database: 'MySQL',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

module.exports = connection;
