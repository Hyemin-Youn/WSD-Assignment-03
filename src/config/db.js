const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: 'yhm',
    user: 'yhm',
    password: 'MySQL@Secure02',
    database: 'saramin',
});

async function saveJobsToDatabase(jobs) {
    try {
        for (const job of jobs) {
            const { title, company, location, salary } = job;

            // 데이터 삽입 쿼리
            const sql = `
                INSERT INTO jobs (title, company, location, salary)
                VALUES (?, ?, ?, ?)
            `;

            await db.query(sql, [title, company, location, salary]);
        }
        console.log('Jobs saved to database');
    } catch (error) {
        console.error('Error saving jobs to database:', error);
    }
}

// 크롤링 후 데이터 저장
crawlSaraminJobs().then(saveJobsToDatabase);
