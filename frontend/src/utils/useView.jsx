import React, { useEffect, useState } from 'react'
import axios from 'axios'
const useView = (viewId) => {
    const [snippet,setSnippet]= useState(null)
    useEffect(()=>{
        getSnippet()
    },[])
    async function getSnippet()
    {
        try{
            const token=localStorage.getItem('token')
            const res=await axios.get(`/view/${viewId}`,{headers:{'Authorization':`Bearer ${token}`}})
            console.log(res.data)
            setSnippet(res.data)
        }
        catch(error)
        {
            console.log(error.response)
        }
    }
  return snippet
}

export default useView