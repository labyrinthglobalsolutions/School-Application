import React from "react";
import Home from "./components/Home/Home.js";

import { Route, Routes, useNavigate } from "react-router-dom";
import PrivacyPolicy from "./components/Pages/Privacy/Privacy";
import Support from "./components/Pages/Support/support";
import Terms from "./components/Pages/TermsAndConditions/Terms";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Verify from "./components/Verify/verify.js";
import Pricing from "./components/Pages/pricing/pricing.js";
import AdminLogin from "./Admin/AdminLogin/index.js";
import AdminProtectedRoute from "./Admin/AdminProtectedRoute/AdminProtectedRoute.js";
import AdminPannel from "./Admin/AdminPannel/index.js";
import PackageExpired from "./Admin/PackageExpied.js";
import { NotFound } from "./Notfound/index.js";

import "./App.css";
import OrganizationSignup from "./Admin/OrganizationSignup/OrganizationSignup.js";
import PricingSelectionPage from "./Admin/OrganizationSignup/PricingSelectionPage.js";

import TeacherPanel from "./Teacher/TeacherPanel/index.js";
import ClassSelectionPage from "./Teacher/ClassSelectionPage/index.js";
import AddSubject from "./Admin/AddSubject/index.js";
import About from "./components/Pages/AboutUs/index.js";
import ContactUs from "./components/Pages/ContactUs/ContactUs.js";
import FacilityList from "./components/Pages/Facilites/Facilites.js";
import Admissions from "./components/Pages/Admissions/Admissions.js";
function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/TeacherPanel" element={<TeacherPanel />} />
      <Route path="/ClassSelectionPage" element={<ClassSelectionPage />} />
      <Route
        path="/PricingSelectionPage/:id"
        element={<PricingSelectionPage />}
      />
      <Route path="/signup" element={<OrganizationSignup />} />
      <Route path="/packageExpired" element={<PackageExpired />} />

      <Route path="/adminpannel" element={<AdminPannel />} />
      <Route
        path="/login"
        element={
          <AdminProtectedRoute>
            <AdminLogin />
          </AdminProtectedRoute>
        }
      />

      <Route path="/pricing" element={<Pricing />} />
      <Route path="/aboutus" element={<About />} />
      <Route path="/Support" element={<Support />} />
      <Route path="/" element={<Home />} />
      <Route path="/Terms-and-conditions" element={<Terms />} />
      <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/addsubject" element={<AddSubject />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/facility" element={<FacilityList />} />
      <Route path="/adminssion" element={<Admissions />} />
      <Route
        path="*"
        element={
          <div
            style={{
              height: "97vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <NotFound text={"Page Not Found"} />{" "}
            <button className="not-found-button" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
