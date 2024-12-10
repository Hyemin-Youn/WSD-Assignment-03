const express = require('express');
const router = express.Router();

// 북마크 추가/제거
router.post('/', (req, res) => {
    const { jobId, userId } = req.body;
    // 북마크 추가/제거 로직
    res.status(201).json({ message: 'Bookmark toggled successfully' });
});

// 북마크 목록 조회
router.get('/', (req, res) => {
    // 사용자별 북마크 목록 조회 로직
    res.json({ bookmarks: [] });
});

module.exports = router;
