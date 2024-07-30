import axios from 'axios'

const url = axios.create({
    baseURL: ''
});

export const postMessaging = (item)=> url.post('/',item);