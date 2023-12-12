import "./Hours.scss";
import { useEffect, useState } from "react";

import HoursIcon from "./HoursIcon";
import { motion } from "framer-motion";
import axios from "axios";
import HoursList from "./HoursList";
import { hoursVariants } from "../../utils/functions";

function Hours() {
  const [openHours, setOpenHours] = useState(false);

  return (
    <div className="hours-wrapper" onClick={() => setOpenHours(!openHours)}>
      <motion.section
        className="hours"
        variants={hoursVariants}
        animate={openHours ? "open" : "closed"}
        transition={{ duration: 0.5 }}
      >
        <motion.section
          className="hours--lists"
          variants={hoursVariants}
          animate={openHours ? "shown" : "hidden"}
        >
          <HoursList/>
        </motion.section>
        
      </motion.section>
      <HoursIcon openHours={openHours} />
    </div>
  );
}

export default Hours;
