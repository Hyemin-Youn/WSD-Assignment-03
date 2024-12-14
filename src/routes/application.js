const express = require('express');
const router = express.Router();

// 예제 라우트
router.get('/', (req, res) => {
  res.send('Application Routes Working!');
});

module.exports = router;
