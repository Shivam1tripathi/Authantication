import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../authcontext'
import toast from 'react-hot-toast';

const Navbar = () => {
    const [auth,setAuth]=useAuth();

    const handleLogout=()=>{
      setAuth({...auth,user:null,token:""})
      localStorage.removeItem('auth');
      toast.success("Logout Successfull")
    }

  return (
    <div className='bg-slate-600 h-12 p-2 flex justify-between'>
       <Link to={'/'} className='text-white text-3xl font-bold'>Auth</Link>
       <ul className='flex mr-4'>
        {auth?.user?(<>
        
        <Link to={"/"} className='text-white text-xl mr-3 font-bold'>Home</Link>
        <button onClick={handleLogout} className='text-white text-xl mr-2 font-bold'>LOGOUT</button>
        </>):(
          <>
                  <Link to={'/register'} className='text-xl mr-2 font-bold'>Register</Link>
        <Link to={'/login'} className='text-xl font-bold'>Login</Link>
          </>
        )
        }

       </ul>
    </div>
  )
}

export default Navbar