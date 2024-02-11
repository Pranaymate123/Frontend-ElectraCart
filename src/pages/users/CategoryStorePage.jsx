import {useParams} from 'react-router-dom'
import { getProductsOfCategory } from '../../services/ProductService'
import { useEffect, useState } from 'react'
import {  STORE_PAGE_PRODUCT_SIZE } from '../../services/helper.service'
import {Container,Row,Col,Breadcrumb} from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import SingleProductCard from '../../components/users/SingleProductCard'
import CategorySideMenu from '../../components/users/CategorySideMenu'
import {Link} from 'react-router-dom'


const CategoryStorePage=()=>{
    const [products,setProducts]=useState(null)
    const {categoryId,categoryTitle}=useParams()
    const [currentPage,setCurrentPage]=useState(0)



    useEffect(()=>{
        loadProductsOfCategories(categoryId,currentPage,STORE_PAGE_PRODUCT_SIZE,"addedDate","desc")
    },[categoryId])

    useEffect(()=>{
        loadProductsOfCategories(categoryId,currentPage,STORE_PAGE_PRODUCT_SIZE,"addedDate","desc")
    },[currentPage])

    const loadProductsOfCategories = (categoryId,pageNumber,pageSize,sortBy,sortDir)=>{
        getProductsOfCategory(categoryId,pageNumber,pageSize,sortBy,sortDir)
        .then(data=>{
           
            // console.log(data)
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

    const loadNextPage=()=>{
        console.log("Loading Next Page")
        setCurrentPage(currentPage+1)
    }

    const productView=()=>{
        return products && (
            <>
            
                    <InfiniteScroll
                    dataLength={products.content.length}
                    next={loadNextPage}
                    hasMore={!products.lastPage}
                    loader={<h3 className='my-5 text-center text-light'>Loading more products.....</h3>}
                    endMessage={<p className='my-4 text-center text-light'>All products loaded...</p>}
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
    

    return products &&(
        <>
            <Container fluid className='px-5 pt-5'>
                <Row>
                
                    <Col md={2}>
                    <Container className='text-center'>
                  <Breadcrumb >
                     <Breadcrumb.Item as={Link} to="/store">Store</Breadcrumb.Item>
                     <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
                  </Breadcrumb>
                  </Container>
                        <CategorySideMenu/>
                    </Col>
                    <Col md={10}>
                    
                        {products.content.length>0? productView():<h3 className='m-5 text-center text-light'>No Products In This Category</h3>}
                    
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CategoryStorePage