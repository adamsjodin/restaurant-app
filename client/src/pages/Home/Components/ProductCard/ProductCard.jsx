import { Truncate } from "@primer/react";
import Button from "../../../../components/Button/Button";
import "./ProductCard.scss";
import { FaInfo } from "react-icons/fa";
import ProductInformation from "../../../../components/ProductInformation/ProductInformation";
import { useState } from "react";

function ProductCard({ props }) {
  const { title, description, price, imgUrl } = props;

  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <article className="product">
      {!showInfo && (
        <>
          <figure
            className="product__image"
            style={{ backgroundImage: `url(${imgUrl})` }}
          ></figure>
          <section className="product__info">
            <h3>{title}</h3>
            <Truncate inline title={description}>
              {description}
            </Truncate>
            <section className="product__info--bottom">
              <h3>{price} kr</h3>
              <Button className="add">Add +</Button>
            </section>
          </section>
          <FaInfo onClick={handleClick} />
        </>
      )}

      {showInfo && <ProductInformation props={props} onClick={handleClick} />}
    </article>
  );
}

export default ProductCard;
