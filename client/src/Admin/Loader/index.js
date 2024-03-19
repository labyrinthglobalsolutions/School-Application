import React from "react";
import RingLoader from "react-spinners/RingLoader";
import "./index.css";
import { Oval } from "react-loader-spinner";
import loader from "../../images/progresslogo2.gif";

export const Loader = () => {
  return (
    <div className="spinner-loader">
      {/* <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}
      <img src={loader} className="loader" alt="loader" />
    </div>
  );
};
