const fs = require('fs');
const { Parser } = require('json2csv');

const jsonData = JSON.parse(fs.readFileSync('saramin_jobs.json', 'utf8'));
const json2csvParser = new Parser();
const csv = json2csvParser.parse(jsonData);

// CSV 파일로 저장
fs.writeFileSync('saramin_jobs.csv', csv);
console.log('CSV file successfully generated.');
