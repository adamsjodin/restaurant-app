import './Nav.scss'
import { useState } from 'react';

import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";

import { SlHome } from "react-icons/sl";
import { FaWpforms } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdOutlineContactPage } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import NavIcon from './NavIcon';

function Nav() {

    const [openNav, setOpenNav] = useState(false);

    return (
        <>
            <div onClick={() => setOpenNav(!openNav)}>
                <NavIcon openNav={openNav} />
            </div>
            {
                openNav &&
                <div className='nav'>
                    <ul className='nav--ul'>
                        <li><SlHome className='nav--icon' /> Home</li>
                        <li><FaWpforms className='nav--icon'/> My orders</li>
                        <li><SlCalender className='nav--icon'/> Make reservation</li>
                        <li><MdOutlineContactPage className='nav--icon'/> Contact</li>
                        <li><IoIosInformationCircleOutline className='navContent--icon'/> About</li>
                    </ul>
                    <div className='nav--footer'>
                    <IoSettingsOutline className='nav--icon' />
                        <h5>Kicki Lindstrand</h5>
                    <IoLogOutOutline className='nav--icon'/>
                    </div>
                </div>
            }
        </>
    );
}

export default Nav;