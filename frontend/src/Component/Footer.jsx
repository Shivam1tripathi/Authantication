import React, { useEffect, useState } from 'react'
import { useAuth } from '../authcontext'

const Footer = () => {
  const [auth,setAuth]=useAuth();

    let [textcolor,setTextcolor]=useState("white");
    let [backgroundcolor,setBackgroundcolor]=useState("black");
    useEffect(()=>{

      if(auth.darkmode===true){
        setTextcolor("black");
        setBackgroundcolor("white");
       
       
      }else{
        setTextcolor("white");
        setBackgroundcolor("black");
      }
    },[auth])
  return (
    <div className='bg-slate-500 h-20 flex items-center justify-center'>
      <h1 style={{color:textcolor}}  className='font-extrabold text-4xl'>WELLCOME </h1>
    </div>
  )
}

export default Footer