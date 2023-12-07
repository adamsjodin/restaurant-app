import Button from "../../../components/Button/Button";
import "./ReservationCardStyles.scss";

function ReservationCard(props) {
  const { name, amount, time, notes } = props;

  return (
    <section className="reservationcard">
      <div>
        <p>Name: {name}</p>
        <p>Guests: {amount}</p>
        <p>Notes: {notes}</p>
      </div>
      <div>
        <p>Time: {time}</p>
        <section style={{ display: 'flex', gap: "1em" }}>
          <Button>Seated</Button>
          <Button>Edit</Button>
        </section>
      </div>
    </section>
  );
}

export default ReservationCard;
