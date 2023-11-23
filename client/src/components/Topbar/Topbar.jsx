import Nav from "../Menu/Nav";
import "./Topbar.scss"

function TopBar({ showlogo }) {
    return (
        <section className="topbar">
            <div className="topbar--nav">
                <Nav />
                { showlogo ? <img className="topbar--img" src="logos/claddagh.png" alt="claddagh" /> : null}
            </div>
        </section>
    );
}

export default TopBar;