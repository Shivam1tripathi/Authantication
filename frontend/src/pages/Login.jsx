import React, { useEffect, useState } from 'react'
import Layout from '../Component/Layout'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../authcontext';

const Login = () => {

  const [auth,setAuth]=useAuth();
  let [textcolor,setTextcolor]=useState("white");
  let [backgroundcolor,setBackgroundcolor]=useState("black");
  useEffect(()=>{
    if(auth.darkmode===true){
      setTextcolor("black");
      setBackgroundcolor("white");
    }else{
      setTextcolor("white");
      setBackgroundcolor("#78ABA8");
      
    }
  },[auth])







    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const location=useLocation();
    const navigate=useNavigate();


    //form function
    const handlesubmit = async(e)=>{
      e.preventDefault();
      try{
       const res=await axios.post(`${process.env.REACT_APP_API}/api/v2/auth/login`,{email,password});
       if(res.data.success){
        toast.success(res.data.message)
        setAuth({
          ...auth,
          user:res.data.user,
          token:res.data.token
        })
        localStorage.setItem('auth',JSON.stringify(res.data));
          navigate(location.state ||"/")
         

       }else{
          toast.error(res.data.message)
       }
      }catch(error){
       console.log(error);
       toast.error("Somethig Gone Wrong")
      }
  };







  return (
    <Layout>
        <div style={{backgroundColor:backgroundcolor}}  className='flex flex-col items-center bg-slate-200'>
          <h1 style={{color:textcolor}}  className='text-5xl mt-10 font-bold '>LOGIN</h1>
            <form onSubmit={handlesubmit} className='bg-slate-400 mt-5 mb-20 flex flex-col p-4 rounded-xl login-form'>
                <input className='mt-5 w-60 h-10 rounded-lg p-2' onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Email' required/>
                <input className='mt-8 w-60 h-10 rounded-lg p-2' onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder='Password' required/>
                <button type="submit" className='mt-10 w-40 h-8 rounded-lg p-2 bg-blue-600 text-white font-bold flex justify-center items-center'>Submit</button>
                <Link to={'/forget-password'}  className='text-blue-700 mt-2'>Forget Password</Link>
            </form>
        </div>
    </Layout>
  )
}

export default Login