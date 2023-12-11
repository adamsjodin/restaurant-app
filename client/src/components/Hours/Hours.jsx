import "./Hours.scss";
import { useEffect, useState } from "react";

import HoursIcon from "./HoursIcon";
import { motion } from "framer-motion";
import axios from "axios";

function Hours() {
  const [openHours, setOpenHours] = useState(false);
  const [hours, setHours] = useState([]);
  const [note, setNote] = useState("");
  const daysOrder = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const sortedHours = hours
    .slice()
    .sort((a, b) => daysOrder.indexOf(a.days) - daysOrder.indexOf(b.days));

  useEffect(() => {
    axios
      .get(
        "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/hours"
      )
      .then((res) => {
        setHours(res.data.hours);
        if (res.data.hours.some((item) => item.notes)) {
          setNote(res.data.hours.find((item) => item.notes).notes);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const hoursVariants = {
    open: {
      height: "300px",
      padding: "1rem 2rem",
    },
    closed: {
      height: "0px",
      padding: "0",
    },
    shown: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
    },
  };

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
          <ul className="hours--ul">
            {sortedHours.map((hour, index) => (
              <li key={hour.id}>
                {hour.hours !== undefined ? (
                  <label htmlFor={hour.id} key={hour.id}>
                    {hour.days + ": " + hour.hours}
                  </label>
                ) : null}
              </li>
            ))}
          </ul>
        </motion.section>
        <p>{note} </p>
      </motion.section>
      <HoursIcon openHours={openHours} />
    </div>
  );
}

export default Hours;
