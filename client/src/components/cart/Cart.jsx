import { useEffect, useState } from "react";
import ProductCard from "../../pages/Home/Components/ProductCard/ProductCard";
import Button from "../Button/Button";
import "./CartStyles.scss";

function Cart({ onClick, setOpenCart, openCart }) {
  const [storedCartData, setStoredCartData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [quantities, setQuantities] = useState({});
  const [newArray, setNewArray] = useState([]);
  
  useEffect(() => {
    console.log("useEffect is running with quantities:", quantities);
    const updatedArray = storedCartData.reduce((result, item) => {
      const existingItemIndex = result.findIndex((i) => i.id === item.id);

      if (existingItemIndex !== -1) {
        result[existingItemIndex].quantity += 1;
        result[existingItemIndex].price =
          result[existingItemIndex].originalPrice *
          result[existingItemIndex].quantity;
      } else {
        result.push({ ...item, quantity: 1, originalPrice: item.price });
      }

      return result;
    }, []);

    setNewArray(updatedArray);
    console.log(newArray);
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
          ? { ...item, quantity: (item.quantity || 0) + 1 }
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
  
    setStoredCartData((prevStoredCartData) => {
      const updatedCartData = prevStoredCartData.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 0) }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCartData));
      return updatedCartData;
    });
  };


  return (
    <section className="cart">
      <h1>Your order:</h1>
      {newArray.map((product) => (
        <ProductCard key={product.id} props={{ ...product }} className="cart" cartInfo={true} increase={() => handleIncrease(product.id)} decrease={() => handleDecrease(product.id)}/>
      ))}
      <Button className="secondary" onClick={() => setOpenCart(!openCart)}>
        Add more
      </Button>
      <Button>Go to Checkout</Button>
    </section>
  );
}

export default Cart;
