import { useState } from "react";
import ReservationCard from "./ReservationCard";
import "./ReservationsStyles.scss";

export default function Reservations() {
  const [className, setClassName] = useState("waiting");
  const [notes, setNotes] = useState("");
  const reservations = [
    {
      name: "Jocke",
      amount: 5,
      time: "17.30",
      status: "waiting",
      notes: notes,
    },
    {
      name: "Adam",
      amount: 2,
      time: "12.30",
      status: "waiting",
      notes: notes,
    },
    {
      name: "Kicki",
      amount: 8,
      time: "19.30",
      status: "waiting",
      notes: notes,
    },
    {
      name: "Samuel",
      amount: 3,
      time: "14.30",
      status: "waiting",
      notes: notes,
    },
  ];

  const filteredReservations = reservations.filter(
    (reservation) => reservation.status === className
  );

  const reservationElements = filteredReservations.map((reservation, index) => (
    <ReservationCard key={index} {...reservation} />
  ));

  return (
    <section className="reservations">
      <section className="reservations__tabs">
        <p
          onClick={() => setClassName("waiting")}
          className={className === "waiting" ? "active" : ""}
        >
          Waiting
        </p>
        <p
          onClick={() => setClassName("seated")}
          className={className === "seated" ? "active" : ""}
        >
          Seated
        </p>
        <p
          onClick={() => setClassName("done")}
          className={className === "done" ? "active" : ""}
        >
          Done
        </p>
      </section>
      {reservations.length > 0 ? (
        <section className="reservations__cards">{reservationElements}</section>
      ) : (
        <p>No order history available.</p>
      )}
    </section>
  );
}




