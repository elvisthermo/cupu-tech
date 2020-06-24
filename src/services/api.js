import axios from 'axios';

const api = axios.create({
    baseURL:"https://api.jsonbin.io/b/5ef39e322406353b2e0bf882/11"
})

export default api;