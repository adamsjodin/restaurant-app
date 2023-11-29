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

