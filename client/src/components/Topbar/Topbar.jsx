import { useState } from "react";
import Nav from "../Menu/Nav";
import "./Topbar.scss"
import { booleanStates, oneState } from "../../utils/functions";
import OrderHistory from "../OrderHistory/OrderHistory";

function TopBar({ showlogo }) {
    const usNa = localStorage.getItem("userName") || null;

    const [state, setState] = useState(booleanStates());

    return (
        <>
            <section className="topbar">
                <div className="topbar--nav">
                    <Nav />
                    {usNa !== null && (
                        <h4 className="topbar--userName" onClick={() => oneState(setState, "showOrderHistory")}>
                            {usNa}
                        </h4>
                    )}
                    {showlogo ? <img className="topbar--img" src="logos/claddagh.png" alt="claddagh" /> : null}
                </div>
            </section>
            {state.showOrderHistory && (
                <OrderHistory action={() => oneState(setState, 'showOrderHistory')} />
            )}
        </>
    );
}

export default TopBar;