const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Retrieve all job listings
 *     responses:
 *       200:
 *         description: A list of job postings
 */
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job posting
 *     responses:
 *       201:
 *         description: Job created
 */
router.post('/', async (req, res) => {
  const newJob = new Job(req.body);
  await newJob.save();
  res.status(201).json(newJob);
});

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Retrieve a job by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Job ID
 *     responses:
 *       200:
 *         description: A single job posting
 */
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).json({ message: 'Job not found' });
  }
});

/**
 * @swagger
 * /api/jobs/search:
 *   get:
 *     summary: Search for jobs by keyword
 *     parameters:
 *       - in: query
 *         name: keyword
 *         required: false
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: A list of jobs matching the search criteria
 */
router.get('/search', async (req, res) => {
  const { keyword } = req.query;
  const jobs = await Job.find({
    $or: [
      { title: { $regex: keyword, $options: 'i' } },
      { company: { $regex: keyword, $options: 'i' } },
      { location: { $regex: keyword, $options: 'i' } },
    ],
  });
  res.status(200).json(jobs);
});

module.exports = router;
