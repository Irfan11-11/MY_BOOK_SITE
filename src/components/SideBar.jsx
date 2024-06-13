import React from 'react'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from "../store/auth"



function SideBar({ data }) {
    const dispatch = useDispatch()
    const history = useNavigate()
    const role = useSelector((state) => state.auth.role);

    return (
        <div className='bg-slate-900 p-4 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]'>
            <div className='flex items-center flex-col justify-center text-white'>
                {" "}
                <img src={data.avatar} alt="" className='h-[12vh]' />
                <p className='mt-3 text-xl font-semibold'>{data.username}</p>
                <p className='mt-1 text-normal'>{data.email}</p>
                <div className='w-full mt-2 h-[1px]  bg-white hidden lg:block'></div>
            </div>
            {role === "user" && (
                <div className='w-full flex-col items-center justify-center hidden lg:flex'>
                    <Link to="/profile" className='font-semibold w-full py-2 text-center text-white hover:bg-blue-700 rounded transition-all duration-300 no-underline mt-3'>
                        Favourites
                    </Link>
                    <Link to="/profile/orderHistory" className='font-semibold w-full py-2 mt-4  text-white text-center hover:bg-blue-700 rounded transition-all duration-300 no-underline'>
                        Order History
                    </Link>
                    <Link to="/profile/settings" className='font-semibold w-full py-2 mt-4 text-center  text-white hover:bg-blue-700 rounded transition-all duration-300 no-underline'>
                        Settings
                    </Link>
                </div>
            )}

            {role === "admin" && (
                <div className='mt-6 w-full flex-col items-center justify-center hidden lg:flex'>
                    <Link to="/profile" className='font-semibold w-full py-2 text-center  text-white hover:bg-blue-700 rounded transition-all duration-300 no-underline'>
                        All Orders
                    </Link>
                    <Link to="/profile/add-book" className='font-semibold w-full py-2 mt-4 text-center  text-white hover:bg-blue-700 rounded transition-all duration-300 no-underline'>
                        Add Book
                    </Link>
                </div>
            )}
            <button className='bg-blue-700 w-3/6 lg:w-full mt-4 lg:mt-0 text-black font-semibold flex items-center justify-center rounded py-2'
                onClick={() => {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    history("/")
                }}
            >
                LogOut <FaArrowRightFromBracket className='ms-4' />
            </button>
        </div>
    )
}

export default SideBar