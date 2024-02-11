import {ListGroup,Badge} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { GrHome } from "react-icons/gr";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdOutlineViewCompactAlt } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { MdViewList } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { doLogoutFromLocalStorage } from '../../auth/HelperAuth';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';






const SideMenu=()=>{

    const userContext=useContext(UserContext)
    const doLogout=()=>{
        userContext.logout()
       }

    return (
        <>
        <div id='sidemenu'>
         <ListGroup variant='flush'className='d-flex justify-content-between align-items-end sticky-top fixed'>
            <ListGroup.Item as={NavLink} to="/admin/home" action >
               <GrHome size={20}/>
              <span className='ms-2'>Home</span>
                </ListGroup.Item>

                    <ListGroup.Item as={NavLink} to="/admin/add-category"  action>
                        <BiSolidCategoryAlt size={20} />
                       <span className='ms-2'> AddCategory</span>
                        </ListGroup.Item>
                    <ListGroup.Item as={NavLink} to="/admin/categories" action>

                    <MdOutlineViewCompactAlt size={20} />
                       <span className='ms-2'> View Category</span>
                    </ListGroup.Item>
                    <ListGroup.Item as={NavLink} to="/admin/add-product" action>
                        <MdAddBox size={20}/>
                        <span className='ms-2'>Add Products</span>
                    </ListGroup.Item>
                    <ListGroup.Item as={NavLink} to="/admin/products"  action >
                        <MdViewList size={20}/>
                        <span className='ms-2'>View Products</span>
                    </ListGroup.Item>
                    <ListGroup.Item as={NavLink} to="/admin/orders" action >
                        <IoCartSharp size={20}/>
                        <span className='ms-2' >Orders</span>
                    </ListGroup.Item>
                    <ListGroup.Item as={NavLink} to="/admin/users" action className='d-flex justify-content-between align-items-start' >
                <div>
                <FaUsers size={20}/>
               
                <span className='ms-2'>Users</span>
                </div>

                <Badge bg="danger" pill>
                    new
                </Badge>
                
                </ListGroup.Item>
            <ListGroup.Item as={NavLink} to="/users/home" action >
                <MdDashboard size={20}/>
                <span className='ms-2' >Dashboard</span>
            </ListGroup.Item>
            <ListGroup.Item onClick={doLogout} as={NavLink} to="/users/home" action >
                <IoLogOutOutline size={20}/>
                <span className='ms-2' >Logout</span>
            </ListGroup.Item>
          
          </ListGroup>
          </div>
        </>
    )
}
export default SideMenu