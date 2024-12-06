const express = require('express');
const router = express.Router();
const jobsController = require('../controllers/jobsController');
const authController = require('../controllers/authController');

// 채용 공고 API
router.get('/jobs', jobsController.getAllJobs);
router.post('/jobs', jobsController.createJob);

// 회원 인증 API
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

module.exports = router;
