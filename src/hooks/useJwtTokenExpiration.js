import React, { useContext, useEffect, useState } from 'react'
import { getTokenFromLocalStorage } from '../auth/HelperAuth'
import { isJwtExpired } from 'jwt-check-expiration';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import UserContext from '../context/UserContext';
const useJwtTokenExpiration = () => {
    const{logout} =useContext(UserContext)
    const navigate=useNavigate()
    const [flag,setFlag]=useState(false);
   useEffect(()=>{
    const token= getTokenFromLocalStorage()
    try {

        if(isJwtExpired(token))
   {
    console.log("Tpoken is Expired ")
    setFlag(true)
    toast.error("Session Expired !!!")
    logout()
    navigate("/login")
   }
        
    } catch (error) {
        console.log(error)
    }   
   },[])
   return flag
}

export default useJwtTokenExpiration