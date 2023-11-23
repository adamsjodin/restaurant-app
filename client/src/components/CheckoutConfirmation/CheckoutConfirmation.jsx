import { useState } from "react";
import "./CheckoutConfirmationStyles.scss";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

const checkoutSteps = [
  "1. Order accepted [time] [data]",
  "2. Preparing your food",
  "3. Food is in the oven",
  "4. Quality check",
  "5. Out for delivery"
]

const screenWidth = window.innerWidth;

function CheckoutConfirmation() {
  const [overlayOpen, setOverlayOpen] = useState(false);

  function handleOverlay() {
    setOverlayOpen(!overlayOpen);
  }
  
  const overlayVariants = {
    closed: {
      height: "4vh"
    },
    open: {
      height: "25vh"
    }
  }

  return (
    <motion.article className="checkout-confirmation background-color__black"
      variants={screenWidth > 600 ? overlayVariants : null}
      animate={overlayOpen ? "open" : "closed" }
      transition={{ duration: 1 }}
    >
    <IoIosArrowDown
        className="checkout-confirmation__close"
        onClick={handleOverlay}
      />
    { overlayOpen ? 
      <>
      <h2>Thank You!</h2>
      <p>
        Your order was successfully accepted and will be [ready or delivered] in
        [] minutes.{" "}
      </p>
      <ol className="checkout-confirmation__timeline">
        <div className="line">
          { checkoutSteps.map((step, index) => (
            <aside key={index}></aside>
          ))}
        </div>
        <div className="items">
        { checkoutSteps.map((step, index) => (
          <li className="checkout-confirmation__timeline-content" key={index}>
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
