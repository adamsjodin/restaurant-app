import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./PreCheckoutConfirmationStyles.scss";
import Countdown from "./Countdown/Countdown";
import { oneState, doubleStateNew, postOrder } from "../../utils/functions";


function PreCheckoutConfirmation({ cart, setAppState, appState, setCart }) {
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  
  const handleButtonClick = () => {
    setIsCountdownActive(false);
    doubleStateNew(setAppState, "openPreCheckout", "openCheckout");
    postOrder(setCart);
  };

  const handleEditClick = () => {
    setIsCountdownActive(false);
    doubleStateNew(setAppState, 'openPreCheckout', 'openCart');
  }

  useEffect(() => {
    if (appState.openPreCheckout) {
      setIsCountdownActive(true);
    }
  }, [appState.openPreCheckout]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <article
      className={`pre-checkout ${
        appState.openPreCheckout ? "visible" : "hidden"
      }`}
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
            {item.changes > 0 ? (
  item.changes.map(([ingredient, changed]) => (
    <p className="changes" key={ingredient}>
      {changed ? "Add" : "Remove"} {ingredient}
    </p>
  ))
) : null}
          </section>
        ))}
      </div>
      <div className="pre-checkout__btns">
        <Button onClick={handleButtonClick}>Looks good</Button>
        <Button
          className="secondary"
          onClick={handleEditClick}
        >
          Edit my order{" "}
          <Countdown
            onTimeout={() => {
              oneState(setAppState, "openPreCheckout");
              postOrder(setCart);
            }}
            isCountdownActive={isCountdownActive}
            duration={1}
          />
        </Button>
      </div>
    </article>
  );
}

export default PreCheckoutConfirmation;
