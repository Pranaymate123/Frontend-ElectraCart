import {Card,Table,Container,Button} from 'react-bootstrap';
import profileImage from "./../../assets/profile.png"
import { BASE_URL } from '../../services/helper.service';
import { useContext, useEffect } from 'react';
import UserContext from '../../context/UserContext';

const UserProfileView=({user=null,handleShowModal})=>{

    const {userData,isLogin}=useContext(UserContext);
    
    

    return(
    <>
        <Card className='m-3 rounded border-0 shadow '>
            <Card.Body>
                <Container className='text-center'>
                    
                    <img className='border border-success' style={{borderRadius:"50%",objectFit:"contain"}} src={user.imageName? BASE_URL+`/users/image/${user.userId}`+'?'+ new Date().getTime():profileImage} width="200px" height="200px" alt='profile image'
                    onError={(event)=>{
                        // console.log("error")
                        event.currentTarget.setAttribute("src",profileImage)
                    }}
                    />
                </Container>

                <h1 className='text-center text-uppercase fw-bold text-primary'>{(user?.name)? user.name : "Dummy User"}</h1>
                <div className='mt-3'>
                        <Card className='' style={{
                            borderRadius:"50px"
                        }}>
                            <Card.Body>
                            <Table className='text-center' responsive  hover >

                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Gender</td>
                                    <td>{user.gender}</td>
                                </tr>
                                <tr>
                                    <td>About</td>
                                    <td>{user.about}</td>
                                </tr>
                                <tr>
                                    <td>Roles</td>
                                    <td>{user.roles.map(role=>(<span key={role.roleId} className='me-4'>{role.roleName}</span>))}</td>
                                </tr>
                            </tbody>
                            </Table>
                            </Card.Body>
                        </Card>

                </div>
                {
                    (isLogin && userData.user.userId===user.userId)?(
                        <Container  className='text-center d-flex justify-content-center align-items-center gap-3 mt-5'>
                            <Button onClick={handleShowModal} variant='success' size='md' >Update</Button>
                            <Button variant='warning' size='md' >Orders</Button>
                        </Container>
                    ):''
                }
            </Card.Body>
        </Card>
    </>
    )

}

export default UserProfileView;