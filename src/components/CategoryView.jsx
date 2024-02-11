import {Card,Container,Row,Col,Button} from 'react-bootstrap'
import DefaultImage from "./../assets/profile.png"
import  DefaultCategory from './../assets/defaultCategory.png'
const CategoryView=({category,deleteCat,viewCat,updateCat})=>{

    const deleteCatgeory=(categoryId)=>{
        deleteCat(categoryId);
    }
    return(
        < >
        <Container className='mb-3'>
            <Card className='border-0 shadow'>
                <Card.Body>
                    <Row>
                        <Col   onClick={(event)=> viewCat(category)} md={2} className='d-flex justify-content-center align-items-center cursor-pointer'>
                            <img style={{
                                objectFit:"cover",
                                cursor:"pointer"
                            }} width={100} height={100} src={ (category.coverImage)?(category.coverImage.startsWith("http")?(category.coverImage):(DefaultCategory)):(DefaultCategory)}/>
                        </Col>
                        <Col md={10} className='ps-2' >
                            <h5>{category.title} </h5>
                            <p >{category.description}</p>
                             <Container className='d-flex  gap-2 '>
                            <Button size='sm' variant='danger' onClick={(event)=>deleteCatgeory(category.categoryId)}>Delete</Button>
                            <Button size='sm' variant='info' onClick={(event)=> viewCat(category)}>View </Button>
                            <Button size='sm' variant='warning' onClick={(event)=> updateCat(category)}>Update</Button>
                            </Container>
                         </Col>
                         
                    </Row>
                  </Card.Body>
            </Card>
        </Container>
        </>
    )
}

export default CategoryView