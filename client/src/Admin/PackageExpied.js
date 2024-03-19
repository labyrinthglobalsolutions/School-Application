import { useNavigate } from "react-router";

import Footer from "../components/Home/Footer";

import Header from "../components/Home/Header";
import expire from "../images/package.png";
import "./PackageExpire.css";

const PackageExpired = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="package-expired-main-container">
        <div className="package-expired-container">
          <h1 className="package-expired-heading">Your Package Has Expired</h1>
          <img
            src={expire}
            alt="package expired"
            className="package-expired-img"
          />
          <div className="package-expired-button-container">
            <button
              onClick={() => navigate("/pricing")}
              className="pckage-expired-button"
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PackageExpired;
