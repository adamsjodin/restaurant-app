import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../utils/functions";
import { CiSearch } from "react-icons/ci";
import ProductCard from "./Components/ProductCard/ProductCard";
import Offers from "./Components/Offers/Offers";
import Categories from "./Components/Categories/Categories";
import Search from "./Components/Search/Search";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Button from "../../components/Button/Button";
import Cart from "../../components/cart/Cart";


function Home() {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [openCart, setOpenCart] = useState(false);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Update totalQuantity and totalPrice when cart changes
    const newTotalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const newTotalPrice = cart.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0);

    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
  }, [cart]);
  
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
  
    if (existingItemIndex !== -1) {
      // If the item already exists, update the quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the item doesn't exist, add it to the cart
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    // setCart([])
  };

  const handleSearchIconClick = () => {
    setIsSearching(!isSearching);
  };

  const handleCartBtnClick = () => {
    setOpenCart(!openCart);
  };
  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: getProducts,
  });

  const menuItems = menuQuery?.data?.menu || [];

  if (menuQuery.isLoading)
    return <h1 style={{ minHeight: "100vh" }}>Food is coming...</h1>;
  if (menuQuery.isError) {
    return <pre>{JSON.stringify(menuQuery.error)}</pre>;
  }

  const filteredItems = selectedCategory
    ? menuItems.filter((product) =>
        product.categories.includes(selectedCategory)
      )
    : menuItems;


  
  return (
    <>
    { openCart ? <Cart
          onClick={setOpenCart}
          setCart={setCart}
          cart={cart}
          updateTotals={(newTotalQuantity, newTotalPrice) => {
            setTotalQuantity(newTotalQuantity);
            setTotalPrice(newTotalPrice);
          }}
        /> : (
      <>
      {isSearching
       ? null : (
        <>
          <Offers />
          <Categories setSelectedCategory={setSelectedCategory} />
        </>
      )}

      <div className="search__icon" onClick={handleSearchIconClick}>
        <CiSearch />
      </div>

      {isSearching ? (
        <Search menuItems={menuItems} isSearching={isSearching} />
      ) : (
        <section className="menu">
          <h3 className="menu__title">Products</h3>
          <ul className="menu__list">
            {filteredItems.map((product) => (
              <ProductCard
                key={product.id}
                props={product}
                onClick={addToCart}
              />
            ))}
          </ul>
        </section>
      )}

      {cart.length > 0 && (
        <Button className="cart" onClick={handleCartBtnClick}>
          {totalQuantity + " "}Items ||{" "}
          {totalPrice + " "}SEK
        </Button>
      )}
      </>
    )}
      <ReactQueryDevtools />
    </>
  );
}

export default Home;