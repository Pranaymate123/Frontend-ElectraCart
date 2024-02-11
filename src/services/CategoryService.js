///Category related api 

import { privateAxios, publicAxios } from "./axios.service"

//Add Category
export const addCategory=(category)=>{
    return privateAxios.post(`/categories`,category).then((response)=> response.data)
}

// Get All Categories

export const getCategories=(currentPage=0,pageSize=6)=>{
    return publicAxios.get(`/categories?pageNumber=${currentPage}&&${pageSize}`).then(response=>response.data)
}

//Delete Category
export const deleteCategory=(categoryId)=>{
    return privateAxios.delete(`/categories/${categoryId}`).then(response=>response.data)
}

//update Category
export const updateCategory=(category)=>{
    return privateAxios.put(`/categories/${category.categoryId}`,category).then(response=>response.data);
}

//