import React, { useState } from 'react'
import {Container,Card,Form,Button,Spinner} from 'react-bootstrap'
import {toast} from 'react-toastify'
import { getOtp } from '../../services/user.service';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'


const ForgotPassword = () => {
    const redirect=useNavigate();
    const [email,setEmail]=useState(undefined);
    let [loading,setLoading]=useState(false)
    const handleSubmitForm=async (event)=>{
        
        event.preventDefault();
        if( email===undefined || email.trim()==='')
        {
            toast.error("Email Required")
            return;
            
        }

       try {
        setLoading(true)
            const response=await getOtp(email);
            console.log(response);
            if(response.message==="Email is not registered ")
            {
                toast.error(response.message,{
                    position:"top-right"
                })
                return;
            }
            if(response.status==="INTERNAL_SERVER_ERROR")
            {
                toast.error(response.message + "Please Try Again !",{
                    position:"top-right"
                })
                return;

            }
            
            sessionStorage.setItem("status",response.success);
            sessionStorage.setItem("msg",response.message);
            sessionStorage.setItem("email",email);

            redirect("/forgot-password/verify-otp")
       } catch (error) {
            console.log(error)
            
       }finally{
        setLoading(false);
       }

       
    }


  return (

    
   <>
   <div className='mt-5' style={{
        height:"100vh"
   }}>
    <Container className='col-md-6 mt-3'>
        <Card>
            <Card.Body>
                <h1 className='text-center'>Verify Your Email Id </h1>
                <Form className='mt-3' onSubmit={event=>handleSubmitForm(event)}>
                    <Form.Group>
                        <Form.Label>Enter the registerd Email </Form.Label>
                        {/* {JSON.stringify(email)} */}
                        <Form.Control type='text' 
                        value={email}
                        onChange={event=>{
                            setEmail(event.target.value)
                        }}
                        />
                    </Form.Group>

                    <Container className='text-center mt-3'>
                        <Button disabled={loading} type="submit" variant="warning">
                        <Spinner
                                        size="sm"
                                        animation="border"
                                        hidden={!loading}
                                        className="me-2"
                                        />
                                        <span  hidden={!loading}  >Please Wait...</span>
                                        <span hidden={loading} >Send OTP</span>
                                        </Button>
                    </Container>
                   
                </Form>
            </Card.Body>
        </Card>
    </Container>
    </div>
   </>
  )
}

export default ForgotPassword