const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 443;

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 모델 불러오기
const Job = require('./models/job');

// 미들웨어 설정
app.use(bodyParser.json());

// 데이터 저장을 위한 임시 배열 (실제 데이터베이스를 사용할 경우 이 부분 대체)
let items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' }
];

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// [GET] 모든 데이터 조회
app.get('/api/items', (req, res) => {
    res.json(items);
});

// [GET] 특정 ID의 데이터 조회
app.get('/api/items/:id', (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    res.json(item);
});

// [POST] 새로운 데이터 생성
app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).send('Name and description are required');
    }
    const newItem = {
        id: items.length + 1,
        name,
        description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// [PUT] 특정 ID의 데이터 업데이트
app.put('/api/items/:id', (req, res) => {
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('Item not found');
    }
    const { name, description } = req.body;
    if (name) item.name = name;
    if (description) item.description = description;

    res.json(item);
});

// [DELETE] 특정 ID의 데이터 삭제
app.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

// [GET] 사람인 데이터 크롤링
app.get('/api/scrape', async (req, res) => {
    try {
        const url = 'https://www.saramin.co.kr/zf_user/jobs/list/job-category'; // 크롤링할 URL
        const { data } = await axios.get(url); // HTTP GET 요청
        const $ = cheerio.load(data); // HTML 데이터 파싱

        const jobs = [];
        // 사람인 채용공고 데이터 크롤링
        $('.job_tit a').each((index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            if (title && link) {
                jobs.push({
                    title,
                    link: `https://www.saramin.co.kr${link}`
                });
            }
        });

        // MongoDB에 저장
        await Job.insertMany(jobs);

        res.json({ message: 'Data scraped and saved to database', jobs });
    } catch (error) {
        console.error('Error scraping data:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
