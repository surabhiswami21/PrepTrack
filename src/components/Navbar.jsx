import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav className="navbar">

            <h2>PrepTrack 🚀</h2>

            <div className="nav-links">

                <Link to="/">Dashboard</Link>

                <Link to="/companies">Companies</Link>

                <Link to="/interviews">Interview</Link>

                <Link to="/coding">Coding</Link>

                <Link to="/bookmarks">Bookmarks</Link>

            </div>

        </nav>

    );
}

export default Navbar;