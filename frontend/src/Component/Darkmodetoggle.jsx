import React, { useState, useEffect } from 'react';
import { useAuth } from '../authcontext';

const Darkmodetoggle = () => {
    const [auth,setAuth]=useAuth();
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
      });
    
      useEffect(() => {
        if (darkMode) {
            setAuth({...auth,user:auth.user,token:auth.token,darkmode:true});
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
        setAuth({...auth,user:auth.user,token:auth.token,darkmode:false});
          document.documentElement.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
      }, [darkMode]);
    
      const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };
  return (

      <label className="switch mr-3 ml-3">
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
        <span className="slider round"></span>
      </label>

  )
}

export default Darkmodetoggle