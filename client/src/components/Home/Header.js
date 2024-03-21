import { Link, useNavigate } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";
import { AiFillHome } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import "./Header.css";
import { Navigate } from "react-router-dom";
import logo from "../../images/w_logo.png";
const Header = (props) => {
  const navigate = useNavigate();
  const onClickLogin = () => {
    navigate("/login");
  };
  const onClickTryForFree = () => {
    navigate("/signup");
  };

  return (
    // <nav className="nav-header">
    //   <div className="nav-content">
    //     <div className="nav-bar-mobile-logo-container">
    //       <Link to="/">
    //         <img className="website-logo" src={logo} alt="website logo" />
    //       </Link>
    //       <ul className="nav-bar-mobile-icons-container">
    //         <li>
    //           <Link to="/">
    //             <AiFillHome className="nav-item-mobile-link" />
    //           </Link>
    //         </li>
    //         <li>
    //           <Link to="/jobs">
    //             <BsFillBriefcaseFill className="nav-item-mobile-link" />
    //           </Link>
    //         </li>
    //         <li>
    //           <button
    //             type="button"
    //             className="nav-mobile-btn"
    //             onClick={onClickLogin}
    //           >
    //             <FiLogOut />
    //           </button>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="nav-bar-large-container">
    //       <Link to="/">
    //         <img className="website-logo" src={logo} alt="website logo" />
    //       </Link>
    //       <ul className="nav-menu">
    //         <li className="nav-menu-item">
    //           <Link to="/aboutus" className="nav-item-link">
    //             Why Xpense Flow
    //           </Link>
    //         </li>
    //         <li className="nav-menu-item">
    //           <Link to="/pricing" className="nav-item-link">
    //             Pricing
    //           </Link>
    //         </li>
    //         <li className="nav-menu-item">
    //           <Link to="/support" className="nav-item-link">
    //             Support
    //           </Link>
    //         </li>
    //       </ul>
    //       <div>
    //       <button
    //         type="button"
    //         className="logout-desktop-btn"
    //         onClick={onClickLogin}
    //       >
    //         Try For Free
    //       </button>
    //       <button
    //         type="button"
    //         className="logout-desktop-btn"
    //         onClick={onClickLogin}
    //       >
    //         Login
    //       </button>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-lg bg-body-tertiary  nav-bar-main-container">
      <div className="container">
        <Link to="/">
          <img className="website-logo" src={logo} alt="website logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse nav-bar-text-container"
          id="navbarNav"
        >
          <ul className="navbar-nav nav-bar-links-container">
            <Link to="/whyxpenseflow" className="nav-item-link">
              Why Smart Scholor
            </Link>

            <Link to="/pricing" className="nav-item-link">
              Pricing
            </Link>

            <Link to="/support" className="nav-item-link">
              Support
            </Link>
          </ul>
          <div className="nav-bar-button-container">
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickTryForFree}
            >
              Free Trail
            </button>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
