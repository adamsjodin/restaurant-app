import { FaCircle } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";
import { getUserDetails } from "../../../utils/functions";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export default function OrdersCard({ order, action, state }) {
  const { mutate } = useMutation(updateOrderStatus);

  async function updateOrderStatus() {
    try {
      const { orderNr, userID, status } = order;
      const newStatus = status === 'active' ? 'done' : 'active';
      await axios.put("https://khmfpjooy4.execute-api.eu-north-1.amazonaws.com/api/staff/orders", {
        orderNr,
        userID,
        newStatus,
      });
      mutate();
      action(!state)
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  }

  function checkChanges(changes) {
    let changesEl = "";
    if (!changes || Object.keys(changes).length === 0) {
      changesEl = "";
    } else {
      changesEl = (
        <div>
          {Object.entries(changes).map(([key, value]) => (
            <p className="red" key={key}>
              {value === true ? `Added ${key}` : `Removed ${key}`}
            </p>
          ))}
        </div>
      );
    }
    return changesEl;
  }

  const [showInfo, setShowInfo] = useState(false);
  const [userData, setUserData] = useState("");
  const convertedDate = new Date(order.TimeStamp * 1000).toString();
  const productEl = order.products.map((product, i) => (
    <section key={i}>
      <p>
        {product.quantity}st {product.title}{' '}
      </p>{' '}
      {checkChanges(product.changes)}
      {product.message && <p className="red">{product.message} </p>}
      <hr></hr>
    </section>
  ));

  async function getInfo() {
    try {
      const userData = await getUserDetails(order.userID);
      setUserData(userData);
      setShowInfo(true);
    } catch (error) {
      console.error("Error getting user details: ", error);
    }
  }

  const userEl = (
    <section className="popup popup--staff">
      <IoMdClose onClick={() => setShowInfo(!showInfo)} />
      <h2>User details</h2>
      <p>Name: {userData.name}</p>
      <p>Mail: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
    </section>
  );

  return (
    <section className="order-history__card">
      {showInfo ? userEl : ""}
      <FaCircle className={order.status === "active" ? "active" : ""} />
      <div>
        <p>Order number: {order.orderNr}</p>
        <hr></hr>
        {productEl}
      </div>
      <div>
        <p>{convertedDate.substring(4, 21)}</p>
        <Button
          onClick={() => updateOrderStatus()}
          children={order.status === "active" ? "Done" : "Delivered"}
          className={order.status === "active" ? "add" : "third"}
        ></Button>
      </div>
    </section>
  );
}