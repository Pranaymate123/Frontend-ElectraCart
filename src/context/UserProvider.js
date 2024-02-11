import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isLoggedIn,isAdminUser  as adminUser} from "../auth/HelperAuth"

const UserProvider=({children})=>{

    //the data which can be globally used by all the components
    const [isLogin,setIsLogin]=useState(false)
    const [userData,setUserData]=useState(null)
    const [isAdminuser,setIsAdminuser]=useState(false)
    /*
    userData:{
        jwt:"",
        user:{
            name:"",
            email:"",
            password:""
        }
    }
    */
   //when page lods this runs
   useEffect(()=>{
    setIsLogin(isLoggedIn());
    setIsAdminuser(adminUser())
    setUserData(getDataFromLocalStorage())
   },[])

   const doLogin=(data)=>{
    doLoginLocalStorage(data);
    setIsLogin (true)
    setIsAdminuser(adminUser())
    setUserData(getDataFromLocalStorage())
   }

   const doLogout=()=>{
    doLogoutFromLocalStorage();
    setIsLogin(false)
    setIsAdminuser(adminUser())

    setUserData(null)

   }

    return(
        <UserContext.Provider value={
            {userData:userData,
                setUserData:setUserData,
            isLogin:isLogin,
            setIsLogin:setIsLogin,
            login:doLogin,
            logout:doLogout,
            isAdminuser:isAdminuser,
            setIsAdminuser:setIsAdminuser
        }
            }>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider