const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

// 채용 공고 조회
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.send(jobs);
});

// 채용 공고 등록
router.post('/', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.send(newJob);
});

module.exports = router;
