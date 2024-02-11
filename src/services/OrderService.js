/// All the function calling Api related to order

import { privateAxios } from "./axios.service"

//get order async--await
export const getAllOrders=async(pageNumber,pageSize,sortBy,sortDir)=>{
   let result= await privateAxios.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`)
   return result.data;
}

//update order
export const updateOrderService=async(order,orderId)=>{
   let result=await privateAxios.put(`/orders/${orderId}`,order);
   return result.data;
}


//create order
export const createOrder=async(orderDetail,email)=>{
   const result=await privateAxios.post(`/orders/${email}`,orderDetail);
   return result.data

}

//get orders of user
export const getOrdersOfUser=async(userId)=>{
   const result=await privateAxios.get(`/orders/users/${userId}`);
   return result.data
}

//cancel order

export const cancelOrder=async(orderId)=>{
   const result=await privateAxios.delete(`/orders/${orderId}`);
   return result.data
}
