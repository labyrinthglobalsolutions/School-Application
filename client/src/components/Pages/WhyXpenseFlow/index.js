import React from "react";
import { ImCheckboxChecked } from "react-icons/im";
import { PiLightbulb, PiUsers } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { LuUserPlus2 } from "react-icons/lu";
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
import "./index.css";

const Promises = [
  {
    id: 0,
    name: "Turn plans into productivity",
    description:
      " We make it easy. Rely on our platform that was built for your industry to add predictability to your processes.",
  },
  {
    id: 1,
    name: "Make progress quickly",
    description:
      "There’s no time to waste. Easily integrate with your existing systems and gain greater visibility within one billing cycle.",
  },
  {
    id: 2,
    name: "Trust a smarter partner",
    description:
      "We’ve been there. Tap into our shared learnings from thousands of other organizations before you and decades of experience.",
  },
  {
    id: 3,
    name: "Focus on the things that matter most",
    description:
      "Gain more control. Deliver on your business aspirations while having the confidence to be nimble for the next great opportunity.",
  },
];

// const iconsList = [
//   {
//     id: 0,
//     icon: <PiLightbulb className="about-challenge-icon" />,
//     heading: "20+ yrs",
//     para: "of experience",
//   },
//   {
//     id: 1,
//     icon: <LuUserPlus2 className="about-challenge-icon" />,
//     heading: "3,000",
//     para: "clients and counting",
//   },
//   {
//     id: 2,
//     icon: <CgNotes className="about-challenge-icon" />,
//     heading: "$8B (USD)",
//     para: "billable time tracked each year",
//   },
//   {
//     id: 3,
//     icon: <PiUsers className="about-challenge-icon" />,
//     heading: "80,000",
//     para: "active users",
//   },
// ];

const Whyxpenseflow = () => {
  return (
    <>
      <Header />
      <div className="about-first-container">
        <div className="about-heading-container">
          <h1 className="main-heading">We move your business forward</h1>
          <p className="sub-heading">
            Our choice of the name "Xpense Flow" reflects the essence of our
            mission, vision, and the unique value we bring to companies seeking
            seamless efficiency.
          </p>
          {/* <button className="about-button">REQUEST DEMO</button> */}
        </div>
      </div>
      <div className="about-second-container">
        <div className="about-promise-container">
          <h1 className="promise-main-heading">Our promise to you</h1>
          {Promises.map((eachPromise) => (
            <div className="promise-container">
              <ImCheckboxChecked className="promise-checked" />
              <div>
                <h4 className="promise-name">{eachPromise.name}</h4>
                <p className="promise-description">{eachPromise.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-third-container">
        <div className="about-challenge-container">
          <div className="about-challenge-heading-container">
            <h1 className="about-challenge-heading">
              Tackle your challenges with confidence
            </h1>
            <p className="about-challenge-paragraph">
              Built specifically with your industry in mind, XpenseFlow is well
              versed in the challenges of tracking and managing client
              engagements in an organized way.
            </p>
          </div>
          {/* <div className="about-challenge-icons-container">
            {iconsList.map((eachIcon) => (
              <div className="about-challenge-card" key={eachIcon.id}>
                {eachIcon.icon}
                <h1 className="about-challenge-icon-heading">
                  {eachIcon.heading}
                </h1>
                <p className="about-challenge-icon-para">{eachIcon.para}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Whyxpenseflow;
