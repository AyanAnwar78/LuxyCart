import React, { useContext, useState } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext.jsx';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import {auth, provider} from '../../utils/Firebase'
import { userDataContext } from '../context/UserContext';
import { toast } from 'react-toastify';

function Login() {
    let [show,setShow] = useState(false);
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let {serverUrl} = useContext(authDataContext)
    let {getCurrentUser} = useContext(userDataContext)


    let navigate = useNavigate()

    const handleLogin = async (e)=>{
        e.preventDefault()
        try{
            let result = await axios.post(serverUrl+ '/api/auth/login',{
                email, password
            }, {withCredentials:true})
            console.log(result.data);
            toast.success("Login Successfully")
            getCurrentUser()
            navigate("/")
        } catch(error){
            console.log(error);
            toast.error("Login Failed")
        }
    }

    const googlelogin = async()=>{
        try{
            const response = await signInWithPopup(auth, provider)
            let user =response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(serverUrl+ "/api/auth/googleLogin", {name,
            email}, {withCredentials:true})
            console.log(result.data)
            toast.success("Login Successfully")
            await getCurrentUser()
            navigate("/")

        }catch (error){
            console.log(error)
            toast.error("Login Failed")

        }
    }

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white 
        flex flex-col items-center justify-start pt-4'>

        <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer '
            onClick={()=>navigate("/")}>
            <img className='w-[40px] ' src={Logo} />
            <h1 className=' text-[22px] font-sans '>LuxyCart</h1>
        </div>

        <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px] '>
            <span className='text-[25px] font-semibold '>Registration Page</span>
            <span className='text-[16px]'> Welcome to LuxyCart, Place your order</span>
        </div>

        <div className='max-w-[600px] w-[90%] h-[500px] flex items-center justify-center bg-[#0000025] 
            border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg '>

            <form action="" onSubmit={handleLogin} className='flex flex-col items-center justify-start gap-[20px] w-[90%] h-[90%] '>
                <div className='w-[90%] h-[50px] bg-[#42656cae] flex items-center justify-center  rounded-lg cursor-pointer py-[20px]'
                    onClick={googlelogin}>
                    <img src={google} alt="" className='w-[30px] h-[30px] m-3 rounded-[50%]' />   Registration with Google
                </div>

                <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px] '>
                    <div className='w-[40%] h-[1px] bg-[#96969635] '></div>   Or   <div  className='w-[40%] h-[1px] bg-[#96969635] '></div>
                </div>

                <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
                  
                    <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
                        px-[20px] font-semibold' placeholder='Email' 
                        onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    
                    <input type={show?"text":"password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635]
                        backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7]
                        px-[20px] font-semibold' placeholder='Password'  
                        onChange={(e)=>setPassword(e.target.value)} value={password}/>

                    { !show && <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[56%] ' 
                        onClick={()=>setShow(prev=>!prev)} />}

                    {show && <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[56%] ' 
                        onClick={()=>setShow(prev=>!prev)}/>}
                    
                    <button className='w-[100%] h-[50px] rounded-lg bg-[#6060f5]
                        flex items-center justify-center mt-[20px] text-[17px] font-semibold cursor-pointer'>Login</button>

                    <p className='flex gap-[10px]'>You haven't any account? 
                        <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' 
                        onClick={()=> navigate("/signup")}>Create New Account</span>
                    </p>
                </div>
            </form>
        </div>

    </div>
  )
}


export default Login