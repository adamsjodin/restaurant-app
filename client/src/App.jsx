import './App.css'
import Hours from './components/Hours/Hours'
import Nav from './components/Menu/Nav'
import Form from './components/Form/Form'
import Login from './components/Login/Login'
import Reservation from './components/Reservation/Reservation'
import Home from './pages/Home/Home'
import { useState } from 'react'
import Topbar from './components/Topbar/Topbar'
import ChangeOrderPopup from './components/ChangeOrderPopup/ChangeOrderPopup'
import CheckoutConfirmation from './components/CheckoutConfirmation/CheckoutConfirmation'
import PreCheckoutConfirmation from './components/PreCheckoutConfirmation/PreCheckoutConfirmation'

function App() {
  const [form, setForm] = useState(false);
  const [home, setHome] = useState(false);
  const [hours, setHours] = useState(false);
  const [login, setLogin] = useState(false);
  const [reservation, setReservation] = useState(false)
  return (

    <section style={{ display: "grid"}}>
      <Nav />
      <button onClick={() => setReservation(!reservation)}>{reservation ? "Hide" : "Show"} Reservation</button>
      {reservation ? <Reservation /> : "" }
      <button onClick={() => setLogin(!login)}>{login ? "Hide" : "Show"} Login</button>
      {login ? <Login /> : "" }
      <button onClick={() => setHours(!hours)}>{hours ? "Hide" : "Show"} Hours</button>
      {hours ? <Hours /> : "" }

     <button onClick={() => setForm(!form)}>{form ? "Hide" : "Show"} Form</button>
    {form ? <Form /> : "" }

    <button onClick={() => setHome(!home)}>{home ? "Hide" : "Show"} Home</button>
   {home ? <Home /> : "" }
    <ChangeOrderPopup />
    {/* <CheckoutConfirmation /> */}
    {/* <PreCheckoutConfirmation /> */}
    {/* <ChangeOrderPopup /> */}
   </section>
  )
}

export default App
