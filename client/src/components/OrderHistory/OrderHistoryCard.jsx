import { FaCircle } from "react-icons/fa";


export default function OrderHistoryCard({ order }) {
  const convertedDate = new Date(order.TimeStamp * 1000).toString();

  return (
    <section className="order-history__card">
      <p>{convertedDate.substring(4, 21)}</p>
      <FaCircle className={order.status === 'active' ? 'active' : ""}/>
      <p>{order.products.length} st</p>
      <p>Total: {order.totalPrice.toFixed(2)} kr</p>
    </section>
  );
}
