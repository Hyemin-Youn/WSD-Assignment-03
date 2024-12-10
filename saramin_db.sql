-- 데이터베이스 생성 (필요시)
CREATE DATABASE saramin_db;

-- 데이터베이스 선택
USE saramin_db;

-- jobs 테이블 생성
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company_id INT,
    location VARCHAR(255),
    salary VARCHAR(255),
    employment_type ENUM('정규직', '계약직', '인턴', '프리랜서'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);
