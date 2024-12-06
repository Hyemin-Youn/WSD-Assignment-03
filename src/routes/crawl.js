const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');

// [GET] 사람인 채용공고 크롤링
router.get('/saramin', async (req, res) => {
    try {
        const { page = 1 } = req.query; // 페이지 번호 (기본값: 1)
        const url = `https://www.saramin.co.kr/zf_user/jobs/list?page=${page}`; // 크롤링 대상 URL

        // HTML 데이터 가져오기
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // 크롤링한 데이터를 저장할 배열
        const jobs = [];

        // HTML 구조 분석 및 데이터 추출
        $('.list_item').each((index, element) => {
            const title = $(element).find('.job_tit a').text().trim();
            const company = $(element).find('.corp_name').text().trim();
            const location = $(element).find('.job_condition .loc').text().trim();
            const salary = $(element).find('.job_condition .salary').text().trim();

            jobs.push({
                title,
                company,
                location,
                salary,
            });
        });

        // 결과 반환
        res.json({ page, jobs });
    } catch (error) {
        console.error('Error during crawling:', error);
        res.status(500).json({ error: 'Failed to crawl data from Saramin' });
    }
});

module.exports = router;
