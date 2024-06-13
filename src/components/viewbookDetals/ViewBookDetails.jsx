import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loader from '../Loader/Loader';
import { GrLanguage } from "react-icons/gr"
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../URL/url';



function ViewBookDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [Data, setData] = useState()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            const responese = await axios.get(`${SERVER_URL}/api/v1/get-book-by-id/${id}`)
            setData(responese.data.data);
            console.log(responese);
        }
        fetch();
    }, [])
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourite = async () => {
        const responese = await axios.put(`${SERVER_URL}/api/v1/addBookto-favorite`, {}, { headers });
        toast.success(responese.data.message);
    }

    const handleCart = async () => {
        const responese = await axios.put(`${SERVER_URL}/api/v1/add-to-cart`, {}, { headers })
        toast.success(responese.data.message);
    }

    const handleBookDelete = async () => {
        const response = await axios.delete(`${SERVER_URL}/api/v1/delete-book`, { headers })
        toast.success(response.data.message);
        setTimeout(() => {
            navigate("/all-books");
        }, 2000);
    }


    return (
        <div className="container py-28">
            {Data && (

                <div className="flex flex-col md:flex-row gap-8 text-black">
                    <div className="w-full md:w-1/2">
                        <img
                            src={Data?.url}
                            alt="Relativity Book Cover"
                            className="w-full h-[63vh] rounded-md shadow-md"
                        />
                    </div>
                    <div className="w-full md:w-1/2 ">
                        <h1 className="text-4xl font-bold mb-4 text-center">{Data?.title}</h1>
                        <p className="text-md mb-4 ">by <span className='font-semibold'>{Data?.author}</span>  (Author)</p>
                        <p className="mb-4 text-md font-semibold ">
                            {Data?.desc}
                        </p>
                        <div className='flex items-center justify-between'>
                        <p className='text-xl'>Price: <span className="text-2xl font-bold">₹{Data?.price}</span></p>
                            <p className='flex me-1'>
                                <GrLanguage className='me-3 text-xl' /> <span className='font-semibold'>{Data?.language}</span>
                            </p>
                        </div>
                        {isLoggedIn === true && role === "user" && (
                            <div className="flex flex-col items-center gap-2">
                                <button onClick={handleFavourite} className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full w-50 text-center" type="button">

                                    <i className="fa-solid fa-heart-circle-plus text-danger me-1"></i> FAVOURITE
                                </button>
                                <button onClick={handleCart} className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full w-50 text-center" type="button">
                                    <i className="fa-solid fa-cart-plus text-success me-3"></i>
CART
                                </button>
                            </div>
                        )}

                        {isLoggedIn === true && role === "admin" && (
                            <div className="flex flex-col items-center gap-2 ">
                                <Link to={`/updateBook/${id}`} className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full no-underline w-50 text-center" type="button">

                                    <i class="fa-solid fa-pen-to-square fa-lg me-1 text-info"></i>  EDIT
                                </Link>
                                <button onClick={handleBookDelete} className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full w-50" type="button">
                                    <i class="fa-solid fa-trash fa-lg me-2 text-danger"></i> DELETE
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader />{" "}</div>}
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>

    )
}

export default ViewBookDetails



{/* <div className='px-12 py-8 ms-8 gap-8'>
<section className="py-5">
    <div className="container px-4 px-lg-5 my-5">
        {Data && (
            <div className="row gx-4 gx-lg-5 flex items-center justify-center text-black">
                <div className="col-md-6">
                    <img width="400px" height="400px" className="card-img-top mb-5 mb-md-0 h-[73vh]"
                        src={Data.url} alt="..." />
                </div>
                <div className="col-md-6">
                    <h1 className="font-bold">{Data.title}</h1>
                    <p className='mt-1 text-xl font-semibold'><span className='font-semibold text-ml'>by</span> {Data.author}</p>
                    <p className="lead mt-4 mb-4 text-xl">
                        <span className="font-semibold text-ml">Description :</span> {Data.desc}
                    </p>
                    <p className='flex mt-2 items-center justify-start font-semibold'>
                        <GrLanguage className='me-3 font-semibold text-xl' /> {Data.language}
                    </p>
                    <p className='mt-4 text-3xl font-semibold'>
                        Price : ₹ {Data.price}{" "}
                    </p>
                    {isLoggedIn === true && role === "user" && (
                        <div className="d-flex justify-content-between mt-8">
                            <button onClick={handleFavourite} className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="fa-solid fa-heart-circle-plus text-danger me-1"></i>
                            </button>
                            <button onClick={handleCart} className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="fa-solid fa-cart-plus text-success me-1"></i>

                            </button>
                        </div>
                    )}

                    {isLoggedIn === true && role === "admin" && (
                        <div className="d-flex justify-content-between mt-8">
                            <Link to={`/updateBook/${id}`} className="btn btn-outline-dark bg-black flex-shrink-0  text-white hover:bg-blue-700 rounded transition-all duration-300" type="button">
                                <i class="fa-solid fa-pen-to-square fa-lg me-1 text-info"></i>
                            </Link>
                            <button onClick={handleBookDelete} className="btn btn-outline-dark bg-black flex-shrink-0  text-white hover:bg-blue-700 rounded transition-all duration-300" type="button">
                                <i class="fa-solid fa-trash fa-lg me-2 text-danger"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>

        )}
        {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'><Loader />{" "}</div>}
    </div>
</section>
<ToastContainer position='top-center' theme='colored' autoClose={3000} />
</div> */}
