import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ForgotPassword = () => {
  const [email,setEmail]=useState({})
  const[isValid,setIsValid]=useState(null)

  function handleChange(e)
  {
    setEmail({
      ...email,
      [e.target.name]:e.target.value
    })
  }
  async function handleSubmit(e)
  {
    e.preventDefault()
    try
    {
     
      const res=axios.post('https://snippet-swap-backend.vercel.app/auth/forgot-password',email,{withCredentials:true})
      toast.promise(res, {
        pending: "Please wait email is on the way...",
        success: "Please check you mail.", 
        error: "Email does not exist.", 
      });
    }
    catch(err)
    {
      if(err.response)
      {
        const {status}=err.response
        if(status===400)
        {
          toast.warn('Email does not exist.');
        }
      }
    }
  }
  return (
    <div className='h-screen'>
      <div className="flex justify-center mt-10">
        <div className="bg-slate-800 drop-shadow-2xl rounded-md sm:p-10 p-5 flex">
          <form onSubmit={handleSubmit}>
            <p className='text-xl'>Forgot your password?</p>
            <div className='mt-5'>
              <label htmlFor="email" className="block text-sm">
                Enter your email
              </label>
              <input type="text" placeholder='name@company.com' name="email" id="email" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required />
            </div>
            <div>
            {/* {isValid?<span className='text-xs text-green-500'>Please check your mail</span>:<span className='text-xs text-red-500'>Email does not exist.</span>} */}
            
             {/* {isValid===false&&<span className='text-xs text-red-500'>Email does not exist.</span>} */}
      
            </div>
            <div className="mt-4 flex flex-col items-center justify-center">
              <button className="bg-sky-700 px-20 py-1 rounded-lg">Submit</button>
            </div>
           
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

export default ForgotPassword