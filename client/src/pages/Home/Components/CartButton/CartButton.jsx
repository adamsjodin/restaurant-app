import Button from "../../../../components/Button/Button";

export default function CartButton({ cart, totalQuantity, totalPrice, handleOpenCart }) {

  if (cart.length > 0) {
    return (
      <Button className="cart" onClick={handleOpenCart}>
        {totalQuantity + " "}Items |{" "}
        {totalPrice.toFixed(2) + " "} kr
      </Button>
    );
  }
}
