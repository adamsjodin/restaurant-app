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

export function getOrderHistory() {
  const userID = JSON.parse(localStorage.getItem("userId"))
  console.log("userID: " + userID)
  return axios.post(
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

export async function handleLogin({ setError, loginObj, state }) {
  await axios.post("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/login", loginObj)
  .then((res) => {
    const data = res.data;
    checkRole({data, setError, state})
  })
  .catch((error) => {
      setError(true)
    console.error("Error login in user: ", error);
  })
}

/*  */

function checkRole({ data, setError, state }) {
  if (data.success) {
      setError(false)
      let userInfo = JSON.parse(data.body)
      if (userInfo.role === "member") {
          console.log(userInfo.role)
          localStorage.setItem("userId", JSON.stringify(userInfo.id))
          localStorage.setItem("userName", JSON.stringify(userInfo.name))
          state(false)
      } else if (userInfo.role === "staff") {
          console.log(userInfo.role)
          console.log("Navigate to staff page")
          state(false)
          //Insert navigate here. 
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

/*  */