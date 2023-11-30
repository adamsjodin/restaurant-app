import { FaCircle } from "react-icons/fa";
import Button from "../../../components/Button/Button";


export default function OrdersCard({ order }) {
  const convertedDate = new Date(order.TimeStamp * 1000).toString();
  const productEl = order.products.map((product, i) => {
    return <div key={i}><h2>{product.title}, {product.quantity}</h2> <h2>Notes:</h2>{product.changes.map((change, i) => {return <p key={i}>{change}</p>})}</div>
  })
  return (
    <section className="order-history__card">
      <FaCircle className={order.status === 'active' ? 'active' : ""}/>
      <p>Order number: {order.orderNr}</p>
      {productEl}
      <p>{convertedDate.substring(4, 21)}</p>
      
    <Button children={"Done"} className={"add"}></Button>
    </section>
  );
}
