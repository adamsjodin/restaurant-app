import Nav from "../Menu/Nav";
import "./Topbar.scss"
import { CiSearch } from "react-icons/ci";

function TopBar() {
    return (
        <section className="topbar">
            <div className="topbar--nav">
                <Nav />
                <img className="topbar--img" src="logos/claddagh.png" alt="claddagh" />
                <div className="topbar--search"><CiSearch /></div>
            </div>
        </section>
    );
}

export default TopBar;