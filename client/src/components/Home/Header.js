import { FaBars } from "react-icons/fa";
import { navLinks } from "../Constants";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SmartSchoolCentralLogo from "../assets/Smart Scholar Central.jpg";
const Header = () => {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="nav-bar-image-container">
        <Link to="/">
          <img
            src={SmartSchoolCentralLogo}
            alt="Smart School Central Logo"
            style={{
              width: "200px",
              height: "50px",
              marginLeft: "20px",
            }}
            className="logo"
          />
        </Link>
      </div>
      <div className="nav-links">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/aboutus" className="link">
          About
        </NavLink>
        <NavLink to="/facility" className="link">
          Facilities
        </NavLink>
        <NavLink to="/contact" className="link">
          Contact Us
        </NavLink>
        <NavLink to="/adminssion" className="link">
          Admission
        </NavLink>
        <button
          className="login-desktop-btn"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
      <div className="menu-icons">
        <FaBars
          onClick={() => {
            setToggle((prev) => !prev);
          }}
        />
      </div>
      <div className={`${toggle ? "show" : "hidden"}`}>
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/aboutus" className="link">
          About
        </NavLink>
        <NavLink to="/facility" className="link">
          Facilities
        </NavLink>
        <NavLink to="/contact" className="link">
          Contact Us
        </NavLink>
        <NavLink to="/adminssion" className="link">
          Admission
        </NavLink>
      </div>
    </nav>
  );
};

export default Header;
