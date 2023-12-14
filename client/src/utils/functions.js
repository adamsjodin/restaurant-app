import axios from "axios";
import { useEffect, useState } from "react";

/* QUERY FUNCTIONS */

export function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const API_URL = "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api";

export function getProducts() {
  return axios.get(`${API_URL}/menu`).then((res) => res.data);
}

export async function addNewItem(ingredients, item, e) {
  if (ingredients.length > 1) {
    await axios.post(`${API_URL}/menu`, item).catch((err) => console.error(err));
  } else {
    e?.preventDefault();
  }
}

export async function deleteProduct(id) {
  try {
    return (await axios.delete(`${API_URL}/staff/delete`, { data: { id } })).data;
  } catch (error) {
    console.error("Error deleting product: ", error);
    throw error;
  }
}

export async function getAllOrders() {
  try {
    return (await axios.get(`${API_URL}/staff/orders`)).data;
  } catch (error) {
    console.error("Error fetching order history: ", error);
  }
}

export async function getOrderHistory() {
  try {
    const userID = localStorage.getItem("userId");
    return (await axios.post(`${API_URL}/history`, { userID })).data;
  } catch (error) {
    console.error("Error fetching order history: ", error);
    throw error;
  }
}

export async function handleLogin({ setError, loginObj, setState, navigate }) {
  try {
    const data = (await axios.post(`${API_URL}/login`, loginObj)).data;
    checkRole({ data, setError, setState, navigate });
  } catch (error) {
    setError(true);
    console.error("Error logging in user: ", error);
  }
}

export const handleEnterPress = (event, loginFunction) => {
  if (event.keyCode === 13) loginFunction?.(event);
};

export const postOrder = async (setCart) => {
  const order = JSON.parse(localStorage.getItem("cart")) || [];
  const userID = localStorage.getItem("userId") || "guest";
  const orderObj = { userID, status: "active", products: order };

  try {
    await axios.post(`${API_URL}/cart`, orderObj);
    setCart([]);
  } catch (error) {
    console.error("Error posting order: ", error);
  }
};

export async function changeOrderStatus(orderInfo) {
  try {
    return (await axios.put(`${API_URL}/staff/orders`, orderInfo)).data;
  } catch (error) {
    console.error("Error changing order status: ", error);
  }
}

export async function getUserDetails(userId) {
  try {
    return (await axios.post(`${API_URL}/staff/userinfo`, { userID: userId })).data.body;
  } catch (error) {
    console.error("Error fetching user details: ", error);
  }
}

export async function getAllUsers() {
  try {
    return (await axios.get(`${API_URL}/staff/members`)).data;
  } catch (error) {
    console.error("Error getting users: ", error);
  }
}
/* ----- */
/* OTHER FUNCTIONS */

function checkRole({ data, setError, setState, navigate }) {
  if (data.success) {
    setError(false);
    const userInfo = JSON.parse(data.body);
    if (userInfo.role === "member") {
      localStorage.setItem("userId", userInfo.id);
      localStorage.setItem("userName", userInfo.name);
    } else if (userInfo.role === "staff") {
      setState((prevState) => toggleState(prevState, 'staffLogin'));
      localStorage.setItem("role", "staff");
      navigate("/");
    }
    setState((prevState) => toggleState(prevState, 'showLogin'));
    window.location.reload();
  } else {
    setError(true);
  }
}

export function CheckoutTimeline(index) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 100);

    return () => clearInterval(countdownInterval);
  }, []);

  if (index === Math.floor(elapsedTime / 60)) {
    return { borderColor: "rgb(0, 150, 102)" };
  } else if (index < Math.floor(elapsedTime / 60)) {
    return { backgroundColor: "rgb(0, 150, 102)" };
  } else {
    return {};
  }
}
/* ---- */
/* CART FUNCTIONS */

export function handleIncrease(item, cart, setCart, updateTotals) {
  item.quantity++;
  setCart([...cart]);
  updateTotals(
    cart.reduce((sum, item) => sum + (item.quantity || 0), 0),
    cart.reduce((sum, item) => sum + (item.quantity * item.price || 0), 0)
  );
}

export function handleDecrease(item, cart, setCart, updateTotals) {
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
      updatedCart.reduce((sum, cartItem) => sum + (cartItem.quantity || 0), 0),
      updatedCart.reduce(
        (sum, cartItem) => sum + (cartItem.quantity * cartItem.price || 0),
        0
      )
    );
  }
}

export const addToCart = (item, cart, setCart) => {
  const existingItemIndex = cart.findIndex(
    (cartItem) => cartItem.id === item.id
  );
  const updatedCart = [...cart];

  if (existingItemIndex !== -1) {
    const existingItem = updatedCart[existingItemIndex];

    // Handle adding changes
    if (Object.keys(item.changes).length > 0) {
      const changesArray = Object.entries(item.changes).map(
        ([ingredient, changed]) => ({
          ingredient,
          changed,
        })
      );
      existingItem.changes = existingItem.changes.concat(changesArray);
    }

    // Handle removing changes
    const removeChanges = Object.keys(item.changes).filter(
      (ingredient) => !item.changes[ingredient]
    );

    // Build a new changes array from scratch
    const newChangesArray = existingItem.changes
      .filter((change) => !removeChanges.includes(change.ingredient))
      .concat(
        removeChanges.map((ingredient) => ({
          ingredient,
          changed: false,
        }))
      );

    existingItem.changes = newChangesArray;

    existingItem.quantity += 1;
  } else {
    updatedCart.push({
      ...item,
      quantity: 1,
      changes: Object.entries(item.changes).map(([ingredient, changed]) => ({
        ingredient,
        changed,
      })),
    });
  }

  setCart(updatedCart);
}
/* ------- */

/* STATES */
export function booleanStates() {
  return {
    showLogin: false,
    showSignup: false,
    showOrderHistory: false,
    showReservation: false,
    showLogoutConf: false,
    showSettings: false,
    openNav: false,
    isSearching: false,
    openCart: false,
    openPreCheckout: false,
    openCheckout: false,
    checkoutOpen: true,
    staffLogin: false,
    showInfo: false,
    showRemoveConf: false,
  };
}

export function toggleState(prevState, param) {
  if (param in prevState) return { ...prevState, [param]: !prevState[param] };

  let nestedState = { ...prevState };
  let nestedObj = nestedState;

  const keys = param.split(".");
  for (let i = 0; i < keys.length - 1; i++) {
    nestedObj[keys[i]] = nestedObj[keys[i]] || {};
    nestedObj = nestedObj[keys[i]];
  }

  nestedObj[keys[keys.length - 1]] = !nestedObj[keys[keys.length - 1]];
  return nestedState;
}

export function oneState(setState, param) {
  setState((prevState) => {
    return toggleState(prevState, param);
  });
}
export function doubleState(setState, param) {
  setState((prevState) => {
    const nextState = toggleState(prevState, "openNav");
    return toggleState(nextState, param);
  });
}
export function doubleStateNew(setState, param1, param2) {
  setState((prevState) => {
    const nextState = toggleState(prevState, param1);
    return toggleState(nextState, param2);
  });
}
/* ------- */

/* Motion variants */

export const sideBarVariants = {
  open: {
    transform: "translateX(0)",
    opacity: 1,
  },
  closed: {
    transform: "translateX(-100%)",
    opacity: 0,
  },
};

export const overlayVariants = {
  closed: {
    height: "4vh",
    overflow: "hidden",
  },
  open: {
    height: "100vh",
    width: "100%",
    zIndex: "1000000",
    overflow: "unset",
  },
};

export const hoursVariants = {
  open: {
    height: "300px",
    padding: "1rem 2rem",
  },
  closed: {
    height: "0px",
    padding: "0",
  },
  shown: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};