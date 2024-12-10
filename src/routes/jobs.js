const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

// 사람인 채용공고 크롤링 API
router.get('/scrape', async (req, res) => {
    try {
        const url = 'https://www.saramin.co.kr/zf_user/jobs/list/job-category'; // 대상 URL
        const { data } = await axios.get(url); // HTTP GET 요청
        const $ = cheerio.load(data); // HTML 데이터 로드

        const jobs = [];
        $('.job_tit a').each((index, element) => {
            const title = $(element).text().trim(); // 공고 제목
            const link = $(element).attr('href'); // 공고 링크
            if (title && link) {
                jobs.push({ title, link: `https://www.saramin.co.kr${link}` });
            }
        });

        res.json({ jobs }); // 크롤링된 데이터를 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

module.exports = router;
