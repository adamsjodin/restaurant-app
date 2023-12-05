import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import FoodMenu from "../../staff/pages/FoodMenu/FoodMenu";
import Start from '../../staff/pages/Start/Start';
import Orders from "../../staff/pages/Orders/Orders";
import Header from "../../staff/Components/Header/Header";

function AnimatedRoutesStaff() {
    const location = useLocation();
  return (
    <>
    <article className="staff-body">
    <Header />
    <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Start />} />
            <Route path="/staff/orders" element={<Orders />} />
            <Route path="/staff/menu" element={<FoodMenu />} />
        </Routes>
    </AnimatePresence>
    </article>
    </>
  )
}

export default AnimatedRoutesStaff