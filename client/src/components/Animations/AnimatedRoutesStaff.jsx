import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import FoodMenu from "../../staff/pages/FoodMenu/FoodMenu";
import Start from '../../staff/pages/Start/Start';
import Orders from "../../staff/pages/Orders/Orders";
import Reservations from "../../staff/pages/Reservations/Reservations";
import TableSettings from "../../staff/pages/TableSettings/TableSettings";
import Members from "../../staff/pages/Members/Members";
import Hours from "../../staff/pages/OpeningHours/OpeningHours";
import Header from "../../staff/Components/Header/Header";
import OpeningHours from "../../staff/pages/OpeningHours/OpeningHours";

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
            <Route path="/staff/reservations" element={<Reservations />} />
            <Route path="/staff/hours" element={<OpeningHours />} />
            <Route path="/staff/tables" element={<TableSettings />} />
            <Route path="/staff/members" element={<Members />} />
        </Routes>
    </AnimatePresence>
    </article>
    </>
  )
}

export default AnimatedRoutesStaff