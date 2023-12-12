import "./Hours.scss";
import { useState } from "react";

import HoursIcon from "./HoursIcon";
import { motion } from "framer-motion";
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
        {openHours ? <HoursList /> : null }
      </motion.section>
      <HoursIcon openHours={openHours} />
    </div>
  );
}

export default Hours;
