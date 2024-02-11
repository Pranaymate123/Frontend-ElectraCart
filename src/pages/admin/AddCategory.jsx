import { useState } from 'react'
import {Container,Card,Form,FormGroup,Button,Spinner} from 'react-bootstrap'
import {toast} from 'react-toastify'
import { addCategory } from '../../services/CategoryService'

const AddCategory=()=>{

    const [category,setCategory]=useState({
        title:'',
        description:'',
        coverImage:''
    })

    const handleFeildChange=(event,property)=>{
        event.preventDefault();
        setCategory({
            ...category,
            [property]:event.target.value
        })
    }
    const clearData=()=>{
        setCategory({
            title:'',
            description:'',
            coverImage:''
        })
    }

    const [loading,setLoading]=useState(false);



    //submit
    const handleFormSubmit=(event)=>{
        event.preventDefault();

        console.log(category);
      if(category.title ===undefined || category.title.trim()==='')
        {
            toast.error("Invalid Category")
            return
        } 
        if(category.description ===undefined || category.description.trim()==='')
        {
            toast.error("Invalid Category")
            return
        } 
        setLoading(true)
        //call server api Call to add category
        addCategory(category)
        .then((data)=>{
            console.log(data);
            toast.success("Catgeory Added SuccessFully")
            setCategory({
                title:'',
                description:'',
                coverImage:''


            })
        }).catch(error=>{
            console.log(error);
            toast.error("Error Occured")
        }).finally(()=>{
            setLoading(false)
        })
    }

   


    return(
        <>
        <Container>
            <Card className='border-0 shadow'>
                {/* {JSON.stringify(category)} */}
                <Card.Body>
                    <h5>Add Category Here !!</h5>
                    <Form onSubmit={handleFormSubmit}>
                        <FormGroup className='mt-3'>
                            <Form.Label>Category Title</Form.Label>
                            <Form.Control type='text'
                            value={category.title} 
                            onChange={(event)=>{
                                handleFeildChange(event,'title')
                            }}
                            placeholder='Enter here'
                            />
                        </FormGroup>
                        <FormGroup className='mt-3'>
                            <Form.Label>Category Description</Form.Label>
                            <Form.Control rows={6} as={'textarea'}
                             value={category.description} 
                             onChange={(event)=>{
                                 handleFeildChange(event,'description')
                             }}
                            placeholder='Enter here'
                            />
                        </FormGroup>
                        <FormGroup className='mt-3'>
                            <Form.Label>Category Cover Image Url</Form.Label>
                            <Form.Control type='text' 
                             value={category.coverImage} 
                             onChange={(event)=>{
                                 handleFeildChange(event,'coverImage')
                             }}
                            placeholder='Enter Url here'
                            />
                        </FormGroup>
                        <Container className='text-center mt-3'>
                            <Button type='submit' variant='success'>
                                <Spinner 
                                hidden={!loading}
                                animation='border'
                                size='sm'
                                className='me-2'
                                />
                               <span hidden={loading}>Add Category</span>
                               <span hidden={!loading}>Please Wait</span>
                            </Button>
                            <Button className='ms-3' variant='danger' onClick={clearData}>
                                Clear
                            </Button>
                        </Container>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}

export default AddCategory