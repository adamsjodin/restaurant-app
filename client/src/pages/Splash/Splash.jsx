/* import "./Splash.scss";
 */
import { motion } from 'framer-motion';

const SplashPage = () => {
  return (
    <div style={styles.container}>
      <motion.div
        style={styles.lineTop}
        initial={{ scaleY: 0, translateY: '-50%', height: '0', left: '50%' }}
        animate={{ scaleY: 1, translateY: 0, height: '50vh', left: '50%' }}
        exit={{ scaleY: 0, translateY: '-50%', translateX: '0%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      <motion.div
        style={styles.lineBottom}
        initial={{ scaleY: 0, translateY: '50%', height: '0', right: '50%' }}
        animate={{ scaleY: 1, translateY: 0, height: '50vh', right: '50%' }}
        exit={{ scaleY: 0, translateY: '50%', translateX: '0%' }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1, ease: 'easeInOut' }}
      >
        <img src="/logos/claddagh.png" alt="logo" />
      </motion.div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    background: '#282c34',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  lineTop: {
    position: 'absolute',
    background: '#61dafb',
    width: 2,
    height: '0',
    transformOrigin: 'top',
    left: '50%',
    right: 'auto',
  },
  lineBottom: {
    position: 'absolute',
    background: '#61dafb',
    width: 2,
    height: '0',
    transformOrigin: 'bottom',
    left: 'auto',
    right: '50%',
  }
};

export default SplashPage;


