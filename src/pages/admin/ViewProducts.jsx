import { useEffect, useState } from 'react'
import {Container,Row,Col,Table,Button,Card,Form,Pagination,Modal,FormGroup,InputGroup} from 'react-bootstrap'
import { addProductImage, getAllProducts, searchProductsByKeyword, updateProduct, updateProductCategory } from '../../services/ProductService'
import {toast} from 'react-toastify'
import SingleProductView from '../../components/admin/SingleProductView'
import { GET_PRODUCT_IMG_URL, PRODUCT_PAGE_SIZE } from '../../services/helper.service'
import defaultProductImage from './../../assets/defaultproductimage.jpg'
import {Editor} from '@tinymce/tinymce-react'
import { useRef } from 'react'
import ShowHtml from '../../components/ShowHtml'
import { getCategories } from '../../services/CategoryService'

const ViewProducts=()=>{

    const [previousProducts,setPreviousProducts]=useState(undefined)

    //image update
    const [imageUpdate,setImageUpdate]=useState({
        image:undefined,
        imagePreview:undefined,
        isUpdated:false
    })

    //search
    const [searchQuery,setSearchQuery]=useState('')
    const [categoryChangeId,setCategoryChangeId]=useState('')

         //For Rich Text Editor
    const editorRef=useRef()
        const [categories,setCategories]=useState(undefined)

        useEffect(()=>{
            getCategories(0,1000).then(data=>{
                console.log(data)
                setCategories({
                    ...data
                })
            }).catch(error=>{
                console.log(error)
            })
        },[])

        const [currentProduct,setCurrentProduct]=useState(undefined)
        // /modal states for view product state varible
        const [show, setShow] = useState(false);
        const closeProductViewModal = () => setShow(false);
        const openProductViewModal = (event,product) => {
            setShow(true)
            console.log(product)
            setCurrentProduct(product)
        };
        // #End view product state variables


        //modal states for edit product state variable
        const [showEditModal, setShowEditModal] = useState(false);
        const closeEditProductModal = () => {
            setShowEditModal(false)
        };
        const openEditProductModal=(event,product)=>{
            setCurrentProduct(product)
            setShowEditModal(true)
            
        }
        // #End Edit product state variables


    const [products,setProducts]=useState(undefined)

    useEffect(()=>{
        getProducts(0,10,'addedDate','desc')
    },[])

    const getProducts=(

        pageNumber=0,
        pageSize=PRODUCT_PAGE_SIZE,
        sortBy='addedDate',
        sortDir=-'asc'
    )=>{

        getAllProducts(pageNumber,pageSize,sortBy,sortDir)
        .then(data=>{
            console.log(data);
            setProducts({
                ...data
            })
        }) .catch(error=>{
            console.log(error)
            toast.error("Error in Loading Products ")
        })
    }

    //handle submit to update
    const handleUpdateFormSubmit=(event)=>{
        event.preventDefault()
        console.log(currentProduct)
        event.preventDefault();
        if(currentProduct.title===undefined || currentProduct.title.trim()==='')
        {
            toast.error("Title Required")
            return 
        }
        if(currentProduct.description===undefined || currentProduct.description.trim()==='')
        {
            toast.error("Invalid Description")
            return 
        }
        if( currentProduct.price <= 0)
        {
            toast.error("Invalid Price")
            return 
        }
        if(currentProduct.discountedPrice>= currentProduct.price || currentProduct.discountedPrice<=0)
        {
            toast.error("Invalid discounted price")
            return 
        }

        //form Submit
        updateProduct(currentProduct,currentProduct.productId)
        .then(data=>{
            console.log("Updated Product Data"+data);
            toast.success("Product Details Updated SuccessFully",{
                position:"top-right"
            })

            
            //update image Api
            if(imageUpdate.image && imageUpdate.imagePreview)
            {
                addProductImage(imageUpdate.image,data.productId)
            .then(imageData=>{
                console.log(imageData)
                setCurrentProduct({
                    ...currentProduct,
                    productImageName:imageData.imageName
                })
                setImageUpdate({
                    ...imageUpdate,
                    isUpdated:true
                })
                toast.success("Image Updated SuccessFully",{
                    position:"top-right"
                })
            }).catch(error=>{
                console.log(error)
                toast.error("Image Updation Failed",{
                    position:"top-right"
                })
            })

                (imageUpdate.isUpdated)?(setImageUpdate({...imageUpdate,isUpdated:false})):(setImageUpdate({image:undefined,imagePreview:undefined,isUpdated:false}))
            }
            //catgory Update
            if(categoryChangeId==='none' || categoryChangeId===currentProduct.category?.categoryId){
                
            }
            else
            {
                updateProductCategory(categoryChangeId,currentProduct.productId).then(catData=>{
                    console.log(catData);
                    toast.success("Category Update",{
                        position:"top-right"
                    })
                    setCurrentProduct({
                        ...currentProduct,
                        category:catData.category
                    })
                    const newArray=products.content.map(p=>{
                        if(p.productId==currentProduct.productId)
                        {
                            return catData
                        }
                        return p
                    })
                    setProducts({
                        ...products,
                        content:newArray
                    })
                  
                }).catch(error=>{
                    console.log(error)
                    toast.error("Error in updating category")
                })
            }

            const newArray=products.content.map(p=>{
                if(p.productId==currentProduct.productId)
                {
                    return data
                }
                return p
            })
            setProducts({
                ...products,
                content:newArray
            })
        }).catch(error=>{
            console.log(error)
            // toast.error("Error In Updating Product Details ")
        })
        
    }
    //handle update file change
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        if(event.target.files[0].type==='image/png' || event.target.files[0].type=='image/jpeg' ||event.target.files[0].type=='image/jpg')
        {
            //Preview
            const reader=new FileReader()
            reader.onload=(r)=>{

                setImageUpdate({
                    imagePreview:r.target.result,
                    image:event.target.files[0]
                })
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        else
        {
            toast.error("Invalid File Type")
            setImageUpdate({
                imagePreview:undefined,
                image:undefined
            })
        }

    }


    //update product list
    const updateProductList=(productId)=>{
       const newArray= products.content.filter(p=>{
        return p.productId!=productId
       })
       setProducts({
        ...products,
        content:newArray
       })
    }

    //edit product Modal view
    const editProductModalView=()=>{
        return currentProduct && (
            <>
      <Modal size='xl' show={showEditModal} onHide={closeEditProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleUpdateFormSubmit}>
                       
                        {/* Product Title */}
                        <FormGroup className='mt-2'>
                                <Form.Label>Product Title</Form.Label>
                                <Form.Control type='text'
                                value={currentProduct.title}
                                onChange={(event)=>setCurrentProduct({
                                    ...currentProduct,
                                    title:event.target.value
                                })}
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
                          value={currentProduct.description}
                          onEditorChange={(event)=>setCurrentProduct({
                            ...currentProduct,
                            description:editorRef.current.getContent()
                        })}

                        
                        />
                         </FormGroup>
                        {/* Product Price */}
                       <Row>
                            <Col>
                                <FormGroup className='mt-2'>
                                    <Form.Label>Product Price</Form.Label>
                                    <Form.Control type='number'
                                    value={currentProduct.price}
                                    onChange={(event)=>setCurrentProduct({
                                        ...currentProduct,
                                        price:event.target.value
                                    })}
                                    placeholder='Enter Product Price Here' />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className='mt-2'>
                                    <Form.Label>Product Discounted Price</Form.Label>
                                    <Form.Control type='number' 
                                   value={currentProduct.discountedPrice}
                                   onChange={(event)=>setCurrentProduct({
                                    ...currentProduct,
                                    discountedPrice:event.target.value
                                })}
                                    placeholder='Enter Product Discounted Price Here' />
                                </FormGroup>
                            </Col>
                       </Row>
                       {/* PRODUCT qyuantity */}
                       
                       <FormGroup className='mt-2 '>
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control type='number'
                                 value={currentProduct.quantity}
                                 onChange={(event)=>setCurrentProduct({
                                    ...currentProduct,
                                   quantity:event.target.value
                                })}
                            placeholder='Enter Product Quantity Here' />
                        </FormGroup> 
                        <Row className='mt-3 px-3'>
                            <Col>
                            <Form.Check // prettier-ignore
                                type="switch"
                                checked={currentProduct.live}
                                onChange={(event)=>setCurrentProduct({
                                    ...currentProduct,
                                    live:!currentProduct.live 
                                })}
                                label="Live"
                            />
                            </Col>
                            <Col>
                               
                                <Form.Check // prettier-ignore
                                type="switch"
                                checked={currentProduct.stock}
                                onChange={(event)=>setCurrentProduct({
                                    ...currentProduct,
                                    stock:!currentProduct.stock
                                })}
                               
                                label="Stock"/>
                            </Col>
                       </Row>      

                       {/* Product Image  */}
                       <Form.Group className="mt-3">
                                <Container className='text-center border my-5   p-2' >
                                    <p className='text-muted'>Image Preview</p>
                                    <img  style={{maxHeight:"250px"}} className='img-fluid' src={imageUpdate.imagePreview?imageUpdate.imagePreview:GET_PRODUCT_IMG_URL(currentProduct.productId)} alt='product image'/>
                                </Container>
                            <Form.Label>Select Product Image</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                   onChange={(event)=>{
                                    handleFileChange(event)
                                   }}
                                    type={'file'}/>
                                <Button variant='outline-secondary' onClick={(event)=>{
                                    setImageUpdate({
                                        image:undefined,
                                        imagePreview:undefined
                                    })
                                }}>Clear</Button>
                                </InputGroup>
                       </Form.Group>
                       {/* {JSON.stringify(categoryChangeId)} */}
                       <Form.Group className='mt-3'>
                                <Form.Select 
                                onChange={(event)=>{
                                    setCategoryChangeId(event.target.value);
                                }}
                                >
                                    <option value="none">None</option>
                                    {
                                        (categories)?(
                                            <>
                                            {
                                                categories.content.map(cat=><option selected={cat.categoryId==currentProduct.category?.categoryId} key={cat.categoryId} value={cat.categoryId}>{cat.title}</option>)
                                            }
                                            </>):('')
                                        
                                    }
                                    
                                </Form.Select>

                       </Form.Group>
                       <Container className='text-center mt-4'>
                            <Button size='sm' variant='success' type='submit'>Save Details</Button>
              
                       </Container>
                            
                    </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditProductModal}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
        )
    }


    //modal view

    const viewProductModalView=()=>{
        return currentProduct && (
        
            <>
            <Modal  animation={false} show={show} onHide={closeProductViewModal} size='xl'>
                <Modal.Header closeButton>
                <Modal.Title>{currentProduct.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Card className='border-0 shadow mt-3'>
                        <Card.Body>
                               {/* // product picture  */}
                        <Container className='text-center'>
                            <img style={{
                                maxHeight:"300px"
                            }} className='img-fluid' src={currentProduct.productImageName?GET_PRODUCT_IMG_URL(currentProduct.productId):defaultProductImage}/>
                        </Container>

                        {/* // Information Table */}
                        <Container>
                            <Table responsive bordered striped className='text-center'>
                                <thead>
                                    <tr>
                                        <th>Info</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody >
                                     <tr>
                                        <td>Product ID </td>
                                        <td className='fw-bold'>{currentProduct.productId}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantity</td>
                                        <td className='fw-bold'>{currentProduct.quantity}</td>
                                    </tr>
                                    <tr>
                                        <td>Price</td>
                                        <td className='fw-bold' > ₹ {currentProduct.price}</td>
                                    </tr>
                                    <tr>
                                        <td>Discounted Price</td>
                                        <td className='fw-bold'>₹ {currentProduct.discountedPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Live</td>
                                        <td className='fw-bold'>{currentProduct.live?'TRUE':'FALSE'}</td>
                                    </tr>
                                    <tr>
                                        <td>Stock</td>
                                        <td className='fw-bold'>{currentProduct.stock?'Available':'Not Available'}</td>
                                    </tr>
                                    <tr>
                                        <td>Category</td>
                                        <td className='fw-bold'>{currentProduct.category?.title}</td>
                                    </tr>
                                    
                                </tbody>
                            </Table>
                        </Container>

                       <Card>
                        <Card.Body>
                            
                        <div className='p-3'>
                            <ShowHtml htmlText={currentProduct.description}/>
                    
                        </div>

                        </Card.Body>
                       </Card>
                        
                    

                        </Card.Body>
                    </Card>
                     
                    

                    {/* description */}
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeProductViewModal}>
                    Close
                </Button>
               
                </Modal.Footer>
            </Modal>
            </>
            
            )
    }
    //search Products
    const searchProduct=()=>{
        if(searchQuery===undefined || searchQuery.trim()==='')
        {
            return
        }
        else{
            // call server search api
            searchProductsByKeyword(searchQuery).then(data=>{
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

    //Products view
    const productView=()=>{
        return (
            <Card className='border-0 shadow  w-100'>
                            <Card.Body>
                                {/* {JSON.stringify(searchQuery)} */}
                                <h5 className='mb-3'>View Products</h5>
                                <Form.Group className='mb-3'>
                                    <Form.Label>Search Product Here</Form.Label>
                                    <InputGroup>
                                    <Form.Control type='text'
                                    value={searchQuery}
                                    onChange={(event)=>{
                                        if(event.target.value==='')
                                        {
                                            if(previousProducts){

                                                setProducts(previousProducts)
                                            }
                                        }else
                                        {

                                        }
                                        setSearchQuery(event.target.value)
                                    }}
                                    placeholder='Search Here '/>
                                    <Button variant='outline-secondary' onClick={searchProduct}>Search</Button>
                                    </InputGroup>
                                </Form.Group>
                                <Table  className='text-center' bordered striped hover size='' responsive>
                                    <thead>
                                        <tr>
                                            <th className='px-3 small' >#SN</th>
                                            <th className='px-3 small'  >Title</th>
                                            <th className='px-3 small' >Quantity</th>
                                            <th className='px-3 small' >Price</th>
                                            <th className='px-3 small' >Discounted Price</th>
                                            <th className='px-3 small' >Live</th>
                                            <th className='px-3 small' >Stock</th>
                                            <th className='px-3 small' >Catgory</th>
                                            <th className='px-3 small' >Added Date</th>
                                            <th className='px-3 small' >Action</th>
                                        </tr>
                                        
                                    </thead>
                                    <tbody>
                                        {
                                            products.content.map((product,index)=>  <SingleProductView 
                                            key={index} index={index} 
                                            product={product}
                                             updateProductList={updateProductList} 
                                            openProductViewModal={openProductViewModal} 
                                            openEditProductModal={openEditProductModal}
                                            />)
                                        }
                                    </tbody>
                                </Table>
                                <Container className='d-flex justify-content-end align-content-center'>
                                    <Pagination>
                                        {/* o--- Totalpages-1 */}
                                        {/* [0,1,2,pages-1] */}
                                        <Pagination.First onClick={(event)=>{
                                            if(products.pageNumber-1 <0)
                                            {
                                                return 
                                            }
                                            getProducts(0,PRODUCT_PAGE_SIZE,"addedDate","desc")
                                        }}/>
                                        <Pagination.Prev onClick={(event)=>{
                                            if(products.pageNumber-1 <0)
                                            {
                                                return 
                                            }
                                            getProducts(products.pageNumber-1,PRODUCT_PAGE_SIZE,"addedDate","desc")
                                        }}/>
                                 
                                        {
                                           [...Array(products.totalPages)].map((ob,index)=>index).map(item=>
                                                {
                                                return  products.pageNumber==item?( <Pagination.Item active key ={item} > {item+1} </Pagination.Item>):( <Pagination.Item onClick={(event)=>{
                                                    getProducts(item,PRODUCT_PAGE_SIZE,"addedDate","desc")
                                                }} key ={item} > {item+1} </Pagination.Item>);
                                                }                                            
                                           )
                                        }
                                           <Pagination.Next onClick={(event)=>{
                                            if(products.lastPage)
                                            {
                                                return 
                                            }
                                            getProducts(products.pageNumber+1,PRODUCT_PAGE_SIZE,"addedDate","desc")
                                        }}/>
                                        <Pagination.Last onClick={(event)=>{
                                            if(products.lastPage)
                                            {
                                                return 
                                            }
                                            getProducts(products.totalPages-1,PRODUCT_PAGE_SIZE,"addedDate","desc")
                                        }}/>

                                       
                                    </Pagination>
                                </Container> 
                            </Card.Body>
                        </Card>
        )
    }


    return(
        <>
            <Container className='container-fluid'>
               <Row>
                    <Col>
                    {
                        products?productView() : ''
                    }
                        
                    </Col>
                </Row> 
                
            </Container>
            {
                viewProductModalView()
                
            }
            {
                editProductModalView()
            }
            
        </>
        
             
            
    )
}


export default ViewProducts