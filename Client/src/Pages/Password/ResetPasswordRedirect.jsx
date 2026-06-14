import React, { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isPasswordValid } from "../../Helpers/regexHelper";
import { resetPassword } from "../../Redux/Slices/AuthSlice";
import { useParams } from "react-router-dom";

const ResetPasswordRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { token } = useParams();

  const [newPassword, setNewPassword] = useState({
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setNewPassword((data) => ({
      ...data,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!newPassword.password) {
      toast.error("Please Enter New Password");
      return;
    }
    if (!isPasswordValid(newPassword.password)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol",
      );
      return;
    }

    const res = await dispatch(resetPassword({
           token ,
         password:newPassword.password}
        ))
        console.log(res);
        
    if(res?.payload?.success){
        toast.success("Password Reset Successfully")
        // console.log(se);
        
        
        setNewPassword({
            password : ""
        })
        
        
        setTimeout(()=>{
          navigate("/login")
          console.log("Password Changed Successfully ! please login with your new Credintial ");

        } , 1000)

       
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center w-full text-white">
     <div className="w-full max-w-md bg-gray-900 text-white p-6 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          <h1 className="text-center text-3xl mb-4">Reset Password </h1>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="" className="text-sm text-gray-300 mx-1 ">new password</label>
            <input 
            type="password" 
            name="password"
            value={newPassword.password}
            onChange={handleUserInput}
            className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
            />

            <button type="submit" className="mt-3 w-full flex justify-center px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-300">Set Password</button>
          </form>

<Link to={"/"}>
          <p className="flex justify-end text-blue-500 mt-2 text-[12px]" >back To Home</p>
</Link>

      </div>
      </div>
    </HomeLayout>
  );
};

export default ResetPasswordRedirect;
