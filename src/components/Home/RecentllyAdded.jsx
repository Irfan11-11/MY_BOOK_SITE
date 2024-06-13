import React, { useEffect, useState } from 'react'
import axios from 'axios'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6'
import Loader from '../Loader/Loader';
import { SERVER_URL } from '../../URL/url';


function RecentllyAdded() {
    const [Data, setData] = useState()

    useEffect(() => {
        const fetch = async () => {
            const responese = await axios.get(`${SERVER_URL}/api/v1/get-recent-books`)
            setData(responese.data.data);
        }
        fetch();
    }, [])

    return (
        <div className='mt-4 px-4'>
            <h4 className='text-3xl text-black'>Recently added books</h4>

            {!Data && <div className='flex items-center justify-center my-8'>
                <Loader />{" "}
            </div>}
            {/* cards */}
            <div className='my-16 px-4 lg:px-24'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper w-full h-full"
                >
                    {Data && Data.map((item, i) =>
                        <SwiperSlide key={i}>
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
                                                <h5>{item.title}</h5>
                                                <h6>By {item.author}</h6>
                                                <h5>Price: ₹ {item.price}</h5>
                                                <button className='bg-black text-white px-4 py-2 rounded border font-semibold '>BUY</button>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            </div>
                        </SwiperSlide>
                    )}

                </Swiper>
            </div>
        </div>


    )
}

export default RecentllyAdded

