const axios = require('axios');
const cheerio = require('cheerio');

exports.crawlSaramin = async () => {
    try {
        const response = await axios.get('https://www.saramin.co.kr/zf_user/');
        const $ = cheerio.load(response.data);
        let jobs = [];
        $('selector').each((index, element) => {
            // 크롤링 로직 작성
        });
        return jobs;
    } catch (error) {
        console.error('Failed to crawl Saramin:', error);
    }
};
