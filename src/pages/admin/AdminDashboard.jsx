import {Outlet} from 'react-router-dom'
import { isAdminUser, isLoggedIn } from '../../auth/HelperAuth'
import {Navigate} from 'react-router-dom'
import {Row,Col,Container,ListGroup} from 'react-bootstrap'
import SideMenu from '../../components/admin/SideMenu'
import ScrollToTop from "react-scroll-to-top";
import useJwtTokenExpiration from '../../hooks/useJwtTokenExpiration'

const AdminDashboard=()=>{
    const flag=useJwtTokenExpiration()

    const dashBoardView=()=>{
        return(
           <div>
            <Container fluid  className=' px-5 py-5'>
                <Row>
                    <Col  md={{
                        span:2,
                        
                       
                    }} className='shadow '>
                       <SideMenu/>
                        </Col>
                        

                    <Col md={10} className='ps-3 pt-2'><Outlet/></Col>
                </Row>
            </Container>
            {/* <Container className="">
                  
                  <ScrollToTop color="#6f00ff"  smooth/>
            </Container> */}
           </div>
        )
    }
    return(
        // if login                       true                                           :         false
        //                  if admin user     true               false
      ( (isLoggedIn())? ((isAdminUser())? dashBoardView():<Navigate to="/users/profile"/>) : <Navigate to="/login"/>)
    //    ((isAdminUser())? dashBoardView() : <Navigate to="/login"/>)
    )
}

export default AdminDashboard;