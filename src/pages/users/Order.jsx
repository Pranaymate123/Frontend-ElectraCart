import { useContext, useEffect, useState } from "react";
import { cancelOrder, getOrdersOfUser } from "../../services/OrderService";
import UserContext from './../../context/UserContext'
import {Container,Row,Col,Card,Modal,Button,Table,ListGroup,Badge,Form} from 'react-bootstrap'
import SingleOrderView from "../../components/SingleOrderView";
import { GET_PRODUCT_IMG_URL, formatDate } from "../../services/helper.service";
import NoOrderImage from './../../assets/no_orders.png'
import {Link} from 'react-router-dom'
import ScrollToTop from "react-scroll-to-top";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {toast} from 'react-toastify'

const Order=()=>{
    const MySwal = withReactContent(Swal)
    const {userData,isLogin}=useContext(UserContext);
    const [orders,setOrders]=useState([])
    const [selectedOrder,setSelectedOrder]=useState(undefined)

    useEffect(()=>{
        if(isLogin)
        {

            loadOrdersOfUser()
        }
    },[])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const deleteOrderMain=(orderId)=>{
        //Sweat Alert
        MySwal.fire({
             title: "Are you sure?",
             text: "You won't be able to revert this!",
             icon: "warning",
             showCancelButton: true,
             confirmButtonColor: "#3085d6",
             cancelButtonColor: "#d33",
             confirmButtonText: "Yes, delete it!"
       }).then((result) => {
         if (result.isConfirmed) {
              //Api Call
             cancelOrder(orderId)
             .then(response=>{
                 MySwal.fire({
                     title: "Canceled!",
                     text: "Your Order has been Canceled.",
                     icon: "success"
               });
 
             //   filter out
               const newArray=orders.filter((c)=>{
                 return c.orderId!=orderId
               })
                setOrders(newArray);
               
 
             }).catch(error=>{
                 console.log(error);
                 toast.error("Error In Cancelling Order")
             })
 
           
         }
       });
     }

    const openOrderViewModal=(event,order)=>{
        handleShow()
        console.log("View Order Button Clicked")
        console.log(event);
        setSelectedOrder({
            ...order
        })
        console.log(order)
    }


    const viewOrderModal=()=>{
        
        return selectedOrder && (
            <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}
    
            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><h4>Order Details</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Row>
                        <Col>
                        
                        <b>Order Id :</b>{selectedOrder.orderId}
                         </Col>
                        <Col>
                        <b>Billing Name : </b>{selectedOrder.billingName}
                        </Col>
                       </Row>
                       <Row className='mt-4'>
                        <Col>
                        <Table bordered striped>
                            <tbody>
                                <tr>
                                    <td> Billing Phone</td>
                                    <td className='fw-bold'>{selectedOrder.billingPhone} </td>
                                </tr>
                                <tr>
                                    <td>Items</td>
                                    <td className='fw-bold'>{selectedOrder.orderItems.length} </td>
                                </tr>
                                <tr className={selectedOrder.paymentStatus==='NOTPAID'?'table-danger':'table-success'}>
                                    <td>Payment Status</td>
                                    <td className='fw-bold'>{selectedOrder.paymentStatus} </td>
                                </tr>
                                <tr>
                                    <td>Order Status</td>
                                    <td className='fw-bold'>{selectedOrder.orderStatus}</td>
                                </tr>
                                <tr>
                                    <td>Order Amount</td>
                                    <td className='fw-bold'>₹ {selectedOrder.orderAmount}</td>
                                </tr>
                                <tr>
                                    <td>Ordered Date</td>
                                    <td className='fw-bold'>{formatDate(selectedOrder.orderedDate)}</td>
                                </tr>
                                <tr>
                                    <td>Billing Addess</td>
                                    <td className='fw-bold'>{selectedOrder.billingAddress}</td>
                                </tr>
                                <tr>
                                    <td>Billing Phone No</td>
                                    <td className='fw-bold'>{selectedOrder.billingPhone}</td>
                                </tr>
                                <tr>
                                    <td>Delivered Date</td>
                                    <td className='fw-bold'>{selectedOrder.deliveredDate?formatDate(selectedOrder.deliveredDate):"Not Delivered Yet"}</td>
                                </tr>
                               
                            </tbody>
                        </Table>
                        <Card>
                            <Card.Body>
                                <h5>Order Items</h5>
                                <ListGroup variant="flush" >
                                    {
                                        selectedOrder.orderItems.map((item)=>(
                                            <Card className="mt-2 border-0 shadow cursor-pointer"  style={{cursor:"pointer"}}  as={Link} to={`/store/products/${item.product.productId}`} >
                                                <Card.Body>
                                                <ListGroup.Item  className="" key={item.orderItemId}>
                                        
                                                <Row>
                                                    <Col md={2}> 
                                                        <Container>
                                                            <img height={80} width={80} style={{
                                                                objectFit:"contain"
                                                            }} src={GET_PRODUCT_IMG_URL(item.product.productId)}/>
                                                        </Container>
                                                    </Col>
                                                    <Col md={10}>
                                                         <h6 className="mb-3">{item.product.title}</h6>
                                                         <Badge bg="info" className="text-dark py-2 px-3">Quantity : {item.quantity}</Badge>
                                                         <Badge bg="success" className="ms-3  py-2 px-3">Amount : ₹ {item.totalPrice}</Badge>
                                                    </Col>
                                                    {/* <Container >
                                                         <Button size="sm" variant="info">View Products</Button>
                                                    </Container> */}
                                                </Row>
                                                <p className="text-muted mt-1">Product ID : {item.product.productId}</p>
    
    
                                               
                                            </ListGroup.Item>
                                                </Card.Body>
                                            </Card>
                                          
                                            
                                        ))
                                    }
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        </Col>
                       </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={handleClose}>
                    Close
                </Button>
               
                </Modal.Footer>
            </Modal>
            </>
        );
        }

    const loadOrdersOfUser=async()=>{
        try {
            const result=await getOrdersOfUser(userData.user.userId);
            console.log(result)
            setOrders(result)
        } catch (error) {
            console.log(error)
            TransformStream.error("Error in Loading orders ")
        }
    }

    const ordersView=()=>{
        return(<>
            <Card className="shadow">
               
                    
                
                <Card.Body>
                <h3 className="my-4 mx-2">Your orders are here</h3>
                 
                    {
                        orders.map((o=>{
                            return(
                                <SingleOrderView
                                key={o.orderId}
                                order={o}
                                openOrderViewModal={openOrderViewModal}
                                deleteOrder={deleteOrderMain}
                                // openEditOrderModal={openEditOrderModal}
                                />
                            )
                        }))
                    }

                  
                </Card.Body>
            </Card>
        </>)
    }

    const NoOrdersView=()=>{
        return (
            <>
                 <Container>
                    <Card className="border-0 shadow mt-3">
                        <Card.Body>
                            <Container className="text-center ">
                                <img style={
                                    {
                                        width:"40%"
                                    }
                                } src={NoOrderImage} />
                            </Container>
                            <Container className="mt-3 text-center">
                                <h2 className=" ">You Have No Orders Yet  !!</h2>
                                <p className="text-muted">Do order now amazing offers are here !!</p>
                            </Container>
                            <Container className="mt-3 text-center">
                                <Button as={Link} to={`/store`} className="px-5 ">Shop Now </Button>
                            </Container>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        )
    }

    return (orders.length>0)?( <>
        <Container>
            <Row>
                <Col md={{
                    span:10,
                    offset:1
                }}>
                {ordersView()}
                </Col>
            </Row>
            <Container className="">
                  
                  <ScrollToTop color="#6f00ff"  smooth/>
            </Container>
        </Container>
        {
            viewOrderModal()
        }
    </>):(NoOrdersView())
       
    
}

export default Order;