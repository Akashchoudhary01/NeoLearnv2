import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Denied = () => {
    const nevigate = useNavigate();
  return (
    <div className='h-screen flex justify-center items-center  flex-col w-full bg-[#1A2238]'>
        <h1 className='text-9xl font-extrabold tracking-widest text-white'>403</h1>
        <div className='bg-black text-md mb-10 text-white rounded rotate-12 absolute'>
            Access Denied 
        </div>

        <Link onClick={()=> nevigate (-1)}>
        <button className=' mt-10 px-4 py-1 rounded-md bg-indigo-400 hover:scale-95 transition-all ease-in-out duration-300 '>Go Back</button>
        </Link>

    </div>
  )
}

export default Denied;
