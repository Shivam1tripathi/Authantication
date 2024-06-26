import React, { useEffect, useState } from 'react'
import Layout from '../Component/Layout'
import { Link } from 'react-router-dom'
import { useAuth } from '../authcontext';

const Home = () => {

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
  return (
    <Layout>
      <div style={{height:"85vh",backgroundColor:backgroundcolor}} className='flex flex-col'>  
        <h1 className='text-center font-extrabold text-4xl text-blue-500'>Home</h1>
        
        {
        auth?.user?(
          <>
          <div className='flex justify-end'>
          <Link to={"/edit-profile"} className='w-28 h-9 flex justify-center items-center rounded-xl font-bold text-white bg-red-600'>Edit profile</Link>
        </div>
        <div className=' flex mt-10 flex-col items-center h-full'>
        <h1 className='font-bold text-3xl mt-5'>Name: {auth?.user?.name}</h1>
        <h1 className='font-bold text-3xl mt-5'>Email: {auth?.user?.email}</h1>
        <h1 className='font-bold text-3xl mt-5'>Phone: {auth?.user?.Phone}</h1>
        <h1 className='font-bold text-3xl mt-5'>Address: {auth?.user?.address}</h1>
      </div>
      </>
      ):(
        <div style={{height:"85vh"}} className='flex justify-center items-center'>
           <h1 className='text-center font-extrabold text-5xl text-red-600'>Please login</h1>
        </div>
     
    )
      }
      
      </div>
    </Layout>
  )
}

export default Home