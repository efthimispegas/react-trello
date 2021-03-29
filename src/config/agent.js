import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:3000/api';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 500;

export default axios;
