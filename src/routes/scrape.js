const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Job = require('../models/job'); // Job 스키마
const router = express.Router();

// [GET] 사람인 데이터 크롤링
router.get('/', async (req, res) => {
    try {
        const url = 'https://www.saramin.co.kr/zf_user/jobs/list/job-category'; // 크롤링할 URL
        const { data } = await axios.get(url); // HTTP GET 요청
        const $ = cheerio.load(data); // HTML 파싱

        const jobs = [];
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

module.exports = router;
