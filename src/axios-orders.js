import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ea87d.firebaseio.com/'
})

export default instance;