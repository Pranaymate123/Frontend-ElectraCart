import React, { useContext, useEffect, useState } from 'react'
import CartContext from "./CartContext"
import UserContext from "./UserContext"
import { ClearCart, addItemToCart, getCart, removeItemFromCart } from '../services/CartService'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'
import {Alert } from 'react-bootstrap'
import {Navigate} from 'react-router-dom'
const CartProvider = ({children}) => {
  const [cart,setCart]=useState(null)
  const MySwal = withReactContent(Swal)

  const {isLogin,userData}=useContext(UserContext);
 
  //loadUser Card Initially
  const loadUserCart=async(userId)=>{
    try {
      const res=await getCart(userId);
      setCart({...res})
      // console.log(cart)
      
    } catch (error) {
      // console.log(error)
      setCart({
        items:[]
      })
    }
     
  }

  useEffect(()=>{
    if(isLogin)
    {
      console.log(userData)
      //get user Cart
      loadUserCart(userData.user.userId)
    }
  },[isLogin])

  //add Item To Cart
  const addItem=async(productId,quantity,toastMessage)=>{
    try {

      if(!isLogin)
      {
        MySwal.fire({
          title: "Not Logged In",
          text: "Please do Login to add items to cart ",
          icon: "error",
          showCancelButton:true,
          html:<>
           <Alert variant='danger' className='border-0'> <p>Login to add items in cart</p></Alert> 
          </>
        
        }).then(()=>{

        

        })
    return
      }
     const result=await addItemToCart(userData.user.userId,productId,quantity);
     console.log(result)
     setCart({...result})
     toastMessage()
      
     
    //  if(quantity>1)
    //  {
    //     toast.success("Quantity Updated ")
    //  }
    //  else{
    //   toast.success("Item Added To Cart ")
    //  }
     
    } catch (error) {
      console.log(error)
      toast.error("Errror in Adding the product To The Cart")
    }
  }

  //remove Item From Cart
  const removeItem=async(itemId)=>{
    try{
        const res=await removeItemFromCart(userData.user.userId,itemId);
        const newCartItems=cart.items.filter((item)=> item.cartItemId!=itemId)
        setCart({
          ...cart,
          items:newCartItems
        })



    }catch(error){
      console.log(error)
      toast.error("Error In Removing The Carts ")
    }
  }

  //clear cart
  const clearCartItems=async()=>{
    try{
   
      let res=await  ClearCart(userData.user.userId);
      toast.success("Cart Is Empty Now ",{
        position:"top-right"
      })
    }catch(e){
        console.log(e)
        toast.error("Error in clearing cart ",{
          position:"top-right"
        })
    }
  }


  return (
    <CartContext.Provider
    value={{
       cart,setCart,
       addItem,
       removeItem,
       clearCartItems
    }}    

    > {children} </CartContext.Provider>
  )
}

export default CartProvider

