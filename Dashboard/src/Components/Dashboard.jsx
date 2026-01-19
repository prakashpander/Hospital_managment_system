import React, { useState, useEffect, useContext } from 'react';
import axios from '../utils/axiosConfig.js';
import { Context } from '../main';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { GoCheckCircleFill } from "react-icons/go"
import { AiFillCloseCircle } from 'react-icons/ai';
import "./Dashboard.css";

const Dashboard = () => {

  const { isAuthenticated, user } = useContext(Context);
  const [appointment, setAppointment] = useState([])

  useEffect(() => {

    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("https://hospital-managment-system-backend-lu01.onrender.com/api/v1/appointment/getall",
        
        {
          withCredentials: true
        });

        setAppointment(data.appointment);
      } catch (error) {
        setAppointment([]);
        console.log("SOME ERROR OCCURED WHILE FETCHING APPOINTMENTS", error);

      }
    }
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {

    try {
      const { data } = await axios.put(`https://hospital-managment-system-backend-lu01.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status ,
          hasVisited : status === "Accepted"
        },
        { withCredentials: true }
      );
      setAppointment((prevAppointment) =>
        prevAppointment.map((appointment) =>
          appointment._id === appointmentId ? { ...appointment, status , hasVisited : status === "Accepted" } : appointment
        )
      );
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    };

  }

  if (!isAuthenticated) {
    <Navigate to="/login" />
  }

  return (
    <>

      <section className='dashboard page'>
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
              </div>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi neque aliquid veniam fugit magnam autem laborum ipsum alias quos dolorum!</p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
             <h3>{appointment.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>20</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>



          <table className='responsive-table'>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th> 
                <th>Department</th>
                <th>status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointment && appointment.length > 0 ? (
                appointment.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td  data-label="Patient">{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td data-label="Date">{appointment.appointment_date.substring(0, 16)}</td>
                      <td data-label="Doctor">{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td data-label="Department">{appointment.department}</td>
                      <td data-label="Status">
                        <select className={appointment.status === "Pending" ? "value-pending" : appointment.status === "Rejected" ? "value-rejected" : "value-accepted"} value={appointment.status}
                          onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}>
                          <option value="Pending" className='value-pending'>Pending</option>
                          <option value="Accepted" className='value-accepted'>Accepted</option>
                          <option value="Rejected" className='value-rejected'>Rejected</option>

                        </select>
                      </td>
                     
                         <td data-label="Visited" className='appointment-visited-logo' >{appointment.hasVisited === true ? <GoCheckCircleFill className='green' /> : <AiFillCloseCircle className='red' />}</td>
                    
                    </tr>
                  )
                })

              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>No Appointment Found !</td>
                </tr>
              )}
            </tbody>
          </table>

          
        </div>
      </section>

    </>
  )
}

export default Dashboard