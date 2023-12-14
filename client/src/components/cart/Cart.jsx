import ProductCard from "../../pages/Home/Components/ProductCard/ProductCard";
import { oneState, doubleStateNew, handleIncrease, handleDecrease } from "../../utils/functions";
import Button from "../Button/Button";
import "./CartStyles.scss";

function Cart({ setCart, cart, updateTotals, setAppState }) {

  return (
    <section className="cart">
      <h1>Your order:</h1>
      <section className="cart__products">
        {cart.map((product, i) => (
          <ProductCard
            key={i}
            props={{ ...product }}
            className="cart"
            cartInfo={true}
            increase={() => handleIncrease(product, cart, setCart, updateTotals)}
            decrease={() => handleDecrease(product, cart, setCart, updateTotals)}
            totalPrice={product.quantity * product.price}
          />
        ))}
      </section>
      <section className="cart__actions">
        <Button
          className="secondary"
          onClick={() => oneState(setAppState, "openCart")}
        >
          Add more
        </Button>
      
        <Button
          onClick={() => doubleStateNew(setAppState, "openCart", "openPreCheckout")}
        >
          Checkout
        </Button>
      </section>
    </section>
  );
}

export default Cart;
