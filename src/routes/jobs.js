const express = require('express');
const Job = require('../models/Job'); // Job 스키마
const router = express.Router();

// 공고 목록 조회
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find(); // MongoDB에서 모든 공고 가져오기
        res.json({ jobs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// 공고 상세 조회
router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json({ job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// 공고 등록
router.post('/', async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
});

// 공고 수정
router.put('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json({ message: 'Job updated successfully', job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job' });
    }
});

// 공고 삭제
router.delete('/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
});

module.exports = router;
