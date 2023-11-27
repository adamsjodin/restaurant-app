import { useState } from "react"
import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../../utils/functions";



export default function OrderHistory() {
  const orderQuery = useQuery({
    queryKey: ["order-history"],
    queryFn: getOrderHistory,
  });

  const orderItems = orderQuery?.data?.orders || [];

  if (orderQuery.isLoading) return <h1 style={{ minHeight: "100vh" }}>Orders loading...</h1>;
  if (orderQuery.isError) {
    return <pre>{JSON.stringify(orderQuery.error)}</pre>;
  }

console.log(orderItems)
//Getting all orders right now. Next step is to get the post to work, getting cors-issue.... 
  return (
		<article className="order-history-container">
		Order history for {orderItems.length > 0 ? orderItems[0].userID : "user"}
		{orderItems.length > 0 ? (
			orderItems.map((order) => (
				<p key={order.orderNr}>{order.totalPrice}</p>
			))
		) : (
			<p>No order history available.</p>
		)}
	</article>
  )
}

