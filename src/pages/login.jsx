import {  useContext, useState } from "react";
import Base from "../components/Base";
import {Container,Row,Col,Card,Form,Button,Alert,Spinner} from 'react-bootstrap';
import {NavLink,useNavigate,Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { loginUser } from "../services/user.service";
import UserContext from "../context/UserContext";
import { isLoggedIn } from "../auth/HelperAuth";
import SignIn from "../components/GoogleLogin";


const Login=()=>{
   
    const userContext=useContext(UserContext)

    let[data,setData]=useState({
        email:"",
        password:""

    })

    let[error,setError]=useState({
        errorData:null,
        isError:false
    })

    let [loading,setLoading]=useState(false)

    const redirect=useNavigate();

    const clearData=()=>{
        setData({
            email:"",
            password:""
        })
    }

    //data binding
    const handleChange=(event,property)=>{
        setData({
            ...data,
            [property]:event.target.value
        })
    }
    ///submit form handler
   const submitForm=(event)=>{
         event.preventDefault();
         

         if(data.email===undefined || data.email.trim()==="")
         {
            toast.error("Email Required");
            return
         }
         if(data.password===undefined || data.password.trim()==="")
         {
            toast.error("Password Required");
            return
         }
        //set loading
        setLoading(true)

         // Login Api 
         loginUser(data)
         .then((data)=>{
            console.log(data);
            toast.success("Login Success")
            setError({
                errorData:null,
                isError:false
            })
            //Redirect TO Dashboard Page -->
            // 1) Normal User :-> Normal User's Dashboard
           
            //home dashboard
            // /users/home
            // userContext.setIsLogin(true)
            // userContext.setUserData(data)
            userContext.login(data)
            redirect("/users/home")

            // 2) Admin User :-> Admin User's Dashboard

            

         })
         .catch((error)=>{
            console.log(error)
            toast.error(error?.response?.data?.message)
            setError({
                errorData:error,
                isError:true
            })
         }).finally(()=>{
            setLoading(false)
         })

   }



    const loginForm=()=>{
        return (
            <Container >
                <Row>
                    <Col md={
                        {
                            span:8,offset:2
                        }
                    }>
                        <Card className="my-3 border-0 shadow px-5" style={{
                            position:"relative",
                            top:-60
                        }}>
                            {/* {JSON.stringify(userContext)} */}
                            <div className="text-center">
                                <img
                                className="mx-3 my-2"
                                src="/assets/logo1.png"
                                alt="Bootstrap"
                                width="100"
                                height="100"
                                />
                            </div>
                            <Card.Body>
                                <h3 className="text-center text-uppercase">Store Login</h3>

                                <Alert 
                                className="mt-2"
                                dismissible
                                onClose={()=> setError({
                                    isError:false,
                                    errorData:null
                                })}
                                variant="danger"
                                 show={error.isError}>
                                    <Alert.Heading>Hey there,</Alert.Heading><span>Error Occured</span>
                                   <p>{error.errorData?.response?.data?.message}</p> 
                                </Alert>

                                <Form noValidate onSubmit={submitForm}>

                                    {/* Email Login Field */}
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Enter Email</Form.Label>
                                    <Form.Control type="email"
                                    placeholder="Enter Email"
                                    onChange={(event)=>handleChange(event,'email')}
                                    value={data.email}
                                    />  
                                </Form.Group>

                                    {/*  Password Login Field */}
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Enter Password</Form.Label>
                                    <Form.Control type="password"
                                    placeholder="Enter Password"
                                    onChange={(event)=>handleChange(event,'password')}
                                    value={data.password}
                                    />
                                          
                                </Form.Group>
                             

                                <Container className="text-center">
                                    {/* <p className="">Forgot Password <a href="/forget">click here</a></p> */}
                                    <p>Dont't have Account ! <NavLink  to="/register" >Register</NavLink></p>
                                    <p>Forgot Password  <NavLink  to="/forgot-password" >Click Here</NavLink></p>
                                </Container>

                                <Container className="text-center ">
                                    <Button disabled={loading} type="submit" variant="success">
                                        <Spinner
                                        size="sm"
                                        animation="border"
                                        hidden={!loading}
                                        className="me-2"
                                        />
                                        <span  hidden={!loading}  >Please Wait...</span>
                                        <span hidden={loading} >Login</span>
                                        </Button>
                                  
                                    <Button variant="danger ms-2" onClick={clearData}>Reset</Button>
                                    
                                    <h6 className="text-center mt-1">OR</h6>

                                    <h6 className="text-center ">Sign in with</h6>
                                    <Container  className="d-flex  justify-content-center mt-1  ">

                                            <SignIn/>
                                        
                                    </Container>
                                </Container>

                                </Form>

                            </Card.Body>

                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
            (isLoggedIn())?(<Navigate to="/users/profile"/>):(<Base
                                                        title="Electro Store / Login Page"
                                                    description="Login To Buy Products"
                                                        >
                                                        {loginForm()}
                                                        </Base>)
    )
}

export default Login