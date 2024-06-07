import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
   <>
   <Navbar/>
   <main className='min-h-96'>
   <Toaster />
    {children}
   </main>
   <Footer/>
   </>
  )
}

export default Layout