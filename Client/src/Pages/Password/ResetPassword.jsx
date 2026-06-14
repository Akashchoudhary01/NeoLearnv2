import React, { useState } from 'react'
import HomeLayout from '../../Layout/HomeLayout'
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { ForgotPasswordThunk } from '../../Redux/Slices/AuthSlice';

const ResetPassword = () => {
    const [email , setEmail] = useState({
        email : ""
    });
    const dispatch = useDispatch();

    function handelUserInput(e){
        const {name , value} = e.target;
        setEmail((data)=>({
            ...data,
            [name]:value
        }))
    }

    async function handleSubmit(e){
        e.preventDefault();
        if(!email.email){
            toast.error("Please Enter Your Email")
            return;
        }
        const response = await dispatch(ForgotPasswordThunk(email));

        if(response?.payload?.success){
            toast.success ("Reset password Link send to your email !")
            setEmail({
                email : ""
            })
        }
    }
  return (
  <HomeLayout>
    <div className='min-h-[90vh] flex justify-center items-center text-white'>
        <div className="w-full max-w-md bg-gray-900 text-white p-6 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          <h1 className='text-center text-2xl mb-3'>Forgot Password !</h1>
          <form onSubmit={handleSubmit}>
            <label className='text-sm text-gray-300 mx-1 ' htmlFor="email">Enter Your Email</label>
            <input
            name='email'
            type="email"
            value={email.email}
            onChange={handelUserInput}
             className="w-full mt-1 px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
           
             />

             <button className='w-full flex justify-center px-3 py-2 mt-4 bg-blue-500 hover:bg-blue-600 rounded-md transition-all ease-in-out duration-300 ' type='submit'>Reset Password</button>
          </form>
    </div>
    </div>
    
  </HomeLayout>
  )
}

export default ResetPassword
