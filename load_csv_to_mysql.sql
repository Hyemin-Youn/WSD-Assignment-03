LOAD DATA INFILE '/path/to/saramin_jobs.csv'
INTO TABLE saramin_jobs
FIELDS TERMINATED BY ',' 
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(job_group, badge, company_name, title, deadline, address_main, address_total, experience, education, employment_type, salary, tech_stack, createdAt, crawledAt, url, description);
