import axios from 'axios';
import React, { useState } from 'react'
import { FloatingLabel, Form ,Button } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../URL/url';




function AddBook() {
    const [Data, setData] = useState({
        url:"",
        title:"",
        author:"",
        price:"",
        desc:"",
        language:"",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
    
      const change = (e) =>{
        const {name,value} = e.target;
        setData({...Data, [name]:value})
      };

      const submit = async () =>{
        event.preventDefault(); 
        try {
            if(
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === ""
            ){
                toast.warning("Please fill the form completely");
            }else{
                const response = await axios.post(`${SERVER_URL}/api/v1/add-book`,Data,{headers})
                setData({
                    url:"",
                    title:"",
                    author:"",
                    price:"",
                    desc:"",
                    language:"",
                });
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
      }
    
    return (
        <div className='px-4 my-12 h-[100%]'>
            <h2 className='mb-8 text-3xl font-bold'>Upload A book</h2>

            <form className="flex lg:w-[1180px] flex-col flex-warp gap-4">

                <div>
                    <div>
                        <FloatingLabel controlId="floatingInputName" label="URL" className="mb-3 border shadow font-semibold">
                            <Form.Control name="url" value={Data.url} onChange={change} type="text" placeholder="Image URL..." required />
                        </FloatingLabel>

                    </div>
                </div>


                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputName" label="Title" className="mb-3 border shadow font-semibold">
                            <Form.Control name="title" value={Data.title} onChange={change} type="text" placeholder="Title Of Book" required />
                        </FloatingLabel>
                    </div>
                    <div className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputName" label="Author" className="mb-3 border shadow font-semibold">
                            <Form.Control name="author" value={Data.author} onChange={change} type="text" placeholder="Author Of Book" required />
                        </FloatingLabel>
                    </div>

                </div>

                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputName" label="Language" className="mb-3 border shadow font-semibold">
                            <Form.Control name="language" value={Data.language} onChange={change} type="text" placeholder="Language Of Book" required />
                        </FloatingLabel>
                    </div>
                    <div className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputName" label="Price" className="mb-3 border shadow font-semibold">
                            <Form.Control name="price" value={Data.price} onChange={change} type="text" placeholder="Price Of Book" required />
                        </FloatingLabel>

                    </div>
                </div>

                <div>
                    <div>
                        <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3 border shadow font-semibold">
                            <Form.Control  name="desc" value={Data.desc} onChange={change} as="textarea" placeholder="Description Of Book" required />
                        </FloatingLabel>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button onClick={submit} type="submit" className=' text-white bg-blue-700 text-center'>Upload Book</Button>
                </div>
            </form>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />

        </div>
    )
}

export default AddBook