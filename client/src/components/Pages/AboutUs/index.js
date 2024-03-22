//components
import { AboutPart, missionVision } from "../../Constants";
import Footer from "../../Home/Footer";
import Header from "../../Home/Header";
import image6 from "../../assets/image6.jpg";
const About = () => {
  return (
    <>
      <Header />
      <div className="pages">
        <h2 className="title">About us</h2>
      </div>
      <div className="about-info">
        <div className="vc-office">
          <h1>
            Office of the <br /> Vice Chancellor
          </h1>
          <p>
            At school, we are driven by a relentless pursuit of academic
            excellence and a commitment to fostering a vibrant learning
            community. Our institution stands as a beacon of knowledge,
            providing a transformative educational experience that empowers
            individuals to lead, innovate, and make a positive impact on the
            world. In our pursuit of excellence, we continuously evolve our
            curriculum, embrace new technologies, and promote interdisciplinary
            collaboration.
          </p>
        </div>
        <div className="vc-image">
          <img src={image6} alt="vc-image" />
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
      <div className="parts">
        {AboutPart.map((part) => (
          <div className="part" key={part.id}>
            <div className="image">
              <img src={part.image} alt={part.title} />
            </div>
            <h3>{part.title}</h3>
            <p>{part.text}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default About;
