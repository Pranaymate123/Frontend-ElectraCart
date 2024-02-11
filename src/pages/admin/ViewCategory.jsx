import { useEffect, useState } from "react"
import CategoryView from "../../components/CategoryView"
import {Container,Spinner,Modal,Button,Form,FormGroup} from 'react-bootstrap'
import { deleteCategory, getCategories, updateCategory } from "../../services/CategoryService"
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DefaultImage from "./../../assets/profile.png"
import InfiniteScroll from 'react-infinite-scroll-component';
import  DefaultCategory from './../../assets/defaultCategory.png'


const ViewCategories=()=>
{

    const MySwal = withReactContent(Swal)
    const [currentPage,setCurrentPage]=useState(0)

    const [categories,setCategories]=useState({
        content:[],

    })

    const[loading,setLoading]=useState(false)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showUpdate, setShowUpdate] = useState(false);

    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [selectedCategory,setSelectedCategory] =useState(undefined)

    //initial page
    useEffect(()=>{
        setLoading(true)
        getCategories()
        .then(data=>{
            console.log(data);
            setCategories(data);
        }).catch(error=>{
            console.log(error)
            toast.error("Error In Loading Categories From Server")
        }).finally(()=>{
            setLoading(false)
        })
    },[])

    //current page
    useEffect(()=>{
        if(currentPage>0)
        {
          getCategories(currentPage)
        .then(data=>{
            console.log(data);
            setCategories({
              ///                               ... spreding the elements of the array and then appending
              content:[...categories.content,...data.content],
              lastPage:data.lastPage,
              pageNumber:data.pageNumber,
              pageSize:data.pageSize,
              totalElements:data.totalElements,
              totalPages:data.totalPages

            });
        }).catch(error=>{
            console.log(error)
            toast.error("Error In Loading Categories From Server")
        })
        }
    },[currentPage])

     //DeleteCategory Main Function
     const deleteCatgeoryMain=(categoryId)=>{
       //Sweat Alert
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
            deleteCategory(categoryId)
            .then(response=>{
                MySwal.fire({
                    title: "Deleted!",
                    text: "Your category has been deleted.",
                    icon: "success"
              });

            //   filter out
              const newArray=categories.content.filter((c)=>{
                return c.categoryId!=categoryId
              })

              setCategories({
                ...categories,
                content:newArray
              })

            }).catch(error=>{
                console.log(error);
                toast.error("Error In Deleting Category")
            })

          
        }
      });
    }

    //handleView Button Of Category
    const handleView=(category)=>{
        setSelectedCategory(category)
         handleShow()
    }
    //handleView Button Of Category
    const handleUpdate=(category)=>{
      setSelectedCategory(category)
      handleShowUpdate()
    }
    //load next page function
    const loadNextPage=()=>{
      console.log("Loading next page")
      setCurrentPage(currentPage+1)
    }



    //modal view :-->For View And Updating
    const modalView=()=>{

      
        return (
            <>
            
      
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                
                
                <Modal.Title>{selectedCategory.title}</Modal.Title>
               
              </Modal.Header>
            <Container className="text-center pt-3">
                <img style={{
                                objectFit:"contain"
                            }} width={400} height={400} src={ (selectedCategory.coverImage)?(selectedCategory.coverImage.startsWith("http")?(selectedCategory.coverImage):(DefaultCategory)):(DefaultCategory)}/>
                </Container>
              <div className="mt-3">
              <Modal.Body>{selectedCategory.description}</Modal.Body>
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                
              </Modal.Footer>
            </Modal>
          </>
      
        )
    }

    //const updateCategory on server
    const submitHandler=(event)=>{
      event.preventDefault();
      if(selectedCategory.title === undefined || selectedCategory.title.trim() == '')
      {
        toast.error("Invalid Title")
        return
      }
      if(selectedCategory.description === undefined || selectedCategory.description.trim() == '')
      {
        toast.error("Invalid Description")
        return
      }
      
      ///Api Call 
      updateCategory(selectedCategory).then((data)=>{
        console.log(data);
        setSelectedCategory(data);
        toast.success("Category Details Updated Success Fully")
        const newCategories=categories.content.map((category)=>{
          if(category.categoryId ==selectedCategory.categoryId)
          {
            category.title=data.title;
            category.description=data.description;
            category.coverImage=data.coverImage;
            
          }
          return category;

        })
        setCategories({
          ...categories,
          content:newCategories
        })
        handleCloseUpdate()
      }).catch(error=>{
        console.log(error)
        toast.error("Category Details Updation Failed")
      })

    }
      
     
    

    //Update Modal
    const modalUpdate=()=>{

      
      return (
          <>
          
    
          <Modal show={showUpdate} onHide={handleCloseUpdate}>
          <Form onSubmit={(event)=>submitHandler(event)}>
          <Modal.Header closeButton>
              
              
              <Modal.Title>{selectedCategory.title}</Modal.Title>
             
            </Modal.Header>
            <Modal.Body>
             
                <FormGroup>
                  <Form.Label>Category Title :-</Form.Label>
                  <Form.Control  onChange={(event)=>setSelectedCategory({
                    ...selectedCategory,
                    title:event.target.value
                  })} type="text" placeholder="Enter title here" value={selectedCategory.title} />
                </FormGroup>

                <FormGroup className="mt-3">
                  <Form.Label>Category Description :-</Form.Label>
                  <Form.Control onChange={(event)=>setSelectedCategory({
                    ...selectedCategory,
                    description:event.target.value
                  })} as={'textarea'} placeholder="Enter category description here" value={selectedCategory.description} rows={5} />
                </FormGroup>
                <FormGroup>
                  
                <Container className="text-center pt-3">
                  <div>Preview Of Category Image</div>
                <img className="img-fluid" src={ (selectedCategory.coverImage)?(selectedCategory.coverImage.startsWith("http")?(selectedCategory.coverImage):(DefaultCategory)):(DefaultCategory)}/>
                </Container>
                  <Form.Label>Category Image URL :-</Form.Label>
                  <Form.Control  onChange={(event)=>setSelectedCategory({
                    ...selectedCategory,
                    coverImage:event.target.value
                  })} type="text" placeholder="Enter title here" value={selectedCategory.coverImage} />
                </FormGroup>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpdate}>
                Close
              </Button>
              <Button variant="success" type="Submit">
                Save Changes
              </Button>
            </Modal.Footer>
            </Form>
          </Modal>
        </>
    
      )
  }

    return (
        <div>

            {/* loader */}
            <Container className="text-center" hidden={!loading}>
                <Spinner animation="border"/>
                <div>
                    <h4 className="text-light">Loading...</h4>
                </div>
            </Container>

            {
                (categories.content.length>0?(
                    <>



                    <Container className="">
                    <h4 className="ms-3 text-uppercase text-light">All Categories</h4>
                        <InfiniteScroll
                          dataLength={categories.content.length}
                          next={loadNextPage}
                          hasMore={!categories.lastPage}
                          loader={<h4 className="text-center p-2">Loading...</h4>}
                          endMessage={
                            <p className="text-light" style={{ textAlign: 'center' }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          }

                        >

                            {  
                                categories?.content?.map((category)=> <CategoryView 
                                deleteCat={deleteCatgeoryMain} 
                                viewCat={handleView}
                                updateCat={handleUpdate}
                                key={category.categoryId} 
                                category={category}/>)
                                
                            }      
                        </InfiniteScroll>
                                  
                        </Container>
                    </>
                ):(<h6 className="text-center mt-3">No Categories Available</h6>))
            }
            {
                selectedCategory?modalView():''
            }
            {
              selectedCategory?modalUpdate():""
            }
        </div>
    )
          }

export default ViewCategories