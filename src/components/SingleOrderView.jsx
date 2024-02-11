import {Card,Row,Col,Table,Container,Button} from 'react-bootstrap'
import { formatDate } from '../services/helper.service'
import {NavLink} from 'react-router-dom'
import { cancelOrder } from '../services/OrderService'

const SingleOrderView=({
    order,
    openOrderViewModal,
    openEditOrderModal,
    deleteOrder
})=>{

    const deleteOrderLocal=()=>{
       deleteOrder(order.orderId)
        
    }

    return (
        <>
            <Card className='border border-0 shadow mb-5'>
                <Card.Body>
                   <Row>
                    <Col>
                    
                    <b>Order Id :</b>{order.orderId}
                     </Col>
                    <Col>
                            <b>Ordered By : </b><NavLink className="text-decoration-none text-dark" to={`/users/profile/${order.user.userId}`}>{order.user.name}</NavLink>
                    </Col>
                   </Row>
                   <Row className='mt-4'>
                    <Col>
                    <Table bordered striped className={order.paymentStatus =='PAID'?'table-success':'table-danger'}>
                        <tbody>
                            <tr>
                                <td>Billing Name</td>
                                <td className='fw-bold'>{order.billingName} </td>
                            </tr>
                            <tr>
                                <td> Billing Phone</td>
                                <td className='fw-bold'>{order.billingPhone} </td>
                            </tr>
                            <tr>
                                <td>Items</td>
                                <td className='fw-bold'>{order.orderItems.length} </td>
                            </tr>
                            <tr className={order.paymentStatus==='NOTPAID'?'table-danger':'table-success'}>
                                <td>Payment Status</td>
                                <td className='fw-bold'>{order.paymentStatus} </td>
                            </tr>
                            <tr>
                                <td>Order Status</td>
                                <td className='fw-bold'>{order.orderStatus}</td>
                            </tr>
                            <tr>
                                <td>Ordered Date</td>
                                <td className='fw-bold'>{formatDate(order.orderedDate)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                   </Row>
                   <Container className='text-center'>
                    <Button variant='info' className='text-dark fw-bold' size='sm' onClick={(event)=>{
                            openOrderViewModal(event,order)
                    }}> Order Details</Button>
                    {openEditOrderModal && <Button variant='warning' className='text-dark fw-bold ms-2' size='sm' onClick={(event)=>{
                            openEditOrderModal(event,order)
                    }}>Update</Button>}
                    {(!openEditOrderModal && order.paymentStatus==='NOTPAID') && <Button variant='success' className=' fw-bold ms-2' size='sm' onClick={(event)=>{
                           
                    }}>PAY TO COMPLETE ORDER</Button>}
                    <Button variant='danger' className='text-light fw-bold ms-2' size='sm' onClick={deleteOrderLocal} > Cancel Order </Button>
                   </Container>
                </Card.Body>
            </Card>
        </>
    )
}
export default SingleOrderView