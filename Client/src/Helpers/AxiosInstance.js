import axios from 'axios';

console.log("BASE URL:", import.meta.env.VITE_BASE_URL);
const BASE_URL = import.meta.env.VITE_BASE_URL;

const AxiosInstance = axios.create({
    baseURL: BASE_URL,      //baseURL ensures all API calls automatically prepend your backend URL
    withCredentials: true   //withCredentials: true allows cookies/session handling (important for auth)
    
});


export default AxiosInstance;