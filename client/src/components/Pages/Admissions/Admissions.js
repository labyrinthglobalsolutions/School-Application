import React from "react";
import { MoreInfo } from "../../Constants";
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";

const Admissions = () => {
  return (
    <>
      <Header />
      <div className="pages admission">
        <h2 className="title">Admission</h2>
      </div>
      <div className="ad-info">
        <p>
          Expand your horizon and tailor your studies according to your interest
          and aspirations. It's your path to discover
        </p>
        <span style={{ backgroundColor: "#035D84" }}>
          Discover what School has to offer you
        </span>
      </div>
      <div className="ad-more">
        <h2>More Information:</h2>
        <div className="ad-more-info">
          {MoreInfo.map((info) => (
            <div className="more-info" key={info.id}>
              <p className="title">{info.title}</p>
              <p>{info.text}</p>
            </div>
          ))}
        </div>
      </div>
      <form className="apply">
        <h3 style={{ marginBottom: "20px" }}>Apply Now</h3>
        <div className="input-box">
          <label>Firstname</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <label>Lastname</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <select
            style={{
              width: "100%",
              border: 0,
              margin: "0 0 20px 0",
              fontSize: "15px",
              outline: "none",
              borderBottom: "2px solid #cfcfcf",
              paddingBottom: "40px",
            }}
          >
            <option value="select">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-box">
          <label>Email</label>
          <input type="email" />
        </div>
        <div className="input-box">
          <label>Phone Number</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <label>Nationality</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <label>State</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <label>Home Address</label>
          <input type="text" />
        </div>
        <div className="input-box">
          <label>How did you know about us</label>
          <textarea></textarea>
        </div>
        <div className="input-box">
          <label>Upload your WAEC or NECO Result</label>
          <input type="file" style={{ borderBottom: "0" }} />
        </div>

        <button
          style={{
            padding: "10px 17px",
            background: "#035D84",
            border: 0,
            color: "#fff",
            marginTop: "20px",
          }}
        >
          Apply Now
        </button>
      </form>
      <Footer />
    </>
  );
};

export default Admissions;
