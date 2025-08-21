import React, { useContext, useState } from 'react'
import { Context } from "../main";
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hospital-managment-system-backend-lu01.onrender.com/api/v1/user/login", {
        email, password, confirmPassword, role: "Patient",
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      })
      toast.success(response.data.message);
      setIsAuthenticated(true)
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div className='container form-component login-form'>
      <p>SignIn</p>
      <p>Please Login TO Continue</p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium officiis quas optio dolorum quaerat praesentium.</p>
      <form onSubmit={handleLogin}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password' />

        <div style={{ gap: "10px", justifyContent: "flex-end", flexDirection: "row" }}>

          <p style={{ marginBottom: 0 }}>Not Registered</p>
          <Link to={"/register"} style={{ textDecoration: "none", alignItem: "center" }}>Register Now</Link>

        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type='submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login