import React, { useEffect } from "react";
import HomeLayout from "../Layout/HomeLayout";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourse } from "../Redux/Slices/CourseSlice";
import { getStateData } from "../Redux/Slices/StateSlice";
import { Bar, Pie } from "react-chartjs-2";
import { getPaymentRecord } from "../Redux/Slices/RazorpaySlice";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { BsCollectionPlay, BsTrash } from "react-icons/bs";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting data from Redux Store
  const { allUsersCount, SubscribedCount } = useSelector((state) => state.stat);
  const { allPayment, monthlySalesRecord } = useSelector((state) => state.razorpay);
  const myCourses = useSelector((state) => state?.course?.courseData);

  // Fallbacks ensure charts don't crash before data loads
  const validUserCount = allUsersCount || 0;
  const validSubCount = SubscribedCount || 0;
  const validSalesRecord = monthlySalesRecord || new Array(12).fill(0);

  // Pie Chart Data
  const userData = {
    labels: ["Registered Users", "Enrolled Users"],
    
    datasets: [
      {
        label: "User Count",
        data: [validUserCount, validSubCount],
        backgroundColor: ["#EAB308", "#22C55E"], // Tailwind Yellow-500, Green-500
        borderColor: ["#CA8A04", "#16A34A"],
        borderWidth: 1,
      },
    ],
  };
  // console.log(userData);

  // Bar Chart Data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Sales / Month",
        data: validSalesRecord,
        backgroundColor: "#3B82F6", // Tailwind Blue-500
        borderRadius: 4,
      },
    ],
  };

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllCourse());
      }
    }
  }
 useEffect(() => {
  console.log("Users Stats:", {
    allUsersCount,
    SubscribedCount,
  });
}, [allUsersCount, SubscribedCount]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllCourse());
      await dispatch(getStateData());
      await dispatch(getPaymentRecord());
    };
    fetchData();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] py-10 px-5 md:px-10 flex flex-col gap-10 text-white">
        
        {/* Header */}
        <h1 className="text-4xl font-bold text-blue-500 text-center tracking-wide">
          Admin Dashboard
        </h1>

        {/* Top Row: Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 font-semibold uppercase tracking-wider">Registered Users</p>
              <h3 className="text-4xl font-bold">{validUserCount}</h3>
            </div>
            <FaUsers className="text-blue-500 text-6xl opacity-80" />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 font-semibold uppercase tracking-wider">Active Subscriptions</p>
              <h3 className="text-4xl font-bold">{allPayment?.count || 0}</h3>
            </div>
            <FcSalesPerformance className="text-6xl opacity-80" />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 font-semibold uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-4xl font-bold text-green-400">₹{(allPayment?.count || 0) * 499}</h3>
            </div>
            <GiMoneyStack className="text-yellow-500 text-6xl opacity-80" />
          </div>
        </div>

        {/* Middle Row: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Demographics - Pie Chart */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-200">User Demographics</h2>
            {/* The wrapper strictly controls the canvas size */}
            <div className="h-72 w-full flex justify-center relative">
              <Pie data={userData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Monthly Sales - Bar Chart */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-200">Monthly Sales</h2>
            {/* The wrapper strictly controls the canvas size */}
            <div className="h-72 w-full relative">
              <Bar 
                data={salesData} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: { y: { beginAtZero: true } }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Courses Table */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-3xl font-semibold text-gray-200">Courses Overview</h2>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg font-bold transition-colors duration-300"
              onClick={() => navigate("/course/create")}
            >
              + Add New Course
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-300 border-b border-gray-600">
                  <th className="p-4 font-semibold rounded-tl-lg">S No.</th>
                  <th className="p-4 font-semibold">Course Title</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Instructor</th>
                  <th className="p-4 font-semibold">Total Lectures</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {myCourses?.length > 0 ? (
                  myCourses.map((course, idx) => (
                    <tr key={course._id} className="hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="p-4 font-medium">{idx + 1}</td>
                      <td className="p-4 max-w-[150px] truncate" title={course?.title}>
                        {course?.title}
                      </td>
                      <td className="p-4">{course?.category}</td>
                      <td className="p-4">{course?.createdBy}</td>
                      <td className="p-4 text-center">{course?.numberOfLectures}</td>
                      <td className="p-4 max-w-[200px]">
                        <p className="truncate text-gray-400" title={course?.description}>
                          {course?.description}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <button
                            className="bg-green-500 hover:bg-green-600 p-2 rounded-md transition-colors"
                            title="View Lectures"
                            onClick={() => navigate("/courses/lecture", { state: { ...course } })}
                          >
                            <BsCollectionPlay className="text-xl" />
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 p-2 rounded-md transition-colors"
                            title="Delete Course"
                            onClick={() => onCourseDelete(course?._id)}
                          >
                            <BsTrash className="text-xl" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-400 text-lg">
                      No courses found. Add a new course to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </HomeLayout>
  );
};

export default AdminDashboard;