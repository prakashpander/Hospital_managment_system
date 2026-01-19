import React, { useContext, useState } from 'react'
import { Context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig.js';
import { toast } from 'react-toastify';

const AddNewAdmin = () => {

    const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://hospital-managment-system-backend-lu01.onrender.com/api/v1/user/admin/addnew",
        { firstName, lastName, email, phone, dob, gender, password}, 
      {
        withCredentials: true,
        
      })
      toast.success(response.data.message);
      let token = localStorage.setItem("token",response.data.token)
      console.log("token in frontend = ",token);
      
      console.log("new Admin response = ",response.data.message);
      
      navigateTo("/")
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("frontend error = ",error);
      
    }
  }

   if (!isAuthenticated) {
      return <Navigate to={"/login"} />
    }

  return ( 
    <>
    <section className='page'>
          <div className='container form-component add-admin-form'>
            <img src="/logo.png" alt="logo" className='logo'/>
            <h1 className='form-title'>Add New Adimn</h1>
           
            <form onSubmit={handleAddNewAdmin}>
              <div>
                <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div>
                <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="number" placeholder='Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <input type="date" placeholder='Date Of Birth' value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>
              <div>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
   
              <div style={{ justifyContent: "center", alignItems: "center" }}>
                <button type='submit'>Register</button>
              </div>
            </form>
          </div>
    </section>
    </>
  )
}

export default AddNewAdmin