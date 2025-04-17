import axios from 'axios';

export default axios.create({
	baseURL: 'https://f5fe-216-138-37-100.ngrok-free.app/API/v1',
	timeout: 10000, // 10 second timeout
});
