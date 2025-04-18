import axios from 'axios';

export default axios.create({
	baseURL: process.env.API_URL,
	timeout: 10000, // 10 second timeout
});
