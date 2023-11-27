import { useRef, useState } from "react";
import { Truncate } from "@primer/react";
import { FaInfo } from "react-icons/fa";
import Button from "../../../../components/Button/Button";
import ProductInformation from "../../../../components/ProductInformation/ProductInformation";
import "./ProductCard.scss";
import { motion } from "framer-motion";

function ProductCard({ props }) {
  const { title, description, price, imgUrl } = props;

  const [showInfo, setShowInfo] = useState(false);
  const cardRef = useRef(null);
  

  const handleClick = () => {
      setShowInfo(!showInfo);
  };

  return (
    <>
      { showInfo ? (
        <ProductInformation className="productInformation" props={props} onClick={handleClick} showInfo={showInfo} />
      ) : (
    <motion.article className="product" ref={cardRef}>
        <>
          <motion.figure
            className="product__image"
            style={{ backgroundImage: `url(${imgUrl})` }}
          ></motion.figure>
          <motion.section 

          className="product__info">
            <h3>{title}</h3>
            <Truncate inline title={description}>
              {description}
            </Truncate>
            <section className="product__info--bottom">
              <h3>{price} kr</h3>
              <Button className="add">Add +</Button>
            </section>
          </motion.section>
        <FaInfo onClick={handleClick}/>
        </>
      </motion.article>
      )}
  </>);
}

export default ProductCard;
