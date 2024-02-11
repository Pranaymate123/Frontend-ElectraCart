import { useContext } from "react";
import UserContext from "../../context/UserContext";
import {Container,Button} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
const Home=()=>{

    const userContext=useContext(UserContext)

    return (
        <>
          <div className='mt-5' style={{
        height:"100vh"
   }}>
        <Container className="text-center mt-5">
             <h4 className="text-light text-center">Welcome {userContext?.userData?.user?.name}</h4> 
             <Button variant="info" as={NavLink} to={`/users/profile/${userContext?.userData?.user?.userId}`} >
                  Go to your Profile 
                  </Button>
        </Container> 
        </div>  
        </>
    )
}

export default Home;