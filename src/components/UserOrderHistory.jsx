import React, { useEffect, useState } from 'react'
import Loader from './Loader/Loader';
import axios from 'axios';
import emptyOrder from '../assets/emtyorder.png';
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../URL/url';


function UserOrderHistory() {
  const [OrderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${SERVER_URL}/api/v1/get-order-history`, { headers })
      setOrderHistory(response.data.data);
    }
    fetch()
  }, [])

  return (
    <div>
      {!OrderHistory && (
        <div className='flex items-center justify-center h-[100%]'><Loader /></div>
      )}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-semibold text-zinc-500 mb-8'>
              No Order History!!!
            </h1>
            <img src={emptyOrder} alt="" className='h-[20vh] mb-8' />
          </div>
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (

        <div>
          <h1 className='text-3xl md:text-4xl font-semibold mb-8 text-blue-500'>Your Order History</h1>
          <table className="table border shadow">
            <thead className='font-semibold'>
              <tr>
                <th>#</th>
                <th>Books</th>
                <th>Description</th>
                <th>Image</th>
                <th>Price</th>
                <th>Status</th>
                <th>Mode</th>
              </tr>
            </thead>
            <tbody>
              {OrderHistory.map((items, i) => (
                <tr key={i} className='border shadow font-semibold'>
                  <td>{i + 1}</td>
                  <td><Link className='hover:text-blue-500 no-underline' to={`/view-book-details/${items.book?._id}`}>{items.book?.title}</Link></td>
                  <td>{items.book?.desc.slice(0, 40)}...</td>
                  <td><img width="50px" height="50px" className='h-16' src={items.book?.url} alt={items?.title} /></td>
                  <td>₹ {items.book?.price}</td>
                  <td >
                    {items.status === "Order Placed" ? (
                      <div className='text-yellow-500'>{items?.status}</div>
                    ) : items.status === "Cancelled" ? (
                      <div className='text-red-500'>{items?.status}</div>
                    ) : (
                      <div className='text-green-500'>{items?.status}</div>
                    )}
                  </td>
                  <td className='text-sm text-black-400'>COD</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  )
}

export default UserOrderHistory