

export default function OrderHistoryCard({order}) {
  const convertedDate = new Date(order.TimeStamp * 1000).toString()


  return (
    <section className="order-history__card">
      <img src="/images/pizza_meatOlives.jpg"></img>
      <section className="order-history__card__info-section">
        <p>Ordernr: {order.orderNr}</p>
        <p>Ordered at: {convertedDate.substring(0, 21)}</p>
        <p>Items ordered: {order.products.length} st</p>
        <p>Total price: {order.totalPrice} kr</p>
        <p>Status: {order.status}</p>
      </section>    
  </section>
  )
}
