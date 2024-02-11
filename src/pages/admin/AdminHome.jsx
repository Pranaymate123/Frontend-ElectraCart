import {Container,Col,Row,Card,Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { BiSolidObjectsVerticalBottom } from "react-icons/bi";
import { MdOutlineViewCompactAlt } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import AdminDashboardCard from '../../components/admin/AdminDashboardComponent';

import Admin from './../../assets/admin.png'


const AdminHome=()=>{
    return(
      <>
        <Container>
            <Row className='d-flex flex-wrap-reverse'>
                <Col >
                    <Card className='shadow text-center border-0'>
                        <Card.Body>
                            <h3 className='text-center' >Welcome To Admin Dashboard</h3>
                            <p className='text-muted text-center'>Customize dashboard for admin to add,categories,to add product,to view categoories , to view products Manage users and Much More .</p>
                            <p>Start Managing Products</p>
                            <Container className='d-grid gap-3'>
                                <Button as={Link} to={'/admin/categories'} className='' variant='outline-secondary'>Start Managing Categories</Button>
                                <Button as={Link} to={'/admin/products'} className='' variant='outline-secondary'>Start Managing Products</Button>
                                <Button as={Link} to={'/admin/users'} className='' variant='outline-secondary'>Start Managing Users</Button>
                                <Button as={Link} to={'/admin/orders'} className='' variant='outline-secondary'>Start Managing Orders</Button>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    
                        <Container className='d-flex justify-content-center align-items-center  h-100'>

                                <img width={300} height={300} style={{
                           
                        }} src={Admin}/> 
                       </Container>
                </Col>
            </Row>
            <Row className='mt-5'>
                <Col md={6}>

                <AdminDashboardCard
                    icon={ <BiSolidObjectsVerticalBottom  size={80}/>}
                    text={'No Of Products'}
                    number={'45454'}
                    />
                   
                </Col>
                <Col md={6}>
                
                <AdminDashboardCard
                    icon={ <MdOutlineViewCompactAlt  size={80}/>}
                    text={'No Of Categories'}
                    number={'15'}
                    />
                   
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col md={6}>

                <AdminDashboardCard
                    icon={ <IoCartSharp  size={80}/>}
                    text={'No Of Orders'}
                    number={'454'}
                    />
                 
                </Col>
                <Col md={6}>
                    <AdminDashboardCard
                    icon={ <FaUsers  size={80}/>}
                    text={'No Of Users'}
                    number={'115'}
                    />
                  
                </Col>
            </Row>
        </Container>
      </>
    )
}
export default AdminHome; 