const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// GET data from MySQL
router.get('/data', (req, res) => {
  connection.query('SELECT * FROM your_table_name', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Database error');
      return;
    }
    res.json(results);
  });
});

module.exports = router;
