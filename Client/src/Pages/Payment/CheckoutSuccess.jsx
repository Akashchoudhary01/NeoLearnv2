import React from "react";
import HomeLayout from "../../Layout/HomeLayout";
import {FaCheckCircle} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const CheckoutSuccess = () => {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center px-4 py-10">
        <div className="w-full  max-w-md bg-gray-900 text-white rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.4)]">
          {/* Header */}
          <div className="flex justify-center items-center bg-green-400 py-4">

           
            <h1 className="text-center text-black font-semibold text-2xl">
              Payment Successfull 
            </h1>


          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="text-center">
              <p className="text-3xl italic tracking-wider py-4 ">Congratulations !!</p>
              <p className="text-xl ">You Successfully Subscribe to Pro Bundle</p>
              <p className="text-gray-300 mt-3 text-sm">Now You have Unlimited Access <br /> To Our <span className="font-semibold text-blue-500">Premium Courses</span></p>

            </div>
            <Link to="/courses">
            <button  className="w-full  bg-green-400 hover:bg-green-500 text-black font-semibold text-xl py-3 rounded-lg transition-all duration-300"
          >Explore Courses</button>
                </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default CheckoutSuccess;
