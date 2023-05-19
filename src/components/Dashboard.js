import Navbar from './Navbar';
import React from 'react'
import Footer from './Footer';
import {Outlet} from 'react-router-dom';

const Dashboard = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Dashboard