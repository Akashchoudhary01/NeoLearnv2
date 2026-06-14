import React, { useState } from "react";
import HomeLayout from "../Layout/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LoginAc } from "../Redux/Slices/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // for user input 
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // handle input
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  // reset form
  function resetForm() {
    setLoginData({
      email: "",
      password: "",
    });
  }

  // submit
  async function LoginAccount(e) {
    e.preventDefault();

    const { email, password } = loginData;

    // Validation checks
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // ✅ Properly unwrap the response
      const response = await dispatch(LoginAc(loginData)).unwrap();

      // ✅ Check payload directly (unwrap gives you the resolved value)
      if (response && response.success) {
        toast.success("Login successful!");
        resetForm();
        // Navigate after a short delay to show success message
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (response) {
        toast.error(response.message || "Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex justify-center items-center px-4">
        <div className="w-full max-w-md bg-gray-900 text-white p-6 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)]">
          
          <h1 className="text-2xl font-bold text-center mb-4">
            Login
          </h1>

          <form onSubmit={LoginAccount} noValidate autoComplete="off" className="space-y-4">

            {/* Email */}
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleUserInput}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:border-blue-500"
              disabled={loading}
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={loginData.password}
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
              {loading ? "Logging in..." : "Login"}
            </button>
<div className="flex flex-col sm:flex-row justify-between items-center gap-2">
  <p className="text-sm text-center sm:text-left">
    Don't have an account?{" "}
    <Link to="/signup" className="text-blue-400 hover:underline">
      Sign up
    </Link>
  </p>

  <p className="text-sm text-center sm:text-right">
    <Link
      to="/password/reset"
      className="text-blue-400 hover:underline"
    >
      Forgot Password?
    </Link>
  </p>
</div>

          </form>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Login;