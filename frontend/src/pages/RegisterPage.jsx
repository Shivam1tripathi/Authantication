import React, { useEffect, useState } from 'react'
import Layout from '../Component/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';

const RegisterPage = () => {

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




  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [Phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [answer,setAnswer]=useState("");
  const navigate=useNavigate();

     //form function
     const handlesubmit = async(e)=>{
      e.preventDefault();
      try{
       const res=await axios.post(`${process.env.REACT_APP_API}/api/v2/auth/register`,{name,email,password,Phone,address,answer});
       console.log("2");
       if(res.data.success){
          navigate("/login")
          toast.success(res.data.message)

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
          <h1 style={{color:textcolor}} className='text-5xl mt-10 font-bold '>Register</h1>
            <form onSubmit={handlesubmit} className='bg-slate-400 mt-5 mb-16 flex flex-col p-4 rounded-lg register-form'>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Name' required/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Email' required/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder='Password' required/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setPhone(e.target.value)}}  type="number" placeholder='Phone' required/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setAddress(e.target.value)}}  type="text" placeholder='Address' required/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' onChange={(e)=>{setAnswer(e.target.value)}}  type="text" placeholder='Enter Favourite sports' required/>
                <button type="submit" className='mt-3 w-40 h-8 rounded-lg p-2 bg-blue-600 text-white font-bold flex justify-center items-center'>Submit</button>
            </form>
        </div>
  </Layout>
  )
}

export default RegisterPage