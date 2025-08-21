import React, { useContext, useEffect } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import { Context } from "./main"
import Footer from './components/Footer';
import axios from 'axios';

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://hospital-managment-system-backend-lu01.onrender.com/api/v1/user/patient/me", {
          withCredentials: true
        })
        setIsAuthenticated(true);
        setUser(response.data.user)
      } catch (error) {
        setIsAuthenticated(false),
          setUser({});
      }
    }
    fetchUser();
  }, [isAuthenticated])

  return (
    <Router>
      <Navbar imageUrl={"/logo.png"} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
      <ToastContainer position='top-center' />
    </Router>

  )
}

export default App