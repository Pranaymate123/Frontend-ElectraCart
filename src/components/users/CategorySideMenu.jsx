
import React, { useEffect, useState } from 'react'
import {Container,Row,Col,ListGroup} from 'react-bootstrap'
import { getCategories } from '../../services/CategoryService'
import { getAllLiveProducts, getAllProducts } from '../../services/ProductService'
import  DefaultCategory from './../../assets/defaultCategory.png'
import SingleProductCard from './SingleProductCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { STORE_PAGE_PRODUCT_SIZE } from '../../services/helper.service'
import {NavLink} from 'react-router-dom'
const CategorySideMenu = () => {

    const [categories,setCategories]=useState(null)

    useEffect(()=>{
        loadCategories(0,1000)
    },[])

    const loadCategories=(pageNumber,pageSize)=>{

        getCategories(pageNumber,pageSize)
        .then(data=>{
            console.log(data)
            setCategories(data)

        }).catch(error=>{
            console.log(error)

        })

    }

    const CategoryView=()=>{
        return categories && (
            <>
            <div id='categorySideMenu'>
                <ListGroup  variant='flush' className='sticky-top'>
                        <ListGroup.Item as={NavLink} to={`/store`} action >
                        <img style={{
                                    width:"40px",
                                    height:"40px",
                                    objectFit:"contain"
                                }}  src={DefaultCategory} 
                                onError={event=>{
                                    event.currentTarget.setAttribute('src',DefaultCategory)
                                }}
                                alt=''/> 
                            <span className='ms-2'>All Products</span>
                        </ListGroup.Item>
                    {
                        categories.content.map(cat=>(
                            <ListGroup.Item  key={cat.categoryId} as={NavLink} to={`/store/${cat.categoryId}/${cat.title}`} action>
                                <img style={{
                                    width:"40px",
                                    height:"40px",
                                    objectFit:"contain"
                                }}  src={cat.coverImage} 
                                onError={event=>{
                                    event.currentTarget.setAttribute('src',DefaultCategory)
                                }}
                                alt=''/>
                            <span className='ms-3'>{cat.title}</span>
                        </ListGroup.Item>
                        ))
                    }
                </ListGroup>
                </div>
            </>
        )
    }
    
  return (
    
        categories && CategoryView()
    
  )
}

export default CategorySideMenu