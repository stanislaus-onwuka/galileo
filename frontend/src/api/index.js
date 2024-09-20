import axios from "axios";

const localBaseURL = "http://localhost:8000"

export const makeApiRequest = axios.create({
    baseURL: localBaseURL,
})

makeApiRequest.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("access_token")
    config.headers['Authorization'] = `Bearer ${accessToken}`
    // config.headers['Content-Type'] = "application/json"
    
    return config;
})