import "./Hours.scss";
import { useState } from "react";

import HoursIcon from "./HoursIcon";
import { motion } from "framer-motion";

function Hours() {
  const [openHours, setOpenHours] = useState(false);

  const hoursVariants = {
    open: {
        height: "300px",
        padding: "1rem 2rem"
    },
    closed: {
        height: "0px",
        padding: "0"
    },
    shown: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
  }

  return (
    <div className="hours-wrapper" onClick={() => setOpenHours(!openHours)}>
      <motion.section
        className="hours"
        variants={hoursVariants}
        animate={openHours ? "open" : "closed"}
        transition={{ duration: .5 }}
      >
        <motion.section className="hours--lists" variants={hoursVariants} animate={openHours ? "shown" : "hidden"}>
          <ul className="hours--ul">
            <li>Monday:</li>
            <li>Tuesday:</li>
            <li>Wednesday:</li>
            <li>Thursday:</li>
            <li>Friday:</li>
            <li>Saturday:</li>
            <li>Sunday:</li>
          </ul>

          <ul className="hours--ul">
            <li>2pm - 10pm*</li>
            <li>2pm - 10pm*</li>
            <li>2pm - 10pm*</li>
            <li>2pm - 10pm*</li>
            <li>2pm - 10pm*</li>
            <li>2pm - 10pm*</li>
            <li>Closed </li>
          </ul>
        </motion.section>
        <p>*Please note that the kitchen closing 30 minutes earlier. </p>
      </motion.section>
        <HoursIcon openHours={openHours} />
    </div>
  );
}

export default Hours;
