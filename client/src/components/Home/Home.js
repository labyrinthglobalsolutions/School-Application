import { useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Footer from "./Footer.js";
import "./Home.css";

import {
  MdOutlineManageAccounts,
  MdArchitecture,
  MdEngineering,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TfiWorld } from "react-icons/tfi";
import { SlNote } from "react-icons/sl";
import home1 from "../Images/home1.png";
import home from "../Images/home.png";

const Data = [
  { icon: MdOutlineManageAccounts, heading: "Accounting" },
  { icon: MdArchitecture, heading: "Architecture" },
  { icon: MdEngineering, heading: "Engineering" },
  { icon: CgProfile, heading: "Consulting" },
  { icon: TfiWorld, heading: "IT Services" },
  { icon: SlNote, heading: "GovCon" },
];
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="home-page-main-container">
        <div className="home-page-container1">
          <div className="home-page-container1-sub1">
            <h1 className="home-page-container1-heading">
              Optimize processes, enhance efficiency, and drive financial
              growth.
            </h1>
            <p className="home-page-container1-text">
              Discover how XpenseFlow empowers your project-driven firm to
              effortlessly manage expenses and maximize profitability
            </p>
            <button
              onClick={() => navigate("/aboutus")}
              className="home-page-container1-button"
            >
              Learn More
            </button>
          </div>
          <div className="home-page-container1-image-container">
            <img className="home-page-container1-image" alt="kk" src={home1} />
          </div>
        </div>
        <div className="home-page-container3">
          <h1 className="home-page-container3-heading">
            A versatile platform catering to startups and corporations alike,
            enabling seamless operations management, process streamlining, and
            growth acceleration.
          </h1>
          <p className="home-page-container3-text">
            Our versatile platform seamlessly integrates time tracking, project
            management, HR planning, and office operations, all fully
            customizable for company-wide or user-specific settings, empowering
            you to tailor your workflow for maximum efficiency and productivity.
          </p>
        </div>
        <div className="home-page-container4">
          <div className="home-page-container4-sub1">
            <h1 className="home-page-container4-heading">
              A time tracker that helps you go paperless
            </h1>
            <p className="home-page-container4-text">
              Revolutionize your productivity with our paperless time tracker.
            </p>
          </div>
          <div className="home-page-image-container-4">
            <img
              src={home}
              className="home-page-container4-image"
              alt="image1"
            />
          </div>
        </div>
        <h1 className="home-page-container3-heading">
          The impacts of flying blind on projects and budget are all too
          familiar
        </h1>
        <div className="home-page-support-services-main-container">
          <h1 className="home-page-container1-heading">
            We support professional services firms with teams of 5 to 500+
          </h1>
          <div className="home-page-support-services-sub-container">
            {Data.map((each) => {
              return (
                <div className="home-page-support-services-card">
                  <each.icon className="home-page-support-services-card-icon" />
                  <p className="home-page-support-services-card-heading">
                    {each.heading}
                  </p>
                  {/* <button className="home-page-support-services-card-button">
                    Learn More
                  </button> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
