import { useState, useEffect } from "react";
import Nav from "../Menu/Nav";
import "./Topbar.scss"
import { booleanStates, doubleState, oneState } from "../../utils/functions";
import OrderHistory from "../OrderHistory/OrderHistory";

function TopBar({ showlogo }) {

    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState(null);
    const [state, setState] = useState(booleanStates());

    useEffect(() => {
        const usId = localStorage.getItem("userId");
        const usNa = localStorage.getItem("userName");
        if (usId && usNa) {
            setUserId(usId);
            setUserName(usNa);
        } else {
            setUserId(null);
            setUserName(null);
        }
    }, [state]);

    return (
        <>
            <section className="topbar">
                <div className="topbar--nav">
                    <Nav />
                    {userName && (
                        <h4 onClick={() => doubleState(setState, "showOrderHistory")}>
                            {userName}
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