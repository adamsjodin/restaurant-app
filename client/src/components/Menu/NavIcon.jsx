import "./NavIcon.scss";
import { motion } from "framer-motion";

function NavIcon({ openNav }) {
  return (
    <motion.div className="navIcon">
      <motion.div
        animate={{
          width: "100%",
          rotate: openNav ? -45 : 0,
          y: openNav ? 10 : 0,
          transition: { duration: 0.4 },
        }}
        className="navIcon--menu"
      ></motion.div>
      <motion.div
        animate={{
          width: openNav ? "100%" : "75%",
          opacity: openNav ? 0 : 1,
          transition: { duration: 0.4 },
        }}
        className="navIcon--menu"
      ></motion.div>
      <motion.div
        animate={{
          width: openNav ? "100%" : "50%",
          rotate: openNav ? 45 : 0,
          y: openNav ? -12 : 0,
          transition: { duration: 0.4 },
        }}
        className="navIcon--menu"
      ></motion.div>
    </motion.div>
  );
}

export default NavIcon;
