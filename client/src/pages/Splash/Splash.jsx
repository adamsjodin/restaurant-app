import "./Splash.scss";

import { AnimatePresence, motion } from "framer-motion";

const SplashPage = () => {
  return (
    <AnimatePresence>
      <div className="splash">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '210px'}}
          transition={{ delay: 1, duration: 2, ease: "easeOut" }}
          className="splash__container"
        >
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SplashPage;
