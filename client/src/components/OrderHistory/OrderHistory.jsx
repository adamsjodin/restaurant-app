import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../../utils/functions";
import OrderHistoryCard from "./OrderHistoryCard";
import "./order-history.scss";
import { useState } from "react";
import { MdClose } from 'react-icons/md';


export default function OrderHistory({action}) {
  const [orderStatus, setOrderStatus] = useState("active");

  //Fetching code
  const orderQuery = useQuery({
    queryKey: ["order-history"],
    queryFn: getOrderHistory,
  });

  const orderItems = orderQuery?.data?.orders || [];
  

  if (orderQuery.isLoading)
    return (
      <h1 style={{ minHeight: "100vh", padding: "2em" }}>Orders loading...</h1>
    );
  if (orderQuery.isError) {
    return <pre>{JSON.stringify(orderQuery.error)}</pre>;
  }


  const activeOrders = [];
  const doneOrders = [];
  let activeEl = "";
  let doneEl = "";
  function checkActive() {
    orderItems.length > 0 &&
      orderItems.map((order) =>
        order.status === "active"
          ? activeOrders.push(order)
          : doneOrders.push(order)
      );
      const sortedActiveOrders = activeOrders.sort((b, a) => a.TimeStamp - b.TimeStamp)
      activeEl = sortedActiveOrders.map((order) => (
        <OrderHistoryCard key={order.orderNr} order={order} />
      ));
      const sortedDoneOrders = doneOrders.sort((a, b) => b.TimeStamp - a.TimeStamp)
      doneEl = sortedDoneOrders.map((order) => (
        <OrderHistoryCard key={order.orderNr} order={order} />
    ));
  }

  return (
    <>
      <article className="order-history">
      <MdClose onClick={() => action(false)} />
        <h1>My orders</h1>
        <section className="order-history__container">
          <section className="order-history__tabs">
            <p
              onClick={() => setOrderStatus("active")}
              className={orderStatus === "active" ? "active" : ""}
            >
              Active
            </p>
            <p
              onClick={() => setOrderStatus("done")}
              className={orderStatus === "done" ? "active" : ""}
            >
              Previous
            </p>
          </section>
          {orderItems.length > 0 ? (
            checkActive(orderItems)
          ) : (
            <p>No order history available.</p>
          )}
          <section className="order-history__orders">
            {orderStatus === "active" ? activeEl : doneEl}
          </section>
        </section>
      </article>
    </>
  );
}
