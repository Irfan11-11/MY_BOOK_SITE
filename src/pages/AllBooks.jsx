import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa';
import { SERVER_URL } from '../URL/url';


function AllBooks() {
    const [searchKey, setSearchKey] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${SERVER_URL}/api/v1/get-all-books`, {
                    params: { search: searchKey }
                });
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [searchKey]);

    return (
        <div className='px-12 h-auto py-8'>
            <div className='flex justify-between py-10'>
                <h1 className='text-4xl font-semibold'>All Books</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="flex justify-end">
                        <div className="relative">
                            <input
                                onChange={e => setSearchKey(e.target.value)}
                                type="text"
                                placeholder='Search....'
                                className='border border-black rounded-md pl-12 pr-4 py-2 shadow-md focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 w-full'
                            />
                            <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </form>
            </div>
            {loading ? (
                <div className='w-full h-screen flex items-center justify-center'>
                    <Loader />
                </div>
            ) : (
                <div className='px-4 lg:px-24'>
                    <div className='grid gap-8  lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
                        {data.map((item) => (
                            <div key={item._id}>
                                <div className="card shadow-xl border">
                                    <div className="cover-img relative">
                                        <Link to={`/view-book-details/${item._id}`}>
                                            <img className="card-img-top mb-5 mb-md-0 h-[43vh]"
                                                src={item.url} alt="..." />
                                            <div className='absolute top-3 right-3 bg-blue-600 hover:bg-black p-2 rounded'>
                                                <FaCartShopping className="w-4 h-4 text-white" />
                                            </div>

                                            <div className="details absolute bottom-0 left-0 w-full bg-white bg-opacity-50 text-black p-2">
                                                <div className="content">
                                                    <h5 className='font-bold'>{item.title}</h5>
                                                    <h6 className='font-semibold'>By {item.author}</h6>
                                                    <h5>Price: <span className='font-bold'>₹ {item.price}</span></h5>
                                                    <button className='bg-black text-white px-14 py-2 rounded border font-semibold '>BUY</button>
                                                </div>
                                            </div>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllBooks;
