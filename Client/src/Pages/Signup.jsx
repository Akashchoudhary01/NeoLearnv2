import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmailValid, isPasswordValid } from "../Helpers/regexHelper.js";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);

  // for user input 
  const [signupData, setSignupData] = useState({
    fullName: "",
    avatar: "",
    email: "",
    password: "",
  });

  // handle input
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  // image upload
  function getImage(e) {
    e.preventDefault();

    const uploadedImage = e.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  // reset form
  function resetForm() {
    setSignupData({
      fullName: "",
      avatar: "",
      email: "",
      password: "",
    });
    setPreviewImage("");
  }

  // submit
  async function createNewAccount(e) {
    e.preventDefault();

    const { fullName, email, password, avatar } = signupData;

    // Validation checks
    if (!fullName || !email || !password || !avatar) {
      toast.error("Please fill all fields");
      return;
    }

    if (fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }

    if (!isPasswordValid(password) ) {
      toast.error(
        "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
      );
      return;
    }

    if (!isEmailValid(email)) {
      toast.error("Invalid email Id");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("avatar", avatar);
    formData.append("email", email);
    formData.append("password", password);

    setLoading(true);

    try {
      const response = await dispatch(createAccount(formData));
      console.log("API RESPONSE:", response);

      // ✅ Fixed: Check for 'success' not 'succcess'
      if (response.payload && response.payload.success) {
        resetForm();
        // Navigate after a short delay to show success message
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error(response.payload?.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-gray-900 text-white p-6 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          
          <h1 className="text-2xl font-bold text-center mb-4">
            Create Account
          </h1>

          <form onSubmit={createNewAccount} noValidate autoComplete="off" className="space-y-4">

            {/* Image */}
            <label htmlFor="image-upload" className="cursor-pointer flex justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-400"
                  alt="preview"
                />
              ) : (
                <BsPersonCircle className="w-24 h-24 text-gray-400" />
              )}
            </label>

            <input
              type="file"
              accept="image/*"
              id="image-upload"
              hidden
              onChange={getImage}
            />

            {/* Name */}
            <input
              type="text"
              name="fullName"
              value={signupData.fullName}
              onChange={handleUserInput}
              placeholder="Enter your name"
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
              disabled={loading}
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={signupData.email}
              onChange={handleUserInput}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
              disabled={loading}
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleUserInput}
              placeholder="Enter password"
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <p className="text-end text-sm">
              Already Have a account ? {" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Signup;
