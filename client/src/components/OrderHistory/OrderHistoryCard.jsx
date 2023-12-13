import { FaCircle } from "react-icons/fa";


export default function OrderHistoryCard({ order }) {
  const products = order.products
  const orderItemsEl = products.map((product, i) => {
    return (<p key={i}>{product.title}, {product.quantity} st</p>)
  })
  const convertedDate = new Date(order.TimeStamp * 1000).toString();
  return (
    <section className="order-history__card">
      <p>{convertedDate.substring(4, 21)}</p>
      <FaCircle className={order.status === 'active' ? 'active' : ""}/>
     <div>{orderItemsEl}</div>
      <p>Total: {order.totalPrice.toFixed(0)} kr</p>
    </section>
  );
}
