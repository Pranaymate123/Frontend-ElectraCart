import {Card,Row,Col,Badge} from 'react-bootstrap'
import { getUserImageUrl } from '../services/helper.service'
import DefaultProfileImage from './../assets/profile.png'
import {NavLink} from 'react-router-dom'
const SingleUserView=({user})=>{
    return (
        <>
            <Card className='mt-3 border-0 shadow'>
                <Card.Body>
                    <Row>
                        <Col md={1}>
                            <img style={
                                {
                                    maxHeight:"100px",
                                    maxWidth:"80px",
                                    objectFit:"cover"
                                }
                            
                            }
                            
                            src={user.imageName?getUserImageUrl(user.userId):DefaultProfileImage}
                            onError={(event)=>{
                                // console.log("error")
                                event.currentTarget.setAttribute("src",DefaultProfileImage)
                            }}
                            />
                            
                        </Col>
                        <Col md={11} className='ps-4'>
                            <h6> <b>Ordered By : </b><NavLink className="text-decoration-none text-dark" to={`/users/profile/${user.userId}`}>{user.name}</NavLink></h6>
                            <p>{user.email}</p>
                            <p className='text-muted'>{user.about}</p>
                            {
                                user.roles.map(role=>{
                                    return (
                                        <Badge className=' ms-3' key={role.roleId} bg={role.roleName==='ROLE_NORMAL'?"info":"success"}>{role.roleName}</Badge>
                                    )
                                })
                            }
                        </Col>
                        
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleUserView 