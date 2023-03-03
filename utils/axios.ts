import axios from "axios";

export const AxionsInstance = axios.create({
    baseURL: "https://hotgiostblogbackend.onrender.com/api", 
    timeout: 10000,
    headers: {
        "Content-Type":"application/json",
      
    }
})