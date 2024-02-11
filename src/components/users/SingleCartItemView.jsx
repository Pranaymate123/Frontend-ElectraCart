import React, { useContext } from 'react'
import {Card,Row,Col,Container,Button} from 'react-bootstrap'
import { GET_PRODUCT_IMG_URL } from '../../services/helper.service'
import defaultProductImage from './../../assets/defaultProductImage.png'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractLine } from "react-icons/ri";
import CartContext from '../../context/CartContext';
import {toast} from 'react-toastify'
const SingleCartItemView = ({item}) => {
    const {cart,setCart,addItem,removeItem,clearCartItems}=useContext(CartContext)

  return (
    <>
        <Card className='shadow mb-3'>
            <Card.Body>
                <Row>
                    <Col md={1} className='d-flex justify-content-center align-items-center'>
                       
                            <img style={
                                {
                                    width:"70px",
                                    height:"70px",
                                    objectFit:'contain'
                                }
                            } src={GET_PRODUCT_IMG_URL(item.product.productId)}
                            
                            onError={event=>{
                                event.currentTarget.setAttribute('src',defaultProductImage)
                            }}
                            />
                       
                    </Col>
                    <Col className='ps-5' md={9}>
                            <h5>{item.product.title}</h5>
                            <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, obcaecati!</p>
                            <Row>
                                <Col>
                                    <p className=''> <b>{item.quantity}</b><span className='text-muted ms-2'>: Quantity</span></p>
                                </Col>
                                <Col>
                                    <p className=''><span className='text-muted ms-2'> Price : </span> <b><FaIndianRupeeSign/>{item.product.discountedPrice}</b></p>
                                </Col>
                                <Col>
                                <p className=''><span className='text-muted ms-2'>Total Price : </span> <b><FaIndianRupeeSign/>{item.totalPrice}</b></p>

                                </Col>
                            </Row>
                    </Col>
                    <Col md={2} className='d-flex justify-content-center align-items-center'>
                        <div className='w-100'>
                            <div className='d-grid'>
                                <Button variant='danger' size='sm'
                                    onClick={event=>
                                        
                                        {removeItem(item.cartItemId)
                                            toast.warn("Item Removed From Cart")  
                                        }              
                                    }
                                    
                                >Remove</Button>
                            </div>
                            <div>
                                <Row className='mt-3'>
                                    <Col className='d-grid'>
                                        <Button variant='warning' size='sm'
                                        onClick={event=>{
                                            const decreaseQuantity=item.quantity-1
                                            if(decreaseQuantity>0)
                                            {
                                                addItem(item.product.productId,decreaseQuantity,()=>(
                                                    toast.info("Quantity Decreased By 1")
                                                
                                                ))
                                            }else{
                                                toast.info("Quantity Can Not be less than 1 ")
                                            }

                                        }}
                                        ><RiSubtractLine/></Button>
                                    </Col>
                                    <Col className='d-grid'>
                                    <Button variant='success' size='sm'
                                        onClick={event=>{
                                            const increasedQuantity=item.quantity+1
                                            if(increasedQuantity>0)
                                            {
                                                addItem(item.product.productId,increasedQuantity,()=>(
                                                    toast.success("Quantity Increased By 1")
                                                
                                                ))
                                            }else{
                                                toast.info("Quantity Can Not be less than 1 ")
                                            }

                                        }}
                                    ><IoMdAdd/></Button>
                                    </Col>
                                </Row>
                                
                                

                            </div>
                            </div>
                    </Col>
                </Row>
               

            </Card.Body>
        </Card>
    </>
  )
}

export default SingleCartItemView