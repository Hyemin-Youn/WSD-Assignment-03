const axios = require('axios');
const cheerio = require('cheerio');

const scrapeSaramin = async () => {
  try {
    const response = await axios.get('https://www.saramin.co.kr/zf_user/jobs'); // 사람인 채용공고 URL
    const html = response.data;
    const $ = cheerio.load(html);

    const jobs = [];
    $('.item_recruit').each((i, element) => {
      const title = $(element).find('.job_tit').text().trim();
      const company = $(element).find('.corp_name').text().trim();
      const location = $(element).find('.job_condition > a').text().trim();
      const postedAt = $(element).find('.date').text().trim();

      jobs.push({ title, company, location, postedAt });
    });

    console.log(jobs);
    return jobs;
  } catch (error) {
    console.error('Error scraping Saramin:', error);
  }
};

scrapeSaramin();
