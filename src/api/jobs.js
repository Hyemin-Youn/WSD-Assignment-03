import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchJobs = async () => {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
};
