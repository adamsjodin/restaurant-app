import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";

import { getProducts } from "../../utils/functions";
import Offers from "./Components/Offers/Offers";
import Categories from "./Components/Categories/Categories";
import Search from "./Components/Search/Search";
import Cart from "../../components/cart/Cart";
import CartButton from "./Components/CartButton/CartButton";
import RenderMenu from "./Components/RenderMenu/RenderMenu";


function Home() {
  const [isSearching, toggleIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openCart, toggleOpenCart] = useState(false);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const newTotalPrice = cart.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0);

    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
  }, [cart]);
  
  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
  
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    // setCart([])
  };

  const handleSearchIconClick = () => {
    toggleIsSearching(!isSearching);
  };

  const handleCartBtnClick = () => {
    toggleOpenCart(!openCart);
  };

  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: getProducts,
  });

  const menuItems = menuQuery?.data?.menu || [];

  if (menuQuery.isLoading)
    return <h1 style={{ minHeight: "100vh", padding: "2em" }}>Food is coming...</h1>;
  if (menuQuery.isError) {
    return <pre>{JSON.stringify(menuQuery.error)}</pre>;
  }

  const filteredItems = selectedCategory
    ? menuItems.filter((product) => product.categories.includes(selectedCategory))
    : menuItems;


  
  return (
    <>
    { openCart ? <Cart
          openCart={openCart}
          setOpenCart={toggleOpenCart}
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
          {isSearching ? null : (
            <>
              <Offers />
              <Categories setSelectedCategory={setSelectedCategory} />
            </>
          )}

          <div className="search__icon" onClick={handleSearchIconClick}>
            <CiSearch />
          </div>

          {isSearching ? (
            <Search menuItems={menuItems} isSearching={isSearching} actions={addToCart} />
          ) : (
            <>
              <RenderMenu filteredItems={filteredItems} addToCart={addToCart} />
            </>
          )}
          <CartButton cart={cart} handleCartBtnClick={handleCartBtnClick} totalQuantity={totalQuantity} totalPrice={totalPrice} />
        </>
      )}
    </>
  );
}

export default Home;
