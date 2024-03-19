import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogOut } from "react-icons/io5";
import { HiDocumentPlus } from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { useState } from "react";
import { BsBuildingAdd, BsBuildings } from "react-icons/bs";
import { MdDomainDisabled } from "react-icons/md";
import { HiHome } from "react-icons/hi2";
// import OrganizationList from "../OrganizationList";
// import OrganizationForm from "../OrganizationRegistration";
// import SubscriptionForm from "../Subscription";
// import SubscriptionList from "../SubscriptionList";
import "./index.css";
// import SubscriptionDetailView from "../SubscriptionViewDetail";
// import OrganizationViewDetail from "../OrganizationViewDetail";
import { useNavigate } from "react-router-dom";
import AttendancePage from "../Attendence";
// import DisableOrgList from "../DisabledOrgList/DisableOrgList";
// import SuperDashboard from "../dashboard/dashboard";
// import OrganizationsPending from "../OrganizationsPending/OrganizationsPending";

function TeacherPanel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState("dashboard");
  const [activeId, setId] = useState("");
  const [orgActiveId, setOrgId] = useState("");
  const navigate = useNavigate();

  const setSubscriptionDetail = (id) => {
    setId(id);
    setActive("detail");
  };

  const getOrgId = (orgId) => {
    setOrgId(orgId);
    setActive("org-detail");
  };

  const updateOrg = () => {
    setActive("organizations");
  };

  const updateSubscription = () => {
    setActive("sublist");
  };

  const logoutSuperAdmin = () => {
    sessionStorage.removeItem("token");
    navigate("/superlogin");
  };

  const dynamicStyle = {
    height: "max-content",
    width: isCollapsed ? "100%" : "84%",
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <Sidebar
        backgroundColor="#5050A5"
        className="super-sidebar-container"
        collapsed={isCollapsed}
        collapsedWidth="60px"
      >
        <Menu
          className="super-sidebar-icons-container"
          menuItemStyles={{
            button: {
              "&.active": {
                backgroundColor: "#0f5298",
                color: "#b6c8d9",
              },
              "&:hover": {
                width: "90%",
                marginLeft: "5px",
                marginBottom: "5px",
                marginTop: "5px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                color: "#0f5298",
              },
            },
          }}
        >
          <div className="super-hamburger-icon">
            <GiHamburgerMenu
              style={{ color: "#fff" }}
              onClick={() => setIsCollapsed(!isCollapsed)}
            />
          </div>

          <MenuItem
            icon={<HiHome />}
            onClick={() => setActive("AttendancePage")}
            className={active === "AttendancePage" ? "super-menu-active" : ""}
          >
            Attendance
          </MenuItem>

          <MenuItem
            icon={<BsBuildings />}
            onClick={() => setActive("organizations")}
            className={active === "organizations" ? "super-menu-active" : ""}
          >
            Add Marks
          </MenuItem>
          <MenuItem
            icon={<MdDomainDisabled />}
            onClick={() => setActive("disabledOrganizations")}
            className={
              active === "disabledOrganizations" ? "super-menu-active" : ""
            }
          >
            Marks
          </MenuItem>
          <MenuItem
            icon={<MdDomainDisabled />}
            onClick={() => setActive("organizationsPending")}
            className={
              active === "organizationsPending" ? "super-menu-active" : ""
            }
          >
            Home Work
          </MenuItem>

          <MenuItem
            icon={<BsBuildingAdd />}
            onClick={() => setActive("orgform")}
            className={active === "orgform" ? "super-menu-active" : ""}
          >
            xxxxxx
          </MenuItem>
          <MenuItem
            icon={<FaMoneyCheckDollar />}
            onClick={() => setActive("sublist")}
            className={active === "sublist" ? "super-menu-active" : ""}
          >
            xxxxxxxx
          </MenuItem>
          <MenuItem
            icon={<HiDocumentPlus />}
            onClick={() => setActive("subform")}
            className={active === "subform" ? "super-menu-active" : ""}
          >
            xxxxxxx
          </MenuItem>
          <MenuItem icon={<IoLogOut />} onClick={logoutSuperAdmin}>
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>
      <div style={dynamicStyle}>
        {/* {active === "dashboard" && <SuperDashboard />}
        {active === "subform" && (
          <SubscriptionForm setSubScription={updateSubscription} />
        )}
        {active === "org-detail" && (
          <OrganizationViewDetail
            orgActive={orgActiveId}
            setUpdate={updateOrg}
          />
        )} */}
        {active === "AttendancePage" && <AttendancePage />}
      </div>
    </div>
  );
}

export default TeacherPanel;
