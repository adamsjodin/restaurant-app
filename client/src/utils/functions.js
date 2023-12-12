import axios from "axios";
import { useEffect, useState } from "react";

/* QUERY FUNCTIONS */

export function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function getProducts() {
  return axios
    .get("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu")
    .then((res) => {
      return res.data;
    });
}

export async function addNewItem(ingredients, item, e) {
  if (ingredients.length > 1) {
    await axios
      .post(
        "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu",
        item
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });} else {
        e.preventDefault()
      }
  };

export async function deleteProduct(id) {
  try {
    const response = await axios.delete("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/delete", {
      data: { id: id } 
    });
    return response.data;
  } catch (error) {
    console.error("Error, product not deleted: ", error);
    throw error;
  }
}

export async function getAllOrders() {
  return axios
    .get(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/orders"
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error fetching order history: ", error);
    });
}

export async function getOrderHistory() {
  try {
    const userID = localStorage.getItem("userId")
    const response = await axios.post(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/history",
      { userID: userID }
    )
      return response.data
    } catch (error) {
      console.error("Error fetching order history: ", error);
      throw error
    }
}

export async function handleLogin({ setError, loginObj, setState }) {
  await axios
    .post(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/login",
      loginObj
    )
    .then((res) => {
      const data = res.data;
      checkRole({ data, setError, setState });
    })
    .catch((error) => {
      setError(true);
      console.error("Error login in user: ", error);
    });
}

export const postOrder = async (setCart) => {
  const order = JSON.parse(localStorage.getItem("cart")) || [];
  const userID = localStorage.getItem("userId");
  const orderObj = {
    userID: userID ? userID : "guest",
    status: "active",
    products: order,
  };
  console.log(orderObj);
  await axios
    .post(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/cart",
      orderObj
    )
    .then((res) => {
      console.log(res.data);
      setCart([]);
    })

    .catch((err) => {
      console.error(err);
    });
};

export async function changeOrderStatus(orderInfo) {
  await axios
    .put(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/orders",
      orderInfo
    )
    .then((res) => {
      const data = res.data;
      return data;
    })
    .catch((error) => {
      console.error("Error change status: ", error);
    });
}

export async function getUserDetails(userId) {
  try {
    const response = await axios.post(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/userinfo",
      { userID: userId }
    );
    return response.data.body;
  } catch (error) {
    console.error("Error fetching order history: ", error);
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/members")
    return response.data
  } catch (error) {
    console.error("Error in getting users")
  }
}

/*  */

function checkRole({ data, setError, setState }) {
  if (data.success) {
      setError(false)
      let userInfo = JSON.parse(data.body)
      if (userInfo.role === "member") {
          localStorage.setItem("userId", userInfo.id)
          localStorage.setItem("userName", userInfo.name)
      } else if (userInfo.role === "staff") {
          setState((prevState) => {
            return toggleState(prevState, 'staffLogin');
          })
          localStorage.setItem("role", "staff")
          window.location.reload()
      }
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
    showInfo: false
  };
}

export function toggleState(prevState, param) {
  if (param in prevState) {
    return { ...prevState, [param]: !prevState[param] };
  }

  let nestedState = { ...prevState };
  let nestedObj = nestedState;

  const keys = param.split(".");
  for (let i = 0; i < keys.length - 1; i++) {
    if (!nestedObj[keys[i]]) {
      nestedObj[keys[i]] = {};
    }
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

/*  */

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
  },
  open: {
    height: "100vh",
    width: "100%",
    zIndex: "1000000",
  },
};

/*  */
