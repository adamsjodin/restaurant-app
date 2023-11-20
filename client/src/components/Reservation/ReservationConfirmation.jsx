import { MdClose } from "react-icons/md";


export default function ReservationConfirmation({action}) {
  return (
    <section className="popup">
      <MdClose onClick={() => action(false)} />
      <h3>Thank you for your reservation!</h3>
      <p>We really looking forward to see you [day] the [date] at [time]o clock. If there is any change in your reservation, please contact us as soon as possible. </p>
    </section>
  )
}
