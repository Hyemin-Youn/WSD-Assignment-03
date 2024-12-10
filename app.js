const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 443;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/jobs', require('./src/routes/jobs'));

// 서버 실행
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
