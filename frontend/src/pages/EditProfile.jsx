import React, { useEffect, useState } from 'react'
import Layout from '../Component/Layout'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authcontext';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditProfile = () => {

  //darkmode
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


      // context

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [Phone,setPhone]=useState("");
    const [address,setAddress]=useState("");

    const navigate=useNavigate();

     //get userdata
     useEffect(()=>{
        const {name,email,Phone,address}=auth?.user;
        setName(name);
        setEmail(email);
        setPhone(Phone);
        setAddress(address);
      },[auth?.user])


       //form function
     const handlesubmit = async(e)=>{
        e.preventDefault();
        try{
         const {data}=await axios.put(`${process.env.REACT_APP_API}/api/v2/auth/profile`,{name,
          email,
          password,
          Phone,
          address,});
          console.log(data)
        
         if(data?.error){
          toast.error(data?.error);
         }else{
          setAuth({...auth,user:data?.updatedUser})
          let ls=localStorage.getItem("auth")
          ls=JSON.parse(ls)
          ls.user=data.updatedUser;
          localStorage.setItem("auth",JSON.stringify(ls))
          toast.success("Profile updated successfully")
         }
        }catch(error){
         console.log(error);
         toast.error("Somethig Gone Wrong")
        }
    };
  
  


  return (
    <Layout>
       
        <div style={{height:"85vh",backgroundColor:backgroundcolor}} className='flex flex-col items-center'>
          <h1 className='text-5xl mt-10 font-bold '>Register</h1>
            <form onSubmit={handlesubmit} className='bg-slate-400 mt-5 mb-16 flex flex-col p-4 rounded-lg register-form'>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Name' required/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' value={email} onChange={(e)=>{setEmail(e.target.value)}}  type="email" placeholder='Email' required disabled/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' value={password} onChange={(e)=>{setPassword(e.target.value)}}  type="password" placeholder='New Password'/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' value={Phone} onChange={(e)=>{setPhone(e.target.value)}}  type="number" placeholder='Phone' required/>
                <input className='mt-3 w-60 h-8 rounded-lg p-2' value={address} onChange={(e)=>{setAddress(e.target.value)}}  type="text" placeholder='Address' required/>

                <button type="submit" className='mt-3 w-40 h-8 rounded-lg p-2 bg-blue-600 text-white font-bold flex justify-center items-center'>Submit</button>
            </form>
        </div>
  
    </Layout>
  )
}

export default EditProfile