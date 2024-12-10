const express = require('express');
const router = express.Router();

// 지원하기
router.post('/', (req, res) => {
    const { jobId, userId } = req.body;
    // 지원 정보 저장 로직
    res.status(201).json({ message: 'Application submitted successfully' });
});

// 지원 내역 조회
router.get('/', (req, res) => {
    // 사용자별 지원 내역 조회 로직
    res.json({ applications: [] });
});

// 지원 취소
router.delete('/:id', (req, res) => {
    const applicationId = req.params.id;
    // 지원 취소 로직
    res.json({ message: `Application ${applicationId} cancelled successfully` });
});

module.exports = router;
