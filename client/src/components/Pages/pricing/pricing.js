import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pricing.css"; // Make sure to adjust the CSS file name
import Header from "../../Home/Header";
import Footer from "../../Home/Footer";
function Pricing() {
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

  return (
    <>
      <Header />
      <div className="pricing-container">
        <div className="pricing-text-container">
          <h1 className="pricing-heading">
            Pricing plans built around the unique needs of your team
          </h1>
          <p className="pricing-description">
            XpenseFlow helps professional services businesses operate more
            effectively to better plan, manage, and get paid for client work.
          </p>
        </div>

        <div className="pricing">
          {plans.map((eachPlan) => (
            <div className="plan" key={eachPlan.subscriptionType}>
              <h2 className="plan-heading">{eachPlan.subscriptionType}</h2>
              <div className="price">
                {eachPlan.originalprice > 0 ? (
                  <>
                    {/* {eachPlan.originalprice}/ */}
                    {eachPlan.convertedValidTime}
                    Days
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
              {eachPlan.subscriptionType === "Free" ? (
                <button
                  className="plan-button"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </button>
              ) : (
                <button
                  className="plan-button"
                  onClick={() => navigate("/signup")}
                >
                  Buy Now
                </button>
              )}
            </div>
          ))}
        </div>

        {/* <div className="pricing-plans">
          <div className="pricing-plan">
            <h4 className="pricing-plan-heading">ESSENTIALS</h4>
            <h5 className="pricing-plan-price">$9.99</h5>
            <p className="pricing-plan-text">per user/month</p>
            <button className="pricing-plan-buton">REQUEST DEMO</button>
          </div>
          <div className="pricing-plan">
            <h4 className="pricing-plan-heading">ADVANCED</h4>
            <h5 className="pricing-plan-price ">$9.99</h5>
            <p className="pricing-plan-text">per user/month</p>
            <button className="pricing-plan-buton">REQUEST DEMO</button>
          </div>
          <div className="pricing-plan">
            <h4 className="pricing-plan-heading">PREMIER</h4>
            <h5 className="pricing-plan-price">$9.99</h5>
            <p className="pricing-plan-text ">per user/month</p>
            <button className="pricing-plan-buton">REQUEST DEMO</button>
          </div>
          <div className="pricing-plan">
            <h4 className="pricing-plan-heading">PROJECTOR</h4>
            <h5 className="pricing-plan-price">$9.99</h5>
            <p className="pricing-plan-text">per user/month</p>
            <button className="pricing-plan-buton">REQUEST DEMO</button>
          </div>
        </div>
        <div className="price-features">
          <h1 className="price-features-heading">DELIVER GREAT WORK</h1>
          <p className="price-features-description">
            Streamline the basics so you can deliver great work, faster
          </p>
        </div>
        <div className="features-row">
          <div className="package-features-list">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </div>

        <div className="price-features">
          <h1 className="price-features-heading">GET PAID</h1>
          <p className="price-features-description">
            Accelerate your cash flow
          </p>
        </div>
        <div className="features-row">
          <div className="package-features-list">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </div>

        <div className="price-features">
          <h1 className="price-features-heading">INTEGRATE</h1>
          <p className="price-features-description">
            Easily integrate with current and future systems
          </p>
        </div>
        <div className="features-row">
          <div className="package-features-list">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </div>

        <div className="price-features">
          <h1 className="price-features-heading">SUPPORT & SERVICES</h1>
          <p className="price-features-description">Trust a smarter partner</p>
        </div>
        <div className="features-row">
          <div className="package-features-list">
            <ul>
              <li>Time tracking</li>
              <li>Rate management</li>
              <li>Approvals</li>
              <li>Expense management</li>
              <li>Project management</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="package-features">
            <ul>
              <li>Feature 1</li>
              <li>Feature 2</li>
            </ul>
          </div>
        </div>
        <div className="performance-container">
          <div className="performance-header">
            <h3 className="performance-heading">
              Top performers use XpenseFlow
            </h3>
          </div>

          <div className="ready-container">
            <div className="ready-text-container">
              <h1 className="ready-text-heading">Ready To Get Started</h1>
              <p className="ready-text-description">
                Make the first step towards operational excellence today
              </p>
            </div>
            <div className="ready-button-container">
              <button className="ready-button">REQUEST DEMO</button>
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
}

export default Pricing;
