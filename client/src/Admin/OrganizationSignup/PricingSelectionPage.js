import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../images/b_logo.png";
import Toast from "../../components/utlis/toast";
import { Buffer } from "buffer";

import { useNavigate, useParams } from "react-router-dom";
const PricingSelectionPage = () => {
  const decodeObjectId = (encodedString) => {
    return Buffer.from(encodedString, "base64").toString();
  };

  const paramsOrganizationId = useParams().id;
  const organizationId = decodeObjectId(`${paramsOrganizationId}`);
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    const options = {
      method: "GET",
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/getSubscriptionDetails`,
      options
    );
    const data = await response.json();
    setPlans(data.subscriptions);
  };

  useEffect(() => {
    fetchPlans();
  }, []);
  const success = async (packageId) => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: packageId,
          organizationId: organizationId,
        }),
      };
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/postsubcriptionid`,
        options
      );
      const data = await response.json();
      if (response.ok === true) {
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        navigate("/login");
      } else {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch {
      console.log("error");
    }
  };
  console.log(process.env.REACT_APP_PAYMENT_KEY);

  const initPayment = (data, packageId) => {
    console.log("init payment called");
    const options = {
      key: process.env.REACT_APP_PAYMENT_KEY,
      // key: "rzp_test_BSbNIdfoV3nkDf",
      amount: data.amount,
      currency: data.currency,
      name: "XpenseFlow",
      description: "Payment for XpenseFlow",
      image: { logo },
      order_id: data.id,
      handler: async (response) => {
        console.log(response, "response before callin verify api");
        try {
          const verifyUrl = `${process.env.REACT_APP_FETCH_URL}/paymentverify`;
          const { data1 } = await axios.post(verifyUrl, {
            ...response,
            amount: data.amount,
            packageId: packageId,
            organizationId: organizationId,
          });
          console.log(data1);
          await success(packageId);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (id, price) => {
    console.log("handle called", price);
    try {
      const orderUrl = `${process.env.REACT_APP_FETCH_URL}/orders`;
      const { data } = await axios.post(orderUrl, {
        amount: parseInt(price),
      });
      console.log(data, "first data console");
      console.log(data.data, "payment data");
      initPayment(data.data, id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>Upgrade Plan</h2>
      <div className="pricing-selection-container">
        {plans.map((eachPlan) => (
          <div className="plan" key={eachPlan.subscriptionType}>
            <h2 className="plan-heading">{eachPlan.subscriptionType}</h2>
            <div className="price">
              {eachPlan.originalprice > 0 ? (
                <>
                  {/* {eachPlan.originalprice}/ */}
                  {eachPlan.convertedValidTime}Days
                </>
              ) : (
                <>
                  {eachPlan.convertedValidTime}
                  Days
                </>
              )}
            </div>
            <ul className="features">
              <li className="features-label">
                <i className="fas fa-check-circle" />
                MRP Price:
                <span
                  style={{
                    textDecoration:
                      eachPlan.mrpprice > 0 ? "line-through" : "none",
                  }}
                >
                  {eachPlan.mrpprice > 0 ? eachPlan.mrpprice : "Free"}
                </span>
              </li>
              <li className="features-label">
                <i className="fas fa-check-circle" /> Selling Price:
                {eachPlan.originalprice ? eachPlan.originalprice : "Free"}
              </li>
              <li className="features-label">
                <i className="fas fa-check-circle" /> Discount :
                {eachPlan.originalprice <= 0 ||
                eachPlan.mrpprice <= 0 ||
                isNaN(eachPlan.originalprice) ||
                isNaN(eachPlan.mrpprice)
                  ? "N/A"
                  : (
                      100 -
                      (eachPlan.originalprice / eachPlan.mrpprice) * 100
                    ).toFixed(0) + "%"}
              </li>
              <li className="features-label">
                <i className="fas fa-check-circle" /> {eachPlan.userCount}
                Users
              </li>
              <li className="features-label">
                <i className="fas fa-check-circle" /> Continuous deployment
              </li>
              <li className="features-label">
                <i className="fas fa-check-circle" /> Email Support
              </li>
            </ul>
            {eachPlan.originalprice == 0 ? (
              <button
                className="plan-button"
                onClick={() => success(eachPlan._id)}
              >
                Get Started
              </button>
            ) : (
              <button
                onClick={() =>
                  handlePayment(eachPlan._id, eachPlan.originalprice)
                }
                className="plan-button"
              >
                Buy Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingSelectionPage;
