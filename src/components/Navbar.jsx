import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";

const readUser = () => {
  try { return JSON.parse(localStorage.getItem("user") || "null"); }
  catch { return null; }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(readUser()); // ← NEW

  // Re-check login state whenever the route changes (after /login → /dashboard)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setCurrentUser(readUser()); // ← NEW: keep username in sync
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null); // ← NEW
    navigate("/login");
  };

  return (
      <nav className="navbar">
        <div className="navbar-inner">
          {/* LEFT: keep these exactly as your original links */}
          <ul className="navbar-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/nutrition">Nutrition</NavLink></li>
            <li><NavLink to="/workouts">Workouts</NavLink></li>
            <li><NavLink to="/goalform">GoalForm</NavLink></li>
            <li><NavLink to="/signup">Signup</NavLink></li>
          </ul>

          {/* RIGHT: username (if logged in) + toggle button */}
          <div className="navbar-auth">
            {isLoggedIn && currentUser?.username && (
              <span className="nav-username" style={{ marginRight: 12 }}>
                {currentUser.username}
              </span>
            )}
            {isLoggedIn ? (
              <button className="login-button" onClick={handleLogout}>Log Out</button>
            ) : (
              <Link to="/login" className="login-button">Log In</Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default Navbar;