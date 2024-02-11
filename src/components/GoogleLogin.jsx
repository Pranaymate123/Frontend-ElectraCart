import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { loginwithgoogle } from '../services/GoogleService';
import {NavLink,useNavigate,Navigate} from 'react-router-dom'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import GoogleButton from 'react-google-button'

function SignIn() {

    
    const redirect=useNavigate();

    const userContext=useContext(UserContext)



  const handleSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    // console.log(credentialResponse.data.token)
    const decoded=jwtDecode(credentialResponse.credential)
    

    loginwithgoogle(credentialResponse).then(data=>{
        console.log(data)
        userContext.login(data)
        redirect("/users/home")
    }).catch(error=>{
        console.log(error)
    })

   

  };

  const handleError = () => {
    console.log('Login Failed');
  };

 

  return (
   
    <GoogleLogin
    theme="filled_black"
        width={300}
        useOneTap

        onSuccess={handleSuccess}
        onError={handleError}
        text='Sign in with Google'
      
    />
    
  );
}

export default SignIn