import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://maciej-my-burger.firebaseio.com'
});

export default instance;