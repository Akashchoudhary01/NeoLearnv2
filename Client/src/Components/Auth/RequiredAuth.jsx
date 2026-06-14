import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const RequiredAuth = ({allowedRoles}) => {
    const {role , isLoggedIn} = useSelector((state)=> state.auth);
  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet/>
  ) : isLoggedIn ?(<Navigate  to={"/denied"} />) : (<Navigate to={"/login"}/>)
}

export default RequiredAuth
