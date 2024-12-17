-- 데이터베이스 선택
USE saramin;

-- saramin_jobs 테이블 생성
CREATE TABLE saramin_jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_group VARCHAR(255),
    badge VARCHAR(255),
    company_name VARCHAR(255),
    title VARCHAR(255),
    deadline VARCHAR(50),
    address_main VARCHAR(255),
    address_total VARCHAR(255),
    experience VARCHAR(255),
    education VARCHAR(255),
    employment_type VARCHAR(255),
    salary VARCHAR(255),
    tech_stack VARCHAR(255),
    createdAt DATETIME,
    crawledAt DATETIME,
    url VARCHAR(500),
    description TEXT
);
