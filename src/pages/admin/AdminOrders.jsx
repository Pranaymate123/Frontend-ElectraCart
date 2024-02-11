import { useEffect, useState } from "react"
import { getAllOrders, updateOrderService } from "../../services/OrderService"
import { ADMIN_ORDER_PAGE_SIZE, GET_PRODUCT_IMG_URL, formatDate } from "../../services/helper.service"
import {Container,Row,Col,Card,Modal,Button,Table,ListGroup,Badge,Form} from 'react-bootstrap'
import SingleOrderView from "../../components/SingleOrderView"
import defaultProductImage from './../../assets/defaultproductimage.jpg'
import ShowHtml from '../../components/ShowHtml'
import InfiniteScroll from 'react-infinite-scroll-component';
import {toast} from 'react-toastify'
const AdminOrders=()=>{

///order update States
    const [editShow, setEditShow] = useState(false);

    const closeEditShow = () => setEditShow(false);
    const openEditShow = () => setEditShow(true);
  

    const [currentPage,setCurrentPage]=useState(0)
    const[currentProduct,setCurrentProduct]=useState(undefined)
    //view Product
    const [showProductView, setShowProductView] = useState(false);
    const closeProductViewModal = () => setShowProductView(false);
    const openProductViewModal = (event,product) => {
        setShowProductView(true)
        console.log(product)
        setCurrentProduct(product)
    };


    const[ordersData,setOrdersData]=useState(undefined)

    const [selectedOrder,setSelectedOrder]=useState(undefined)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   

    useEffect(()=>{
        //single time on load
        getOrdersLocally()
    },[])

    useEffect(()=>{
        if(currentPage>0)
        {
            getOrdersLocally()
        }

    },[currentPage])

    const getOrdersLocally=async()=>{
        try{
            const data=await getAllOrders(currentPage,ADMIN_ORDER_PAGE_SIZE,'orderedDate','desc');
            console.log(data)
            if(currentPage==0)
            {
                setOrdersData(data)
            }
            else
            {
                setOrdersData({
                    content:[...ordersData.content,...data.content],
                    lastPage:data.lastPage,
                    pageNumber:data.pageNumber,
                    pageSize:data.pageSize,
                    totalElements:data.totalElements,
                    totalPages:data.totalPages
                })
            }
                
        }catch(e){
            console.log("Errror")
            console.log(e)
        }
        
    }

    //Load data of the next page
    const loadNextPage=()=>{
        console.log("Loading Next Page ")
        setCurrentPage(currentPage+1)
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

    const openEditOrderModal=(event,order)=>{
        console.log("Hi Update Button Clicked ")
        openEditShow()
        setSelectedOrder({...order})
    }

    //handle order update submit
    const handleOrderUpdate=async(event)=>{
        event.preventDefault();
        console.log(selectedOrder)

        if(selectedOrder?.billingName?.trim()==='')
        {
            toast.error("Billing Name Required .....",{
                position:"top-right"
             });
            return
        }
        if(selectedOrder?.billingAddress?.trim()==='')
        {
            toast.error("Billing Address Required ....",{
                position:"top-right"
             });
            return
        }
        if(selectedOrder?.billingPhone?.trim()==='')
        {
            toast.error("Billing Phone Rerquired ....",{
                position:"top-right"
             })
             return 
        }
        try {
             const data=await updateOrderService(selectedOrder,selectedOrder.orderId);
             toast.success("Order Details Updated SuccessFully ",{
                position:"top-right"
             })
            const newList= ordersData.content.map(item=>{
                if(item.orderId===selectedOrder.orderId)
                {
                    return data
                }
                else
                {
                    return item
                }
             })
             setOrdersData({
                ...ordersData,
                content:newList
             })


        } catch (error) {
            console.log(error);
            toast.error("Order Details Not Updated",{
                position:"top-right"
             })
        }

    }

   
    //update order modal view
    const updateOrderModal=()=>{
        return selectedOrder && (
            <>
              {/* <Button variant="primary" onClick={openEditShow}>
                Launch demo modal
              </Button> */}
        
              <Modal size="lg" show={editShow} onHide={closeEditShow}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Order Details</Modal.Title>
                </Modal.Header>
               
                        <Modal.Body>
                        <Card className="border-0 p-2 shadow">
                    <Card.Body>
                            <Form onSubmit={handleOrderUpdate}>
                                <Form.Group className="mt-3">
                                    <Form.Label>Billing Name : </Form.Label>
                                    <Form.Control type="text" 
                                    value={selectedOrder.billingName}
                                    onChange={(event)=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            billingName:event.target.value
                                        })
                                    }}
                                    />
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Billing Phone : </Form.Label>
                                    <Form.Control type="number" 
                                    value={selectedOrder.billingPhone}
                                    onChange={(event)=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            billingPhone:event.target.value
                                        })
                                    }}
                                    />
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Billing Address</Form.Label>
                                    <Form.Control as={'textarea'} rows={4}
                                    value={selectedOrder.billingAddress}
                                    onChange={(event)=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            billingAddress:event.target.value
                                        })
                                    }}
                                    />
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    {/* {JSON.stringify(selectedOrder.paymentStatus)} */}
                                    <Form.Label>Payment Status</Form.Label>
                                    <Form.Select
                                    onChange={(event)=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            paymentStatus:event.target.value
                                        })
                                    }}
                                    >
                                        <option selected={selectedOrder.paymentStatus==="NOTPAID"} value="NOTPAID">NOT PAID</option>
                                        <option selected={selectedOrder.paymentStatus==="PAID"} value="PAID" > PAID</option>
                                    </Form.Select>
                                </Form.Group>
                                {JSON.stringify(selectedOrder.orderStatus)}
                                <Form.Group className="mt-3">
                                    <Form.Label>Order Status</Form.Label>
                                    <Form.Select 
                                    onChange={(event)=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            orderStatus:event.target.value
                                        })
                                    }}>
                                        <option value="PENDING">PENDING</option>
                                        <option value="DISPATCHED" >DISPATCHED</option>
                                        <option value="ONWAY" >ONWAY</option>
                                        <option value="DELIVERED" >DELIVERED</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Delivered Date</Form.Label>
                                    <Form.Control 
                                    type="date"
                                    // value={selectedOrder.deliveredDate}
                                    onChange={event=>{
                                        setSelectedOrder({
                                            ...selectedOrder,
                                            deliveredDate:event.target.value
                                        })
                                    }}
                                    />
                                    {/* <p className="text-muted">Format : YYYY-MM-DD</p> */}
                                </Form.Group>
                                <Container className="text-center mt-3 mb-2">
                                    
                                    <Button className="ms-2" variant="success" type="submit" onClick={closeEditShow}>
                                        Save Changes
                                    </Button>
                                </Container>
                            </Form>
                            </Card.Body>
                             </Card>
          
                            <Modal.Footer>
                            <Button variant="secondary" onClick={closeEditShow}>
                                        Close
                                    </Button>
                            </Modal.Footer>
                        </Modal.Body>
                    
                 
            
              </Modal>
            </>
          );
    }

    //view Product ModalView
    const viewProductModalView=()=>{
        return currentProduct && (
        
            <>
            <Modal  animation={false} show={showProductView} onHide={closeProductViewModal} size='xl'>
                <Modal.Header closeButton>
                <Modal.Title>{currentProduct.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Card className='border-0 shadow mt-3'>
                        <Card.Body>
                               {/* // product picture  */}
                        <Container className='text-center'>
                            <img style={{
                                maxHeight:"300px"
                            }} className='img-fluid' src={currentProduct.productImageName?GET_PRODUCT_IMG_URL(currentProduct.productId):defaultProductImage}/>
                        </Container>

                        {/* // Information Table */}
                        <Container>
                            <Table responsive bordered striped className='text-center'>
                                <thead>
                                    <tr>
                                        <th>Info</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody >
                                     <tr>
                                        <td>Product ID </td>
                                        <td className='fw-bold'>{currentProduct.productId}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantity</td>
                                        <td className='fw-bold'>{currentProduct.quantity}</td>
                                    </tr>
                                    <tr>
                                        <td>Price</td>
                                        <td className='fw-bold' > ₹ {currentProduct.price}</td>
                                    </tr>
                                    <tr>
                                        <td>Discounted Price</td>
                                        <td className='fw-bold'>₹ {currentProduct.discountedPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Live</td>
                                        <td className='fw-bold'>{currentProduct.live?'TRUE':'FALSE'}</td>
                                    </tr>
                                    <tr>
                                        <td>Stock</td>
                                        <td className='fw-bold'>{currentProduct.stock?'Available':'Not Available'}</td>
                                    </tr>
                                    <tr>
                                        <td>Category</td>
                                        <td className='fw-bold'>{currentProduct.category?.title}</td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        </Container>

                       <Card>
                        <Card.Body>
                            
                        <div className='p-3'>
                            <ShowHtml htmlText={currentProduct.description}/>
                    
                        </div>

                        </Card.Body>
                       </Card>
                        
                    

                        </Card.Body>
                    </Card>
                     
                    

                    {/* description */}
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeProductViewModal}>
                    Close
                </Button>
               
                </Modal.Footer>
            </Modal>
            </>
            
            )
    }

    //view order modal
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
                                        <Card className="mt-2 border-0 shadow cursor-pointer"  style={{cursor:"pointer"}} onClick={(event)=>{
                                            openProductViewModal(event,item.product)
                                        }}>
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

    //view of orders
    const ordersView=()=>{
        return(<>
            <Card className="shadow">
               
                    
                
                <Card.Body>
                <h3 className="my-4 mx-2">All orders are here</h3>
                  <InfiniteScroll
                    dataLength={ordersData.content.length}
                    next={loadNextPage}
                    hasMore={!ordersData.lastPage}
                    loader={<h3 className="text-center my-4">Loading....</h3>}
                    endMessage={<p className="my-3 text-center">All orders loaded</p>}
                  >
                    {
                        ordersData.content.map((o=>{
                            return(
                                <SingleOrderView
                                key={o.orderId}
                                order={o}
                                openOrderViewModal={openOrderViewModal}
                                openEditOrderModal={openEditOrderModal}
                                />
                            )
                        }))
                    }

                  </InfiniteScroll>
                </Card.Body>
            </Card>
        </>)
    }


    return(
        <>
        <Container>
            <Row>
                <Col>
                {ordersData?ordersView():('')}
                </Col>
            </Row>
        </Container>
        
        {
            viewOrderModal()
           
        }{
            viewProductModalView()
        }
        {
            updateOrderModal()
        }
        </>
        
    )
}

export default AdminOrders