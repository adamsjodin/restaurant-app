import "./CheckoutConfirmationStyles.scss";
import { IoIosArrowDown } from "react-icons/io";

function CheckoutConfirmation({props, onClick}) {
  return (
    <article className="checkout-confirmation background-color__black">
      <h2>Thank You!</h2>
      <IoIosArrowDown className="checkout-confirmation__close" onClick={onClick} />
      <p>
        Your order was successfully accepted and will be [ready or delivered] in
        [] minutes.{" "}
      </p>
      <ol className="checkout-confirmation__timeline">
        <span className="checkout-confirmation__timeline-item">
          <li className="checkout-confirmation__timeline-content">1. Order accepted [time] [date]</li>
        </span>
        <span className="checkout-confirmation__timeline-item">
          <li className="checkout-confirmation__timeline-content">2. We start to prepare your food</li>
        </span>
        <span className="checkout-confirmation__timeline-item">
          <li className="checkout-confirmation__timeline-content">3. Your food is in the oven</li>
        </span>
        <span className="checkout-confirmation__timeline-item">
          <li className="checkout-confirmation__timeline-content">4. Quality check and packing</li>
        </span>
        <span className="checkout-confirmation__timeline-item">
          <li className="checkout-confirmation__timeline-content">5. Out for delivery [ready to pickup]</li>
        </span>
      </ol>
    </article>
  );
}

export default CheckoutConfirmation;
