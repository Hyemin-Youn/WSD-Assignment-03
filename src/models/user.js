const express = require('express');
const mongoose = require('mongoose');
const Job = require('./models/Job'); // 위에서 만든 스키마

const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/jobPortal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

// 채용 공고 조회 API
app.get('/jobs', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

// 채용 공고 등록 API
app.post('/jobs', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.send(newJob);
});

// 서버 실행
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
