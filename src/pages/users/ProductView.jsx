import {Link, useParams} from 'react-router-dom'
import { getProduct } from '../../services/ProductService'
import { useContext, useEffect, useState } from 'react'
import {Container,Card,Row,Col,Badge,Button} from 'react-bootstrap'
import ShowHtml from '../../components/ShowHtml'
import { GET_PRODUCT_IMG_URL } from '../../services/helper.service'
import Rating from '@mui/material/Rating';
import { FaIndianRupeeSign } from "react-icons/fa6";
import defaultProductImage from './../../assets/defaultProductImage.png'
import CartContext from '../../context/CartContext'
import {toast} from 'react-toastify'
const ProductView=()=>{
    const {cart,addItem}=useContext(CartContext)
    const {productId} =useParams()
    const [product,setProduct]=useState(null)

    useEffect(()=>{
        loadProduct(productId)
    },[])

    const loadProduct=(productId)=>{
        
        getProduct(productId)
        .then(data=>{
            setProduct(data)
            console.log(data)

        })
        .catch(error=>{
            console.log(error)
        })

    }
    const handleAddItem=(productId,quantity)=>{

        
        addItem(productId,quantity,()=>(toast.success("Item Added To The Cart")));

    }

    //Prouct View
    const productView=()=>{
        return(
            <>
                <Container>
                    <Row>
                        <Col>
                            <Card className='mt-4 py-4 shadow'>
                                <Card.Body>
                                    <Container className=''>
                                        <Row>
                                            <Col md={6}>
                                            <img
                                            style={{
                                                width:"90%"
                                            }}
                                             src={GET_PRODUCT_IMG_URL(product.productId)}
                                              alt=""
                                              onError={event=>{
                                                event.currentTarget.setAttribute('src',defaultProductImage)
                                              }}
                                              />
                                            </Col>
                                            <Col className='pt-5'>

                                            <h3 className=''>{product.title}</h3>
                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, magni Lorem ipsum dolor sit amet.</p>
                                                <Container className='mt-3'>
                                                    <Badge bg='info' className='text-dark'  >{product?.category.title?product.category.title:'Out Of Stock'}</Badge>
                                                    <Badge  className='ms-2' bg={product.stock?'success':'danger'}>{product.stock?'Available':'Out Of Stock'}</Badge>
                                                </Container>
                                                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, saepe.</p> */}
                                                    <Container className='text-center mt-3'>
                                                        <b><span className='h3 text-muted'><s><FaIndianRupeeSign /> {product.price}</s></span></b>
                                                        <b><span className='h3 ms-3'><FaIndianRupeeSign/> {product.discountedPrice}</span></b>
                                                    </Container>
                                                    {/* <Typography component="legend">Read only</Typography> */}
                                                    <Container className='text-center mt-2'>
                                                       
                                                        <Rating  name="half-rating-read" size='large' defaultValue={3.5} precision={0.5} readOnly />
                                                    </Container>  
                                                    <Container className='d-grid mt-3 w-100'>
                                                        <Button  
                                                        onClick={(event)=>handleAddItem(product.productId,1)}
                                                        disabled={!product.stock}
                                                        className='' variant='warning'>Add To Cart</Button>
                                                        <Button as={Link} to={'/store'}  style={{
                                                            
                                                        }} className='mt-3 text-dark' variant='outline-info'>Back To Store</Button>
                                                    </Container>
                                            </Col>
                                        </Row>
                                    </Container>
                                    <Container className='mt-5'>
                                        <ShowHtml htmlText={product.description}/>
                                    </Container>

                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>
                    <Container className='d-grid mt-3 mb-5 w-100'>
                                                        <Button  disabled={!product.stock} onClick={(event)=>handleAddItem(product.productId,1)} className='' variant='warning'>Add To Cart</Button>
                                                        <Button as={Link} to={'/store'}  style={{
                                                            
                                                        }} className='mt-3 text-light' variant='outline-info'>Back To Store</Button>
                 </Container>
                </Container>
            </>
        )
    }


    return (
    product && productView()
    )
}

export default ProductView