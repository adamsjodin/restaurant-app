import Button from "../../../../components/Button/Button";

export default function CartButton({ cart, handleCartBtnClick, totalQuantity, totalPrice }) {
  if (cart.length > 0) {
    return (
      <Button className="cart" onClick={handleCartBtnClick}>
        {totalQuantity + " "}Items |{" "}
        {totalPrice.toFixed(2) + " "} kr
      </Button>
    );
  }
}
