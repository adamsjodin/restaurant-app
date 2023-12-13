import { useState, useEffect } from "react";
import Button from "../Button/Button";
import "./PreCheckoutConfirmationStyles.scss";
import Countdown from "./Countdown/Countdown";
import {
  oneState,
  doubleStateNew,
  postOrder,
  handleEnterPress,
} from "../../utils/functions";
import Input from "../Input/Input";

function PreCheckoutConfirmation({ cart, setAppState, appState, setCart }) {
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [looksGood, setLooksGood] = useState(false);
  console.log(looksGood);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const handleButtonClick = () => {
    setIsCountdownActive(false);
    doubleStateNew(setAppState, "openPreCheckout", "openCheckout");
    postOrder(setCart);
  };

  const handleEditClick = () => {
    setIsCountdownActive(false);
    doubleStateNew(setAppState, "openPreCheckout", "openCart");
  };

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
      <div className="pre-checkout__top">
        <h2>Your order</h2>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
      <section className="pre-checkout__bottom">
        <div className="pre-checkout__items-wrapper">
          {cart.map((item, i) => (
            <section className="pre-checkout__items" key={i}>
              <p>{item.quantity}</p>
              <p>{item.title}</p>
              <p>{item.price} kr</p>
              {item.changes > 0
                ? item.changes.map(([ingredient, changed]) => (
                    <p className="changes" key={ingredient}>
                      {changed ? "Add" : "Remove"} {ingredient}
                    </p>
                  ))
                : null}
            </section>
          ))}
        </div>
        <div className="pre-checkout__btns">
          {appState.openCheckout ? (
            <>
              <p style={{ fontSize: "1.5em", color: "limegreen" }}>
                Previous order in progress...
              </p>
              <Button className="secondary" onClick={handleEditClick}>
                Back to cart
              </Button>
            </>
          ) : looksGood ? (
            <>
              <Input
                type="text"
                className="login--input"
                placeholder="Name"
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
                onKeyPress={handleEnterPress}
              />
              <Input
                type="text"
                className="login--input"
                placeholder="E-mail"
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, email: e.target.value })
                }
                onKeyPress={handleEnterPress}
              />
              <Input
                type="number"
                className="login--input"
                placeholder="Phonenumber"
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    phoneNumber: e.target.value,
                  })
                }
                onKeyPress={handleEnterPress}
              />
              <Button onClick={handleButtonClick}>Send order</Button>
              <Button className="secondary" onClick={handleEditClick}>Go back</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setLooksGood(!looksGood)}>
                Looks good
              </Button>
              <Button className="secondary" onClick={handleEditClick}>
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
            </>
          )}
        </div>
      </section>
    </article>
  );
}

export default PreCheckoutConfirmation;
