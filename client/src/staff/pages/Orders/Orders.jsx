import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../utils/functions";
import OrdersCard from "./OrdersCard";
import "./orders.scss";
import { useState } from "react";

export default function Orders() {
   const [orderStatus, setOrderStatus] = useState("active");
     //Fetching code
  const orderQuery = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const orderItems = orderQuery?.data?.orders || [];

  if (orderQuery.isLoading)
    return (
      <h1 style={{ minHeight: "100vh", padding: "2em" }}>Orders loading...</h1>
    );
  if (orderQuery.isError) {
    return <pre>{JSON.stringify(orderQuery.error)}</pre>;
  }

  //Sorting active/done - can probably be refactored a lot!
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
    activeEl = activeOrders.map((order) => (
      <OrdersCard key={order.orderNr} order={order} />
    ));
    doneEl = doneOrders.map((order) => (
      <OrdersCard key={order.orderNr} order={order} />
    ));
  }
   
   const date = "<- 2023-11-30 ->"
   
   return (
    <article className="orders">

      <h1>{date}</h1>
      <section className="order-history__container">
        <section className="order-history__tabs">
          <p
            onClick={() => setOrderStatus("active")}
            className={orderStatus === "active" ? "active" : ""}
          >
            In progress
          </p>
          <p
            onClick={() => setOrderStatus("done")}
            className={orderStatus === "done" ? "active" : ""}
          >
            History
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
  )
}




