import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';

axios.defaults.headers.common['authorization'] = `BEARER ${localStorage.getItem('token')}`;

export default axios;
