import Nav from "../Menu/Nav";
import "./Topbar.scss"
import { CiSearch } from "react-icons/ci";

function TopBar({ showlogo }) {
    return (
        <section className="topbar">
            <div className="topbar--nav">
                <Nav />
                { showlogo ? <img className="topbar--img" src="logos/claddagh.png" alt="claddagh" /> : null}
                <div className="topbar--search"><CiSearch /></div>
            </div>
        </section>
    );
}

export default TopBar;