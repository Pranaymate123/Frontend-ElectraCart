import { useEffect, useRef, useState } from 'react'
import {Card,Form,FormGroup,Row,Col,Button,Container,InputGroup} from 'react-bootstrap'
import {toast} from 'react-toastify'
import { addProductImage, createProductInCategory, createProductWithoutCategory } from '../../services/ProductService'
import { getCategories } from '../../services/CategoryService'
import {Editor} from '@tinymce/tinymce-react'


const AddProduct=()=>{

    const [categories,setCategories]=useState(undefined)


    useEffect(()=>{
        getCategories(0,1000).then((data)=>{
            setCategories(data);
            console.log(data)
            
        }).catch(error=>{
            console.log(error);
            toast.error("Error in Loadin Categories")
        })
    },[])

    const [selectedCategoryId,setSelectedCategoryId]=useState("none")

    const [product,setProduct]=useState({
        title:'',
        description:'',
        price:0,
        discountedPrice:0,
        quantity:1,
        live:false,
        stock:true,
        image:undefined,
        imagePreview:undefined
})

    //For Rich Text Editor
    const editorRef=useRef()

    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        if(event.target.files[0].type==='image/png' || event.target.files[0].type=='image/jpeg' ||event.target.files[0].type=='image/jpg')
        {
            //Preview
            const reader=new FileReader()
            reader.onload=(r)=>{

                setProduct({
                    ...product,
                    imagePreview:r.target.result,
                    image:event.target.files[0]
                })
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        else
        {
            toast.error("Invalid File Type")
            setProduct({
                ...product,
                imagePreview:undefined,
                image:undefined
            })
        }

    }

    //Clear form
    const clearForm=()=>{

        editorRef.current.setContent('')

        setProduct({
            title:'',
            description:'',
            price:0,
            discountedPrice:1,
            quantity:1,
            live:false,
            stock:true,
            image:undefined,
            imagePreview:undefined
        })
        setSelectedCategoryId("none")
        
    }


    //submit form
    const submitAddProductForm=(event)=>{
        
        event.preventDefault();
        if(product.title===undefined || product.title.trim()==='')
        {
            toast.error("Invalid Title")
            return 
        }
        if(product.description===undefined || product.description.trim()==='')
        {
            toast.error("Invalid Description")
            return 
        }
        if( product.price <= 0)
        {
            toast.error("Invalid Price")
            return 
        }
        if(product.discountedPrice>= product.price || product.discountedPrice<=0)
        {
            toast.error("Invalid discounted price")
            return 
        }
        

        if(selectedCategoryId==='none')
        {
        //create Product Without Category
             createProductWithoutCategory(product)
            .then(data=>{
            console.log(data);
            
            toast.success("Product is Successfully Created")

            if(!product.image)
            {
                clearForm()
                return
            }
            //image upload Api Call
            addProductImage(product.image,data.productId)
            .then(data1=>{
                console.log(data1);
                toast.success("Image uploaded Successfully")
                //reset the data
                clearForm()
            
            }).catch(error=>{
                console.log(error)
                toast.error("Error In Uploading Image")

            })
    
            
        }).catch(error=>{
            console.log(error)
            toast.error("Error in creating product !! Check The product Details !")
        })
    }else{
        //Create Product In Categeory
        createProductInCategory(product,selectedCategoryId)
        .then(data=>{
            console.log(data);
            
            toast.success("Product is Successfully Created")
            if(!product.image)
            {
                clearForm()
                return
            }
            //image upload Api Call
            addProductImage(product.image,data.productId)
            .then(data1=>{
                console.log(data1);
                toast.success("Image uploaded Successfully")
                //reset the data
                clearForm()
           
            }).catch(error=>{
                console.log(error)
                toast.error("Error In Uploading Image")
            })
    

            
        }).catch(error=>{
            console.log(error)
            toast.error("Error in creating product !! Check The product Details !")
        })
    }

    }

    //form clear function
    

    const formView=()=>{
        return(
            <>
            <Card className='border-0 shadow p-3'>
               
                <Card.Body>
                    {/* {JSON.stringify(product)} */}
                    <h5>Add Products</h5>
                    <Form  onSubmit={submitAddProductForm}>
                        
                        {/* Product Title */}
                        <FormGroup className='mt-2'>
                                <Form.Label>Product Title</Form.Label>
                                <Form.Control type='text'
                                onChange={(event)=>setProduct({
                                    ...product,
                                    title:event.target.value
                                })}
                                value={product.title}
                                 placeholder='Enter Here' />
                        </FormGroup>
                        {/* Product Description */}
                        <FormGroup className='mt-2'>
                                <Form.Label>Product Description</Form.Label>
                                {/* <Form.Control as={'textarea'}
                                onChange={(event)=>setProduct({
                                    ...product,
                                    description:event.target.value
                                })}
                                value={product.description}
                                placeholder='Enter Product Description here ' rows={6} /> */}
                       
                        <Editor
                        apiKey='gj023gcejpqxayuak398brihxlwp1oam85nxclp3x8qv8635'
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 350,
                            menubar: true,
                            plugins: [
                              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                              'bold italic forecolor | alignleft aligncenter ' +
                              'alignright alignjustify | bullist numlist outdent indent | ' +
                              'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                          }}


                          onEditorChange={()=>{
                            setProduct({
                                ...product,
                                description:editorRef.current.getContent()
                            })
                          }}

                        />
                         </FormGroup>
                        {/* Product Price */}
                       <Row>
                            <Col>
                                <FormGroup className='mt-2'>
                                    <Form.Label>Product Price</Form.Label>
                                    <Form.Control type='number'
                                    onChange={(event)=>setProduct({
                                        ...product,
                                        price:event.target.value
                                    })}
                                    price={product.price}
                                    placeholder='Enter Product Price Here' />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className='mt-2'>
                                    <Form.Label>Product Discounted Price</Form.Label>
                                    <Form.Control type='number' 
                                    onChange={(event)=>{
                                        // if(product.price<event.target.value)
                                        // {
                                        //     toast.error("Invalid discounted Price")
                                        //     return 
                                        // }
                                        setProduct({
                                            ...product,
                                            discountedPrice:event.target.value
                                        })
                                    }}
                                    value={product.discountedPrice}
                                    placeholder='Enter Product Discounted Price Here' />
                                </FormGroup>
                            </Col>
                       </Row>
                       {/* PRODUCT qyuantity */}
                       
                       <FormGroup className='mt-2 '>
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control type='number'
                                onChange={(event)=>setProduct({
                                    ...product,
                                    quantity:event.target.value
                                })}
                                value={product.quantity}
                            placeholder='Enter Product Quantity Here' />
                        </FormGroup> 
                        <Row className='mt-3 px-3'>
                            <Col>
                            <Form.Check // prettier-ignore
                                type="switch"
                               checked={product.live}
                                onChange={(event)=>setProduct({
                                    ...product,
                                    live:!product.live
                                })}
                               
                                label="Live"
                            />
                            </Col>
                            <Col>
                               
                                <Form.Check // prettier-ignore
                                type="switch"
                                checked={product.stock}
                                onChange={(event)=>setProduct({
                                    ...product,
                                    stock:!product.stock
                                })}
                               
                                label="Stock"/>
                            </Col>
                       </Row>      

                       {/* Product Image  */}
                       <Form.Group className="mt-3">
                                <Container className='text-center border   p-2' hidden={!product.imagePreview}>
                                    <p className='text-muted'>Image Preview</p>
                                    <img  style={{maxHeight:"250px"}} className='img-fluid' src={product.imagePreview} alt='product image'/>
                                </Container>
                            <Form.Label>Select Product Image</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    onChange={(event)=>handleFileChange(event)}
                                    type={'file'}/>
                                <Button variant='outline-secondary' onClick={(event)=>{
                                    setProduct({
                                        ...product,
                                        imagePreview:undefined,
                                        image:undefined
                                    })
                                }}>Clear</Button>
                                </InputGroup>
                       </Form.Group>
                       {/* {JSON.stringify(selectedCategoryId)} */}
                       <Form.Group className='mt-3'>
                                <Form.Select 
                                value={selectedCategoryId}
                                onChange={(event)=>{
                                    setSelectedCategoryId(event.target.value)
                                }}>
                                    <option value="none">None</option>
                                    {
                                        (categories)?(
                                        <>
                                        {
                                            categories.content.map(cat=><option key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>)
                                        }
                                        </>):('')
                                    }
                                    
                                </Form.Select>

                       </Form.Group>
                       <Container className='text-center mt-4'>
                            <Button size='sm' variant='success' type='submit'>Add Product</Button>
                            <Button size='sm' className='ms-3' variant='danger' onClick={clearForm} >Clear</Button>
                       </Container>
                            
                    </Form>
                </Card.Body>

            </Card>
            </>
        )
    }
    return(
        <>
        {formView()}
        </>
    )
}

export default AddProduct;