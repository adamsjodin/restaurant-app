import ReservationConfirmation from "./ReservationConfirmation";
import "./reservation.scss"
import { useState } from "react";

export default function Reservation() {
  const [showConfirmation, setShowConfirmaion] = useState(false)
  return (
    <article className="reservation">
      <img src="./logos/claddagh.png" ></img>
      <p>For reservations more than ten people please send us an email.</p>
      <button onClick={() => setShowConfirmaion(true)} className="btn button--primary">Confirm reservation</button>
      {showConfirmation && <ReservationConfirmation action={setShowConfirmaion} /> }
    </article>
  )
}
