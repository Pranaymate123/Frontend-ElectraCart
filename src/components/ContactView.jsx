import Base from "../components/Base"
import {Container,Card,Row,Col,Form,Button} from 'react-bootstrap'
const ContactView=()=>{
    return(
        <>
            <div>
                <Container fluid className="text-light">
                    <Row>

                   <Col md={{
                    span:8,
                    offset:2
                   }}>
                   <Card style={{background:"none"}} className="text-light px-2 mb-4">
                    <Card.Body>
                        <h1 className="text-center">
                            Contact Us 
                        </h1>
                        <Form className="">
                            <Form.Group className="mb-3">
                                <Form.Label>Name :</Form.Label>
                                <Form.Control type="text" placeholder="Enter here"/>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email :</Form.Label>
                                <Form.Control type="email" placeholder="Enter here"/>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Message :</Form.Label>
                                <Form.Control rows={6} as={'textarea'} placeholder="Enter here"/>

                            </Form.Group>
                           <Container className="text-center">
                           <Button style={{borderRadius:"none"}}  variant="" className="btn btn-outline-light py-1 mt-3 me-5">Submit</Button>
                           </Container>
                        </Form>
                    </Card.Body>
                   </Card>
                   </Col>
                   </Row>
                </Container>
            </div>
        
        </>
    )
}

export default ContactView