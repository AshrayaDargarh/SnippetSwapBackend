import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
  const [user,setUser]=useState({})

  const navigate=useNavigate()
  function handleChange(e)
  {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  async function handleSubmit(e)
  {
    e.preventDefault()
    try
    {
      const res= axios.post('https://snippet-swap-backend.vercel.app/auth/signUp',user,{withCredentials:true})
      toast.promise(res, {
        pending: "Please wait your profile is being created...",
        success: "Account created successfully.", 
        error: "Email already exist or invalid credentials!", 
      });
      if(res.status===201)
      {
        navigate('/login')
      }
    }catch(error)
    {
      if(error.response)
      {
        navigate('/error')
      }
    }
  }
  return (
    <div className='h-screen'>
      <div className="flex justify-center mt-10">
        <div className="bg-slate-800 drop-shadow-2xl rounded-md sm:p-10 p-5 flex">
          <form onSubmit={handleSubmit}>
            <p className='text-xl'>Create your account</p>
            <div className='mt-5'>
              <label htmlFor="userName" className="block text-sm">
                User Name
              </label>
              <input type="text" placeholder='Enter user name' name="userName" id="userName" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required/>
            </div>
            <div className='mt-5'>
              <label htmlFor="firstName" className="block text-sm">
                First Name
              </label>
              <input type="text" placeholder='Enter your first name' name="firstName" id="firstName" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange}  required/>
            </div>
            <div className='mt-5'>
              <label htmlFor="lastName" className="block text-sm">
                Last Name
              </label>
              <input type="text" placeholder='Enter your last name' name="lastName" id="lastName" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required/>
            </div>
            <div className='mt-5'>
              <label htmlFor="email" className="block text-sm">
                Your email
              </label>
              <input type="text" placeholder='name@company.com' name="email" id="email" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required/>
            </div>
            <div className='mt-3'>
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input type="password" placeholder="• • • • • • • • "name="password" id="password" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required/>
            </div>
          
            <div className='mt-3 text-sm'>
              <Link to='/forgotpassword' className='text-blue-500'>Forgot password</Link>
            </div>
            <div className="mt-3 flex flex-col items-center justify-center">
              <button className="bg-sky-700 px-20 py-1 rounded-lg">Sign up</button>
            </div>
            <p className='mt-4 text-sm'>
               Already have an account? <Link to="/login" className='text-blue-500'>Sign in</Link>
              </p>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default Register