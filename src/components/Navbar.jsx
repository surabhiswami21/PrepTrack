import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { logoutUser } from "../services/authService";

function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    // ================================
    // LOGOUT
    // ================================

    const handleLogout = () => {

        logoutUser();

        closeMenu();

        navigate("/login");
    };

    return (
        <>

            {/* Mobile menu button */}
            <button
                className="mobile-menu-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
            >
                {isOpen ? "×" : "☰"}
            </button>


            {/* Sidebar */}
            <aside
                className={`sidebar ${
                    isOpen ? "sidebar-open" : ""
                }`}
            >

                {/* ========================= */}
                {/* BRAND */}
                {/* ========================= */}

                <Link
                    to="/"
                    className="brand"
                    onClick={closeMenu}
                >

                    <span className="brand-mark">
                        P
                    </span>

                    <span>
                        PrepTrack
                    </span>

                </Link>


                {/* ========================= */}
                {/* PROFILE */}
                {/* ========================= */}

                <div className="sidebar-profile">

                    <div className="profile-avatar">
                        S
                    </div>

                    <div>

                        <strong>
                            Study workspace
                        </strong>

                        <span>
                            Placement season 2026
                        </span>

                    </div>

                </div>


                {/* ========================= */}
                {/* NAVIGATION */}
                {/* ========================= */}

                <nav
                    className="sidebar-nav"
                    aria-label="Main navigation"
                >

                    {/* Workspace */}

                    <p className="nav-label">
                        Workspace
                    </p>

                    <Link
                        className={
                            isActive("/")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/"
                        onClick={closeMenu}
                    >
                        <span>⌂</span>
                        Dashboard
                    </Link>


                    <Link
                        className={
                            isActive("/stats")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/stats"
                        onClick={closeMenu}
                    >
                        <span>◒</span>
                        Statistics
                    </Link>


                    <Link
                        className={
                            isActive("/planner")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/planner"
                        onClick={closeMenu}
                    >
                        <span>◷</span>
                        Daily planner
                    </Link>


                    {/* Preparation */}

                    <p className="nav-label">
                        Preparation
                    </p>


                    <Link
                        className={
                            isActive("/coding")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/coding"
                        onClick={closeMenu}
                    >
                        <span>&lt;/&gt;</span>
                        Coding hub
                    </Link>


                    <Link
                        className={
                            isActive("/aptitude")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/aptitude"
                        onClick={closeMenu}
                    >
                        <span>∑</span>
                        Aptitude
                    </Link>


                    <Link
                        className={
                            isActive("/interviews")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/interviews"
                        onClick={closeMenu}
                    >
                        <span>◉</span>
                        Interview hub
                    </Link>


                    <Link
                        className={
                            isActive("/hr")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/hr"
                        onClick={closeMenu}
                    >
                        <span>✦</span>
                        HR hub
                    </Link>


                    <Link
                        className={
                            isActive("/resume-prep")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/resume-prep"
                        onClick={closeMenu}
                    >
                        <span>▤</span>
                        Resume prep
                    </Link>


                    {/* Career tools */}

                    <p className="nav-label">
                        Career tools
                    </p>


                    <Link
                        className={
                            isActive("/companies")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/companies"
                        onClick={closeMenu}
                    >
                        <span>▦</span>
                        Companies
                    </Link>


                    <Link
                        className={
                            isActive("/jobs")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/jobs"
                        onClick={closeMenu}
                    >
                        <span>▣</span>
                        Job tracker
                    </Link>


                    <Link
                        className={
                            isActive("/roadmap")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/roadmap"
                        onClick={closeMenu}
                    >
                        <span>⌁</span>
                        Roadmap
                    </Link>


                    <Link
                        className={
                            isActive("/eligibility")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/eligibility"
                        onClick={closeMenu}
                    >
                        <span>✓</span>
                        Eligibility
                    </Link>


                    {/* Personal */}

                    <p className="nav-label">
                        Personal
                    </p>


                    <Link
                        className={
                            isActive("/revision")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/revision"
                        onClick={closeMenu}
                    >
                        <span>↻</span>
                        Revision
                    </Link>


                    <Link
                        className={
                            isActive("/notes")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/notes"
                        onClick={closeMenu}
                    >
                        <span>▧</span>
                        Notes
                    </Link>


                    <Link
                        className={
                            isActive("/bookmarks")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/bookmarks"
                        onClick={closeMenu}
                    >
                        <span>☆</span>
                        Bookmarks
                    </Link>


                    <Link
                        className={
                            isActive("/contest")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/contest"
                        onClick={closeMenu}
                    >
                        <span>♛</span>
                        Contests
                    </Link>


                    <Link
                        className={
                            isActive("/mock-interview")
                                ? "nav-item active"
                                : "nav-item"
                        }
                        to="/mock-interview"
                        onClick={closeMenu}
                    >
                        <span>◌</span>
                        Mock interview
                    </Link>

                </nav>


                {/* ========================= */}
                {/* FOOTER */}
                {/* ========================= */}

                <div className="sidebar-footer">

                    <span className="status-dot" />

                    Your progress is saved locally

                </div>


                {/* ========================= */}
                {/* LOGOUT BUTTON */}
                {/* ========================= */}

                <button
                    type="button"
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <span>↪</span>
                    Logout
                </button>

            </aside>

        </>
    );
}

export default Navbar;