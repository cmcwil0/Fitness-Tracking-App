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
  const [currentUser, setCurrentUser] = useState(readUser());

  // Sync on route change
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    setCurrentUser(readUser());
  }, [location.pathname]);

  // Sync across tabs
  useEffect(() => {
    const onStorage = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
      setCurrentUser(readUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* LEFT: links */}
        <ul className="navbar-links">
          <li><NavLink to="/" end>Home</NavLink></li>

          {isLoggedIn && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}

          <li><NavLink to="/nutrition">Nutrition</NavLink></li>
          <li><NavLink to="/fitness">Fitness</NavLink></li>

          {/* GoalForm only when logged in */}
          {isLoggedIn && <li><NavLink to="/goalform">GoalForm</NavLink></li>}

          {/* Signup only when logged out */}
          {!isLoggedIn && <li><NavLink to="/signup">Signup</NavLink></li>}

          {isLoggedIn && <li><NavLink to="/userprofile">Profile</NavLink></li>}
        </ul>

        {/* RIGHT: username + auth button */}
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