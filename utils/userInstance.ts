import axios from "axios"

export const baseUrl = "https://hotgiostblogbackend.onrender.com/api/"
// export const baseUrl = "http://127.0.0.1:8000/api/"


export async function userInstance(method:string, url:string, data?:any, type?:string) {
    const token = JSON.parse(localStorage.getItem("token") as any)
     const response = await axios({
                method: method,
                headers: {
                    "Content-Type":`${type ? type : "application/json"}`,
                    "Authorization": `Bearer ${token?.access}`
                },
                url: `${baseUrl}${url}/`,
                data:data
                
            })

    return response
}