import Button from "../Button/Button";
import { FaInfo } from "react-icons/fa";
import "./ProductInformationStyles.scss";

function ProductInformation({ props, onClick }) {
  return (
    <article className="product-info">
      <figure
        className="product__image"
        style={{ backgroundImage: `url(${props.imgUrl})` }}
      ></figure>
      <section className="product__info">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <h3>Allergens:</h3>
        <ul>
          {props.ingredients.map((ingredient, id) => (
            <li key={id}>{ingredient}</li>
          ))}
        </ul>
        <Button className="add">Add +</Button>
      </section>
      <FaInfo className="info-btn" onClick={onClick} />
    </article>
  );
}

export default ProductInformation;
