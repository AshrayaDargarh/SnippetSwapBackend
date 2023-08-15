import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CopyIcon from '../assets/icons/CopyIcon'
import PasteIcon from '../assets/icons/PasteIcon'
import { useParams } from 'react-router-dom'
import QRCode from "qrcode.react";
const initialValue={
    title:'',
    data:'',
    daysToExpire:0,
    userName:''
}
const ViewPublic = () => {
    const [snippet,setSnippet]=useState(initialValue)
    const [time,setTime]=useState()
  const [copy, setCopy] = useState(false);
    const {viewId}=useParams()
    async function getView()
    {
        try {
            const res=await axios.get(`/public/${viewId}`)
            setSnippet(res.data)
            const inputDate = new Date(res.data.intendedExpireAt);
            const currentDate = new Date();
            const timeDifferenceMillis = inputDate - currentDate;
            const daysDifference = Math.floor(timeDifferenceMillis / (60 * 60 * 1000));
            setTime(daysDifference)
        } 
        catch (error) {
      navigate('/unauthorized')
            console.log(error.response)
        }
    }
    useEffect(()=>{
        getView()
    },[])
    const currentUrl = window.location.host;
    function handleCopy() {
      navigator.clipboard.writeText(`http://${currentUrl}/public/${viewId}`);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 1000);
    }
  return (
    <div className='bg-slate-900 text-white overflow-hidden font-display  '>
    <div>
      <form >
      <div className='flex justify-center flex-wrap pt-8'>
        <div className='m-5 '>
          <label htmlFor='data' className='block pb-3' ><span className='text-2xl font-semibold'>Your code is here:</span></label>
          <textarea name="data" value={snippet.data} readOnly  
          className="bg-slate-900 p-2 border border-slate-600 rounded-md lg:w-[60rem] md:w-[45rem] sm:w-[35rem]"
           id="data" rows="34" cols="30" ></textarea>
        </div>
        
        <div className='m-5 '>
        <div className='mt-5 mr-20'>
              <label htmlFor="title" className="block text-sm">
                Snippet title:
              </label>
              <input type="text" value={snippet.title} readOnly placeholder='Enter title' name="title" id="title" className='bg-slate-900 border sm:w-72 border-slate-600 p-2 mt-2 py-1 rounded-md' />
        </div>
        <div className='mt-5 mr-20'>
           <label htmlFor="daysToExpire" className="block text-sm">
                Expire after:
              </label>
              <input type="text" value={time + ' Hours left'} readOnly  placeholder='Expires after (days)' name="daysToExpire" id="daysToExpire" className='bg-slate-900 border sm:w-72 border-slate-600 p-2 mt-2 py-1 rounded-md' required/>
        </div>
        <div className='mt-5 mr-20'>
           <label htmlFor="user" className="block text-sm">
                Created By:
              </label>
              <input type="text" value={snippet.userName} readOnly  placeholder='Expires after (days)' name="daysToExpire" id="daysToExpire" className='bg-slate-900 border sm:w-72 border-slate-600 p-2 mt-2 py-1 rounded-md' required/>
        </div>
        <div className="flex mt-5">
                  <input
                    type="text"
                    value={`http://${currentUrl}/public/${viewId}`}
                    readOnly
                    name="share"
                    id="share"
                    className="bg-slate-900 border sm:w-72 border-slate-600 p-2 mt-2 py-1 rounded-md"
                    required
                  />
                  {copy ? (
                    <button
                      title="Copied"
                      className="pl-2 pt-2"
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `http://${currentUrl}/public/${viewId}`
                        )
                      }
                    >
                      <PasteIcon />
                    </button>
                  ) : (
                    <button className="pl-2 pt-2" type="button" onClick={handleCopy}>
                      <CopyIcon />
                    </button>
                  )}
                </div>
                <div className="flex w-64 h-52  mt-7 ml-4">
                <QRCode value={`http://${currentUrl}/public/${viewId}`} size={200}  />
                </div>
        </div>
       
      </div>
        </form>
    </div>
    </div>
  )
}

export default ViewPublic