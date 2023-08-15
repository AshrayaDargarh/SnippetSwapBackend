import React from 'react'

const Unauthorized = () => {
  return (
    <div className='bg-slate-900 text-white overflow-hidden h-screen font-display flex justify-center pt-20'>
      <div className='w-96 h-36 bg-slate-800 flex flex-col  items-center rounded-lg shadow-2xl '>
      <h1 className='mt-5 text-2xl font-bold'>Unauthorized: 401</h1> 
      <p className='mt-2 w-80 text-lg text-center'>You are not authorized to access this page. Please log in with a valid account.</p>
      </div>
      
    </div>
  )
}

export default Unauthorized