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

//Getting all orders, next step is to get from only one user. Getting cors-problem when trying to post. 
export function getOrderHistory() {
  return axios
    .get("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/orders/all")
    .then((res) => {
      return res.data
    })
}