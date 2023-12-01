import { MdClose } from "react-icons/md";


export default function ReservationConfirmation({action, guests, date, name}) {
  return (
    <section className="popup">
      <MdClose onClick={() => action(false)} />
      <h3>Thank you {name} for your reservation for {guests} guests!</h3>
      <p>We really looking forward to see you {date} at 19.00.</p><p>If there is any change in your reservation, please contact us as soon as possible. </p>
    </section>
  )
}
