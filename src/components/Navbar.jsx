import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink,Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import {Badge} from 'react-bootstrap'


const CustomNavbar = () => {

    const userContext=useContext(UserContext);
    const {cart} =useContext(CartContext)
    const doLogout=()=>{
     userContext.logout()
    }

  return (
    <Navbar collapseOnSelect expand="lg" bg="" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img
          
            className="mx-3 my-1"
            src="/assets/logo2.png"
            alt="Bootstrap"
            width="50"
            height="44"
            
          />
          ElectraCart
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {/* <Nav.Link as={NavLink} to="/services">Features</Nav.Link>

     
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link> */}
          </Nav>
          <Nav>
          <Nav.Link as={NavLink} to="/store">Store </Nav.Link>
          <Nav.Link as={NavLink} to="/cart">Cart {cart && <Badge hidden={!userContext.isLogin} bg="danger " className="" style={{borderRadius:"50%"}}>{ cart.items.length}</Badge>}</Nav.Link>

            {/* //conditional renering  */}
            {
              (userContext.isLogin) ? 
              <>
               
               {(userContext.isAdminuser) && <>
                <Nav.Link as={NavLink} to="/admin/home">AdminDashboard</Nav.Link>
               </>}

                <Nav.Link as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`}>
                  Profile
                  </Nav.Link>
                <Nav.Link as={NavLink} to="/users/orders" hidden={!userContext.isLogin}>Orders</Nav.Link>
                <Nav.Link as={NavLink} to="/login" onClick={doLogout} >Logout </Nav.Link>
              </>  : ( <>
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="/register">Sign Up</Nav.Link>
              </> )
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
