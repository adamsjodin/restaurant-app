import ReservationConfirmation from "./ReservationConfirmation";
import "./reservation.scss"
import { useState } from "react";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { MdClose } from "react-icons/md";
import Button from "../Button/Button";

export default function Reservation({action}) {
  const [showConfirmation, setShowConfirmaion] = useState(false)
  const [guests, setGuests] = useState(1)

  return (
    <>
    
     {/*  <Calendar /> */}
    <article className="reservation">
			<MdClose onClick={() => action(false)} />
      <img src="./logos/claddagh.png" ></img>
      <p>For reservations more than ten people please send us an email.</p>
      {/*insert new form here*/}

      <form
            autoComplete='on'
            className='form'
        >
          <div className='form__calendar'>
          </div>
            <section className="form__inputs">
                <input className="input" placeholder="Date"/>
                <input className="input" placeholder="Time"/>
                <input className="input" placeholder="Email"/>
                <input className="input" placeholder="Name" />
                <input className="input" placeholder="Phone" />
            </section>
        </form>

      <section className="reservation__nrOfGuests">
        <div className="circle--large">{guests}</div>
        <section className="circles">
          <div className="circles--small" onClick={() => guests >= 2 ? setGuests(guests - 1) : guests}> - </div>
          <div className="circles--small" onClick={() => guests <= 9 ? setGuests(guests + 1) : guests}>+</div>
        </section>
      </section>
      <Button onClick={() => setShowConfirmaion(true)}>Confirm reservation</Button>
      {showConfirmation && <ReservationConfirmation action={setShowConfirmaion} guests={guests} /> }
    </article>
      </>
  )
}
