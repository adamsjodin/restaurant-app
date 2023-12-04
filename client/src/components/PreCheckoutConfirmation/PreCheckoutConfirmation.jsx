import Button from "../Button/Button";
import "./PreCheckoutConfirmationStyles.scss";

let orderItems = [
  {
    id: 1,
    title: "Classic burger",
    price: 8.99,
    quantity: 2,
  },
  {
    id: 2,
    title: "Pizza Margerita",
    price: 6.99,
    quantity: 1,
  },
  {
    id: 3,
    title: "Ceasar sallad",
    price: 13.99,
    quantity: 1,
  },
];

function PreCheckoutConfirmation({ cart, toggleOpenCheckout, openCheckout, toggleOpenPreCheckout, openPreCheckout, }) {

 

  console.log(cart);
  return (
    <article className="pre-checkout">
      <div className="pre-checkout__items-wrapper">
        <div className="pre-checkout__top">
          <h2>Your order</h2>
          <p>[total price]</p>
        </div>
        {cart.map((item, i) => (
          <section className="pre-checkout__items" key={i}>
            <div className="pre-checkout__infowrapper">
            <p>{item.quantity}</p>
            <p>{item.title}</p>
            <p>{item.price}</p></div>
            {Object.entries(item.changes || {}).map(([ingredient, changed]) => (
              <p key={ingredient}>
                {changed ? "Add" : "Remove"} {ingredient}
              </p>
            ))}
          </section>
        ))}
      </div>
      <div className="pre-checkout__btns">
        <Button>Looks good</Button>
        <Button className="secondary" onClick={() => {
  toggleOpenCheckout(!openCheckout);
  toggleOpenPreCheckout(!openPreCheckout);
}}>Edit my order [countdown]</Button>
      </div>
    </article>
  );
}

export default PreCheckoutConfirmation;
