import axios from 'axios';

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
  await axios.post(
    "https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/userinfo",
    { userID: userId }
  )
    .then((res) => {
      console.log(res.data.body)
      return res.data.body})
    .catch((error) => {
      console.error("Error fetching order history: ", error);
    })
}
