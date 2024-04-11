// export const BASE_URL=`http://localhost:8083`;   ///dev
export const BASE_URL=`https://backend-electronic-store-production.up.railway.app`;     ///prod



export const PRODUCT_PAGE_SIZE=10;
export const STORE_PAGE_PRODUCT_SIZE=8;

export const ADMIN_ORDER_PAGE_SIZE=10;





export const GET_PRODUCT_IMG_URL =(productId)=>{
    return `${BASE_URL}/products/image/${productId}`;
}

export const formatDate=(timeInLongs)=>{
    if(!timeInLongs)
    {
        return null;
    }

    // var options={
    //     weekday:"long",
    //     year:"numeric",
    //     month:"long",
    //     day:"numeric"
    // };

    const date=new Date(timeInLongs);


    return date.toLocaleString();
}

///get user image
export const getUserImageUrl=(userId)=>{
    return `${BASE_URL}/users/image/${userId}`;
}