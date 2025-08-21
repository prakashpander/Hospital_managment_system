import React from 'react'
import { useState , useContext } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const {isAuthenticated, setIsAuthenticated} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


    const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hospital-managment-system-backend-lu01.onrender.com/api/v1/user/login", {
        email, password, confirmPassword, role: "Admin",
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      })
      toast.success(response.data.message);
      setIsAuthenticated(true)
      setUser(res.data.user); // ye line extra add ki h 
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }


  return (
    <>
     <div className='container form-component'>
      <img src="/logo.png" alt="logo" className='logo' />
      <h1 className='form-title'>Welcome TO ZeeCare</h1>
      <p>Only Admins Are Allowed To Access These Resources !</p>

     <form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />
         
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login