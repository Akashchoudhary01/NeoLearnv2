import React from "react";
import HomeLayout from "../Layout/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cancelSubscription } from "../Redux/Slices/RazorpaySlice";
import { getUserData } from "../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const userData = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();

  async function HandleCourseUnsubscribe() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription?"
    );

    if (!confirmed) return;

    const result = await dispatch(cancelSubscription());

    if (result?.payload?.success) {
      await dispatch(getUserData());
      toast.success("Subscription cancelled successfully");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-[90vh] flex justify-center items-center px-4 py-10">
        <div className="w-full max-w-4xl bg-gray-900 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.25)] overflow-hidden">

          {/* Header */}
          <div className="h-36 bg-linear-to-r from-blue-600 to-indigo-600"></div>

          {/* Profile Content */}
          <div className="px-6 sm:px-10 pb-10 relative">

            {/* Avatar */}
            <div className="flex justify-center">
              <img
                src={userData?.avatar?.secure_url}
                alt={userData?.fullName}
                className="w-36 h-36 rounded-full object-cover border-4 border-gray-900 -mt-16 shadow-lg"
              />
            </div>

            {/* Name */}
            <div className="text-center mt-4">
              <h1 className="text-3xl font-bold text-white capitalize">
                {userData?.fullName}
              </h1>

              <p className="text-gray-400 mt-1">
                {userData?.role}
              </p>

              <span
                className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-medium ${
                  userData?.subscription?.status === "active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {userData?.subscription?.status === "active"
                  ? "Active Subscription"
                  : "No Active Subscription"}
              </span>
            </div>

            {/* User Details */}
            <div className="grid sm:grid-cols-2 gap-4 mt-10">

              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white break-all mt-1">
                  {userData?.email}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Role</p>
                <p className="text-white mt-1">
                  {userData?.role}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Subscription</p>
                <p className="text-white mt-1">
                  {userData?.subscription?.status === "active"
                    ? "Active"
                    : "Inactive"}
                </p>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-sm">Account Type</p>
                <p className="text-white mt-1">
                  {userData?.role === "ADMIN" || userData?.role ==="SUPER_ADMIN"
                    ? "Administrator"
                    : "Student"}
                </p>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">

              <Link
                to="/password/changePassword"
                className="bg-yellow-500 hover:bg-yellow-600 text-center py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95"
              >
                Change Password
              </Link>

              <Link
                to="/user/editProfile"
                className="bg-blue-500 hover:bg-blue-600 text-center py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95"
              >
                Edit Profile
              </Link>

            </div>

            {/* Cancel Subscription */}
            {userData?.subscription?.status === "active" && userData?.role !=="ADMIN" || userData?.role !=="SUPER_ADMIN"  && (
              <button
                onClick={HandleCourseUnsubscribe}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 text-white"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Profile;