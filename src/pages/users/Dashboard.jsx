
import { Outlet,Navigate} from 'react-router-dom'

import {} from 'react-bootstrap';

import { isLoggedIn } from '../../auth/HelperAuth';
import useJwtTokenExpiration from '../../hooks/useJwtTokenExpiration';

const Dashboard=()=>{
    const flag=useJwtTokenExpiration()

    // const redirect=useNavigate();

    // conditional rendering
    //private Dashboard View
    const dashboardView=()=>{
        return(
            <>
                    
                {/* nested */}

                <Outlet/>

            </>
        )
    }
    

    return(
       (isLoggedIn())?dashboardView():<Navigate to="/login"/>
    )
}

export default Dashboard;