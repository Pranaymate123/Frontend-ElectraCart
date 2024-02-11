

//data save localstorage

export const doLoginLocalStorage=(data)=>{
    localStorage.setItem("userData",JSON.stringify(data));
}


///check Login
export const isLoggedIn=()=>{
    if(getTokenFromLocalStorage())
    {
        //server call
        return true
    }
    return false
}


// data : fetch
export const getUserFromLocalStorage=()=>{

    const data=getDataFromLocalStorage()
   if(data!=null)
   {

    return data.user;
   }
   return null;

}

export const getTokenFromLocalStorage=()=>{

   const data=getDataFromLocalStorage()
   if(data!=null)
   {

        return data.jwtToken;
   }
   return null;

}

export const getDataFromLocalStorage=()=>{
    let data=localStorage.getItem("userData");
    if(data!=null)
    {
        
        return JSON.parse(data);
    }
    return null;
}


export const isAdminUser=()=>
{
    if(isLoggedIn()){

        const user=getUserFromLocalStorage();
        const roles=user.roles
        //admin role id===> jh674t67regasuyytr348743yg7834
        if(roles.find((role)=>role.roleId ==='jh674t67regasuyytr348743yg7834'))
        {
            return true
        }  
        else
        {
            return false;
        } 

    }
    else{
        return false
    }

}



//data : remove  logout
export const doLogoutFromLocalStorage=()=>{
    localStorage.removeItem("userData");
}

