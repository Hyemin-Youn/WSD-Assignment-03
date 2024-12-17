const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Saramin Job Postings Crawler
 * @param {string} keyword Search keyword
 * @param {number} pages Number of pages to crawl
 */
async function crawlSaramin(keyword, pages = 10) { // 기본 페이지 수를 10으로 늘림
  const jobs = [];
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  };

  for (let page = 1; page <= pages; page++) {
    const url = `https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword=${encodeURIComponent(
      keyword
    )}&recruitPage=${page}`;

    try {
      console.log(`Fetching page ${page} for keyword "${keyword}"...`);
      const response = await axios.get(url, { headers, timeout: 30000 }); // 타임아웃 30초
      const $ = cheerio.load(response.data);

      $('.item_recruit').each((_, element) => {
        const companyName = $(element).find('.corp_name a').text().trim();
        const title = $(element).find('.job_tit a').text().trim();
        const jobUrl =
          'https://www.saramin.co.kr' + $(element).find('.job_tit a').attr('href');
        const badge = $(element).find('.area_badge .badge').text().trim() || '';
        const conditions = $(element).find('.job_condition span');
        const addressMain = $(conditions[0]).text().trim() || '';
        const experience = $(conditions[1]).text().trim() || '';
        const education = $(conditions[2]).text().trim() || '';
        const employmentType = $(conditions[3]).text().trim() || '';
        const deadline = $(element).find('.job_date .date').text().trim() || '';
        const jobGroup = $(element).find('.job_sector').text().trim() || '';

        jobs.push({
          job_group: jobGroup,
          badge: badge,
          company_name: companyName,
          title: title,
          deadline: deadline,
          address_main: addressMain,
          address_total: addressMain,
          experience: experience,
          education: education,
          employment_type: employmentType,
          salary: '',
          tech_stack: '',
          createdAt: new Date().toISOString(),
          crawledAt: new Date().toISOString(),
          url: jobUrl,
          description: '',
        });
      });

      console.log(`Page ${page} for keyword "${keyword}" completed.`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 딜레이 추가
    } catch (error) {
      console.error(`Error on page ${page} for keyword "${keyword}":`, error.message);
    }
  }

  return jobs;
}

(async () => {
  const keywords = ['python', 'java', 'react']; // 여러 키워드 추가
  const pages = 3; // 각 키워드당 5페이지 크롤링
  let totalJobs = [];

  console.log('Starting Saramin job postings crawling...');
  try {
    for (const keyword of keywords) {
      const jobResults = await crawlSaramin(keyword, pages);
      totalJobs = totalJobs.concat(jobResults);
    }

    // 중복 제거 (URL을 기준으로)
    const uniqueJobs = Array.from(new Set(totalJobs.map((job) => job.url)))
      .map((url) => totalJobs.find((job) => job.url === url));

    console.log(`Total jobs crawled: ${uniqueJobs.length}`);
    fs.writeFileSync('saramin_jobs.json', JSON.stringify(uniqueJobs, null, 2), 'utf8');
    console.log('Crawling results saved to saramin_jobs.json file.');
  } catch (error) {
    console.error('Critical Error:', error.message);
  }
})();
