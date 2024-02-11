import React, { useState } from 'react'
import {Container,Card,Form,Button,Alert} from 'react-bootstrap'
import { verifyOtp } from '../../services/user.service';
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
const VerifyOtp = () => {
    const [otp,setOtp]=useState(undefined);
    const msg=sessionStorage.getItem("msg");
    const status=sessionStorage.getItem("status");
    const redirect=useNavigate();

    const handleSubmitForm=async(event)=>{
        event.preventDefault();

        try {
            const response=await verifyOtp(otp);
            console.log(response)
            if(response.verified)
            {
                console.log("User verified successfully ")
                toast.success("User verified successfully",{
                    position:"top-right"
                })
                redirect("/forgot-password/change-password");

            }else
            {
                toast.error("Invalid otp ",{
                    position:"top-right"
                })
                console.log("Invalid Otp")
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
         <div className='mt-5' style={{
        height:"100vh"
   }}>
         <Container className='col-md-6'>
             <Card>
                 <Card.Body>
                     <h1 className='text-center'>Enter the otp Here </h1>
                     <Form className='mt-3' onSubmit={event=>handleSubmitForm(event)}>
                        <Alert variant={status?'success':'warning'}>  {msg} </Alert>
                         <Form.Group>
                             <Form.Label>Enter the Otp </Form.Label>
                             {/* {JSON.stringify(email)} */}
                             <Form.Control type='number' 
                             value={otp}
                             onChange={event=>setOtp(event.target.value)}
                             />
                         </Form.Group>
     
                         <Container className='text-center mt-3'>
                             <Button type='submit' variant='success'>Verify OTP</Button>
                         </Container>    
                     </Form>
                 </Card.Body>
             </Card>
         </Container>
         </div>
        </>
       )
}

export default VerifyOtp