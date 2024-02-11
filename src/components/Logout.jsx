import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";

const clientId="424683512832-vt82uohb9ri2f51rvah1r9c64dr443gk.apps.googleusercontent.com"

function Logout(){
    const onSuccess =()=>{
        console.log("Log Out Successfull");
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText={"LogOut"}
            onLogOutSuccess={onSuccess}
            />

        </div>
    )
}

export default Logout