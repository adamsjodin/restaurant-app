import Button from "../Button/Button";
import { FaInfo } from "react-icons/fa";
import "./ProductInformationStyles.scss";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

function ProductInformation({ props, onClick }) {
  return (
    <motion.article 
    className="product-info">
      <figure
        className="product-info__image"
        style={{ backgroundImage: `url(${props.imgUrl})` }}
      ></figure>
      <section className="product-info__info">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <h3>Allergens:</h3>
        <ul>
          {props.ingredients.map((ingredient, id) => (
            <li key={id}>{ingredient}</li>
          ))}
        </ul>
        <Button className="add">Add +</Button>
        <h3 className="product-info__price">{props.price} kr</h3>
      </section>
      {/* {showInfo ? <IoMdClose onClick={handleClick}/> : <FaInfo onClick={handleClick} />} */}

      <IoMdClose className="info-btn" onClick={onClick} />
    </motion.article>
  );
}

export default ProductInformation;
