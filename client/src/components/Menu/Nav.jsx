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

  const [show, setShow] = useState({
    showLogin: false,
    showSignup: false,
    showOrderHistory: false,
    showReservation: false,
    showLogoutConf: false,
    showSettings: false
  })

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
  }, [show, openNav])

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
    setShow({...show, showLogoutConf: true})
  }

  useEffect(() => {
    console.log("test")
  }, [userId])



  return (
    <>

      <div onClick={() => setOpenNav(!openNav)}>
        <NavIcon openNav={openNav} />
      </div>
      
      <motion.div
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
          {userName && <li onClick={() => setShow({...show, showOrderHistory: true})}>
            <FaWpforms className="nav--icon" /> My orders
          </li>}
          <li onClick={() => setShow({...show, showReservation: true})}>
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
        {userName ? <div className="nav--footer">
          <IoSettingsOutline className="nav--icon" onClick={() => {setShow({...show, showSettings: true})}} />
          <h5>{userName && JSON.parse(userName)}</h5>
          <IoLogOutOutline className="nav--icon" onClick={() => {setShow({...show, showLogoutConf: true})}} />
        </div> :
        <div className="nav--footer">
          <h5 onClick={() => setShow({...show, showLogin: true})}>Log in</h5>
          <h5 onClick={() => setShow({...show, showSignup: true})}>Sign up</h5>
        </div>}
      </motion.div>
      {show.showLogin && <Login state={setShow.showLogin} />}
      {show.showSignup && <Signup />}
      {show.showOrderHistory && <OrderHistory action={setShow.showOrderHistory} />}
      {show.showReservation && <Reservation action={setShow.showReservation} />}
      {show.showLogoutConf && <LogoutConf action={handleLogout} state={setShow.showLogoutConf}/>}
      {show.showSettings && <Settings action={setShow.showSettings} />}
    </>
  );
}

export default Nav;
