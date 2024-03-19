import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div class="Ecommerce-Website-Footer-Section-bg pb-5 pt-5">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 col-lg-5">
            <div class="d-flex flex-column justify-conent-start justify-conent-md-start ">
              <div class="text-left  mb-3">
                {/* <img src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/ecommerce-website-logo-img.png" class="Ecommerce-Website-Footer-Section-logo" /> */}
                <h1 style={{ color: "#fff" }}>Xpense Flow</h1>
                <p style={{ color: "#fff" }}>
                  Our choice of the name "Xpense Flow" reflects the
                </p>
                <p style={{ color: "#fff" }}>
                  essence of our mission, vision, and the unique value
                </p>
                <p style={{ color: "#fff" }}>
                  we bring to companies seeking seamless efficiency.
                </p>
              </div>
              <div class="d-flex flex-row justify-content-start mb-3">
                <div class="Ecommerce-Website-Footer-Section-logo-card mr-2">
                  <i
                    class="fa fa-google"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="Ecommerce-Website-Footer-Section-logo-card mr-2">
                  <i
                    class="fa fa-twitter"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="Ecommerce-Website-Footer-Section-logo-card mr-2">
                  <i
                    class="fa fa-instagram"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="Ecommerce-Website-Footer-Section-logo-card mr-2">
                  <i
                    class="fa fa-linkedin-square"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div class="Ecommerce-Website-Footer-Section-logo-card">
                  <i
                    class="fa fa-youtube"
                    style={{ color: "#fff" }}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div class="text-md-left">
                {/* <h1 class="Ecommerce-Website-Footer-Section-address">
                  Hyderabad, India
                </h1> */}
              </div>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-5">
            <div>
              <h1 class="Ecommerce-Website-Footer-Section-heading">
                Contact us
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  color: "#fff",
                }}
              >
                <p>+91 8919078185</p>
                <p>info@labyrinthglobalsolutions</p>
                <p>Cyber Space Building, 5th Floor, Madhapur Hi-Tech City,</p>
                <p>500081, Hyderabad, Telangana, India</p>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-6 col-lg-2">
            <div>
              <h1 class="Ecommerce-Website-Footer-Section-heading">
                Useful Links
              </h1>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Link to="/aboutus" className="footer-text2">
                  About us
                </Link>
                <Link to="/whyxpenseflow" className="footer-text2">
                  Why Xpense Flow
                </Link>
                <Link to="/pricing" className="footer-text2">
                  Pricing
                </Link>
                <Link to="/support" className="footer-text2">
                  Help/Support
                </Link>
              </div>
            </div>
          </div>

          {/* <div class="col-6 col-md-6 col-lg-3">
            <div>
              <h1 class="Ecommerce-Website-Footer-Section-heading">
                Let Us Help You
              </h1>
              <p className="footer-text1">100% Purchase</p>
              <p className="footer-text1">Protection</p>
              <p className="footer-text1">Your Account</p>
              <p className="footer-text1">Return Center</p>
              <p className="footer-text1">Help</p>
            </div>
          </div> */}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link className="privacy-text" to="/Privacy-Policy">
            Privacy Policy
          </Link>
          <Link className="privacy-text" to="/Terms-and-conditions">
            Terms & Conditions
          </Link>
        </div>
        <hr class="Ecommerce-Website-Footer-Section-line" />
        <div class="d-flex flex-row justify-content-center">
          <div class="Ecommerce-Website-Footer-Section-copy-right">
            <i
              style={{ color: "#fff" }}
              class="fa fa-copyright"
              aria-hidden="true"
            ></i>
          </div>
          <div class="ml-2 mt-1">
            <h1 class="Ecommerce-Website-Footer-Section-address">
              2024 XpenseFlow. All Rights Reserved
            </h1>
          </div>
        </div>
        <h1
          style={{ textAlign: "center" }}
          class="Ecommerce-Website-Footer-Section-address"
        >
          Designed & Developed with by
          <a
            style={{
              textDecoration: "none",
              marginLeft: "5px",
              // color: "#fff",
            }}
            href="https://labyrinthglobalsolutions.com/"
            target="_blank"
          >
            Labyrinth Global Solutions
          </a>
        </h1>
      </div>
    </div>
  );
};

export default Footer;
