import React from 'react'
import { useNavigate } from "react-router-dom";

const CourseCard = ({data}) => {
    const navigate = useNavigate();
    // console.log(data);
    
    
  return (
    <div
      onClick={()=> navigate('/course/description' ,{ state:{data}})}
      className='w-80 shadow-lg cursor-pointer overflow-hidden rounded-lg bg-base-100 hover:shadow-2xl transition-all duration-300'
    >
        <div className="overflow-hidden">
            <img 
              className='h-48 w-full object-cover transition-transform duration-300 hover:scale-105'
              src={data.thumbnail.secure_url}
              alt="course thumbnail" 
            />
            
            <div className='p-4 space-y-2 text-base-content'>
                <h2 className='text-xl font-bold text-primary line-clamp-2'>
                    {data?.title}
                </h2>
                
                <p className='text-base-content/80 line-clamp-2'>
                     {data?.description}
                </p>
                
                <p className='text-sm'>
                      <span className='text-primary font-bold'> Category: </span>
                      {data?.category}
                </p>
                
                <p className='text-sm'>
                      <span className='text-primary font-bold'> Total Lectures: </span>
                      {data?.numberofLecture}
                </p>
            </div>
        </div>
    </div>
  )
}

export default CourseCard;