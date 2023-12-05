import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";

import { getProducts, booleanStates, oneState } from "../../utils/functions";
import Offers from "./Components/Offers/Offers";
import Categories from "./Components/Categories/Categories";
import Search from "./Components/Search/Search";
import CartButton from "./Components/CartButton/CartButton";
import RenderMenu from "./Components/RenderMenu/RenderMenu";

import Cart from "../../components/cart/Cart";
import EditIngredients from "../../components/EditIngredients/EditIngredients";
import PreCheckoutConfirmation from "../../components/PreCheckoutConfirmation/PreCheckoutConfirmation";
import CheckoutConfirmation from "../../components/CheckoutConfirmation/CheckoutConfirmation";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editIngredients, toggleEditIngredients] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [state, setState] = useState(booleanStates())

  useEffect(() => {
    const newTotalQuantity = cart.reduce(
      (sum, item) => sum + (item.quantity || 0),
      0
    );
    const newTotalPrice = cart.reduce(
      (sum, item) => sum + (item.quantity * item.price || 0),
      0
    );

    setTotalQuantity(newTotalQuantity);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const updatedCart = [...cart];
    let foundItemWithoutChanges = false;

    if (existingItemIndex !== -1 && Object.keys(item.changes).length > 0) {
      setCart([...cart, { ...item, quantity: 1 }]);
    } else {
      updatedCart.forEach((cartItem, index) => {
        if (
          cartItem.id === item.id &&
          (!cartItem.changes || Object.keys(cartItem.changes).length === 0)
        ) {
          foundItemWithoutChanges = true;
          updatedCart[index].quantity += 1;
        }
      });

      if (!foundItemWithoutChanges) {
        setCart([...cart, { ...item, quantity: 1 }]);
      } else {
        setCart(updatedCart);
      }
    }
  };

  const handleEditBtnClick = (product) => {
    setSelectedProduct(product);
  };

  const handleToggleEditIngredients = () => {
    toggleEditIngredients(!editIngredients);
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

      <div className="search__icon" onClick={() => oneState(setState, 'isSearching')}>
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
          <RenderMenu
            filteredItems={filteredItems}
            editIngredients={handleEditBtnClick}
            toggleEditIngredients={handleToggleEditIngredients}
          />
          {editIngredients && (
            <EditIngredients
              product={selectedProduct}
              addToCart={addToCart}
              toggleEditIngredients={handleToggleEditIngredients}
            />
          )}
          {state.openCheckout && <CheckoutConfirmation />}
          {state.openPreCheckout && (
            <PreCheckoutConfirmation
              setCart={setCart}
              cart={cart}
              setAppState={setState}
              appState={state}
            />
          )}
          {state.openCart && (
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
        handleOpenCart={() => oneState(setState, 'openCart')}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
    </>
  );
}
export default Home;
