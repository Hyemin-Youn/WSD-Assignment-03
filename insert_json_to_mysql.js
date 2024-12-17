const fs = require('fs');
const mysql = require('mysql2/promise');

(async () => {
  try {
    // 1. MySQL 연결 설정
    const connection = await mysql.createConnection({
      host: '0.0.0.0:8080',
      user: 'yhm',   // MySQL 사용자 이름
      password: 'MySQL@Secure02', // 비밀번호
      database: 'saramin'  // 데이터베이스 이름
    });

    console.log('Connected to the MySQL database.');

    // 2. JSON 파일 읽기
    const jsonData = JSON.parse(fs.readFileSync('saramin_jobs.json', 'utf8'));

    // 3. 데이터 삽입 쿼리
    const insertQuery = `
      INSERT INTO saramin_jobs 
      (job_group, badge, company_name, title, deadline, address_main, address_total, experience, education, employment_type, salary, tech_stack, createdAt, crawledAt, url, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const job of jsonData) {
      await connection.execute(insertQuery, [
        job.job_group,
        job.badge,
        job.company_name,
        job.title,
        job.deadline,
        job.address_main,
        job.address_total,
        job.experience,
        job.education,
        job.employment_type,
        job.salary,
        job.tech_stack,
        job.createdAt,
        job.crawledAt,
        job.url,
        job.description
      ]);
    }

    console.log('Data successfully inserted into the MySQL database.');

    // 연결 종료
    await connection.end();
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
