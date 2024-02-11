
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/services';
import Cart from './pages/Cart';
import Dashboard from './pages/users/Dashboard';
import Profile from './pages/users/UserProfile'
import AboutUser from './pages/users/AboutUser';
import CustomNavbar from './components/Navbar';
import Contact from './pages/Contact';
import {ToastContainer,Flip} from 'react-toastify'
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/users/UserHome';
import UserProvider from './context/UserProvider';
import Order from './pages/users/Order';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import AddCategory from './pages/admin/AddCategory';
import ViewCategories from './pages/admin/ViewCategory';
import ViewProducts from './pages/admin/ViewProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import StorePage from './pages/users/StorePage';
import ProductView from './pages/users/ProductView';
import CategoryStorePage from './pages/users/CategoryStorePage';
import CartProvider from './context/CartProvider';
import Loading from './components/Loading';
import { useEffect } from 'react';

import useLoader from './hooks/useLoader';

import ScrollToTop from "react-scroll-to-top";
import {Container} from 'react-bootstrap'

import Logout from './components/Logout';
import { GoogleOAuthProvider } from '@react-oauth/google';

import ForgotPassword from './pages/users/ForgotPassword';
import VerifyOtp from './pages/users/VerifyOtp';
import ChangePassword from './pages/users/ChnagePassword';
import AnimatedCursor from "react-animated-cursor"
 
function App() {

 const loading=useLoader()

  useEffect(()=>{
   

  },[])


  return (

    <GoogleOAuthProvider clientId="424683512832-vt82uohb9ri2f51rvah1r9c64dr443gk.apps.googleusercontent.com">

    <UserProvider>
      <CartProvider>
      {/* <AnimatedCursor
  innerSize={8}
  outerSize={35}
  innerScale={1}
  outerScale={2}
  outerAlpha={0}
  hasBlendMode={true}
  innerStyle={{
    backgroundColor: 'aqua'
  }}
  outerStyle={{
    border: '3px solid aqua'
  }}
/> */}
        <BrowserRouter>
        <ToastContainer
          position='bottom-center'
          theme='dark'
          draggable
          transition={Flip}
        />
        <CustomNavbar/>
          <Loading show={loading}/>
          <Routes>
          
            <Route path="/" element={<Index/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/login" element={<Login/>}/>
            {/* <Route path="/google-login" element={<SignIn/>}/> */}
            <Route path="/register" element={<Register/>}/>
            <Route path="/store" element={<StorePage/>}/>
            <Route path="store/products/:productId" element={<ProductView/>}/>
            <Route path="store/:categoryId/:categoryTitle" element={<CategoryStorePage/>}/>
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/forgot-password/verify-otp" element={<VerifyOtp/>}/>
            <Route path="/forgot-password/change-password" element={<ChangePassword/>}/>
            
                
            
          

            {/* Normal User */}
            <Route path="/users" element={<Dashboard/>}>
              <Route path="profile/:userId" element={<Profile/>}/>
              <Route path="about" element={<AboutUser/>}/>
              <Route path="home" element={<Home/>}/>
              <Route path="orders" element={<Order/>}/>
            </Route>

            {/* Admin User */}
            <Route path="/admin" element={<AdminDashboard/>}>
              <Route path='home' element={<AdminHome/>}/>
              <Route path='add-product' element={<AddProduct/>}/>
              <Route path='add-category' element={<AddCategory/>}/>
              <Route path='categories' element={<ViewCategories/>}/>
              <Route path='products' element={<ViewProducts/>}/>
              <Route path='orders' element={<AdminOrders/>}/>
              <Route path='users' element={<AdminUsers/>}/>

            </Route>
          </Routes>
        </BrowserRouter>
        <Container className="">
                  
                  <ScrollToTop style={{
                    borderRadius:"30%",
                    background:"#f1f1f1",
                    border:"1px solid aqua"
                  }} color="black"  smooth/>
            </Container>
        </CartProvider>
  </UserProvider>
  </GoogleOAuthProvider>

  );
}
export default App;
