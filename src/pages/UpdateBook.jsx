import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { SERVER_URL } from '../URL/url';

function UpdateBook() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
    });

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid : id,
    };

    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const submit = async (event) => {
        event.preventDefault(); 
        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.desc === "" ||
                Data.language === ""
            ) {
                toast.warning("Please fill the form completely");
            } else {
                const response = await axios.put(`${SERVER_URL}/api/v1/update-book`, Data, { headers });
                setData({
                    url: "",
                    title: "",
                    author: "",
                    price: "",
                    desc: "",
                    language: "",
                });
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate(`/view-book-details/${id}`);
                  }, 2000); 
          
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetch = async () => {
            const responese = await axios.get(`${SERVER_URL}/api/v1/get-book-by-id/${id}`)
            setData(responese.data.data);
            console.log(responese);
        }
        fetch();
    }, []);


    return (
        <div className='px-24 my-12 h-[100%] ms-12 py-12 '>
            <h2 className='mb-8 text-3xl font-bold'>Update Book</h2>

            <Form onSubmit={submit} className="flex lg:w-[1180px] flex-col flex-warp gap-4">

                <Form.Group>
                    <FloatingLabel controlId="floatingInputUrl" label="URL" className="mb-3 border shadow font-semibold">
                        <Form.Control name="url" value={Data?.url} onChange={change} type="text" placeholder="Image URL..." required />
                    </FloatingLabel>
                </Form.Group>

                <div className='flex gap-8'>
                    <Form.Group className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputTitle" label="Title" className="mb-3 border shadow font-semibold">
                            <Form.Control name="title" value={Data?.title} onChange={change} type="text" placeholder="Title Of Book" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputAuthor" label="Author" className="mb-3 border shadow font-semibold">
                            <Form.Control name="author" value={Data?.author} onChange={change} type="text" placeholder="Author Of Book" required />
                        </FloatingLabel>
                    </Form.Group>
                </div>

                <div className='flex gap-8'>
                    <Form.Group className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputLanguage" label="Language" className="mb-3 border shadow font-semibold">
                            <Form.Control name="language" value={Data?.language} onChange={change} type="text" placeholder="Language Of Book" required />
                        </FloatingLabel>
                    </Form.Group>

                    <Form.Group className='lg:w-1/2'>
                        <FloatingLabel controlId="floatingInputPrice" label="Price" className="mb-3 border shadow font-semibold">
                            <Form.Control name="price" value={Data?.price} onChange={change} type="text" placeholder="Price Of Book" required />
                        </FloatingLabel>
                    </Form.Group>
                </div>

                <Form.Group>
                    <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3 border shadow font-semibold">
                        <Form.Control name="desc" value={Data?.desc} onChange={change} as="textarea" placeholder="Description Of Book" required />
                    </FloatingLabel>
                </Form.Group>

                <div className="flex justify-end">
                    <Button type="submit" className='text-white bg-blue-700 text-center'>Update Book</Button>
                </div>
            </Form>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
    );
}

export default UpdateBook;
