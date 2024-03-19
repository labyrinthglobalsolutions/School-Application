import React from "react";
import { PiLightbulb, PiChatsBold, PiGitBranch } from "react-icons/pi";
import { TbDeviceComputerCamera } from "react-icons/tb";
import { LuBookOpen } from "react-icons/lu";
import "./support.css";
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
const cardList = [
  {
    id: 0,
    icon: <PiLightbulb className="support-card-icon" />,
    head: "Knowledge base",
    desc: "Go here for answers to common questions and problems. Here you’ll find a storehouse of helpful articles, videos and how-tos on a variety of subjects — from the time tracking basics to more advanced tasks.",
  },
  {
    id: 1,
    icon: <PiChatsBold className="support-card-icon" />,
    head: "Email Support",
    desc: "Our Chicago-based technology staff is on hand every day to answer customer questions and get you moving in the right direction, and email is hands-down the fastest way to get to us. Shoot us a question at support@XpenseFlow.net.",
  },
  {
    id: 2,
    icon: <TbDeviceComputerCamera className="support-card-icon" />,
    head: "Recorded Webinars",
    desc: "Our video library is always growing! Check back frequently for product and feature demos, and extensive webinars. Watch at your own pace – anytime, anywhere, 24/7.",
  },
  {
    id: 3,
    icon: <LuBookOpen className="support-card-icon" />,
    head: "XpenseFlow Projector Support",
    desc: "Help is just a click away from within the XpenseFlow Projector platform. Select the ? icon or press F1 in the Management Portal to pull up our online documentation.",
  },
  {
    id: 4,
    icon: <PiGitBranch className="support-card-icon" />,
    head: "XpenseFlow Community",
    desc: "All  XpenseFlow Projector customers have access to the e3 Community to explore new topics and share best practices. Resources include tutorials, webinars, best practices, templates, and more.",
  },
];
const Support = () => {
  return (
    <>
      <Header />
      <div className="support-first-container">
        <div className="support-heading-container">
          <h1 className="support-main-heading">We’re here to help</h1>
        </div>
        <div className="support-cards-container">
          {cardList.map((eachCard) => (
            <div className="support-card">
              <div className="support-card-container">
                {eachCard.icon}
                <div className="support-card-content-container">
                  <h1 className="support-card-heading">{eachCard.head}</h1>
                  <p className="support-card-description">{eachCard.desc}</p>
                </div>
              </div>
              {/* <div className="support-card-button-container">
                <button className="support-card-button">Read more</button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
      <div className="support-section-container">
        <div className="support-banner-container">
          <div className="support-banner-heading-container">
            <h1 className="support-banner-heading">
              can't find what you need?
            </h1>
            <p className="support-banner-description">
              Our award-winning support team is here
            </p>
          </div>
          <div>
            <button className="support-banner-button">Contact Us</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Support;
