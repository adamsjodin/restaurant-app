import Button from "../Button/Button";
import { FaInfo } from "react-icons/fa";
import "./ProductInformationStyles.scss";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

function ProductInformation({
  props,
  toggleEditIngredients,
  actions,
  showInfo,
  toggleInfo
}) {
  const { title, description, price, imgUrl, outOfOrder, allergens } = props;
  return (
    <motion.article className="product-info">
      <motion.figure
        className="product-info__image"
        style={{ backgroundImage: `url(${imgUrl})` }}
      ></motion.figure>
      <motion.section className="product-info__info">
        <h3>{title}</h3>
        <p>{description}</p>
        <h3>Allergens:</h3>
        <ul className="allergens">
          {allergens.map((allergen, id) => (
            <li key={id}>{allergen}</li>
          ))}
        </ul>

        <Button className="add">Add +</Button>
        <h3 className="product-info__price">{price} kr</h3>
        {outOfOrder && <h4 className="product__outOfOrder">Out of order</h4>}
      </motion.section>
      {showInfo ? (
        <IoMdClose onClick={toggleInfo} />
      ) : (
        <FaInfo onClick={toggleInfo} />
      )}
      
      <Button
        className="add"
        onClick={() => {
          actions(props);
          toggleEditIngredients();
          toggleInfo();
        }}
      >
        Add +
      </Button>
      <h3 className="product-info__price">{price} kr</h3>
    </motion.article>
  );
}

export default ProductInformation;
