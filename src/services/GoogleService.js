import { publicAxios } from "./axios.service"

export const loginwithgoogle=(data)=>{
    return publicAxios.post(`/auth/google`,data).then(res=>res.data);
}