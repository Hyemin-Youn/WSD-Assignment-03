const express = require('express');
const mysql = require('mysql2/promise'); // mysql2 라이브러리 사용
const router = express.Router();


/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve all job listings
 *     description: Get a list of all job postings from the database.
 *     responses:
 *       200:
 *         description: A list of jobs.
 */
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jobs'); // jobs 테이블의 모든 데이터 조회
    res.status(200).json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Database query failed' });
  }
});

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Retrieve all job listings
 *     description: Get a list of all job postings from the database.
 *     responses:
 *       200:
 *         description: A list of jobs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   job_id:
 *                     type: integer
 *                   company:
 *                     type: string
 *                   title:
 *                     type: string
 *                   deadline:
 *                     type: string
 *                     format: date
 *                   address:
 *                     type: string
 */

router.post('/', async (req, res) => {
  const { title, company, location, description } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)',
      [title, company, location, description]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      company,
      location,
      description
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Database insertion failed' });
  }
});

module.exports = router;
