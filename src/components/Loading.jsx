import React from 'react'
import {Container,Spinner} from 'react-bootstrap'
import {ThreeDots} from 'react-loader-spinner'
const Loading = ({show}) => {
  return show && (
    <>
        {/* <Container  className='text-center  p-4 text-light z-1 position-relative '>


            <div className='d-flex justify-content-center'>
            <ThreeDots 
                    visible={true}
                    height="80"
                    width="80"
                    color="#fff"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    />
                    </div>
            
            <h1>Loading....</h1>

        </Container> */}
        
    </>
  )
}

export default Loading