const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 443; // HTTP 포트

// 기본 경로
app.get('/', (req, res) => {
  res.send('Welcome to the Saramin Jobs API! Use /api/jobs to fetch job listings.');
});

// 사람인 채용공고 크롤링 API
app.get('/api/jobs', async (req, res) => {
  try {
    const response = await axios.get('https://www.saramin.co.kr/zf_user/jobs/list/domestic');
    const html = response.data;
    const $ = cheerio.load(html);

    const jobs = [];

    $('.item_recruit').each((_, element) => {
      const title = $(element).find('.job_tit a').text().trim();
      const company = $(element).find('.corp_name a').text().trim();
      const location = $(element).find('.job_condition span').first().text().trim();
      const posted_date = $(element).find('.job_date').text().trim();

      jobs.push({ title, company, location, posted_date });
    });

    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).send('Failed to fetch job postings');
  }
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
