import "./Nav.scss";
import { useState } from "react";

import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

import { SlHome } from "react-icons/sl";
import { FaWpforms } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdOutlineContactPage } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NavIcon from "./NavIcon";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Nav() {
  const [openNav, setOpenNav] = useState(false);

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
      >
        <ul className="nav--ul">
          <li onClick={() => setOpenNav(!openNav)}>
            <SlHome className="nav--icon" />
            <Link to={"/"}>Home</Link>
          </li>
          <li onClick={() => setOpenNav(!openNav)}>
            <FaWpforms className="nav--icon" /> My orders
          </li>
          <li onClick={() => setOpenNav(!openNav)}>
            <SlCalender className="nav--icon" /> Make reservation
          </li>
          <li onClick={() => setOpenNav(!openNav)}>
            <MdOutlineContactPage className="nav--icon" />
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li onClick={() => setOpenNav(!openNav)}>
            <IoIosInformationCircleOutline className="navContent--icon" />
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
        <div className="nav--footer">
          <IoSettingsOutline className="nav--icon" />
          <h5>[Kicki Lindstrand]</h5>
          <IoLogOutOutline className="nav--icon" />
        </div>
      </motion.div>
    </>
  );
}

export default Nav;
