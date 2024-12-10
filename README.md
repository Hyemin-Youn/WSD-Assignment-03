
# WSD-Assignment-03: Saramin Job Posting Backend

## Project Description
This project implements a backend server to scrape job postings from Saramin, store them in MongoDB, and provide RESTful APIs for job management.

## Features
- Web scraping using BeautifulSoup and Requests
- Job postings storage in MongoDB
- REST API for CRUD operations and JWT-based authentication
- API documentation using Swagger

## Installation and Setup
1. Install required packages:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the scraper to populate MongoDB with job data:
   ```bash
   python src/crawl_saramin.py
   ```
3. Start the Flask server:
   ```bash
   python src/app.py
   ```
4. Access Swagger documentation at: `http://localhost:5000/swagger`.

## Deployment
- The server can be deployed on JCloud or any other cloud provider.

## File Structure
- `src/`: Source code for scraping and API server.
- `swagger/`: Swagger API documentation files.
- `data/`: Contains exported data from MongoDB (if needed).
