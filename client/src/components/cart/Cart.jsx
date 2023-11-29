import { useEffect, useState } from "react";
import ProductCard from "../../pages/Home/Components/ProductCard/ProductCard";
import Button from "../Button/Button";
import "./CartStyles.scss";

function Cart({ onClick, setCart, cart, updateTotals }) {
  function handleIncrease(item) {
    item.quantity++;
    setCart([...cart]); // Ensure that you're creating a new array reference to trigger a re-render
    updateTotals(
      cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
      cart.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0)
    );
  }

  function handleDecrease(item) {
    if (item.quantity > 0) {
      item.quantity--;
      setCart([...cart]); // Ensure that you're creating a new array reference to trigger a re-render
      updateTotals(
        cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
        cart.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0)
      );
    }
  }

  return (
    <section className="cart">
      <h1>Your order:</h1>
      {cart.map((product) => (
        <ProductCard
          key={product.id}
          props={{ ...product }}
          className="cart"
          cartInfo={true}
          increase={() => handleIncrease(product)}
          decrease={() => handleDecrease(product)}
          totalPrice={product.quantity * product.price}
        />
      ))}
      <Button className="secondary" onClick={() => onClick()}>
        Add more
      </Button>
      <Button>Go to Checkout</Button>
    </section>
  );
}

export default Cart;