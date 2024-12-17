const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

/**
 * Saramin Job Postings Crawler
 * @param {string} keyword Search keyword
 * @param {number} pages Number of pages to crawl
 */
async function crawlSaramin(keyword, pages = 1) {
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
      console.log(`Fetching page ${page}...`);
      const response = await axios.get(url, { headers, timeout: 30000 }); // 타임아웃 설정: 30초
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

        // 공고 상세 설명은 링크를 따라가서 추출 가능
        const description = '';

        jobs.push({
          job_group: jobGroup,
          badge: badge,
          company_name: companyName,
          title: title,
          deadline: deadline,
          address_main: addressMain,
          address_total: addressMain, // 상세 주소가 없어서 메인 주소와 동일
          experience: experience,
          education: education,
          employment_type: employmentType,
          salary: '',
          tech_stack: '',
          createdAt: new Date().toISOString(),
          crawledAt: new Date().toISOString(),
          url: jobUrl,
          description: description,
        });
      });

      console.log(`Page ${page} crawling completed.`);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 딜레이 추가
    } catch (error) {
      console.error(`Error on page ${page}:`, error.message);
    }
  }

  return jobs;
}

(async () => {
  const keyword = 'python'; // 검색할 키워드
  const pages = 2; // 크롤링할 페이지 수

  console.log('Starting Saramin job postings crawling...');
  try {
    const jobResults = await crawlSaramin(keyword, pages);

    if (jobResults.length > 0) {
      console.log('Crawling Results:', jobResults);
      fs.writeFileSync('saramin_jobs.json', JSON.stringify(jobResults, null, 2), 'utf8');
      console.log('Crawling results saved to saramin_jobs.json file.');
    } else {
      console.log('No job postings found.');
    }
  } catch (error) {
    console.error('Critical Error:', error.message);
  }
})();
