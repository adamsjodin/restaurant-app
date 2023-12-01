import { FaCircle } from "react-icons/fa";
import Button from "../../../components/Button/Button";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { FaInfo } from "react-icons/fa";


export default function OrdersCard({ order }) {
  const [showInfo, setShowInfo] = useState(false)
  const convertedDate = new Date(order.TimeStamp * 1000).toString();
  const productEl = order.products.map((product, i) => {
    return <section key={i}><p>{product.quantity}st {product.title} </p> <p>Notes:</p>{product.changes.map((change, i) => {return <p key={i}>{change}</p>})}<hr></hr></section>
  })
  return (
    <section className="order-history__card">
      <div><FaCircle className={order.status === 'active' ? 'active' : ""}/></div>
      <div>
        <p>Order number: {order.orderNr}</p>
        <hr></hr>
        {productEl}
      </div>
      <div>
        <p>{convertedDate.substring(4, 21)}</p>
        <Button children={"Done"} className={"add"}></Button>
      </div>
      {showInfo ? <IoMdClose /> : <FaInfo />}
    </section>
  );
}
