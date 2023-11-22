import { Truncate } from "@primer/react";
import Button from "../../../../components/Button/Button";
import "./ProductCard.scss";
import { FaInfo } from "react-icons/fa";
import ProductInformation from "../../../../components/ProductInformation/ProductInformation";
import { useEffect, useRef, useState } from "react";
import anime from 'animejs/lib/anime.es.js';

function ProductCard({ props }) {
  const { title, description, price, imgUrl } = props;

  const [showInfo, setShowInfo] = useState(false);
  const cardRef = useRef(null);
  

  const handleClick = () => {
    
      setShowInfo(!showInfo);
    
  };

  
  return (
    <>
      {!showInfo && (
    <article className="product" ref={cardRef}>
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
      </article>
      )}
      {showInfo && <ProductInformation className="productInformation" props={props} onClick={handleClick} />}

  </>);
}

export default ProductCard;
