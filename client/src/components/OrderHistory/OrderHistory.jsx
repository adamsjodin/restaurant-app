import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../../utils/functions";

const historyData = [
		{
			"totalPrice": 113,
			"TimeStamp": 1700743602,
			"products": [
				{
					"title": "pizza",
					"changes": [
						"-onions"
					],
					"price": 25
				},
				{
					"title": "veggie burger",
					"changes": [],
					"price": 88
				}
			],
			"userID": "Ayb0OFc4VkaRuSa-g3Am2",
			"status": "active",
			"orderNr": "LYCt89oXLNO8VvVKNbhE6"
		},
		{
			"totalPrice": 11.440000000000001,
			"TimeStamp": 1700735158,
			"products": [
				{
					"title": "pizza",
					"changes": [
						"-onions"
					],
					"price": 2.45
				},
				{
					"title": "veggie burger",
					"changes": [],
					"price": 8.99
				}
			],
			"userID": "Ayb0OFc4VkaRuSa-g3Am2",
			"status": "active",
			"orderNr": "CSJO2DoTgf2YhLCQpH1i_"
		},
		{
			"totalPrice": 101,
			"TimeStamp": 1700667373,
			"products": [
				{
					"title": "veggie burger",
					"changes": [
						"-onions",
						"+ham"
					],
					"price": 52
				},
				{
					"title": "veggie burger",
					"changes": [],
					"price": 49
				}
			],
			"userID": "Ayb0OFc4VkaRuSa-g3Am2",
			"status": "active",
			"orderNr": "u_YkgUrURCz4zJjXvxP4n"
		}
	]

export default function OrderHistory() {
  const [user, setUser] = useState("Kicki Lindstrand")
  const orderQuery = useQuery({
    queryKey: ["order-history"],
    queryFn: getOrderHistory,
  });

  const orderItems = orderQuery?.data?.allOrders || [];

  if (orderQuery.isLoading) return <h1 style={{ minHeight: "100vh" }}>Orders loading...</h1>;
  if (orderQuery.isError) {
    return <pre>{JSON.stringify(orderQuery.error)}</pre>;
  }

console.log(orderItems)
//Getting all orders right now. Next step is to get the post to work, getting cors-issue.... 
  return (
    <article className="order-history-container">
      Orderhistory for {user}
     {orderItems.map(order => (
     <p key={order.orderNr}>{order.totalPrice}</p>
     ))}
    </article>
  )
}

