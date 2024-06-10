import React, { useEffect, useState } from 'react'
import Layout from '../Component/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';

const Forgetpassword = () => {
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
    const [newpassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("");
    const navigate=useNavigate();

  //form function
  const handlesubmit = async(e)=>{
    e.preventDefault();
    try{
     const res=await axios.post(`${process.env.REACT_APP_API}/api/v2/auth/forgetpassword`,{email,answer,newpassword});
     if(res.data.success){
      toast.success(res.data.message)
        navigate("/login")
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
        <div style={{backgroundColor:backgroundcolor}} className='flex flex-col items-center '>
          <h1 style={{color:textcolor}} className='text-5xl mt-10 font-bold '>FORGET PASSWORD</h1>
            <form onSubmit={handlesubmit} className='bg-slate-400 mt-10 mb-16 flex flex-col p-4 rounded-2xl login-form'>
                <input className='mt-8 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Email' required/>
                <input className='mt-8 w-60 h-8 rounded-lg p-2'  onChange={(e)=>{setNewPassword(e.target.value)}} type="password" placeholder='Password' required/>
                <input className='mt-8 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setAnswer(e.target.value)}}  type="text" placeholder='Enter Favourite sports' required/>
                <button type='submit' className='mt-5 w-40 h-8 rounded-lg p-2 bg-blue-600 text-white font-bold flex justify-center items-center'>Change Password</button>
            </form>
        </div>
    </Layout>
  )
}

export default Forgetpassword