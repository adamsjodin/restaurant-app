import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import FoodMenu from "../../pages/FoodMenu/FoodMenu";
import Start from '../../pages/Start/Start';
import Orders from "../../pages/Orders/Orders";
import Reservations from "../../pages/Reservations/Reservations";
import TableSettings from "../../pages/TableSettings/TableSettings";
import Members from "../../pages/Members/Members";
import Header from "../Header/Header";
import OpeningHours from "../../pages/OpeningHours/OpeningHours";
import "../../Styles/staff.scss"

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