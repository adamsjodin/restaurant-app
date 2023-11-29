import { useEffect, useState } from "react";
import ProductCard from "../../pages/Home/Components/ProductCard/ProductCard";
import Button from "../Button/Button";
import "./CartStyles.scss";

function Cart({ setOpenCart, openCart }) {
  const [storedCartData, setStoredCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [quantities, setQuantities] = useState({});
  const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    const updatedArray = storedCartData.reduce((result, item) => {
      const existingItem = result.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity = quantities[item.id] || 1;
        existingItem.price = existingItem.originalPrice * existingItem.quantity;
      } else {
        result.push({
          ...item,
          quantity: quantities[item.id] || 1,
          originalPrice: item.price,
        });
      }

      return result;
    }, []);

    setNewArray(updatedArray);
  }, [storedCartData, quantities]);

  const handleIncrease = (productId) => {
    console.log("Increasing quantity for product ID:", productId);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));

    setStoredCartData((prevStoredCartData) => {
      const updatedCartData = prevStoredCartData.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
      return updatedCartData;
    });
  };

  const handleDecrease = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));

    const updatedCartData = storedCartData
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 0) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setStoredCartData(updatedCartData);
    localStorage.setItem("cart", JSON.stringify(updatedCartData));
  };

  return (
    <section className="cart">
      <h1>Your order:</h1>
      <section className="cart__products">
        {newArray.map((product) => (
          <ProductCard
            key={product.id}
            props={{ ...product }}
            className="cart"
            cartInfo={true}
            increase={() => handleIncrease(product.id)}
            decrease={() => handleDecrease(product.id)}
          />
        ))}
      </section>
      <section className="cart__actions">
        <Button className="secondary" onClick={() => setOpenCart(!openCart)}>
          Add more
        </Button>
        <Button>Go to Checkout</Button>
      </section>
    </section>
  );
}

export default Cart;
