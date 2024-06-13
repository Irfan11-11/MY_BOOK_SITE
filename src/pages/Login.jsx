import Loginimg from '../assets/login.png';
import { FloatingLabel, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { authActions } from '../store/auth';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { SERVER_URL } from '../URL/url';

function Login() {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
 const dispatch = useDispatch()

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (Values.username === "" || Values.password === "") {
        toast.warning("Please fill the form completely");
      } else {
        const response = await axios.post(`${SERVER_URL}/api/v1/sign-in`, Values);
        // console.log(response.data);
        dispatch(authActions.login());
        dispatch(authActions.changeRole( response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 2000); 
      }
    } catch (error) {
      console.error(error.response.data.message);
      toast.error("Username Or password incorrect!!!");
    }
  };

  return (
    <div>
      <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center mt-7'>
        <div className="container w-75 ">
          <div className="card shadow p-5">
            <div className="row align-items-center ">
              <div className="col-lg-6 ">
                <img className='w-100' src={Loginimg} alt="Auth"/>
              </div>
              <div className="col-lg-6 mb-8 text-black">
                <h1 className="font-bold mb-6">My Books</h1>
                <h5 className="font-semibold mb-7">Sign In to your Account</h5>
                <Form onSubmit={submit}>
                  
                  <FloatingLabel
                    controlId="floatingInputName"
                    label="Username"
                    className="mb-3"
                  >
                    <Form.Control name="username" className='border border-black rounded-lg shadow-md ' value={Values.username} onChange={change} type="text" placeholder="Username" />
                  </FloatingLabel>
  
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                  >
                    <Form.Control name="password" className='border border-black rounded-lg shadow-md ' value={Values.password} onChange={change} type="password" placeholder="Password" />
                  </FloatingLabel>
  
                  <div className='mt-3'>
                    <button type="submit" className='btn btn-primary'>Login</button>
                    <p>New User? Click here to <Link className='text-info' to={'/signup'}>SignUp</Link></p>
                  </div>
  
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </div>    
  );
}

export default Login;
