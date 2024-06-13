import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader/Loader';
import { FloatingLabel, Form , Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../URL/url';



function Settings() {
  const [Value, setValue] = useState({ address: ""})
  const [ProfileData, setProfileData] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) =>{
    const {name,value} = e.target;
    setValue({...Value, [name]:value})
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${SERVER_URL}/api/v1/get-user-information`,
        { headers }
      );
      setProfileData(response.data)
      setValue({ address: response.data.address })
    }
    fetch()
  }, []);

  const handleUpdate =  async () =>{
    const response = await axios.put(`${SERVER_URL}/api/v1/update-address`, Value, { headers })
    toast.success(response.data.message);
  }

  return (
    <div>
      {!ProfileData && (
        <div className='w-full h-[100%] flex items-center justify-center'><Loader /></div>
      )}

      {ProfileData && (
        <div className='h-screen p-0 md:p-4' >
          <div className='px-4 my-12 '>
            <h1 className='text-3xl md:text-4xl font-semibold mb-8 text-blue-500'>Settings</h1>

            <Form className="flex lg:w-[1180px] flex-col flex-warp gap-4">
              <div className='flex gap-8'>
                <div className='lg:w-1/2'>
                  <FloatingLabel controlId="floatingInputName" label="Username" className="mb-3 border shadow font-semibold">
                    <Form.Control value={ProfileData.username} name="username" type="text" placeholder="Username" required />
                  </FloatingLabel>
                </div>
                <div className='lg:w-1/2'>
                  <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3 border shadow">
                    <Form.Control value={ProfileData.email} name="email" type="email" placeholder="Email" required />
                  </FloatingLabel>
                </div>
              </div>


              <div>
                <div>
                  <FloatingLabel controlId="floatingTextarea" label="Address" className="mb-3 border shadow">
                    <Form.Control value={Value.address} onChange={change} name="address" as="textarea" placeholder="Address" required />
                  </FloatingLabel>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleUpdate} type="submit" className=' text-white bg-blue-700 text-center'>Update</Button>
              </div>
            </Form>
          </div>
        </div>
      )}
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />

    </div>
  )
}

export default Settings