import React from 'react';
import "./index.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../../URL/url';



function FavouriteCard({ data, favourite }) {
  const navigate = useNavigate()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const handleRemoveBook = async () => {
    const responese = await axios.put(`${SERVER_URL}/api/v1/deleteBookfrom-favorite`, {}, { headers });
    toast.success(responese.data.message)
    setTimeout(() => {
      navigate("/profile")
    }, 2000);

  };


  return (
    <>
      <div className="card shadow-xl border">
        <div className="cover-img relative">
          <Link to={`/view-book-details/${data._id}`}>
            <img className="card-img-top mb-5 mb-md-0 h-[43vh]"
              src={data.url} alt="..." />
          </Link>
          <div className="details absolute bottom-0 left-0 w-full  bg-white bg-opacity-50 text-black p-2">
            <div className="content">
              <h5>{data.title}</h5>
              <h6>By {data.author}</h6>
              <h4>Price: ₹ {data.price}</h4>
              {favourite && (
                <button onClick={handleRemoveBook} className='bg-black text-white px-4 py-2 rounded border font-semibold '>Remove</button>
              )}
            </div>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  );
}

export default FavouriteCard;
