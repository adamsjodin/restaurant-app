import { useState } from "react";
import "./CheckoutConfirmationStyles.scss";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { booleanStates, oneState, overlayVariants, CheckoutTimeline } from "../../utils/functions";

const checkoutSteps = [
  "Order accepted",
  "Preparing your food",
  "Food is in the oven",
  "Quality check",
  "Ready for pickup"
]

const screenWidth = window.innerWidth;

function CheckoutConfirmation() {
  const [state, setState] = useState(booleanStates());

  return (
    <motion.article className={"checkout-confirmation " + (screenWidth > 600 ? "bg__black-reverse" : "background-color__black")}
      variants={overlayVariants}
      animate={state.checkoutOpen ? "open" : "closed" }
      transition={{ duration: 1 }}
    >
      <IoIosArrowDown
        className={"checkout-confirmation__close " + (state.checkoutOpen ? "open" : "")}
        onClick={() => oneState(setState, 'checkoutOpen')}
      />
      {state.checkoutOpen ? 
        <>
          <h2>Thank You!</h2>
          <p>
            Your order will be ready soon! <br></br>
            Check the progress below...
          </p>
          <ol className="checkout-confirmation__timeline">
            <div className="line">
              { checkoutSteps.map((step, index) => (
                <aside key={index} style={CheckoutTimeline(index)}></aside>
              ))}
            </div>
            <div className="items">
              { checkoutSteps.map((step, index) => (
                <li className="checkout-confirmation__timeline-content" key={index} style={CheckoutTimeline(index)}>
                  {step}
                </li>
              ))}
            </div>
          </ol>
        </>
      : null }
    </motion.article>
  );
}

export default CheckoutConfirmation;
