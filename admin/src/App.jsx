import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import Login from './pages/Login'
import { useContext } from 'react'
import { adminDataContext } from './context/AdminContext'
import Lists from './pages/Lists'
import Orders from './pages/Orders'
import { ToastContainer, toast } from 'react-toastify';

import Edit from "./pages/Edit";


function App() {
  let {adminData} = useContext(adminDataContext)
  return (
    <>
      <ToastContainer />
        {
          !adminData ? <Login /> : <>
            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<Add />} />
            <Route path='/list' element={<Lists />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/login' element={<Login />} />

            <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </>

        }
    </>
  )
}

export default App