import "./Nav.scss";
import { useEffect, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { SlHome } from "react-icons/sl";
import { FaWpforms } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdOutlineContactPage } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NavIcon from "./NavIcon";
import Login from "../Login/Login"
import Signup from "../Signup/Signup"
import OrderHistory from "../OrderHistory/OrderHistory"
import Reservation from "../Reservation/Reservation"
import LogoutConf from "./LogoutConf";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Settings from "../Settings/Settings";


//TODO! 
//2. Fix signup component
//3. Fix styling

function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [showOrderHistory, setShowOrderHistory] = useState(false)
  const [showReservation, setShowReservation] = useState(false)
  const [showLogoutConf, setShowLogoutConf] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const usId = localStorage.getItem("userId")
    if (usId) {
      setUserId(usId)
    }
    const usNa = localStorage.getItem("userName")
    if (usNa) {
      setUserName(usNa)
    } else {
      setUserId(null)
      setUserName(null)
    }
  }, [showLogin, openNav])
  const sideBar = {
    open: {
      transform: "translateX(0)",
      opacity: 1
    },
    closed: {
      transform: "translateX(-100%)",
      opacity: 0
    },
  };

  function handleLogout() {
    localStorage.setItem("userId", "")
    localStorage.setItem("userName", "")
    setShowLogoutConf(false)
  }

  useEffect(() => {
    console.log("test")
  }, [userId])



  return (
    <>

      <div onClick={() => setOpenNav(!openNav)}>
        <NavIcon openNav={openNav} />
      </div>
      
      {openNav && <motion.div
        className="nav"
        variants={sideBar}
        animate={openNav ? "open" : "closed"}
        transition={{ duration: 0.5 }}
        onClick={() => setOpenNav(!openNav)}
      >
        
        
        <ul className="nav--ul">
        
          <li>
            <SlHome className="nav--icon" />
            <Link to={"/"}>Home</Link>
          </li>
          {userName && <li onClick={() => setShowOrderHistory(true)}>
            <FaWpforms className="nav--icon" /> My orders
          </li>}
          <li onClick={() => setShowReservation(true)}>
            <SlCalender className="nav--icon" /> Make reservation
          </li>
          <li>
            <MdOutlineContactPage className="nav--icon" />
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li>
            <IoIosInformationCircleOutline className="navContent--icon" />
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
        {userName && <div className="nav--footer">
          <IoSettingsOutline className="nav--icon" onClick={() => {setShowSettings(true)}} />
          <h5>{userName && JSON.parse(userName)}</h5>
          <IoLogOutOutline className="nav--icon" onClick={() => {setShowLogoutConf(true)}} />
        </div>}
        {!userName && <div className="nav--footer">
          <h5 onClick={() => setShowLogin(true)}>Log in</h5>
          <h5 onClick={() => setShowSignup(true)}>Sign up</h5>
        </div>}
      </motion.div>}
      {showLogin && <Login state={() => setShowLogin()} />}
      {showSignup && <Signup />}
      {showOrderHistory && <OrderHistory action={() => setShowOrderHistory()} />}
      {showReservation && <Reservation action={() => setShowReservation()} />}
      {showLogoutConf && <LogoutConf action={() => handleLogout()} state={() => setShowLogoutConf()}/>}
      {showSettings && <Settings action={() => setShowSettings()} />}
    </>
  );
}

export default Nav;
