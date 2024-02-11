import { Password } from '@mui/icons-material'
import React, { useState } from 'react'
import {Container,Card,Form,Button,Spinner} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { changePassword } from '../../services/user.service'
const ChangePassword = () => {
    const email=sessionStorage.getItem("email");
    const  [data,setData]=useState({
        password:'',
        confirmPassword:''
    })
    const redirect=useNavigate();

    const handleChange=(event,property)=>{

        setData({
            ...data,
            [property]:event.target.value
        })

    }

    const handleSubmitForm=async(event)=>{
        event.preventDefault();
        if(data.password.trim()==='' || data.password.length<4)
        {
            toast.error("Password Invalid ",{
                position:"top-right"
            })
            return
        }
        if(data.password!== data.confirmPassword)
        {
            toast.error("Password and confirm pasword msut be same ",{
                position:"top-right"
            })
            return
        }

        ///api call
        try{
            const response=await changePassword(data,email);
            toast.success("Password changed successfully ")
            redirect("/login")
        }catch(error)
        {
            console.log(error)
            toast.error("Error in chnaging password ")
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
                    {JSON.stringify(data)}
                     <h1 className='text-center'>Change Password</h1>
                     <Form className='mt-3' onSubmit={event=>handleSubmitForm(event)}>
                         <Form.Group>
                             <Form.Label>Enter the new Password  </Form.Label>
                             {/* {JSON.stringify(email)} */}
                             <Form.Control type='text' 
                             value={data.password}
                             onChange={event=>handleChange(event,'password')}
                             />
                         </Form.Group>
                         <Form.Group>
                             <Form.Label>Confirm the new password </Form.Label>
                             {/* {JSON.stringify(email)} */}
                             <Form.Control type='text' 
                             value={data.Password}
                             onChange={event=>handleChange(event,'confirmPassword')}
                             />
                         </Form.Group>
     
                         <Container className='text-center mt-3'>
                             <Button type='submit'>Change Passowrd</Button>
                         </Container>
                        
                     </Form>
                 </Card.Body>
             </Card>
         </Container>
         </div>
        </>
       )
}

export default ChangePassword