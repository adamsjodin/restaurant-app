import './HoursIcon.scss'
import { motion } from 'framer-motion'
import { IoIosArrowUp } from "react-icons/io";
import { useState, useEffect } from 'react';

function HoursIcon({ openHours }) {


    const date = new Date()
    const hour = date.getHours()
    
    const [isOpen, setIsOpen] = useState(true) 

    useEffect(() => {
        const openClosed = () => {
            const openingHour = 14;
            const closingHour = 23;
        
            if (hour >= openingHour && hour <= closingHour) {
                setIsOpen(true)
            } else {
                setIsOpen(false)
            }
        }
        
        openClosed();
    },[hour]);


    console.log(hour);
    return (
        <section className="hoursIcon">
            <h3 style={{color: isOpen ? '#00FF57' : '#FF0000'}}>{isOpen ? 'Open' : 'Closed'}</h3>
            <h3>Hours</h3>
            <motion.div animate={{rotate: openHours ? 180 : 0 }} transition={{duration: 0.1}}>
                <IoIosArrowUp />
            </motion.div>
        </section> 
     );
}

export default HoursIcon;