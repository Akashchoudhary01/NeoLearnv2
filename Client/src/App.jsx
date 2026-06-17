import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './Components/Footer'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import Notfound from './Pages/Notfound'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Course from './Pages/Course/Course'
import ContactUs from './Pages/ContactUs'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequiredAuth from './Components/Auth/RequiredAuth'
import CreateCourse from './Pages/Course/CreateCourse'
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import Checkout from './Pages/Payment/Checkout'
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess'
import CheckoutFailed from './Pages/Payment/CheckoutFailed'
import DisplayLectures from './Pages/Course/DisplayLectures'
import CreateLecture from './Pages/Course/CreateLecture'
import AdminDashboard from './Pages/AdminDashboard'
import ChangePassword from './Pages/Password/ChangePassword'
import ResetPassword from './Pages/Password/ResetPassword'
import ResetPasswordRedirect from './Pages/Password/ResetPasswordRedirect'
// import ThemeToggle from './Components/ThemeToggle'
function App() {
  return (
    <>
    

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/courses' element={<Course/>}/>
      <Route path='/course/description' element={<CourseDescription/>}/>
      <Route path='/denied' element={<Denied/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='*' element={<Notfound/>}/>
      <Route path='/password/reset' element={<ResetPassword/>}/>
      <Route path="/reset-password/:token"
      element={<ResetPasswordRedirect/>}/>

      <Route element={<RequiredAuth allowedRoles={["ADMIN" , "SUPER_ADMIN"]} /> }>
      <Route path='/course/create' element={<CreateCourse/>}/>
      <Route path='/courses/lecture/add' element={<CreateLecture/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Route>

      <Route element={<RequiredAuth allowedRoles={["ADMIN" , "USER" , "SUPER_ADMIN"]} /> }>
      <Route path='/user/profile' element={<Profile/>}/>
      <Route path='/user/editProfile' element={<EditProfile/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
      <Route path='/checkout/failed' element={<CheckoutFailed/>}/>
      <Route path='/courses/lecture' element={<DisplayLectures/>}/>
      <Route path='/password/changePassword' element={<ChangePassword/>}/>
      </Route>
    </Routes>
    </>
   
  )
}

export default App
