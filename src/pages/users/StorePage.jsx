import React from 'react'
import Store from '../../components/users/Store'
import ScrollToTop from "react-scroll-to-top";
import {Container} from 'react-bootstrap'
function StorePage() {
  return (
    <>
    <Store/>
    <Container className="">
                  
                      <ScrollToTop color="#6f00ff"  smooth/>
                </Container>
    </>
  )
}

export default StorePage