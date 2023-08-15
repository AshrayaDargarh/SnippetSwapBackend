import React, { useEffect, useState } from 'react'
import View from './View'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
const ViewList = () => {
    const [snippets,setSnippets]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        getSnippets()
    },[])
    async function getSnippets()
    {
        try {
        const token=localStorage.getItem('token')
        const res=await axios.get('/view',{headers:{'Authorization':`Bearer ${token}`}})
            setSnippets(res.data)
            // console.log('user=',res.data[0].user)
        } 
        catch (error) {
             navigate('/unauthorized')
            console.log(error.response)
        }
    }
  return (
    <div className='h-screen'>
    <div className='flex justify-center lg:gap-0 gap-8  m-20 flex-wrap' >
        {snippets.length===0?<div>No snippet available</div>:snippets.map((snippet)=>{return <Link to={'/viewupdate/'+snippet._id} key={snippet._id}><View key={snippet._id} {...snippet}/> </Link> })}
    </div>
    </div>
  )
}

export default ViewList