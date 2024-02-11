import {Container,Col,Row} from 'react-bootstrap'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import {Link} from 'react-router-dom'


const Footer=()=>{
    return(
        <>
        <div className='bg-black'>
        <Container  className=' p-5  text-light'>
            <Row>
                <Col  className='text-start mb-3'>
                    <span  className='h2'>
                        
                    <img
          
                    className="mx-3 my-1"
                    src="/assets/logo2.png"
                    alt="Bootstrap"
                    width="50"
                    height="44"
                    
                    />
                        ElectraCart</span>
                </Col>
            </Row>
            <Row>
            <Col md={3}>
                <h5 className=' footer-icon' >Company</h5>
                <h5 className=' footer-icon' >About</h5>
                <h5 className=' footer-icon' >Services</h5>
                <h5 className=' footer-icon' >Licence</h5>
                <h5 className=' footer-icon' >Contact</h5>
                
                
                
            </Col>
            <Col md={3}>
                <h5  className=' footer-icon' >Privacy Policy</h5>
                <h5  className=' footer-icon'>Terms and Condittions</h5>
                <h5  className=' footer-icon'>Blogs</h5>
                <h5  className=' footer-icon'>Networks</h5>
                
                
                
            </Col>
            <Col md={3}>
              
              <Row>
                <Col as={Link} to='https://www.instagram.com/pranay_mate07/'>
                    <FaInstagram  className='fs-4 footer-icon '/>
                </Col>
                <Col as={Link} to="https://www.linkedin.com/in/pranay-mate-895620250/ ">
                    <FaLinkedin className='fs-4  footer-icon'/>
                </Col>
                <Col as={Link} to="https://github.com/Pranaymate123">
                    <FaGithub className='fs-4  footer-icon'/>
                </Col>
                <Col  as={Link} to="https://www.facebook.com/pranay.mate.37/ ">
                    <FaFacebookF  className='fs-4  footer-icon'/>
                </Col>
                <Col >
                    <MdEmail className='fs-4  footer-icon'/>
                </Col>
              </Row>
                
            </Col>
            <Col md={3}>
            </Col>

            
            </Row>
            <Row className='text-center mt-3 mb-3'>
                <p>&copy;www.electracart.org.com  </p>
            </Row>
           
        </Container>
        </div>
        </>
    )
}

export default Footer;