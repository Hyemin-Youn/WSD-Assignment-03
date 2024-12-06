# saramin
# Saramin Backend API
## 프로젝트 개요
사람인 채용 공고 데이터를 크롤링하여 제공하는 백엔드 API 서버입니다.

## 사용 기술
- Node.js (Express)
- MySQL
- Cheerio (웹 크롤링)
- Swagger (API 문서화)

## 사용 방법
1. `npm install`로 패키지 설치
2. `src/config/db.js` 파일에 MySQL 설정
3. `node src/app.js`로 서버 실행

## API
### 채용 공고
- `GET /api/jobs`
- `POST /api/jobs`

### 회원 인증
- `POST /api/auth/register`
- `POST /api/auth/login`
