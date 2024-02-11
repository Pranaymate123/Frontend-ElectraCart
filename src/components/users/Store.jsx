import React, { useEffect, useState } from 'react'
import {Container,Row,Col,Breadcrumb,Form,InputGroup,Button} from 'react-bootstrap'
import { getCategories } from '../../services/CategoryService'
import { getAllLiveProducts, getAllProducts, searchProductsByKeyword } from '../../services/ProductService'
import  DefaultCategory from './../../assets/defaultCategory.png'
import SingleProductCard from './SingleProductCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { STORE_PAGE_PRODUCT_SIZE } from '../../services/helper.service'
import {Link} from 'react-router-dom'
import CategorySideMenu from './CategorySideMenu'
import {toast} from 'react-toastify'
//Catgory View


const Store=()=> {
    const [previousProducts,setPreviousProducts]=useState(undefined)

    const [search,setSearch]=useState(undefined);
   
    const [products,setProducts]=useState(null)
    const [currentPage,setCurrentPage]=useState(0)
    useEffect(()=>{
       
        loadProducts(currentPage,STORE_PAGE_PRODUCT_SIZE,"addedDate","desc")
    },[])

    //loading next page
    const loadNextPage=()=>{
        console.log("Loading Next Page")
        setCurrentPage(currentPage+1)
    }

    useEffect(()=>{
        if(currentPage>0)
        {
            loadProducts(currentPage,STORE_PAGE_PRODUCT_SIZE,"addedDate","desc")
        }
    },[currentPage])
    //load Categories
    
    //load Products
    const loadProducts=(pageNumber,pageSize,sortBy,sortDir)=>{
        getAllLiveProducts(pageNumber,pageSize,sortBy,sortDir)
        .then(data=>{
            console.log(data)

            if(currentPage>0)
            {
                setProducts({
                    content:[...products.content,...data.content],
                    lastPage:data.lastPage,
                    pageNumber:data.pageNumber,
                    pageSize:data.pageSize,
                    totalElements:data.totalElements,
                    totalPages:data.totalPages
                })
            }else{
                setProducts({...data})

            }
        }).catch(error=>{
            console.log(error)

        })

    }



    //products view
    const productView=()=>{
        return products && (
            <>
            
                    <InfiniteScroll
                    dataLength={products.content.length}
                    next={loadNextPage}
                    hasMore={!products.lastPage}
                    loader={<h3 className='my-5 text-center'>Loading more products.....</h3>}
                    endMessage={<p className='my-4 text-center'>All products loaded...</p>}
                    >
                        <Container>
                    <Row>
                        
                    {
                        products.content.map(product=>(
                             <Col md={3} key={product.productId}>
                            <SingleProductCard product={product} />
                            </Col>
                        ))
                    }
                    
                     </Row>
                     </Container>
                    </InfiniteScroll>



                
               
            
            </>
        )
    }
    // useEffect(()=>{
    //     searchProductHandler(search)
    // },[search])

    const searchProductHandler=()=>{
        if(search===undefined || search.trim()==='')
        {
            return
        }
        else{
            // call server search api
            searchProductsByKeyword(search).then(data=>{
                if(data.content.length<=0)
                {
                    toast.info("No Result Found",{
                        position:"top-right"
                    })
                    return
                }
                setPreviousProducts(products)
                setProducts(data)
            }).catch(error=>{
                console.log(error);
                toast.error("Error Occured in Fetching Products",{
                    position:"top-right"
                })
            })
        }
       
    }
  return (
    <>
        <Container fluid className='px-5 pt-5'>
            <Row className=''>
                <Col md={2}>
                <Container className='text-center'>
                  <Breadcrumb >
                     <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                     <Breadcrumb.Item>All Products</Breadcrumb.Item>
                  </Breadcrumb>
                  </Container>
                    <CategorySideMenu/>
                </Col>
                <Col md={10}>
                    <Container className=' mb-3'>
                        <InputGroup>
                           <Form.Control 
                            value={search}
                            placeholder='Search the products here'
                            onChange={(event)=>{
                                if(event.target.value==='')
                                {
                                    loadProducts(0,STORE_PAGE_PRODUCT_SIZE,"addedDate","desc")
                                    // if(previousProducts){

                                    //     setProducts(previousProducts)
                                    // }
                                }else
                                {

                                }
                                setSearch(event.target.value)
                            }}
                           />
                            <Button variant='outline-light' onClick={searchProductHandler} > Search</Button>
                        </InputGroup>
                    </Container>
                {productView()}
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Store