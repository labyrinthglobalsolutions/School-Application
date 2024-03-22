import { NavLink } from "react-router-dom";

// import MissionVision from "../components/MissionVision";
// import Testimonials from "../components/Testimonials";
// import WhySchool from "../components/WhySchool";
import video from "../assets/course-video.mp4";
import "./Home.css";
import { missionVision, whySchool } from "../Constants";
import Testimonials from "../Testimonials/Testimonials";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <video src={video} autoPlay muted loop class="video-bg" />
        <div className="content">
          <p className="title">
            Welcome to{" "}
            <span style={{ color: "#00AFC7" }}>Smart Scholar Central</span>{" "}
            School
          </p>
          <p className="info">
            We are delighted to have you visit our virtual home (Citadel of
            Excellence) - a place where knowledge thrives, dreams soar, and
            friendships flourish. At school, we believe in cultivating an
            environment that fosters academic excellence, nurtures creativity,
            and embraces diversity.
          </p>
          <center>
            <NavLink to="/aboutus">Explore</NavLink>
          </center>
        </div>
      </div>
      <div className="content">
        <h1>Our Mission and Vision</h1>
        <div className="mission-vision">
          {missionVision.map((missVis) => (
            <div className="missVis" key={missVis.id}>
              <div className="icons">{missVis.icon}</div>
              <h2>{missVis.title}</h2>
              <p>{missVis.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="content">
        <h1>Why Smart Scholar Central School?</h1>
        <div className="reasons">
          {whySchool.map((reason) => (
            <div className="reason" key={reason.id}>
              <div className="icon">{reason.icon}</div>
              <h2>{reason.title}</h2>
              <p>{reason.reason}</p>
            </div>
          ))}
        </div>
      </div>
      <Testimonials />
      <Footer />
    </>
  );
};

export default Home;
