import './NavIcon.scss'
import { motion } from 'framer-motion';

function NavIcon({ openNav }) {
    return ( 
        <motion.div className='navIcon'>
            <motion.div animate={{ rotate: openNav ? -45 : 0, y: openNav ? 10 : 0 }} className='navIcon--menu'></motion.div>
            <motion.div animate={{ opacity: openNav ? 0 : 1 }} className='navIcon--menu'></motion.div>
            <motion.div animate={{ rotate: openNav ? 45 : 0, y: openNav ? -12 : 0 }} className='navIcon--menu'></motion.div>
        </motion.div>
     );
}

export default NavIcon;