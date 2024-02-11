import { useContext, useState } from "react";
import Base from "../components/Base";
import { Container, Row, Col, Card, Form, Button,Spinner,InputGroup } from "react-bootstrap";
import {toast} from 'react-toastify';
import { getOtp, getOtpToRegister, registerUser, verifyOtp } from "../services/user.service";
import { NavLink } from "react-router-dom";
import SignIn from "../components/GoogleLogin";
import UserContext from "../context/UserContext";
import {useNavigate} from 'react-router-dom'
const Register = () => {

  const redirect=useNavigate();
  const [otp,setOtp]=useState(undefined);
  const [verified,setVerified ]=useState(false)
  const userContext=useContext(UserContext)
  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    confirmPassword: "",
    gender: "",

  });

  const [errorData, setErrorData] = useState({
    isError: false,
    errorData: null
  })

    const [loading,setLoading]=useState(false)
    const [vOtploading,setvOtpLoading]=useState(false)

  //hadnle change
  const handleChange = (event, property) => {
    // console.log(event);
    // console.log(property);
    setData({
      ...data,
      [property]: event.target.value
    })
  }

  //clear Data
  const clearData = () => {
    setData({
      name: "",
      email: "",
      password: "",
      about: "",
      confirmPassword: "",
      gender: "",

    });

    setErrorData({
      errorData:null,
      isError:false
    })
  }
  //get otp request
  const getOtpHandler=async(event)=>{

    if(data.email===undefined|| data.email.trim()==='')
    {
      toast.error("Email is Required..")
      return 
    }
      setLoading(true)
      try {
        const result= await getOtpToRegister(data.email);
        toast.success("Otp sent successfully ")

        console.log(result)
        setOtp(result.otp)
      } catch (error) {
        toast.error("Error in sending otp please try again")

        console.log(error)
      }finally{
        setLoading(false)
      }
  }
  //verifyOtp
  const verifyOtpHandler=async(event)=>{
   
    if(otp==undefined || otp==null)
    {
        toast.info("Enter the otp ");
        return;
    }
    try {
        const result=await verifyOtp(otp)
        console.log(result)
        if(result.verified)
        {
          console.log(result)
          setvOtpLoading(true)
          setVerified(result.verified);
          toast.success("Email is verified successfully ")
        }else
        {
          toast.error("Enter the correct otp ")
        }
    } catch (error) {
      console.log(error)
      
    }finally{
      setvOtpLoading(false)
    }
  }


//do submit form function 

const submitForm=(event)=>{
  event.preventDefault();
  console.log(data);

  //validate client side 
  if(data.name===undefined|| data.name.trim()==='')
  {
    toast.error("Name is Required..")
    return 
  }
  if(data.email===undefined|| data.email.trim()==='')
  {
    toast.error("Email is Required..")
    return 
  }
  //other cheks basics

  if(data.password===undefined || data.password.trim()==='')
  {
    toast.error("Password is Required..")
    return 
  }

  //confirm password
  if(data.confirmPassword===undefined || data.confirmPassword.trim()==='')
  {
    toast.error("Confirm Password is Required..")
    return 
  }

  if(data.password !== data.confirmPassword)
  {
    toast.error("Password and Confirm Pasword Not Matched !!")
    return
  }
  if(!verified)
  {
    toast.error("Verify your email account to register ")
    return

  }

//set loading true
  setLoading(true);

  //things are all right 
  registerUser(data)
  .then(userData=>{
    //success handler
      console.log("Data Sent to server ",userData);
      toast.success("Registration Successfull !!");
            redirect("/login")
            clearData()

  })
  .catch(error=>{
    //Error Handler
    console.log(error);
    setErrorData({
      isError:true,
      errorData:error
    })
    toast.error("Registration Failed !! ")

  })
  .finally(()=>{
    setLoading(false)
  })

}

///register form UI 
  const registerForm = () => {
    return (
      <Container className="">
        {/* row-----> 12 grids (col) */}
        <Row>
          {/* {JSON.stringify(data)} */}
          <Col sm={{ span: 8, offset: 2 }} className="">
            <Card className="my-2 border-0 shadow p-1" style={{ position: 'relative', top: -60 }}>
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
                <h3 className="text-center mb-3 text-uppercase">Store Sign Up Here !</h3>

                <Form noValidate onSubmit={submitForm}>
                  {/* name field */}
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Enter Your Name</Form.Label>
                    <Form.Control type="text"
                      value={data.name}
                      placeholder="Enter Your Name"
                      isInvalid={errorData.errorData?.response?.data?.name}
                      onChange={(event) => handleChange(event, 'name')}
                    />
                    <Form.Control.Feedback type="invalid">{errorData.errorData?.response?.data?.name}</Form.Control.Feedback>
                  </Form.Group>

                  {/* email field */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Enter Your Email</Form.Label>
                    <InputGroup>
                    <Form.Control type="email"
                      placeholder="Enter Your Email"
                      value={data.email}
                      isInvalid={errorData.errorData?.response?.data?.email}

                      onChange={(event) => {
                        setVerified(false)
                        handleChange(event, 'email')}} />
                        <Button onClick={event=>getOtpHandler(event)} >
                        <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                      hidden={!loading}
                      />
                        <span  hidden={!loading} >Wait...</span>
                        <span hidden={loading}>Get Otp</span>
                     
                      </Button>
                    </InputGroup>

                    
                            <Form.Control.Feedback  type="invalid">{errorData.errorData?.response?.data?.email}</Form.Control.Feedback>

                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Enter the otp here : </Form.Label>
                    <InputGroup>
                    <Form.Control type="number"
                      placeholder="Enter otp here "
                       />
                        <Button variant="success" onClick={event=>verifyOtpHandler(event)} >
                        <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                      hidden={!vOtploading}
                      />
                        <span  hidden={!vOtploading} >Please Wait...</span>
                        <span hidden={vOtploading}>Verify Otp</span>
                     
                      </Button>
                    </InputGroup>
                  </Form.Group>

                  {/* password field */}

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Enter Your Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={data.password}
                      placeholder="Enter Your Password"
                      isInvalid={errorData.errorData?.response?.data?.password}
                      onChange={(event) => handleChange(event, 'password')}
                    />
                        <Form.Control.Feedback  type="invalid">{errorData.errorData?.response?.data?.password}</Form.Control.Feedback>

                  </Form.Group>
                  {/* Confirm PassWord  */}
                  <Form.Group className="mb-3" controlId="formconfirmPassword">
                    <Form.Label>Re-Enter Your Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={data.confirmPassword}
                      placeholder="Re-Enter Your Password"
                      onChange={(event) => handleChange(event, 'confirmPassword')}
                    />
                  </Form.Group>
                  {/* gender field */}

                  <Form.Group className="mb-2">
                    <div>
                      <Form.Label>Select Gender</Form.Label>
                    </div>
                    <div></div>
                    <Form.Check
                      inline
                      value={'Male'}
                      label="Male"
                      name="gender"
                      type={'radio'}
                      id={`gender`}
                      checked={data.gender === 'Male'}

                      onChange={(event) => handleChange(event, 'gender')}
                    />
                    <Form.Check
                      inline
                      value={'Female'}
                      name="gender"
                      label="Female"
                      type={'radio'}
                      id={`gender`}
                      onChange={(event) => handleChange(event, 'gender')}
                      checked={data.gender === 'Female'}
                    />
                   
                  </Form.Group >
                 

                  {/* About field */}
                  <Form.Group className="mb-2" >
                    <Form.Label>Write Something About Yourself </Form.Label>
                    <Form.Control as={'textarea'} rows={6} placeholder="Write Something About YourSelf"
                      onChange={(event) => handleChange(event, 'about')}
                      value={data.about}
                      isInvalid={errorData.errorData?.response?.data?.about}

                    />
                        <Form.Control.Feedback  type="invalid">{errorData.errorData?.response?.data?.about}</Form.Control.Feedback>


                  </Form.Group>
                
                <Container>
                  <p className="text-center">Alreday registered ! <NavLink to="/login">Login</NavLink></p>
                </Container>

                <Container className=" d-flex gap-3 justify-content-center">
                  <Button

                   variant="success"
                    type="submit"
                    disabled={loading}
                    >
                      <Spinner
                      animation="border"
                      size="sm"
                      className="me-2"
                      hidden={!loading}
                      />
                        <span  hidden={!loading} >Wait...</span>
                        <span hidden={loading}>REGISTER</span>
                      </Button>
                  <Button variant="danger" type="Reset" onClick={clearData} >RESET</Button>
                </Container>
                <h6 className="text-center mt-3">Or Sign up With </h6>
                <Container  className="d-flex  justify-content-center mt-1  ">
                        <SignIn/>
                     </Container>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };




  return (
    <Base
      title="Electro Store / Sign up"
      description="Fill the form Correctly To Register With Us ! By Registering You Can Access the Services Provided By Us"
    >
      {registerForm()}
    </Base>
  );
};

export default Register;
