import axios from 'axios';


const instanceAPI = axios.create({
    baseURL: 'https://dev-1.dev.customary.io/api/v2'
})


instanceAPI.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
    // config.headers.accesss = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNTE0MTAxLCJpYXQiOjE2NzA1MTExMDEsImp0aSI6IjhlMmRlNjA1NGVlZjQ4MGJiOTQ0OGZjMWUzZjdhNmY2IiwidXNlcl9pZCI6NTUzfQ.bQvMGGPLy24VsG9ExikTQA6Gz6V_G1BGeSkWnu1Ht-A`
    return config;
})

export default instanceAPI;