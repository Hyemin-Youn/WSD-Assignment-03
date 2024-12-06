const pool = require('../config/db');

exports.getAllJobs = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM jobs');
        res.status(200).json({ data: rows });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

exports.createJob = async (req, res) => {
    const { title, company, location, description } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO jobs (title, company, location, description) VALUES (?, ?, ?, ?)', [title, company, location, description]);
        res.status(201).json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};
