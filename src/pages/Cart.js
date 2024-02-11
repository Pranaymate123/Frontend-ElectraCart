import { useContext, useState } from "react";
import CartContext from "../context/CartContext";
import {Container,Row,Col,Card,Button,Form} from 'react-bootstrap'
import SingleCartItemView from "../components/users/SingleCartItemView";
import { FaIndianRupeeSign } from "react-icons/fa6";
import cartEmptyImage from './../assets/empty-cart.svg'
import {Link} from 'react-router-dom'
import notLoginImage from './../assets/notlogin.png'
import UserContext from "../context/UserContext";
import {toast} from 'react-toastify'
import { createOrder } from "../services/OrderService";
import useJwtTokenExpiration from "../hooks/useJwtTokenExpiration";
function Cart(){
    const flag=useJwtTokenExpiration()

    const {userData,isLogin}=useContext(UserContext)
    const [orderPlacedClicked,setOrderPlacedClicked]=useState(false)
    const {cart,addItem,setCart}=useContext(CartContext)
   
    const [orderDetails,setOrderDetails]=useState({
        billingName:'',
        billingAddress:'',
        billingPhone:'',
        cartId:'',
        orderStatus:'',
        paymentStatus:'',
        userId:''
    })
    const getTotalCartAmount=()=>{
        let amount=0;
        cart.items.forEach(item=>{
            amount+=item.totalPrice;
        })
        return amount;
    }
    const notLoggedInView=()=>{
        return(
            <>
                <Container>
                    <Card className="border-0 shadow mt-3">
                        <Card.Body>
                            <Container className="text-center ">
                                <img style={
                                    {
                                        width:"30%"
                                    }
                                } src={notLoginImage} />
                            </Container>
                            <Container className="mt-3 text-center">
                                <h2 className=" ">You Are Not Logged In</h2>
                                <p className="text-muted">Login now to access the cart !!</p>
                            </Container>
                            <Container className="mt-3 text-center gap-2">
                                <Button variant="success" as={Link} to={`/login`} className="px-5 mt-2 ">Login</Button>
                                <Button variant="info"  as={Link} to={`/register`} className="px-5 ms-2 mt-2">Register</Button>
                            </Container>
                        </Card.Body>
                    </Card>
                </Container>
            </>
        )

    }

    const emptyCartView=()=>{
        return(
            <>
                <Container>
                    <Card className="border-0 shadow mt-3">
                        <Card.Body>
                            <Container className="text-center ">
                                <img style={
                                    {
                                        width:"40%"
                                    }
                                } src={cartEmptyImage} />
                            </Container>
                            <Container className="mt-3 text-center">
                                <h2 className=" ">CART  IS EMPTY !!</h2>
                                <p className="text-muted">Add items to it now !</p>
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

    const cartView=()=>{
        return(
            <>
            <Card className="mt-3 border-0 shadow">
                <Card.Body>
                    <Row className="px-5">
                        <Col>
                            <h3>Cart</h3>
                        </Col>
                        <Col className="text-end">
                        {cart && cart.items.length} Items
                        </Col>
                    </Row>
                    <Row className="px-3 mt-3">
                        <Col>
                            {
                                cart.items.map(item=>(
                                    <SingleCartItemView key={item.cartItemId} item={item}/>
                                ))
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            <Container className="my-1">
                                <h4 className="text-center px-5">Total Amount : <span ><FaIndianRupeeSign/> {getTotalCartAmount()}</span></h4>
                            </Container>
                        </Col>
                    
                            
                       
                    </Row>
                    <Container className="text-center mt-2 mb-5">
                                <Button 
                                size="sm"
                                hidden={orderPlacedClicked}
                                onClick={event=>setOrderPlacedClicked(true)}
                                >Place Order</Button>
                     </Container>
                    
                    

                </Card.Body>
            </Card>
            </>
        )
    }

    //CREATE ORDER 
    const handleOrderCreation=async()=>{
        if( orderDetails.billingName.trim()=='')
        {
            toast.info("Billing Name Required ",{
                
            })
            return
        }
        if( orderDetails.billingPhone.trim()=='')
        {
            toast.info("Billing Phone Required ",{
             
            })
            return
        }
        if( orderDetails.billingAddress.trim()=='')
        {
            toast.info("Billing Address Required ",{
                
            })
            return
        }

        //set the other require info
        orderDetails.cartId=cart.cartId;
        orderDetails.orderStatus="PENDING"
        orderDetails.paymentStatus="NOTPAID"
        orderDetails.userId=userData.user.userId;

        // console.log(orderDetails)

        // create order api calll
        try {
            const result=await createOrder(orderDetails,userData.user.email);
            console.log(result)
            toast.success("Order Created  !! proceeding for payment")
            setCart({
                ...cart,
                items:[]
            })
        } catch (error) {
            console.log(error)
            toast.error("Error in creating order")
        }
        


    }

    const orderFormView=()=>{
        return(<>
            <Form>
                {/* {JSON.stringify(orderDetails)} */}
                <Form.Group className="mt-3">
                    <Form.Label>Billing Name</Form.Label>
                    <Form.Control type="text" 
                    value={orderDetails.billingName}
                    onChange={event=>setOrderDetails({
                        ...orderDetails,
                        billingName:event.target.value
                    })}
                    placeholder="Enter here " />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Billing Phone</Form.Label>
                    <Form.Control type="number"
                    value={orderDetails.billingPhone}
                    onChange={event=>setOrderDetails({
                        ...orderDetails,
                        billingPhone:event.target.value
                    })}
                     placeholder="Enter here " />
                </Form.Group>
                <Form.Group className="mt-3">
                    <Form.Label>Billing Address</Form.Label>
                    <Form.Control as={'textarea'} rows={6} 
                    value={orderDetails.billingAddress}
                    onChange={event=>setOrderDetails({
                        ...orderDetails,
                        billingAddress:event.target.value
                    })}
                    placeholder="Enter here " />
                </Form.Group>
                <Container className="text-center mt-4">
                    <Button variant="success"
                    onClick={event=>{
                        handleOrderCreation()
                    }}
                    > Place order and proceed to Pay</Button>
                </Container>
            </Form>
        </>)
    }
    return(
        <>
            <Container fluid={orderPlacedClicked}>
                <Row>
                    <Col md={orderPlacedClicked?8:12} className="animation">
                    {
                         (isLogin) ?  ((cart && (cart.items.length>0))? cartView():emptyCartView() ):notLoggedInView()
                    }
                   
                    </Col>
                    {
                        orderPlacedClicked && <Col md={4}>
                        
                            <Card className="mt-3 px-2 border-0 shadow">
                                <Card.Body>
                                    <h4 className="text-center">Fill the form to complete order</h4>
                                    {
                                        orderFormView()
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    }
                </Row>
                
            </Container>
        </>
    )
}
export default Cart;