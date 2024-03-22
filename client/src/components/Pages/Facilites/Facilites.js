import React from "react";
import { facilities } from "../../Constants";
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";

const FacilityList = () => {
  return (
    <>
      <Header />
      <div className="pages fac">
        <h2 className="title">Our Facilities</h2>
      </div>
      <div className="facilities">
        {facilities.map((fac) => (
          <div className="facility" key={fac.id}>
            <h3>{fac.title}</h3>
            <img src={fac.image} alt={fac.title} />
            <p>{fac.text}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default FacilityList;
