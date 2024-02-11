import React from 'react'
import {Card,Container} from 'react-bootstrap'
import Rating from '@mui/material/Rating';
const SingleReviewCard = ({imgUrl}) => {
  return (
    <>
        <Card style={{
            width:350
        }}>
            <Card.Body>
                <Container className='text-center'>
                <img src={imgUrl}/>
                </Container>
                <hr></hr>
                <Container className='text-center'>

                <Rating name="half-rating-read" size='large' defaultValue={3.5} precision={0.5} readOnly />
                </Container>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis autem quasi repellat, commodi excepturi rem.</p>
            </Card.Body>
            
            
        </Card>
    </>
  )
}

export default SingleReviewCard