import React, { use, useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main"
import axios from 'axios';
import { toast } from 'react-toastify';
import { GiHamburgerMenu } from "react-icons/gi"

const Navbar = ({ imageUrl }) => {
    const [show, setShow] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
            withCredentials: true,
        })
            .then((res) => {
                toast.success(res.data.message),
                    setAuthenticated(false);
            })
            .catch((error) => {
                toast.error(err?.response?.data?.message || "Server is not responding")
            });
    }

    const gotoLogin = () => {
        navigateTo("/login")
    };

    return (
        <nav className="container">
            <div className="logo"><Link to={"/"}><img className='logo-img' src={imageUrl} alt="logo" /></Link></div>
            <div className={show ? "navLinks showmenu" : "navLinks"}>
                <div className='links'>
                    <Link to={"/"}>HOME</Link>
                    <Link to={"/appointment"}>APPOINTMENT</Link>
                    <Link to={"/about"}>ABOUT US</Link>
                </div>
                {isAuthenticated ? (<button className='logoutBtn btn' onClick={handleLogout}>LOGOUT</button>) : (<button style={{ cursor: "pointer" }} className='logoutBtn btn' onClick={gotoLogin}>LOGIN</button>)}
            </div>
            <div className='hamburger' onClick={() => setShow(!show)}>
                <GiHamburgerMenu />
            </div>
        </nav>
    )
}

export default Navbar