import { useEffect, useState } from "react";
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
  const [state, setState] = useState({
    isSearching: false,
    openCart: false,
    selectedCategory: null,
    totalQuantity: 0,
    totalPrice: 0,
  });

  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const newTotalQuantity = cart.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    const newTotalPrice = cart.reduce(
      (sum, item) => sum + (item.quantity * item.price || 0),
      0
    );

    setState((prev) => ({
      ...prev,
      totalQuantity: newTotalQuantity,
      totalPrice: newTotalPrice,
    }));
  }, [cart]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    // setCart([])
  };

  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: getProducts,
  });

  const menuItems = menuQuery?.data?.menu || [];

  if (menuQuery.isLoading)
    return (
      <h1 style={{ minHeight: "100vh", padding: "2em" }}>Food is coming...</h1>
    );
  if (menuQuery.isError) {
    return <pre>{JSON.stringify(menuQuery.error)}</pre>;
  }

  const filteredItems = state.selectedCategory
    ? menuItems.filter((product) =>
        product.categories.includes(state.selectedCategory)
      )
    : menuItems;

  return (
    <>
      {state.openCart ? (
        <Cart
          openCart={state.openCart}
          setOpenCart={() =>
            setState((prev) => ({ ...prev, openCart: !state.openCart }))
          }
          setCart={setCart}
          cart={cart}
          updateTotals={(newTotalQuantity, newTotalPrice) =>
            setState((prev) => ({
              ...prev,
              totalQuantity: newTotalQuantity,
              totalPrice: newTotalPrice,
            }))
          }
        />
      ) : (
        <>
          {state.isSearching ? null : (
            <>
              <Offers />
              <Categories
                setSelectedCategory={(category) =>
                  setState((prev) => ({ ...prev, selectedCategory: category }))
                }
              />
            </>
          )}

          <div className="search__icon" onClick={() => setState((prev) => ({ ...prev, isSearching: !state.isSearching }))}>
            <CiSearch />
          </div>

          {state.isSearching ? (
            <Search
              menuItems={menuItems}
              isSearching={state.isSearching}
              actions={addToCart}
            />
          ) : (
            <>
              <RenderMenu filteredItems={filteredItems} addToCart={addToCart} />
            </>
          )}
          {state.totalQuantity > 0 ? (
            <CartButton
              cart={cart}
              handleCartBtnClick={() =>
                setState((prev) => ({ ...prev, openCart: !state.openCart }))
              }
              totalQuantity={state.totalQuantity}
              totalPrice={state.totalPrice}
            />
          ) : null}
        </>
      )}
    </>
  );
}

export default Home;
