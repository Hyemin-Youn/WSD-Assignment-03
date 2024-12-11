const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const Job = require('../models/Job'); // MongoDB 스키마

const router = express.Router();

router.get('/', async (req, res) => {
    const jar = new CookieJar(); // 세션 쿠키 관리
    const client = wrapper(axios.create({ jar }));

    try {
        const url = 'https://www.saramin.co.kr/zf_user/jobs/list/job-category';
        const response = await client.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'Referer': 'https://www.saramin.co.kr/',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
            },
        });

        const $ = cheerio.load(response.data);
        const jobs = [];

        $('.job_tit a').each((index, element) => {
            const title = $(element).text().trim();
            const link = $(element).attr('href');
            if (title && link) {
                jobs.push({
                    title,
                    link: `https://www.saramin.co.kr${link}`,
                });
            }
        });

        // MongoDB에 저장
        await Job.insertMany(jobs);
        res.json({ message: 'Data scraped and saved to database', jobs });
    } catch (error) {
        console.error('Error scraping data:', error.message);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

module.exports = router;
