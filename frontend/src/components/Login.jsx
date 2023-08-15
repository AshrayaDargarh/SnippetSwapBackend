import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const[user,setUser]=useState({})
  const[isValid,setIsValid]=useState(true)
  const {login}=useAuth()
  const navigate=useNavigate()

  function handleChange(e)
  {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  async function  handleSubmit(e)
  {
    e.preventDefault()
    try
    {
      const res=await axios.post('https://snippet-swap-backend.vercel.app/auth/login',user)
      // localStorage.setItem('token',res.data.token)
      console.log('Sign is submitted',res)
      setIsValid(true)
      console.log(res.data.token)
      login(res.data.token)
      navigate('/create')      
    }
    catch(err)
    {
      console.log(err.response)
     
      if(err.response)
      {
        const {status,data}=err.response
        
        if(status===400)
        {
          setIsValid(false)
        }
      }
    }
  }
  return (
    <div className='overflow-hidden h-screen'>
      <div className="flex justify-center mt-10">
        <div className="bg-slate-800 drop-shadow-2xl rounded-md sm:p-10 p-5 flex">
          <form onSubmit={handleSubmit}>
            <p className='text-xl'>Sign in to your account</p>
            <div className='mt-5'>
              <label htmlFor="email" className="block text-sm">
                Your email
              </label>
              <input type="text" placeholder='name@company.com' name="email" id="email" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required />
            </div>
            <div className='mt-3'>
              <label htmlFor="password" className="block text-sm">
                Password
              </label>
              <input type="password" placeholder="• • • • • • • • " name="password" id="password" className='bg-gray-500 px-2 w-72 mt-2 py-1 rounded-lg' onChange={handleChange} required/>
            </div>
            <div className='mt-2'>
              <span className='text-xs text-red-500'>{isValid?'':'Please enter correct email or password'}</span>
            </div>
            <div className='mt-3 text-sm'>
              <Link to='/forgotpassword' className='text-blue-500'>Forgot password</Link>
            </div>
            <div className="mt-3 flex flex-col items-center justify-center">
              <button className="bg-sky-700 px-20 py-1 rounded-lg" type='submit'>Sign n</button>
            </div>
            <p className='mt-4 text-sm'>
                Don't have an account yet? <Link to='/signup' className='text-blue-500'>Sign up</Link>
              </p>
          </form>
        </div>
      </div>
      </div>
  );
}

export default Login