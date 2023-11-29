import Button from "../../../../components/Button/Button";

export default function CartButton({ cart, handleCartBtnClick }) {
  if (cart.length > 0) {
    return (
      <Button className="cart" onClick={handleCartBtnClick}>
        {cart.length + " "}Items |{" "}
        {cart.reduce((acc, item) => acc + item.price, 0).toFixed(2) + " "} kr
      </Button>
    );
  }
}
