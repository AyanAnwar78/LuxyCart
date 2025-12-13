import React from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Login() {
    let [show,setShow] = useState(false);
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let {serverUrl} = useContext(authDataContext)
    let {adminData , getAdmin} = useContext(adminDataContext)
    let navigate = useNavigate()

    const AdminLogin = async (e)=>{
      e.preventDefault()
      try{
        const result= await axios.post(serverUrl + '/api/auth/adminlogin', {email, password}, {withCredentials:true})
        console.log(result.data)
        toast.success("AdminLogin Successfully")
        getAdmin()
        navigate("/")
      }catch (error){
        console.log(error)
        toast.error("AdminLogin Failed")
      }
    }
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white 
      flex flex-col items-center justify-start pt-4'>

        <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer ' >
            <img className='w-[40px] ' src={logo} />
            <h1 className=' text-[22px] font-sans '>LuxyCart</h1>
        </div>

        <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
            <span className='text-[25px] font-semibold '>Registration Page</span>
            <span className='text-[16px]'> Welcome to LuxyCart, Apply to Admin Login</span>
        </div>

        <div className='max-w-[600px] w-[90%] h-[500px] flex items-center justify-center bg-[#0000025] 
          border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg '>

            <form action="" onSubmit={AdminLogin} className='flex flex-col items-center justify-start gap-[20px] w-[90%] h-[90%] '>
                <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                  
                    <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
                        px-[20px] font-semibold' placeholder='Email' 
                        onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    
                    <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
                        px-[20px] font-semibold' placeholder='Password'  
                        onChange={(e)=>setPassword(e.target.value)} value={password}/>

                    { !show && <IoEyeOutline className='w-[20px] h-[50px] cursor-pointer absolute right-[5%] bottom-[47%] ' 
                      onClick={()=>setShow(prev=>!prev)} />}

                    {show && <IoEye className='w-[20px] h-[50px] cursor-pointer absolute right-[5%] bottom-[47%] ' 
                      onClick={()=>setShow(prev=>!prev)}/>}
                    
                    <button className='w-[100%] h-[50px] rounded-lg bg-[#6060f5]
                        flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer'>
                    Login</button>

                </div>
            </form>
        </div>

    </div>
  )
}

export default Login