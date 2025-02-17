import React from 'react'
import NavBar from '../../Components/DashBoard/NavBar'
import { Outlet } from 'react-router-dom'


function Dashboard() {
  return (
    <>
    <NavBar/>
    
    <Outlet/>
    </>
  )
}

export default Dashboard