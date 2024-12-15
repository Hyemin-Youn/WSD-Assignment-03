const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = path.join(__dirname, 'data/jobs.csv'); // CSV 파일 경로
const jsonFilePath = path.join(__dirname, 'data/jobs.json'); // JSON 파일 저장 경로

const jobs = []; // JSON 데이터를 담을 배열

// CSV 파일 읽기 및 변환
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    jobs.push(row); // 각 행 데이터를 JSON 배열에 추가
  })
  .on('end', () => {
    // JSON 파일로 저장
    fs.writeFileSync(jsonFilePath, JSON.stringify(jobs, null, 2), 'utf-8');
    console.log(`CSV 데이터가 JSON 파일로 변환되었습니다: ${jsonFilePath}`);
  })
  .on('error', (err) => {
    console.error('CSV 파일 읽기 중 오류 발생:', err);
  });
