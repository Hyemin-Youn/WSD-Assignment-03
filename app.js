const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 443;

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 미들웨어
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/jobs', require('./src/routes/jobs'));
app.use('/api/scrape', require('./src/routes/scrape'));

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
