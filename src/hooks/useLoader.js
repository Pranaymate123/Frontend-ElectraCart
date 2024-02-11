import React, { useEffect,useState } from 'react'
import { privateAxios, publicAxios } from '../services/axios.service'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const useLoader = () => {

    const [loading,setLoading] =useState(false)
    const MySwal = withReactContent(Swal)


    useEffect(()=>{
         ///request interceptor
            privateAxios.interceptors.request.use((config)=>{
                setLoading(true)
                return config
            },(error)=>{
                return Promise.reject(error)
            })
            ///response interceptor
            privateAxios.interceptors.response.use((config)=>{
                setLoading(false)
                return config
            },(error)=>{
                setLoading(false)
        
                if(error.code==="ERR_NETWORK")
                {
                MySwal.fire({
                    title:"Network Error",
                    html:<p>Backend Server Busy ,Please try again later</p>,
                    icon:'info',
                })
                }
            
                return Promise.reject(error)
            })
        
            //public axios
            publicAxios.interceptors.request.use((config)=>{
                setLoading(true)
                return config
            },(error)=>{
                setLoading(false)
            })
            ///request interceptor
            publicAxios.interceptors.response.use((config)=>{
                setLoading(false)
                return config
            },(error)=>{
                setLoading(false)
                if(error.code==="ERR_NETWORK")
                {
                MySwal.fire({
                    title:"Network Error",
                    html:<p>Backend Server Busy ,Please try again later</p>,
                    icon:'info'
                })
                }
                
                return Promise.reject(error)
            })
        
  
  
    },[])
  return (
    loading
  )
}

export default useLoader