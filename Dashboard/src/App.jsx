import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './Components/Dashboard'
import Sidebar from './Components/Sidebar'
import Login from './Components/Login'
import AddNewDoctor from './Components/AddNewDoctor'
import AddNewAdmin from './Components/AddNewAdmin'
import Messages from './Components/Messages'
import Doctor from './Components/Doctors'
import { ToastContainer } from 'react-toastify';
import { Context } from "./main"
import axios from "axios";
import "./App.css";

const App = () => {

  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {

    const fetchUser = async () => {

      try {
        const response = await axios.get("https://hospital-managment-system-backend-lu01.onrender.com/api/v1/user/admin/me",

          {
             withCredentials: true
          });

        setIsAuthenticated(true);
        setUser(response.data.user);

      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();

  }, []);

  return (
    <>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/doctor/addnew' element={<AddNewDoctor />} />
          <Route path='/admin/addnew' element={<AddNewAdmin />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/doctors' element={<Doctor />} />
        </Routes>
        <ToastContainer position='top-center' />
      </Router>
    </>
  )
}

export default App