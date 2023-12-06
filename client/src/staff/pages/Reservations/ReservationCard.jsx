import React from "react";
import Button from "../../../components/Button/Button";
import "./ReservationCardStyles.scss";

function ReservationCard(props) {
  const { name, amount, time, status, notes } = props;

  return (
    <section className="reservationcard">
        <div>
      <p>Name:{name}</p>
      <p>Guests:{amount}</p>
      <p>Notes:{notes}</p>
      </div><div>
      <p>Time:{time}</p>
      <Button>Seated?</Button>
      <Button>Edit</Button>
      <p>{status}</p></div>
    </section>
  );
}

export default ReservationCard;