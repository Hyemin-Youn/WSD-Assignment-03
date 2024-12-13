const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

// 환경 변수 설정
dotenv.config();

const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// 라우트 연결
app.use('/auth', require('./src/routes/auth'));
app.use('/jobs', require('./src/routes/jobs'));
app.use('/applications', require('./routes/applications'));

// Swagger 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
