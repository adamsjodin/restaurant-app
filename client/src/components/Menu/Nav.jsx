import "./Nav.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { IoSettingsOutline, IoLogOutOutline, SlHome, SlCalender, FaWpforms, MdOutlineContactPage, IoIosInformationCircleOutline } from '../../utils/iconExports'

import NavIcon from "./NavIcon";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import OrderHistory from "../OrderHistory/OrderHistory";
import Reservation from "../Reservation/Reservation";
import LogoutConf from "./LogoutConf";
import Settings from "../Settings/Settings";

//TODO!
//1. Add settings component
//2. Fix signup component
//3. Fix styling

function Nav() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);

  const [show, setShow] = useState({
    showLogin: false,
    showSignup: false,
    showOrderHistory: false,
    showReservation: false,
    showLogoutConf: false,
    showSettings: false,
    openNav: false,
  });

  useEffect(() => {
    const usId = localStorage.getItem("userId");
    if (usId) {
      setUserId(usId);
    }
    const usNa = localStorage.getItem("userName");
    if (usNa) {
      setUserName(usNa);
    } else {
      setUserId(null);
      setUserName(null);
    }
  }, [show]);

  const sideBar = {
    open: {
      transform: "translateX(0)",
      opacity: 1,
    },
    closed: {
      transform: "translateX(-100%)",
      opacity: 0,
    },
  };

  function handleLogout() {
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    setShow({ ...show, showLogoutConf: false });
  }

  function closeNav() {
    setShow({ ...show, openNav: !show.openNav })
  }

  return (
    <>
      <div onClick={() => setShow({ ...show, openNav: !show.openNav })}>
        <NavIcon openNav={show.openNav} />
      </div>

      <motion.div
        className="nav"
        variants={sideBar}
        animate={show.openNav ? "open" : "closed"}
        transition={{ duration: 0.5 }}
      >
        <ul className="nav--ul">
          <li onClick={closeNav}>
            <SlHome className="nav--icon" />
            <Link to={"/"}>Home</Link>
          </li>
          {userName && (
            <li onClick={() => setShow({ ...show, showOrderHistory: !show.showOrderHistory, openNav: !show.openNav })}>
              <FaWpforms className="nav--icon" /> My orders
            </li>
          )}
          <li onClick={() => setShow({ ...show, showReservation: !show.showReservation, openNav: !show.openNav })}>
            <SlCalender className="nav--icon" /> Make reservation
          </li>
          <li onClick={closeNav}>
            <MdOutlineContactPage className="nav--icon" />
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li onClick={closeNav}>
            <IoIosInformationCircleOutline className="navContent--icon" />
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
        {userName ? (
          <div className="nav--footer">
            <IoSettingsOutline
              className="nav--icon"
              onClick={() => {
                setShow({ ...show, showSettings: !show.showSettings });
              }}
            />
            <h5>{userName && JSON.parse(userName)}</h5>
            <IoLogOutOutline
              className="nav--icon"
              onClick={() => {
                setShow({ ...show, showLogoutConf: !show.showLogoutConf, openNav: !show.openNav });
              }}
            />
          </div>
        ) : (
          <div className="nav--footer">
            <h5 onClick={() => setShow({ ...show, showLogin: !show.showLogin })}>
              Log in
            </h5>
            <h5 onClick={() => setShow({ ...show, showSignup: !show.showSignup })}>
              Sign up
            </h5>
          </div>
        )}
      </motion.div>

      {show.showLogin && <Login state={() =>
            setShow({ ...show, showLogin: !show.showLogin })
          } />}
      {show.showSignup && <Signup action={() => 
        setShow({ ...show, showSignup: !show.showSignup }) 
        }/>}
      {show.showOrderHistory && (
        <OrderHistory
          action={() =>
            setShow({ ...show, showOrderHistory: !show.showOrderHistory })
          }
        />
      )}
      {show.showReservation && (
        <Reservation
          action={() =>
            setShow({ ...show, showReservation: !show.showReservation })
          }
        />
      )}
      {show.showLogoutConf && (
        <LogoutConf
          action={handleLogout}
          state={() =>
            setShow({ ...show, showLogoutConf: !show.showLogoutConf })
          }
        />
      )}
      {show.showSettings && (
        <Settings
          action={() => setShow({ ...show, showSettings: !show.showSettings })}
        />
      )}
    </>
  );
}

export default Nav;
