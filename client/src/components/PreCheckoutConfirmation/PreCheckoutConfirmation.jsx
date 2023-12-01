import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./PreCheckoutConfirmationStyles.scss";
import Countdown from "./Countdown/Countdown";

const cart = [
  { "id": 1, "title": "Classic burger", "price": 8.99, "quantity": 2 },
  { "id": 2, "title": "Pizza Margherita", "price": 6.99, "quantity": 1 },
  { "id": 3, "title": "Caesar salad", "price": 13.99, "quantity": 1 }
]

function PreCheckoutConfirmation() {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  const handleCountdownTimeout = () => {
    setIsPopupVisible(false);
  };

  const handleButtonClick = () => {
    setIsCountdownActive(false);
    setIsPopupVisible(false);
  };

  useEffect(() => {
    if (isPopupVisible) {
      setIsCountdownActive(true);
    }
  }, [isPopupVisible]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <article
      className={`pre-checkout ${isPopupVisible ? "visible" : "hidden"}`}
    >
      <div className="pre-checkout__items-wrapper">
        <div className="pre-checkout__top">
          <h2>Your order</h2>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        {cart.map((item, i) => (
          <section className="pre-checkout__items" key={i}>
            <p>{item.quantity}</p>
            <p>{item.title}</p>
            <p>{item.price}</p>
          </section>
        ))}
      </div>
      <div className="pre-checkout__btns">
        <Button>Looks good</Button>
        <Button className="secondary" onClick={handleButtonClick}>
          Edit my order{" "}
          <Countdown
            onTimeout={handleCountdownTimeout}
            isCountdownActive={isCountdownActive}
          />
        </Button>
      </div>
    </article>
  );
}

export default PreCheckoutConfirmation;
