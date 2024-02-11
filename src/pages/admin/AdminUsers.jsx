import { useEffect, useState } from "react"
import { getAllUsers, getUserByName } from "../../services/user.service"
import {toast} from 'react-toastify'
import {Container,Card,Row,Col,Form,Button,InputGroup} from 'react-bootstrap'
import SingleUserView from "../../components/SingleUserView"
import InfiniteScroll from 'react-infinite-scroll-component';
const AdminUsers=()=>{
    const [prevUserData,setPrevUserData]=useState(null)
    const [currentPage,setCurrentPage]=useState(0)
    const [searchQuery,setSearchQuery]=useState('')
    const [userData,setUserData]=useState(undefined)
    useEffect(()=>{
        getUsers(0,5,"name","desc")
    },[])

    const getUsers= async(pageNumber,pageSize,sortBy,sortDir)=>{
       try {
        const data=await getAllUsers(pageNumber,pageSize,sortBy,sortDir);
        console.log(data)
        setUserData({...data})

        // toast.success("Users Fetched SucessFully")
       } catch (error) {
            console.log(error)
            // toast.error("Fetching Users Faild")
       }
    }

    useEffect(()=>{
        if(currentPage>0)
        {
            
                 getAllUsers(currentPage,5,'name','desc')
                 .then(data=>{
                console.log(data)
                setUserData({
                    content:[...userData.content,...data.content],
                    lastPage:data.lastPage,
                    pageNumber:data.pageNumber,
                    pageSize:data.pageSize,
                    totalElements:data.totalElements,
                    totalPages:data.totalPages
                })
            }).catch(error=>{
                console.log("Error In Loading Page")
            })
        
                // toast.success("Users Fetched SucessFully")
              
            
        }
    },[currentPage])

    const loadNextPage=()=>{
        console.log("Loading next Page")
        setCurrentPage(currentPage+1)
    }
    //search User
    const searchUser=async (searchQuery)=>{

        if(searchQuery.trim()==='')
        {
            toast.error("Invalid Search Option ",{
                position:"top-right"
            })
            return
        }

       let users=await getUserByName(searchQuery);
       setPrevUserData(userData)
       setUserData({
        ...userData,
        content:users,
        lastPage:true
       })
    }

    const userView=()=>{
        return(
            <>
            <Container>
                <Row>
                    <Col>
                        <Card className="shadow">
                            <Card.Body>
                                <h3 className="">Users List</h3>
                                    <Container>
                                        {/* {JSON.stringify(searchQuery)} */}
                                        <InputGroup>
                                            <Form.Control type="text"
                                            value={searchQuery}
                                            onChange={event=>{
                                                if(event.target.value==='')
                                                {
                                                    if(prevUserData)
                                                    {
                                                        setUserData(prevUserData)
                                                        
                                                    }
                                                }
                                                setSearchQuery(event.target.value)
                                              
                                            }}
                                            placeholder="Search Here"
                                            />
                                            <Button onClick={(event)=>{
                                                searchUser(searchQuery)
                                            }} variant="outline-secondary"> Search</Button>
                                      
                                        </InputGroup>
                                    </Container>
                                    <InfiniteScroll
                                    hasMore={!userData.lastPage}
                                    dataLength={userData.content.length}
                                    next={loadNextPage}
                                    loader={<h3 className="text-center my-3">Loading...</h3>}
                                    endMessage={<p className="text-center py-3 text-muted">All Users Loaded ....</p>}
                                    
                                    >
                                        {
                                            userData.content.map(user=>{
                                              return   <SingleUserView key={user.userId} user={user}/>
                                            }
                                            )
                                         }
                                 </InfiniteScroll>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }

    return(
        <>
            {
                userData && userView()
            }
        </>
    )
}

export default AdminUsers