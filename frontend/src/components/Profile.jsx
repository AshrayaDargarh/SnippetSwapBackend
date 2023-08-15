import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState={
  userName:'',
  firstName:'',
  lastName:'',
  email:'',
  password:''
}
const Profile = () => {
  const [user, setUser] = useState(initialState);
  const [logo, setLogo] = useState("");
  const {logout}=useAuth()
  const navigate=useNavigate()
  useEffect(() => {
    getUser();
  }, []);
  async function getUser() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser({_id:res.data._id,userName:res.data.userName,firstName:res.data.firstName,lastName:res.data.lastName,email:res.data.email,password:''});
      console.log('user=',user)
      setLogo(res.data.firstName[0]);
    } catch (error) {
      navigate('/unauthorized')
      console.log(error.response);
    }
  }
  async function handleSubmit(e)
  {
    e.preventDefault()
    try{
      const token=localStorage.getItem('token')
      if(user.password==='')
      {
        console.log('User pass is empty')
        delete user.password
      }
      console.log('After removing password',user)
      const res=await axios.patch(`https://snippet-swap-backend.vercel.app/user/${user._id}`,user,{withCredentials:true},{headers:{Authorization:`Bearer ${token}`}})
      if(res.data)
      {
        toast.success('Profile updated successfully');
      }
      console.log(res)
    }catch(error)
    {
      console.log(error.response)
    }
  }
  function handleChange(e)
  {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  return (
    <div className="mb-32">
      <form
        className="flex flex-col justify-center items-center mt-20"
        onSubmit={handleSubmit}
      >
        <div className="w-20 bg-slate-800  shadow-slate-700 h-20 rounded-full flex justify-center items-center">
          <p className="text-4xl font-extrabold"> {logo}</p>
        </div>
        <div className="mt-6 text-2xl font-bold">
          <p>Welcome, {user.firstName + " " + user.lastName}</p>
        </div>

        <div className="mt-5">
          <label htmlFor="userName" className="block text-lg">
            User Name
          </label>
          <input
            type="text"
            value={user.userName}
            placeholder="Enter user name"
            name="userName"
            id="userName"
            className="bg-gray-500 px-2 sm:w-72 mt-2 py-1 rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="firstName" className="block text-lg">
            First Name
          </label>
          <input
            type="text"
            value={user.firstName}
            placeholder="Enter first name"
            name="firstName"
            id="firstName"
            className="bg-gray-500 px-2 sm:w-72 mt-2 py-1 rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="lastName" className="block text-lg">
            Last Name
          </label>
          <input
            type="text"
            value={user.lastName}
            placeholder="Enter last name"
            name="lastName"
            id="lastName"
            className="bg-gray-500 px-2 sm:w-72 mt-2 py-1 rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mt-5">
          <label htmlFor="email" className="block text-lg">
            Email
          </label>
          <input
            type="text"
            value={user.email}
            placeholder="Enter your email"
            name="email"
            id="email"
            className="bg-gray-500 px-2 sm:w-72 mt-2 py-1 rounded-lg"
            readOnly
          />
        </div>
        <div className="mt-5">
          <label htmlFor="password" className="block text-lg">
            Change Password
          </label>
          <input
            type="password"
            placeholder="Enter new passowrd"
            name="password"
            id="password"
            className="bg-gray-500 autofill:bg-slate-600  px-2 sm:w-72 mt-2 py-1 rounded-lg"
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 sm:flex-none flex flex-col gap-4">
          <button className="bg-slate-800 shadow-md shadow-slate-700 p-2 mx-2 rounded-md ">
            Update Profile
          </button>
          <button
            className="bg-slate-800 shadow-md shadow-slate-700 p-2 rounded-md"
            type="button"
            onClick={logout}
          >
            Log out
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
  );
  }

export default Profile;
