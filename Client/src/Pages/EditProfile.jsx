import React, { useState } from 'react'
import HomeLayout from '../Layout/HomeLayout'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import { BsPersonCircle } from "react-icons/bs";
import { getUserData, updateProfile } from '../Redux/Slices/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const EditProfile = () => {

    const dispatch = useDispatch();
    const nevigate  = useNavigate();

    const userId = useSelector((state)=> state?.auth?.data._id)
    const [data , setData] = useState({
        fullName : "",
        avatar : undefined,
        previewImage : "",
    });

    // Handle Image Function 
    function handleImageUploade(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load" , function (){
                setData({
                    ...data,
                    previewImage : this.result,
                    avatar : uploadedImage
                })
                
            })
        }
    }

    // Handle Input Change
    function handleInputChange(e){
        const {name , value} = e.target;
        setData({
            ...data,
            [name] : value
        })
    }

    // Handle Form Submit
    async function handleFormSubmit(e){
        e.preventDefault();
        if(!data.fullName){
            toast.error("Every Field is Mendatory")
            return ;
        }
        if(data.fullName.length < 5 ){
            toast.error("Name Should be at least 5 letter");
            return ;
        }
        const formData = new FormData();
        formData.append("fullName" , data.fullName);
        if(data.avatar){

            formData.append("avatar" , data.avatar)
        }

        await dispatch (updateProfile({id : userId , formData}));
        await dispatch(getUserData());

        nevigate("/user/profile")
    }

  return (
    <HomeLayout>

   <div className="min-h-[90vh] flex justify-center items-center text-white">
        <div className="flex flex-col  justify-center w-full max-w-md bg-gray-900 text-white p-6 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)]">
            <h1 className='text-center text-2xl font-extralight tracking-wider my-3'>Edit Profile</h1>

            <form onSubmit={handleFormSubmit} className=' flex flex-col' >
                <label htmlFor="image-uploade" className='cursor-pointer'>
                    {data.previewImage ? (
                        <img src={data.previewImage} className='w-28 h-28 m-auto rounded-full outline-1' alt="" />
                    ) :(
                        <BsPersonCircle className='w-28 h-28 m-auto rounded-full '/>
                    )}
                </label>
                <input type="file"
                id='image-uploade'
                name = "image-uploade"
                className='hidden'
                accept='.jpg , .png , .jpeg , .svg'
                onChange={handleImageUploade}
                 />

                 <div className=' flex flex-col my-2 justify-center'>
                    <label htmlFor="fullName" >FullName</label>
                    <input 
                    type="text"
                    name='fullName'
                    className="py-1 px-3 rounded-sm outline-1 mt-2 "
                    onChange={handleInputChange}   
                    />
                 </div>

                 <button type='Submit' className='px-3 py-1 mt-2 text-xl rounded-md bg-green-600 hover:bg-green-500 transition-all ease-in-out duration-300'>Edit Profile</button>
                 <div className='flex  justify-end'>
                    <Link className=' flex mt-2 text-blue-500 active:scale-95' to={"/user/profile"}>  
                    <p> <AiOutlineArrowLeft  /> Go back to Profile </p>
                    </Link>
                 </div>

            </form>
        </div>
      
    </div>
    </HomeLayout>
  )
}

export default EditProfile
