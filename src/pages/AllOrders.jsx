import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import { IoOpenOutline } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SeeUserData from './SeeUserData';
import { SERVER_URL } from '../URL/url';


function AllOrders() {
    const [SelectedOrder, setSelectedOrder] = useState(null);
    const [AllOrders, setAllOrders] = useState([]);
    const [Values, setValues] = useState({ status: "" });
    const [UserDiv, setUserDiv] = useState("hidden")
    const [UserDivData, setUserDivData] = useState()


    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/api/v1/get-all-orders`, { headers });
                setAllOrders(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        }
        fetch();
    }, []);

    const change = (e) => {
        const { value } = e.target;
        setValues({ status: value });
    }

    const submitChanges = async (i) => {
        const id = AllOrders[i]._id;
        try {
            const response = await axios.put(`${SERVER_URL}/api/v1/update-status/${id}`, Values, { headers });
            toast.success(response.data.message);
            setAllOrders(prevOrders => {
                const updatedOrders = [...prevOrders];
                updatedOrders[i].status = Values.status;
                return updatedOrders;
            });
        } catch (error) {
            toast.error("Failed to update order status", error);
        }
    }

    return (
        <>
            {!AllOrders.length ? (
                <div className='h-[100%] flex items-center justify-center'>
                    <Loader />
                </div>
            ) : (
                <div>
                    <h1 className='text-3xl md:text-4xl font-semibold mb-8 text-black'>All Orders</h1>
                    <table className="table border shadow">
                        <thead className='font-semibold'>
                            <tr>
                                <th>#</th>
                                <th>Books</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th><i class="fa-solid fa-user"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {AllOrders.map((item, i) => (
                                <tr key={i} className='border shadow font-semibold'>
                                    <td>{i + 1}</td>
                                    <td>
                                        <td><Link className='hover:text-blue-500 no-underline' to={`/view-book-details/${item.book?._id}`}>{item.book?.title}</Link></td>
                                    </td>
                                    <td>{item.book?.desc.slice(0, 40)}...</td>
                                    <td>
                                        <img width="50px" height="50px" className='h-16' src={item.book?.url} alt={item.book?.title} />
                                    </td>
                                    <td>₹ {item.book?.price}</td>
                                    <td className="font-semibold">
                                        <button onClick={() => setSelectedOrder(i)} className='hover:scale-105 transition-all duration-300'>
                                            {item.status === "Order Placed" ? (
                                                <div className='text-yellow-500'>{item.status}</div>
                                            ) : item.status === "Cancelled" ? (
                                                <div className='text-red-500'>{item.status}</div>
                                            ) : (
                                                <div className='text-green-500'>{item.status}</div>
                                            )}
                                        </button>
                                        <div className={`${SelectedOrder === i ? "flex" : "hidden"}`}>
                                            <select value={Values.status} onChange={change} name="status" className='bg-white'>
                                                {[
                                                    "Order Placed",
                                                    "Out For Delivery",
                                                    "Delivered",
                                                    "Cancelled"
                                                ].map((status, i) => (
                                                    <option value={status} key={i}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                            <button onClick={() => {
                                                setSelectedOrder(null);
                                                submitChanges(i);
                                            }} className='text-green-500 hover:text-pink-600 mx-2'>
                                                <FaCheck />
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <button className='text-xl hover:text-orange-500'
                                            onClick={() => {
                                                setUserDiv("fixed")
                                                setUserDivData(item.user)
                                            }}
                                        >
                                            <IoOpenOutline />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {UserDivData && (
                <SeeUserData
                    UserDivData={UserDivData}
                    UserDiv={UserDiv}
                    setUserDiv={setUserDiv}
                />
            )}
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>
    );
}

export default AllOrders;
