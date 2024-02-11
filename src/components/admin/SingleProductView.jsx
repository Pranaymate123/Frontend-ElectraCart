
import {Button} from 'react-bootstrap'
import { FiDelete } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { FaPencilAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import { deleteProducts } from '../../services/ProductService';
import {toast} from 'react-toastify'
import withReactContent from 'sweetalert2-react-content'
import { useState } from 'react';


const SingleProductView=({
   index,product,updateProductList,openProductViewModal,openEditProductModal
})=>{



    const MySwal = withReactContent(Swal)


    const formatDate=(time)=>{
        return new Date(time).toLocaleString()
    }
    const getBackgroundForProducts=()=>{
    //Live +Stock ===> Green table-success


    //Not Live  ===> Red table-danger


    //Not Stock  ===> Yellow table-warning
    if(product.live && product.stock)
    {
        return 'table-success'
        
    }
    else if(!product.live)
    {
        return 'table-danger'
    }
    else if(!product.stock)
    {
        return "table-warning"
    }

}

    //delete Products
    const deleteProductHandler=()=>{

        MySwal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
             //Api Call
           deleteProducts(product.productId)
            .then(response=>{
                
                MySwal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
              });
              updateProductList(product.productId);

              

            //   filter out
            }).catch(error=>{
                console.log(error);
                toast.error("Error In Deleting Product")
            })

          
        }
      });

    }

    

    return (
        <tr  className={getBackgroundForProducts()}>
        <td  className='px-3 small' >{index+1}</td>
        <td  className='px-3 small'  >{product.title}</td>
        <td  className='px-3 small ' >{product.quantity}</td>
        <td  className='px-3 small' >₹{product.price}</td>
        <td  className='px-3 small' >₹{product.discountedPrice}</td>
        <td  className='px-3 small' >{product.live?'TRUE':'FALSE'}</td>
        <td  className='px-3 small' >{product.stock?'TRUE':'FALSE'}</td>
        <td  className='px-3 small'  >{product.category? product.category.title:'Null'}</td>
        <td  className='px-3 small' >{formatDate(product.addedDate)}</td>
        
        <td>
            <div className='d-flex justify-content-center align-items-center gap-1'>
           <Button variant='danger' size='sm' onClick={(event)=>{
            deleteProductHandler()
           }}> <FiDelete /></Button>

           {/* view */}
           <Button variant='info' size='sm' onClick={(event)=>openProductViewModal(event,product)}>  <GrView/></Button>

           {/* Update */}
           <Button variant='warning' size='sm' onClick={(event)=>openEditProductModal(event,product)}><FaPencilAlt/></Button>
        

            </div>
            </td>                                    

    </tr>
    
    )
    
}

export default SingleProductView