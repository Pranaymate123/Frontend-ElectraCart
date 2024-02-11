import Base from "../components/Base";
import {Button,Card,Row,Col,Container,Carousel} from 'react-bootstrap';
import {toast} from 'react-toastify';
import axios from 'axios'
import { NavLink,Link } from "react-router-dom";
import Footer from "../components/Footer";
import SingleReviewCard from "../components/SingleReviewCard";
import Contact from "./Contact";
import ContactView from "../components/ContactView";
import ModalImage from './../assets/modal.png'
import ScrollToTop from "react-scroll-to-top";
import { TypeAnimation } from 'react-type-animation';
function Index() {

    const showSuccessToast=()=>{
        console.log("Success Toast");
        // toast.success("This is Success Message")
        toast.warn("This is Error")
    }

    const getDataFromServer=()=>{
      console.log("Getting Data From Server");
          axios.get("http://localhost:8083/products").then( (data)=>{
            console.log(data);
            toast.success("request done");
          }).catch((error)=>{
            console.log(error);
            toast.error("Something Went Wrong")
          });
    }

    const HomePageView=()=>{
      return (
        <>

        {/* <Base
                title="Shop What You Need"
                description={
                  "Welcome To Trending Store , We Provide Best Items As you need ."
                }
                buttonEnabled={true}
                buttonText="Stat Shopping"
                buttonType="success"
              >
                <h1> Working On Home Page</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab cum animi
                  ea distinctio aliquam a pariatur veniam quam facere ex accusantium,
                  fugiat, non vitae! Sint harum necessitatibus modi porro ratione
                  repudiandae labore quo ea praesentium tempore itaque error corrupti,
                  neque voluptates numquam ipsum accusamus laboriosam excepturi animi
                  magni rem molestias?

                </p>
                <Button variant="success" onClick={showSuccessToast}> Toastify Succcess</Button>
                <Button variant="primary" onClick={getDataFromServer}> Get Users Data From Server</Button>
              </Base> */}
            <div id="homepage">
              <Container fluid>
                  <Row  style={{height:"80vh"}} className="">
                    <Col   md={{
                      span:10,
                      offset:1
                    }} className="  mt-5 pt-5">

                      <Container fluid className="mt-5 text-light">

                      <TypeAnimation
                      color="#FEFF52"
                        sequence={[
                          // Same substring at the start will only be typed out once, initially
                          'We Provide Best quality Products ',
                          1000, // wait 1s before replacing "Mice" with "Hamsters"
                          'We Provide Best Gaming Phones ',
                          1000,
                          'We Provide Best Laptops',
                          1000,
                          'We Provide best Quality Headphones ',
                          1000,
                        ]}
                        wrapper="span"
                        
                        speed={50}
                        style={{ fontSize: '2rem',color:'#FEFF52' , display: 'inline-block' }}
                        repeat={Infinity}
                      />
                       
                        <h1 className="display-1 text-light text-start mt-5">
                                                  "ElectraCart - Elevate Your Tech Shopping!"</h1>

                          <h5>" Your premier destination for cutting-edge electronics. Explore innovation, shop with ease, and elevate your tech lifestyle with our curated selection of quality products."</h5>
                       
                          <Container className="text-center mr-5 ">
                              <Button as={NavLink} to={`/store`} style={{borderRadius:"none"}}  variant="" className="btn btn-outline-light px-5 py-1 fs-4 px- mt-3 me-5">Start Shopping Now</Button>
                          </Container>
                        </Container>
                    </Col>
                   
                  </Row>
                  <Row>
                      <Col>
                        <Container className="mt-5">
                            <h1 style={{color:'#FEFF52'}} className="display-2  text-center text-start mt-5">TRENDING TECHS</h1>
                        </Container>
                      </Col>
                  </Row>
                  <Row className="m-2 ">
                    <Col md={3} as={Link} to="/store" className="p-1 mb-2">
                      
                       
                          <img style={{
                          width:"100%",
                            objectFit:"contain"
                          }} src="https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge.jpg"/>
          
                    </Col>
                    <Col as={Link} to="/store" md={3} className="p-1 mb-2">
                  
                        
                       <img    style={{
                          width:"100%",
                            objectFit:"contain"
                          }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJAhz3NnrAY4VeRmkfAWyIml2YuKe01jHA1A&usqp=CAU"/>
                          
                      
                    </Col>
                    <Col as={Link} to="/store" md={3} className="p-1 mb-2">
                        <img className=""  style={{
                          width:"100%",
                            objectFit:"contain"
                          }} src="https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/06/Best-MacBook-1-920x518.jpg"/>
                          
                    </Col>
                    <Col as={Link} to="/store" md={3} className="p-1">
                        <img className="" style={{
                          width:"100%",
                            objectFit:"contain"
                          }} src="https://assets-prd.ignimgs.com/2022/06/15/budget-gaming-monitor-2-1655274437936.jpg"/>
                          
                    </Col>
                          
                    
                  </Row>
                  <Row className="mb-5">
                    <Col as={Link} to="/store" md={6}>

                      <img style={
                        {
                          width:"100%"
                        }
                      } src="https://i.pinimg.com/originals/f4/f1/e3/f4f1e3a1e843e9be9b15de848d26d53b.jpg"/>
                    </Col>
                    <Col as={Link} to="/store" md={6}>

                      <img style={
                        {
                          width:"100%"
                        }
                      } src="https://sm.ign.com/t/ign_in/screenshot/default/asus-rog-phone-5s-review_56sm.1280.jpg"/>
                    </Col>
                  </Row>

                  </Container>
                  <Container fluid className="mb-5 mt-5">
                  <Row>
                    <Col md={4} className="">
                      <Container>
                        <h2 className="text-light pt-5">
The ROG Phone series, crafted by ASUS, stands at the pinnacle of gaming smartphones. With cutting-edge hardware and innovative features, ROG Phones redefine mobile gaming experiences</h2>
                       <Container className="text-center">
                        <Button as={Link} to="/store"  style={{borderRadius:"none"}}  variant="" className="btn px-5 mt-4 btn-outline-light">Shop Now</Button>
                        </Container>
                      </Container>
                    </Col>

                      <Col>
                        <Container as={Link} to="/store" fluid className="text-center d-flex justify-content-center align-content-center ">
                            <img style={{
                             
                              width:"100%",
                              objectFit:"contain"}} src="https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2021/03/rog-asus-1.png?fit=1200%2C630&ssl=1"/>
                        </Container>
                      </Col>

                  </Row>
                  </Container>
                  <Container fluid className="mb-5 mt-5">
                  <Row>
                  <Col>
                        <Container as={Link} to="/store" fluid className="text-center d-flex justify-content-center align-content-center ">
                            <img style={{
                             
                              width:"100%",
                              objectFit:"contain"}} src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_webp/34b5bf180145769.6505ae7623131.jpg"/>
                        </Container>
                      </Col>
                    <Col md={4} className="  ">
                    <Container>
                        <h2 className="text-light pt-5">The iPhone, a hallmark of innovation by Apple, continues to set the standard for smartphones worldwide. Renowned for its seamless integration of hardware and software, iPhones deliver a user experience that's unparalleled.</h2>
                        <Container className="text-center">
                        <Button as={Link} to="/store"  style={{borderRadius:"none"}}  variant="" className="btn px-5 mt-4 btn-outline-light">Shop Now</Button>
                        </Container>
                      </Container>
                    </Col>

                    

                  </Row>
                  </Container>


                  <Container>
                    <h1 className="text-center text-light mb-3">What People Say </h1>
                    
                    <Container  className="d-flex justify-content-center mb-5">
                    <Carousel>
                          <Carousel.Item className="px-4">
                            {/* <ExampleCarouselImage text="First slide" /> */}
                           
                            <Row className="text-center">
                              <Col><SingleReviewCard imgUrl="data:image/jpeg;base64,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"/></Col>
                              {/* <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnTt6oQ102Y-TEHPHgKnMVvKjRIqyrgYEJvA&usqp=CAU"/></Col> */}
                              {/* <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6b4EOx7ysCVbhIujYl8R65V3FPa_GChmzUA&usqp=CAU" /></Col> */}
                             </Row>
                                                        
                              
                         
                          </Carousel.Item>
                          <Carousel.Item>
                         
                            <Row>
                              <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOMcmk92OuSLSw7NfbelvkkBrqRLWWCrAh4A&usqp=CAU" /></Col>
                              {/* <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvy7KoC7KKWFYIbel_AnCGanodxKcRBm6UsA&usqp=CAU" /></Col> */}
                              {/* <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnxJccUnUnmgEWt8UuYaKwwU63Z80VuKHUA&usqp=CAU"/></Col> */}
                             </Row>
                           

                           
                          </Carousel.Item>
                          <Carousel.Item>
                         
                             <Row>
                              <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI5eQpUGP2iCb5OS16SXpN0jXWx8zQ3fzy7w&usqp=CAU"/></Col>
                              {/* <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU5H4jCmhH0BOHclWDTve-sPALU046j182Mg&usqp=CAU"/></Col> */}
                              {/* <Col><SingleReviewCard imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBmAuPl1O6qbhEfXTK05Be1I6eDdHRE9JcMM7je4QKiVuycytkkrPU0Xzf216-XYaHA74&usqp=CAU"/></Col> */}
                             </Row>
                          
                            {/* <ExampleCarouselImage text="Third slide" /> */}
                           
                          </Carousel.Item>
                        </Carousel>
                    </Container>

                  </Container>

                <div>
                  <ContactView/>
                </div>
                {/* <Container className="">
                  
                      <ScrollToTop color="#6f00ff"  smooth/>
                </Container> */}
                          
                  <Footer/>

             


            
              </div>
        </>
      )
    }

  return (
    <>
    {
      HomePageView()
    }
    </>
  );
}

export default Index;
