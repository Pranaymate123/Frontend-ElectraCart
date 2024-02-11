import {Card,Container,Button,Badge} from 'react-bootstrap'
import { GET_PRODUCT_IMG_URL } from '../../services/helper.service'
import "./SingleProductCard.css"
import { FaIndianRupeeSign } from "react-icons/fa6";
import defaultProductImage from './../../assets/defaultProductImage.png'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {Link,NavLink} from 'react-router-dom'
const SingleProductCard=({product})=>{
    const [value, setValue] = useState(2);
    return(

       
        <>
           <Card className='m-1 mb-3 product-card border-0 shadow'>
                <Card.Body>
                    <Container as={Link} to={`/store/products/${product.productId}`}  className='text-center'>
                        <img className='product-image'  src={GET_PRODUCT_IMG_URL(product.productId)}
                        onError={event=>{
                            event.currentTarget.setAttribute('src',defaultProductImage)
                        }}
                        />
                    </Container>
                    <hr></hr>
                    <h6>{product.title}</h6>
                    <Container>
                        <Badge bg={product.stock?'success':'danger'}>{product.stock?'Available':'Out Of Stock'}</Badge>
                    </Container>
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, saepe.</p> */}
                        <Container className='text-end'>
                            <b><span className='h5 text-muted'><s><FaIndianRupeeSign /> {product.price}</s></span></b>
                            <b><span className='h5 ms-3'><FaIndianRupeeSign/> {product.discountedPrice}</span></b>
                        </Container>
                        {/* <Typography component="legend">Read only</Typography> */}
                        <Container className='text-center mt-2'>
                            <Rating name="half-rating-read" size='large' defaultValue={3.5} precision={0.5} readOnly />
                        </Container>     
                </Card.Body>
                <div className='d-grid w-100'>
                        <Button as={Link} to={`/store/products/${product.productId}`} style={{
                            borderRadius:"0px 0px 5px 5px"
                        }} className='' variant='info'>View Product</Button>
                </div>
                {/* <div className='d-grid w-100'>
                        <Button as={Link} to={`/store/products/${product.productId}`} style={{
                            borderRadius:"0px 0px 5px 5px"
                        }} className='' variant='warning'>Add To Cart</Button>
                </div> */}
           </Card>
        </>
    )
}

export default SingleProductCard