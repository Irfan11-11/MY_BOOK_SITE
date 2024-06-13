import React from 'react'
import { Link } from 'react-router-dom'
import navbarimg from './Navbar/image/navbar.png';


function Footer() {
  return (
    <div style={{ backgroundColor: "rgb(0 0 0 / 87%)" }} className=' px-8 py-4 z-20'>
      <footer className="w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 lg:px-0">
          <div className="inline-flex items-center">
            <Link to={"/"} className="flex items-center no-underline">
              <img className='h-12 me-2' src={navbarimg} alt="logo" />
              <h1 className="text-2xl font-bold text-white">My Books</h1>
            </Link>
          </div>
          <div className="hidden items-center md:inline-flex">
            <span className="text-sm font-medium text-white">Ready to Get Started ?</span>
            <Link to={"/"}>
              <button
                type="button"
                className="ml-2 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <hr className="my-8 text-white" />
        <div className="mx-auto flex max-w-6xl flex-col items-start space-x-8 md:flex-row">
          <div className="w-full px-4 md:w-1/2 lg:px-0">
            <h1 className="max-w-sm text-3xl font-bold  text-white">Subscribe to our Book Store</h1>
            <form action="" className="mt-4 inline-flex w-full items-center md:w-3/4">
              <input
                className="text-white flex h-10 w-full rounded-md border border-black/20 bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email"
              ></input>
              <button
                type="button"
                className="ml-4 rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <i class="fa-sharp fa-solid fa-arrow-right"></i>
              </button>
            </form>
            <p className="text-sm text-white mt-8 font-bold">
              &copy; Copyright 2022. All Rights Reserved by MY BOOKS.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-6 md:mt-0 lg:w-3/4 lg:grid-cols-3">
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-white">LINKS</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium">
                <Link className='no-underline text-white' to={"/"}><li>Home</li></Link>
                <Link className='no-underline text-white' to={"/cart"}><li>Cart</li></Link>
                <Link className='no-underline text-white' to={"/all-books"}><li>All Books</li></Link>
                <Link className='no-underline text-white' to={"/login"}><li>Log in</li></Link>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-white">HELP</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium text-white">
                <li>About us</li>
                <li>Company History</li>
                <li>Our Team</li>
                <li>Our Vision</li>
              </ul>
            </div>
            <div className="mb-8 lg:mb-0">
              <p className="mb-6 text-lg font-semibold text-white">GUIDS</p>
              <ul className="flex flex-col space-y-4 text-[14px] font-medium  text-white">
                <li>Bootsstrap</li>
                <li>React</li>
                <li>Tailwind.css</li>
                <li>Vite</li>
              </ul>
            </div>

          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer