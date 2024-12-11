const express = require('express');
const { getJobs, addJob, updateJob, deleteJob } = require('../controllers/jobController');
const router = express.Router();

router.get('/', getJobs); // 채용 공고 조회
router.post('/', addJob); // 채용 공고 추가
router.put('/:id', updateJob); // 채용 공고 수정
router.delete('/:id', deleteJob); // 채용 공고 삭제

module.exports = router;
