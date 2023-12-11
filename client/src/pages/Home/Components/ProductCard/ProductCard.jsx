import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Truncate } from "@primer/react";
import { FaInfo } from "react-icons/fa";
import "./ProductCard.scss";

import EditFood from "../../../../staff/pages/FoodMenu/EditFood";
import { Button, ProductInformation } from "../../../../components/exports";

function ProductCard({
  props,
  onClick,
  className,
  toggleEditIngredients,
  cartInfo,
  increase,
  decrease,
  totalPrice,
}) {
  const {
    title,
    description,
    price,
    imgUrl,
    quantity,
    changes,
    message,
    outOfOrder,
    id,
  } = props;
  const dynamicStyle = className ? `product product--${className}` : "product";
  const changesEntries = changes ? Object.entries(changes) : [];
  const [showOutOfOrder, setShowOutOfOrder] = useState(outOfOrder);
  const [showInfo, setShowInfo] = useState(false);
  const [showEditFood, setShowEditFood] = useState(false);
  const cardRef = useRef(null);
  console.log();

  const handleShowEditFood = () => {
    setShowEditFood(!showEditFood);
  };

  const handleCloseEditFood = () => {
    setShowEditFood(false);
  };

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      {showEditFood && (
        <EditFood
          state={setShowOutOfOrder}
          props={props}
          onClose={handleCloseEditFood}
        />
      )}

      {showInfo ? (
        <ProductInformation
          className="productInformation"
          props={props}
          onClick={handleClick}
          showInfo={showInfo}
        />
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
                  <div className="cart-quantity">
                    <Button className="add" onClick={decrease}>
                      -
                    </Button>{" "}
                    <p>Quantity:{" " + quantity}</p>{" "}
                    <Button className="add" onClick={increase}>
                      +
                    </Button>{" "}
                  </div>
                  <div className="cart-changes">
                    {changesEntries.map(([ingredient, changed]) => (
                      <p key={ingredient}>
                        {changed ? "Add" : "Remove"} {ingredient}
                      </p>
                    ))}
                    {message && <p>Message: {message}</p>}
                  </div>
                </div>
              ) : (
                <Truncate inline="true" title={description}>
                  {description}
                </Truncate>
              )}
              {showOutOfOrder && (
                <h4 className="product__outOfOrder">Out of Stock</h4>
              )}
              <section className="product__info--bottom">
                {cartInfo ? (
                  <h3>{totalPrice} kr</h3>
                ) : (
                  <>
                    <h3>{price} kr</h3>
                    {className === "staff" ? (
                      <Button className="add" onClick={handleShowEditFood}>
                        Edit
                      </Button>
                    ) : (
                      !outOfOrder && (
                        <Button
                          className={"add" + (outOfOrder ? " out" : "")}
                          onClick={() => {
                            onClick(props);
                            toggleEditIngredients();
                          }}
                        >
                          Add +
                        </Button>
                      )
                    )}
                  </>
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
