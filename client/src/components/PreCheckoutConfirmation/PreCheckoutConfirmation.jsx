import Button from "../Button/Button";
import "./PreCheckoutConfirmationStyles.scss";

let orderItems =[{
    "id": 1,
    "title": "Classic burger",
    "price": 8.99,
    "quantity": 2
  },
  {
    "id": 2,
    "title": "Pizza Margerita",
    "price": 6.99,
    "quantity": 1
  }
  ,
  {
    "id": 3,
    "title": "Ceasar sallad",
    "price": 13.99,
    "quantity": 1
  }
  ]

function PreCheckoutConfirmation({props}) {
    return ( 
        <article className="pre-checkout">
            <h2>Your order</h2>
            {orderItems.map((item) => (
            <section className="pre-checkout__items" key={item.id}>
                <p>{item.quantity}</p>
                <p>{item.title}</p>
                <p>{item.price}</p>
            </section>
        ))}
        <Button>Looks good</Button>
        <Button className="button--secondary">Edit my order [countdown]</Button>
        </article>
     );
}

export default PreCheckoutConfirmation;