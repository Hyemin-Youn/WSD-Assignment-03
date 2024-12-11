const puppeteer = require('puppeteer');

async function scrapeSaramin() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.saramin.co.kr/zf_user/jobs/list/job-category', {
        waitUntil: 'domcontentloaded',
    });

    const jobs = await page.evaluate(() => {
        const results = [];
        const items = document.querySelectorAll('.item_recruit');
        items.forEach(item => {
            const title = item.querySelector('.job_tit').innerText.trim();
            const company = item.querySelector('.corp_name').innerText.trim();
            const link = item.querySelector('.job_tit a').href;
            results.push({ title, company, link });
        });
        return results;
    });

    await browser.close();
    return jobs;
}

module.exports = { scrapeSaramin };
