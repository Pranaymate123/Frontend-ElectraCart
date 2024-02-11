import { privateAxios, publicAxios } from "./axios.service"


//User Related Api Calls


//register new user

export const registerUser=(userData)=>{
    return publicAxios.post('/users',userData).then(res=> res.data);
}

//login User 

export const loginUser=(loginData)=>{
    return publicAxios
    .post(`/auth/login`,loginData)
    .then(res=> res.data);
}

//get userdata from user id 

export const getUser=(userId)=>{
   return  publicAxios.get(`/users/${userId}`).then(response => response.data);
}

//update user
export const updateUser=(user)=>{
   return  privateAxios.put(`/users/${user.userId}`,user).then(response=>response.data)
}

//update user Profile Image
export const updateUserProfileImage=(file,userId)=>{
    if(file==null)
    {
        return
    }
    const data=new FormData()
    data.append("userImage",file);
    return privateAxios.post(`/users/image/${userId}`,data).then(response=>response.data)

}

//get all users
export const getAllUsers=async(pageNumber=0,pageSize=10,sortBy="name",sortDir="asc")=>{
   let result=await privateAxios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
   return result.data;
}

///Search User By Name

export const getUserByName=async(name)=>{
    const result=await publicAxios.get(`/users/search/${name}`);
    return result.data;
 }

 //forgot password
 export const getOtp=async(email)=>{
    const result=await publicAxios.post(`/forgot-password/${email}`)
    return result.data;
 }
 export const getOtpToRegister=async(email)=>{
   const result=await publicAxios.post(`/register/${email}`)
   return result.data;
}


 // VERIFY OTP
 export const verifyOtp=async(otp)=>{
    const result=await publicAxios.post(`/forgot-password/verify-otp/${otp}`)
    return result.data;
 }

 //update password 
 export const changePassword=async(data,email)=>{
    const result=await publicAxios.put(`/users/change-password/${email}`,data);
    return result.data;
 }
