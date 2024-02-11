import UserProfileView from "./UserProfileView"
import {Container,Row,Col,Alert,Modal,Button,Card,Table,Form,Spinner,InputGroup} from 'react-bootstrap'
import UserContext from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { getUser, updateUser, updateUserProfileImage } from "../../services/user.service";
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'
import DefaultProfileImage from './../../assets/profile.png'

const Profile=()=>{

    const userContext=useContext(UserContext)


    let [user,setUser]=useState(null)
    //state to handle immage
    const [image,setImage]=useState({
        placeholder:DefaultProfileImage,
        file:null
    })

    //function for handling profile image
    const handleProfileImage=(event)=>{
        // const localfile=event.target.files[0]
        console.log(event.target.files[0])
        if(event.target.files[0].type==='image/png' || event.target.files[0].type=='image/jpeg' ||event.target.files[0].type=='image/jpg')
        {
            //Preview
            const reader=new FileReader()
            reader.onload=(r)=>{
                setImage({
                    placeholder:r.target.result,
                    file:event.target.files[0]
                })
                console.log(r.target.result)
               
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        else
        {
            toast.error("Invalid File Type")
            image.file=null;
        }

    }

    const {userId}=useParams()


    const [updateLoading,setUpdateLoading]=useState(false);

    //Modal State
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShowModal = () => setShow(true);

    //get User Data From the server
    const getUserDataFromServer=()=>{
 
        getUser(userId)
        .then(data=>{
            console.log(userId)
            console.log(data);
            setUser(data);
        })
        .catch(error=>{
            console.log(error)
            setUser(null)
            toast.error("Error in loading user information from server")
            
        })
    }

    const updateFieldHandler=(event,property)=>{
        setUser({
            ...user,
            [property]:event.target.value
        })
    }
 

    //update user Data calling Api
    const updateUserData=()=>{
        console.log('updating user Data');
        if(user.name===undefined || user.name.trim()==='')
        {
            toast.error("Username Required")
            return
        }
        if(user.about===undefined || user.about.trim()==='')
        {
            toast.error("About user Required")
            return
        }

           //set updateLoading True
        setUpdateLoading(true);

        //api call
        updateUser(user)
        .then((updatedUser)=>{
            console.log(updatedUser)
            toast.success("User Details Updated Successfully !!")
            handleClose()
            //update Image
            if(image.file==null)
            {
                setUpdateLoading(false)
                return
            }
            updateUserProfileImage(image.file,user.userId)
            .then((imageRes)=>{
                console.log(imageRes);
                toast.success(imageRes.message)
                handleClose()
               
            }).catch(error=>{
                console.log(error);
                toast.error("Image Not Uploaded")
            }).finally(()=>{
                setUpdateLoading(false)
            })
        }).catch(error=>{
            console.log(error)
            toast.error("Updation Failed !!")
        }).finally(()=>{
            setUpdateLoading(false);
        })
    }
    //clear image function
    const clearImage=(event)=>{
        setImage({
            placeholder:DefaultProfileImage,
            file:null
        })
    }

    //Update user Profile

    const updateViewModal=()=>{
        return(
        <>
        <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Update The Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Card className='' style={{
                            borderRadius:"50px"
                        }}>
                            <Card.Body>
                            <Table className='' responsive  hover >

                            <tbody>
                                <tr>
                                    <td>
                                        Profile Image
                                    </td>
                                    <td >
                                        {/* Image Tag For Preview */}
                                        <Container className="text-center mb-3">
                                        <img className="border border-black"  style={{borderRadius:"50%",objectFit:"contain"}} height={200} width={200} src={image.placeholder} alt=""/>
                                        </Container>
                                        <InputGroup>
                                            <Form.Control type="file" onChange={handleProfileImage}/>
                                            <Button onClick={clearImage} variant="outline-secondary">Clear</Button>
                                        </InputGroup>
                                        <p className="text-muted">Select square size picture for better UI</p>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                        <Form.Control className=""
                                          type="text"
                                           value={user.name}
                                           onChange={(event)=> updateFieldHandler(event,'name')}
                                           />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>

                                <tr>
                                    <td>Password</td>
                                    <td>
                                    <Form.Control className=""  type="password" placeholder="Enter new Password"
                                    onChange={(event)=> updateFieldHandler(event,'password')} />
                                     <p className="text-sm-start text-warning">Note :-Leave the field blank for same password</p>
                                    </td>
                                   
                                </tr>
                                
                                <tr>
                                    <td>Gender</td>
                                    <td>{user.gender}</td>
                                </tr>
                                <tr>
                                    <td>About</td>
                                    <td>
                                    <Form.Control as={'textarea'} rows={6} className=""  type="text" value={user.about} 
                                    onChange={(event)=> updateFieldHandler(event,'about')}
                                    />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Roles</td>
                                    <td>{user.roles.map(role=>(<span key={role.roleId} className='me-4'>{role.roleName}</span>))}</td>
                                </tr>
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>

            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button disabled={updateLoading} variant="primary" onClick={updateUserData}>
                <Spinner
                animation="border"
                size="sm"
                hidden={!updateLoading}
                className="me-2"
                />
               <span  hidden={updateLoading}>  SaveChanges</span>
               <span hidden={!updateLoading}>  Updating</span>
            </Button>
            </Modal.Footer>
        </Modal>
        </>
        )
    }


    useEffect(()=>{
        // console.log("data from url userId" ,userId)
        getUserDataFromServer()
    },[])
    
    return(
       <>
       <Container className=" mt-3">
        <Row>
            <Col md={{
                span:10,
                offset:1
            }}>{
                (user?(
                    <>
                    <UserProfileView
                    user={user}
                    handleShowModal={handleShowModal}
                   />
                    {updateViewModal()}
                 </>
                
                ) : <Alert variant="danger" className="text-center">User Not loaded From Server !!</Alert>)
                    }
                
                {/* {userContext.userData.user.userId} */}

            </Col>
        </Row>
        
        </Container>
       </>
       
    )
}

export default Profile