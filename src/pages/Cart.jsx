import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader/Loader'
import cartimg from '../assets/emptycart.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../URL/url';




function Cart() {
  const navigate = useNavigate()
  const [Cart, setCart] = useState()
  const [Total, setTotal] = useState(0)

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${SERVER_URL}/api/v1/get-user-cart`, { headers });
      setCart(res.data.data);
      // console.log(res);
    }
    fetch();
  }, [Cart]);

  const handleDeleteItem = async (bookid) => {
    const response = await axios.put(`${SERVER_URL}/api/v1/remove-from-cart/${bookid}`, {}, { headers })
    toast.success(response.data.message);
  }
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += parseInt(items.price)
      })
      setTotal(total);
      total = 0;
    }
  }, [Cart])


  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/v1/place-order`, { order: Cart, ticketPrice: Total }, { headers });
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/profile/orderHistory")
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };



  const handleEmpty = async () => {
    try {
      const response = await axios.put(`${SERVER_URL}/api/v1/empty-cart`, { order: Cart }, { headers });
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/cart")
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className=' h-[100%]'>
      {!Cart && <div className='w-full h-[100%] flex items-center justify-center'><Loader />{" "}</div>}
      {Cart && Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-blue-300'>
              Empty Cart!!!
            </h1>
            <img src={cartimg} alt="empty cart" className='lg:h-[50vh]' />
          </div>
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <section className="py-5" >
            <div className="container mt-5">
              <h1 className='text-4xl font-semibold text-black mb-8'>
                Your Cart
              </h1>
              <div>
                <div className="row mt-3">
                  <div className="col-lg-8">
                    <table className="table border shadow">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Image</th>
                          <th>Price</th>
                          <th>...</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Cart.map((items, i) => (
                          <tr key={i} className='border shadow font-semibold'>
                            <td>{i + 1}</td>
                            <td>{items.title.slice(0, 20)}...</td>
                            <td><img width="50px" height="50px" className='h-16' src={items.url} alt={items.title} /></td>
                            <td>₹ {items.price}</td>
                            <td><button onClick={() => handleDeleteItem(items._id)} className="btn"><i className="fa-solid fa-trash text-danger"></i></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="float-end">
                      <button onClick={handleEmpty} className="btn btn-danger">EMPTY CART</button>
                      <Link to="/all-books" className="btn btn-success ms-2">BUY MORE</Link>
                    </div>
                  </div>

                  {Cart && Cart.length > 0 && (
                    <div className="col-lg-4">
                      <div className="border rounded p-3 shadow">
                        <h3>Total Amount: <span className="text-danger">₹ {Total}</span></h3>
                        <h3>{Cart.length} Books</h3>
                      </div>
                      <hr />
                      <div className="d-grid">
                        <button onClick={handlePlaceOrder} className="btn btn-primary">Place Your Order</button>
                      </div>
                    </div>

                  )}

                </div>
              </div>
            </div>

          </section>
        </>
      )}
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </div>
  )
}

export default Cart;