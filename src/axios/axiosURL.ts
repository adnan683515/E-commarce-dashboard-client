import axios from "axios";


export const axiosUrl = axios.create({
    baseURL : 'http://localhost:3002/api/v1/'
})