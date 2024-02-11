///product and category related api calls
import {privateAxios, publicAxios} from './axios.service'

//create product without category
export const createProductWithoutCategory=(product)=>{
    return privateAxios.post(`/products`,product).then(response=>response.data);
}   

//create product With category
export const createProductInCategory=(product,categoryId)=>{
    return privateAxios.post(`/categories/${categoryId}/products`,product).then(response=>response.data);
}



//upload  Product Image
export const addProductImage=(file,productId)=>{
    
    const data=new FormData()
    data.append('productImage',file)
    return privateAxios.post(`/products/image/${productId}`,data).then(res=>res.data);
}

// Get All Products 
export const getAllProducts=(pageNumber=0,pageSize=10,sortBy="addedDate",sortDir="asc")=>{
    return publicAxios.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(response=>response.data)
}

//get All live products
export const getAllLiveProducts=(pageNumber=0,pageSize=10,sortBy="addedDate",sortDir="asc")=>{
    return privateAxios.get(`/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(response=>response.data)
}
// Delete The products 
export const deleteProducts=(productId)=>{
    return privateAxios.delete(`/products/${productId}`).then(response=>response.data);
}

//update product Service
export const updateProduct=(data,productId)=>{
    return privateAxios.put(`/products/${productId}`,data).then(response=>response.data);
}

//update the category Of The Product

export const updateProductCategory=(categoryId,productId)=>{
    return privateAxios.put(`/categories/${categoryId}/products/${productId}`).then(response=>response.data)
}

//search Products
export const searchProductsByKeyword=(query)=>{
    return publicAxios.get(`/products/search/${query}`,query).then(response=>response.data);
}


//get Single Product Details
export const getProduct=(productId)=>{
   return publicAxios.get(`/products/${productId}`).then(res=>res.data)
 
}
//get products of category
export const getProductsOfCategory=(categoryId,pageNumber=0,pageSize=10,sortBy="addedDate",sortDir="asc")=>{
    return publicAxios.get(`/categories/${categoryId}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`).then(res=>res.data)
  
 }