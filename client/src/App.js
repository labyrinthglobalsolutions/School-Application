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
// import SuperadminSignup from "./SuperAdmin/SuperAdminSignUp/superadminSignup.js";
// import SuperadminLogin from "./SuperAdmin/SuperAdminLogin/superadminLogin.js";
// import SuperadminVerify from "./SuperAdmin/SuperAdminVerify/superadminVerify.js";
// import SuperAdminHome from "./SuperAdmin/SuperAdminHome/SuperAdminHome.js";
import AdminLogin from "./Admin/AdminLogin/index.js";
// import UserRoleForm from "./Admin/AddRole.js/index.js";
// import SuperForgotPassword from "./SuperAdmin/SuperForgotPassword/SuperForgotPassword.js";
// import ProtectedRoute from "./SuperAdmin/SuperAdminProtectedRoute/SuperAdminProtectedRoute.js";
// import EmployeePanel from "./Employee/EmployeePanel/EmployeePanel.js";
// import TimeSheet from "./Employee/TimeSheet/TimeSheet.js";
import AdminProtectedRoute from "./Admin/AdminProtectedRoute/AdminProtectedRoute.js";
import AdminPannel from "./Admin/AdminPannel/index.js";
import PackageExpired from "./Admin/PackageExpied.js";
// import EmployeeForgotPassword from "./Employee/ForgotPassword/EmployeeForgotPassword.js";
// import EmployeeResetPassword from "./Employee/EmployeeResetPassword/EmployeeResetPassword.js";
import { NotFound } from "./Notfound/index.js";

import "./App.css";
import OrganizationSignup from "./Admin/OrganizationSignup/OrganizationSignup.js";
import PricingSelectionPage from "./Admin/OrganizationSignup/PricingSelectionPage.js";
import Whyxpenseflow from "./components/Pages/WhyXpenseFlow/index.js";
import Aboutus from "./components/Pages/AboutUs/index.js";
import AddClassTeacher from "./Admin/ClassTeachersList/AddClassTeacher.js";
import TimetableForm from "./Admin/ClassTimeTable/AddClassTimeTable.js";
import TeacherPanel from "./Teacher/TeacherPanel/index.js";
import ClassSelectionPage from "./Teacher/ClassSelectionPage/index.js";
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
      {/* <Route
        path="/EmployeeResetPassword"
        element={<EmployeeResetPassword />}
      />
      <Route
        path="/EmployeeForgotPassword"
        element={<EmployeeForgotPassword />} 
      />*/}
      <Route path="/packageExpired" element={<PackageExpired />} />
      {/* <Route path="/superhome" element={<SuperAdminHome />} /> */}
      {/* <Route path="/superlogin" element={<SuperadminLogin />} /> */}

      {/* <Route
        path="/addrole"
        element={
          <ProtectedRoute>
            <UserRoleForm />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/adminpannel" element={<AdminPannel />} />
      <Route
        path="/login"
        element={
          <AdminProtectedRoute>
            <AdminLogin />
          </AdminProtectedRoute>
        }
      />
      {/* <Route path="/superadminverify" element={<SuperadminVerify />} /> */}
      {/* <Route path="/timesheet" element={<TimeSheet />} /> */}
      {/* <Route path="/employeepanel" element={<EmployeePanel />} /> */}
      {/* <Route path="/superSignup" element={<SuperadminSignup />} /> */}
      {/* <Route path="/super-forgot" element={<SuperForgotPassword />} /> */}
      <Route path="/whyxpenseflow" element={<Whyxpenseflow />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/aboutus" element={<Aboutus />} />
      <Route path="/Support" element={<Support />} />
      <Route path="/" element={<Home />} />
      <Route path="/Terms-and-conditions" element={<Terms />} />
      <Route path="/Privacy-Policy" element={<PrivacyPolicy />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/signup" element={<Signup />} />
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
