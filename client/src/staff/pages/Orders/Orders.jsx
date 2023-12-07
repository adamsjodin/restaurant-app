import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../../utils/functions";
import OrdersCard from "./OrdersCard";
import "./orders.scss";
import { useEffect, useState } from "react";

export default function Orders() {
   const [orderStatus, setOrderStatus] = useState("active");
   const [changeStatus, setChangeStatus] = useState(false)
     //Fetching code
  const { data, error, isError, isLoading, refetch} = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  useEffect(() => {
    refetch()
  }, [changeStatus])
  
  const orderItems = data?.orders || [];

  if (isLoading)
    return (
      <h1 style={{ minHeight: "100vh", padding: "2em" }}>Orders loading...</h1>
    );
  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
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
    activeEl = activeOrders.map((order) => (
      <OrdersCard key={order.orderNr} order={order} action={setChangeStatus} state={changeStatus}/>
    ));
    doneEl = doneOrders.map((order) => (
      <OrdersCard key={order.orderNr} order={order} action={setChangeStatus} state={changeStatus}/>
    ));
  }
   
   return (
      <article className="orders">
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




