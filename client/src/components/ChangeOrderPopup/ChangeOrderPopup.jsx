import Button from "../Button/Button";
import "./ChangeOrderPopupStyles.scss";

function ChangeOrderPopup() {
    return ( 
        <section className="change-order">
        <h2>Your order was paused!</h2>
        <p>You need to confirm your order again</p>
        <Button>Okay-got it!</Button>
        </section>
     );
}

export default ChangeOrderPopup;