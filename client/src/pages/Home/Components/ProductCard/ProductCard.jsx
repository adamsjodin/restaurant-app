import { useRef, useState } from "react";
import { Truncate } from "@primer/react";
import { FaInfo } from "react-icons/fa";
import Button from "../../../../components/Button/Button";
import ProductInformation from "../../../../components/ProductInformation/ProductInformation";
import "./ProductCard.scss";
import { motion } from "framer-motion";

function ProductCard({ props, onClick, className, cartInfo, increase, decrease }) {
  const { title, description, price, imgUrl, quantity } = props;
  const dynamicStyle = className ? `product product--${className}` : "product";

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
        <motion.article className={dynamicStyle} ref={cardRef}>
          <>
            <motion.figure
              className="product__image"
              style={{ backgroundImage: `url(${imgUrl})` }}
            ></motion.figure>
            <motion.section className="product__info">
              <h3>{title}</h3>
              {cartInfo ? (
                <div className="cart-wrapper">
                  <Button className="add" onClick={decrease}>-</Button>{" "}
                  <p>Quantity:{" " + quantity}</p>{" "}
                  <Button className="add" onClick={increase}>+</Button>{" "}
                </div>
              ) : (
                <Truncate inline title={description}>
                  {description}
                </Truncate>
              )}
              <section className="product__info--bottom">
                <h3>{price} kr</h3>
                {cartInfo ? (
                  <></>
                ) : (
                  <Button className="add" onClick={() => onClick(props)}>
                    Add +
                  </Button>
                )}
              </section>
            </motion.section>
            {cartInfo ? <></> : <FaInfo onClick={handleClick} />}
          </>
        </motion.article>
      )}
    </>
  );
}

export default ProductCard;
