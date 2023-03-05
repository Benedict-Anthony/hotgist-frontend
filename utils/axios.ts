import axios from "axios";

export const AxionsInstance = axios.create({
    // baseURL: "http://127.0.0.1:8000/api", 
    baseURL: "https://hotgiostblogbackend.onrender.com/api", 
    timeout: 10000,
    headers: {
        "Content-Type":"application/json",
      
    }
})