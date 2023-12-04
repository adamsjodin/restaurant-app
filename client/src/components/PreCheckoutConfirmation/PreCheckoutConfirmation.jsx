import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./PreCheckoutConfirmationStyles.scss";
import Countdown from "./Countdown/Countdown";

function PreCheckoutConfirmation({
  cart,
  toggleOpenCheckout,
  openCheckout,
  toggleOpenPreCheckout,
  openPreCheckout,
}) {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isCountdownActive, setIsCountdownActive] = useState(true);

  const handleCountdownTimeout = () => {
    setIsPopupVisible(false);
  };

  const handleButtonClick = () => {
    setIsCountdownActive(false);
    setIsPopupVisible(false);
    toggleOpenCheckout(!openCheckout);
    toggleOpenPreCheckout(!openPreCheckout);
  };

  useEffect(() => {
    if (isPopupVisible) {
      setIsCountdownActive(true);
    }
  }, [isPopupVisible]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
              {Object.entries(item.changes || {}).map(
                ([ingredient, changed]) => (
                  <p key={ingredient}>
                    {changed ? "Add" : "Remove"} {ingredient}
                  </p>
                )
              )}
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
