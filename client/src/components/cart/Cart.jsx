import ProductCard from "../../pages/Home/Components/ProductCard/ProductCard";
import { oneState, doubleStateNew } from "../../utils/functions";
import Button from "../Button/Button";
import "./CartStyles.scss";

function Cart({ setCart, cart, updateTotals, setAppState }) {

  function handleIncrease(item) {
    item.quantity++;
    setCart([...cart]);
    updateTotals(
      cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
      cart.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0)
    );
  }

  function handleDecrease(item) {
    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (itemIndex !== -1) {
      const updatedItem = {
        ...updatedCart[itemIndex],
        quantity: Math.max(0, updatedCart[itemIndex].quantity - 1),
      };

      if (updatedItem.quantity === 0) {
        updatedCart.splice(itemIndex, 1);
      } else {
        updatedCart[itemIndex] = updatedItem;
      }

      setCart(updatedCart);
      updateTotals(
        updatedCart.reduce(
          (sum, cartItem) => sum + (cartItem.quantity || 0),
          0
        ),
        updatedCart.reduce(
          (sum, cartItem) => sum + (cartItem.quantity * cartItem.price || 0),
          0
        )
      );
    }
  }

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
            increase={() => handleIncrease(product)}
            decrease={() => handleDecrease(product)}
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
          Go to Checkout
        </Button>
      </section>
    </section>
  );
}

export default Cart;
