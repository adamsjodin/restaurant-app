import "./Nav.scss";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  IoSettingsOutline,
  IoLogOutOutline,
  SlHome,
  SlCalender,
  FaWpforms,
  MdOutlineContactPage,
  IoIosInformationCircleOutline,
} from "../../utils/iconExports";
import { sideBarVariants, booleanStates, toggleState, doubleState } from "../../utils/functions";

import NavIcon from "./NavIcon";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import OrderHistory from "../OrderHistory/OrderHistory";
import Reservation from "../Reservation/Reservation";
import LogoutConf from "./LogoutConf";
import Settings from "../Settings/Settings";

function Nav() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [state, setState] = useState(booleanStates());

  useEffect(() => {
    const usId = localStorage.getItem("userId");
    const usNa = localStorage.getItem("userName");
    if (usId && usNa) {
      setUserId(usId);
      setUserName(usNa);
    } else {
      setUserId(null);
      setUserName(null);
    }
  }, [state]);

  function handleLogout() {
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    setState({ ...state, showLogoutConf: false });
  }

  return (
    <>
      <div className="toggleNav" onClick={() => setState((prevState) => toggleState(prevState, "openNav"))}>
        <NavIcon openNav={state.openNav} />
      </div>
      <motion.div
        className="nav"
        variants={sideBarVariants}
        animate={state.openNav ? "open" : "closed"}
        transition={{ duration: 0.5 }}
      >
        <ul className="nav--ul">
          <li onClick={() => setState((prevState) => toggleState(prevState, "openNav"))}>
            <SlHome className="nav--icon" />
            <Link to={"/"}>Home</Link>
          </li>
          {userName && (
            <li
              onClick={() => doubleState(setState, 'showOrderHistory')}
            >
              <FaWpforms className="nav--icon" /> My orders
            </li>
          )}
          <li
            onClick={() => doubleState(setState, 'showReservation')}
          >
            <SlCalender className="nav--icon" /> Make reservation
          </li>
          <li onClick={() => setState((prevState) => toggleState(prevState, "openNav"))}>
            <MdOutlineContactPage className="nav--icon" />
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li onClick={() => setState((prevState) => toggleState(prevState, "openNav"))}>
            <IoIosInformationCircleOutline className="navContent--icon" />
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
        {userName ? (
          <div className="nav--footer">
            <IoSettingsOutline
              className="nav--icon"
              onClick={() => setState((prevState) => toggleState(prevState, "showSettings"))}
            />
            <h5>{userName && JSON.parse(userName)}</h5>
            <IoLogOutOutline
              className="nav--icon"
              onClick={() => doubleState(setState, 'showLogoutConf')}
            />
          </div>
        ) : (
          <div className="nav--footer">
            <h5 onClick={() => setState((prevState) => toggleState(prevState, "showLogin"))}>Log in</h5>
            <h5 onClick={() => setState((prevState) => toggleState(prevState, "showSignup"))}>Sign up</h5>
          </div>
        )}
      </motion.div>

      {state.showLogin && <Login state={() => setState((prevState) => toggleState(prevState, "showLogin"))} />}
      {state.showSignup && <Signup action={() => setState((prevState) => toggleState(prevState, "showSignup"))} />}
      {state.showOrderHistory && (
        <OrderHistory action={() => setState((prevState) => toggleState(prevState, "showOrderHistory"))} />
      )}
      {state.showReservation && (
        <Reservation action={() => setState((prevState) => toggleState(prevState, "showReservation"))} />
      )}
      {state.showLogoutConf && (
        <LogoutConf action={handleLogout} state={() => setState((prevState) => toggleState(prevState, "showLogoutConf"))} />
      )}
      {state.showSettings && (
        <Settings action={() => setState((prevState) => toggleState(prevState, "showSettings"))} />
      )}
    </>
  );
}

export default Nav;
