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
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [openCart, toggleOpenCart] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
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
      {openCart ? (
        <Cart cart={cart} setCart={setCart} setOpenCart={toggleOpenCart} openCart={openCart} />
      ) : (
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

          <CartButton cart={cart} handleCartBtnClick={handleCartBtnClick} />
        </>
      )}
    </>
  );
}

export default Home;
