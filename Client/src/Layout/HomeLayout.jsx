import React from "react";
import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../Redux/Slices/AuthSlice";

const HomeLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerside = document.getElementsByClassName("drawer-side");
    if (drawerside[0]) drawerside[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    if (element[0]) element[0].checked = false;
    const drawerside = document.getElementsByClassName("drawer-side");
    if (drawerside[0]) drawerside[0].style.width = "0";
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(Logout());
    hideDrawer();
    navigate("/");
  };

  return (
    <div className="min-h-[90vh] bg-base-100 text-base-content transition-colors duration-300">
      <div className="drawer absolute w-full z-50">
        <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-1" className="btn btn-ghost">
            <FiMenu size={"32px"} onClick={changeWidth} className="text-base-content" />
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer-1" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 min-h-full sm:w-80 w-48 relative">
            <li className="w-fit absolute right-2 z-50">
              <button className="btn btn-ghost" onClick={hideDrawer}>
                <AiFillCloseCircle size={"24px"} />
              </button>
            </li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">All Courses</Link></li>
            {isLoggedIn && role === "ADMIN" || role === "SUPER_ADMIN"  && (
              <>
                <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                <li><Link to="/course/create">Create Course</Link></li>
              </>
            )}
            <li><Link to="/contact">Contact us</Link></li>
            <li><Link to="/about">About us</Link></li>

            <div className="w-[90%] absolute bottom-4 left-4">
              {!isLoggedIn && (
                <div className="w-full flex justify-evenly mt-3">
                  <Link to="/login" className="btn btn-primary px-7">Login</Link>
                  <Link to="/signup" className="btn btn-secondary px-7">SignUp</Link>
                </div>
              )}
              {isLoggedIn && (
                <div className="w-full flex justify-evenly mt-3">
                  <Link to="/user/profile" className="btn btn-success px-7">Profile</Link>
                  <button onClick={handleLogout} className="btn btn-error px-7">Logout</button>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>

      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default HomeLayout;