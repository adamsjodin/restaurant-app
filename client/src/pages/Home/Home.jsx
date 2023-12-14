import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";

import { getProducts, booleanStates, oneState, addToCart } from "../../utils/functions";
import {
  CartButton,
  Categories,
  Offers,
  RenderMenu,
  Search,
} from "./Components/HomeExports";
import {
  Cart,
  EditIngredients,
  PreCheckoutConfirmation,
  CheckoutConfirmation,
} from "../../components/exports";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editIngredients, toggleEditIngredients] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [state, setState] = useState(booleanStates());
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  )

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    const newTotalQuantity = cart.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    )
    const newTotalPrice = cart.reduce(
      (sum, item) => sum + (item.quantity * item.price || 0),
      0
    )

    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const handleCart = (item) => {
    addToCart(item, cart, setCart);
  }

  const handleEditBtnClick = (product) => {
    setSelectedProduct(product);
  }

  const handleToggleEditIngredients = () => {
    toggleEditIngredients(!editIngredients);
  }

  const menuQuery = useQuery({
    queryKey: ["menu"],
    queryFn: getProducts,
  })

  const menuItems = menuQuery?.data?.menu || [];

  if (menuQuery.isLoading)
    return (
      <h1 style={{ minHeight: "100vh", padding: "2em" }}>Food is coming...</h1>
    );
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
      {state.isSearching ? null : (
        <>
          <Offers />
          <Categories setSelectedCategory={setSelectedCategory} />
        </>
      )}

      <div
        className="search__icon"
        onClick={() => oneState(setState, "isSearching")}
      >
        <CiSearch />
      </div>

      {state.isSearching && !state.openCart ? (
        <>
        <Search
          menuItems={menuItems}
          isSearching={state.isSearching}
          editIngredients={handleEditBtnClick}
          toggleEditIngredients={handleToggleEditIngredients}
        />
        {editIngredients && (
            <EditIngredients
              product={selectedProduct}
              addToCart={handleCart}
              toggleEditIngredients={handleToggleEditIngredients}
            />
          )}
          </>
      ) : (
        <>
          
          <RenderMenu
            filteredItems={filteredItems}
            editIngredients={handleEditBtnClick}
            toggleEditIngredients={handleToggleEditIngredients}
          />
          
          {editIngredients && (
            <EditIngredients
              product={selectedProduct}
              addToCart={handleCart}
              toggleEditIngredients={handleToggleEditIngredients}
            />
          )}
          {state.openCheckout && (
            <CheckoutConfirmation setAppState={setState} appState={state} />
          )}
          {state.openPreCheckout && (
            <PreCheckoutConfirmation
              setCart={setCart}
              cart={cart}
              setAppState={setState}
              appState={state}
            />
          )}
          {state.openCart && cart.length > 0 && (
            <Cart
              setCart={setCart}
              cart={cart}
              setAppState={setState}
              updateTotals={(newTotalQuantity, newTotalPrice) => {
                setTotalQuantity(newTotalQuantity);
                setTotalPrice(newTotalPrice);
              }}
            />
          )}
        </>
      )}
      <CartButton
        cart={cart}
        handleOpenCart={() => oneState(setState, "openCart")}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
    </>
  );
}
export default Home;
