import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../main'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      let token = localStorage.getItem("token");
      console.log("token in get messages = ",token);
      
      try {
        const { data } = await axios.get("https://hospital-managment-system-backend-lu01.onrender.com/api/v1/message/getall",

          {
            withCredentials: true,
            headers:{
              Authorization :`Bearer ${token}`
            }
          })

        setMessages(data.messages);
      } catch (error) {
        console.log("ERROR OCCURED WHILE FETCHING MESSAGES u know that", error);
      };
    }
    fetchMessages();
  }, []);


  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return (
    <section className='page messages'>
      <h1>MESSAGES</h1>
      <div className="banner">
        {
          messages && messages.length > 0 ? (messages.map(element => {
            return (
              <div className="card">
                <div className="details"></div>
                <p>First Name : <span>{element.firstName}</span></p>
                <p>Last Name : <span>{element.lastName}</span></p>
                <p>Email : <span>{element.email}</span></p>
                <p>Phone : <span>{element.phone}</span></p>
                <p>Message : <span>{element.message}</span></p>
              </div>
            )
          })) : (<h1>No Messages</h1>)
        }

      </div>
    </section >
  );
}

export default Messages