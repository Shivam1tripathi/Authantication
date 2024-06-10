import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../authcontext'
import toast from 'react-hot-toast';
import Darkmodetoggle from './Darkmodetoggle';

const Navbar = () => {
    const [auth,setAuth]=useAuth();
    let [textcolor,setTextcolor]=useState("white");
    let [backgroundcolor,setBackgroundcolor]=useState("black");
    useEffect(()=>{
      if(auth.darkmode===true){
        setTextcolor("white");
        setBackgroundcolor("black");
       
      }else{
        setTextcolor("black");
        setBackgroundcolor("white");
      }
    },[auth])

    const handleLogout=()=>{
      setAuth({...auth,user:null,token:""})
      localStorage.removeItem('auth');
      toast.success("Logout Successfull")
    }

  return (
    <div style={{backgroundColor:backgroundcolor}} className=' h-14 p-2 flex justify-between'>
       <Link to={'/'} style={{color:textcolor}} className='text-3xl font-bold'>Auth</Link>
       <ul className='flex mr-4'>
        {auth?.user?(<>
        <Link to={"/"} style={{color:textcolor}} className=' text-xl mr-3 font-extrabold'>Home</Link>
        <button style={{color:textcolor}} onClick={handleLogout} className=' text-xl mr-2 mb-4 font-extrabold'>LOGOUT</button>
        </>):(
          <>
        <Link to={'/register'} style={{color:textcolor}} className='text-xl mr-2 font-extrabold'>Register</Link>
        <Link to={'/login'} style={{color:textcolor}} className=' text-xl  mr-2 font-extrabold'>Login</Link>
        
          </>
        )
        }
        <Darkmodetoggle/>

       </ul>
    </div>
  )
}

export default Navbar