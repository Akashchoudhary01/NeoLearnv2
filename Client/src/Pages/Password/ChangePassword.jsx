import React, { useState } from "react";
import HomeLayout from "../../Layout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { isPasswordValid } from "../../Helpers/regexHelper";
import { ChangePasswordThunk, getUserData } from "../../Redux/Slices/AuthSlice";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    // console.log(name , value);
    
    setPassword((data) => ({
      ...data,
      [name]: value,
    }));
  }
  async function handleFormSubmit(e) {
    e.preventDefault();
    if (!password.oldPassword || !password.newPassword) {
      toast.error("Please Enter Both Old and New Password");
      return;
    }
    if (!isPasswordValid(password.newPassword)) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol",
      );
      return;
    }
    try {
      const res = await dispatch(ChangePasswordThunk(password));
      await dispatch(getUserData());

      if (res?.payload?.success) {
        toast.success("Password Changed Successfully ");

        setPassword({
          oldPassword: "",
          newPassword: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex items-center justify-center w-full ">
        <div className="w-full max-w-md bg-gray-900 text-white p-6 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          <h1 className="text-center text-3xl mb-4">Change Password </h1>

          <form className="space-y-2" onSubmit={handleFormSubmit}>
            <label htmlFor="" className="text-sm mx-1 mb-2 text-gray-400">Old Password</label>
            <input
              type="text"
              name="oldPassword"
              onChange={handleUserInput}
              placeholder=""
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
              value={password.oldPassword}
              />
            <label htmlFor="" className="text-sm mx-1 mb-2 text-gray-400">New Password</label>
            <input
              type="text"
              name="newPassword"
              onChange={handleUserInput}
              placeholder=""
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
              value={password.newPassword}
            />

            <button type="submit" className=" items-center justify-center flex  mt-2 w-full text-center py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-600 transition-all ease-in-out duration-300 ">Change Password</button>
          </form>
          <Link to={"/password/reset"}>
          <p className="flex justify-end text-blue-500 cursor-pointer mt-2">Forgot password ? </p>
          </Link>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ChangePassword;
