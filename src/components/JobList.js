import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../api/jobs';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs().then(data => setJobs(data));
    }, []);

    return (
        <div>
            <h1>Job Listings</h1>
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <a href={job.link}>{job.title}</a> - {job.company}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
