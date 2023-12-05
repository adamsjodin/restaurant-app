import axios from 'axios';

/* QUERY FUNCTIONS */

export function wait(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function getProducts() {
  return axios
    .get("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/menu")
    .then((res) => {
      return res.data
    })
}

export async function getAllOrders() {
  return axios.get(
    "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/orders"
  )
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.error("Error fetching order history: ", error);
    })
}

export async function getOrderHistory() {
  const userID = JSON.parse(localStorage.getItem("userId"))
  console.log("userID: " + userID)
  await axios.post(
    "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/history",
    { userID: userID }
  )
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      console.error("Error fetching order history: ", error);
    })
}

export async function handleLogin({ setError, loginObj, setState }) {
  await axios.post("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/login", loginObj)
  .then((res) => {
    const data = res.data;
    checkRole({data, setError, setState})
  })
  .catch((error) => {
      setError(true)
    console.error("Error login in user: ", error);
  })
}


export async function changeOrderStatus(orderInfo) {
  await axios.put("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/orders", orderInfo)
  .then((res) => {
    const data = res.data;
    return data
  })
  .catch((error) => {
    console.error("Error change status: ", error);
  })
}

export async function getUserDetails(userId) {
  try {
    const response = await axios.post(
      "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/userinfo",
      { userID: userId }
    )
    return response.data.body;
  }  
  catch(error) {
      console.error("Error fetching order history: ", error);
    }
}

/*  */

function checkRole({ data, setError, setState }) {
  if (data.success) {
      setError(false)
      let userInfo = JSON.parse(data.body)
      if (userInfo.role === "member") {
          console.log(userInfo.role)
          localStorage.setItem("userId", JSON.stringify(userInfo.id))
          localStorage.setItem("userName", JSON.stringify(userInfo.name))
      } else if (userInfo.role === "staff") {
          console.log(userInfo.role)
          console.log("Navigate to staff page")
          setState((prevState) => {
            return toggleState(prevState, 'staffLogin');
          })
          localStorage.setItem("role", "staff")
          window.location.reload()
      }
  } else {
      setError(true)
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
    checkoutOpen: true
    staffLogin: false,
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
  })
}
export function doubleState(setState, param) {
  setState((prevState) => {
    const nextState = toggleState(prevState, 'openNav');
    return toggleState(nextState, param);
  });
}
export function doubleStateNew(setState, param1, param2) {
  setState((prevState) => {
    const nextState = toggleState(prevState, param1);
    return toggleState(nextState, param2);
  })
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
    height: "4vh"
  },
  open: {
    height: "100vh",
    width: "100%",
    zIndex: "1000000"
  }
}

/*  */
