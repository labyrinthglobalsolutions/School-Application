import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrTasks, GrUser } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import { useEffect, useState } from "react";
import { PiUserListBold, PiUserCirclePlusBold } from "react-icons/pi";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../Admin/AdminNavbar";
function AccountantPannel() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [active, setActive] = useState("allprojects");
  const [logoImageUrl, setLogoImageUrl] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [feeDetailsId, setFeeDetailsId] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove cookies here
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");

    // Navigate to login page
    navigate("/login");
  };
  const token = sessionStorage.getItem("token");

  const setUpdateStudentId = (id) => {
    setEmployeeId(id);
    setActive("studentDetail");
  };
  const navigateCreate = () => {
    setActive("addstudent");
  };

  const setUpdateTeacherId = (id) => {
    setEmployeeId(id);
    setActive("EditTeacher");
  };
  const setClassTeacherId = (id) => {
    setEmployeeId(id);
    setActive("EditClassTeacher");
  };

  const getFeeDetailsId = (id) => {
    setActive("EditFeeDetails");
    setFeeDetailsId(id);
  };

  const navigateEmployeeCreate = () => {
    setActive("AddTeacher");
  };

  const updateAdmin = () => {
    window.location.reload();
  };

  useEffect(() => {
    const fetchLogoImageUrl = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const api = `${process.env.REACT_APP_FETCH_URL}/organization-logo`;
        const response = await fetch(api, options);
        if (response.ok) {
          const data = await response.json();
          setLogoImageUrl(data.data.companyLogo);
        } else {
          // Handle error cases if needed
        }
      } catch (error) {
        // Handle fetch errors
        console.error("Error fetching image URL:", error);
      }
    };

    // Call the fetch function
    fetchLogoImageUrl();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Sidebar
        className="sidebar-container"
        backgroundColor="#ced4da"
        collapsed={isCollapsed}
        collapsedWidth="60px"
      >
        <Menu
          className="sidebar-icons-container"
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
                backgroundColor: "#293b51", // Background color on hover
                color: "#F0F0F0 ", // Text color on hover
              },
            },
          }}
        >
          <div className="hamburger-icon">
            <GiHamburgerMenu onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>

          <MenuItem
            icon={<GrTasks />}
            onClick={() => setActive("StudentList")}
            className={active === "StudentList" ? "menu-active" : ""}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<PiUserListBold />}
            onClick={() => setActive("TeachersList")}
            className={active === "TeachersList" ? "menu-active" : ""}
          >
            Student Management
          </MenuItem>
          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("ClassTeachersList")}
            className={active === "ClassTeachersList" ? "menu-active" : ""}
          >
            Fee Management
          </MenuItem>
          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("FeeDetailsList")}
            className={active === "FeeDetailsList" ? "menu-active" : ""}
          >
            Expense Management
          </MenuItem>

          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("classList")}
            className={active === "classList" ? "menu-active" : ""}
          >
            Financial Reports
          </MenuItem>
          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("ParentsList")}
            className={active === "ParentsList" ? "menu-active" : ""}
          >
            Settings
          </MenuItem>
          <MenuItem
            icon={<GrUser />}
            onClick={() => setActive("profile")}
            className={active === "profile" ? "menu-active" : ""}
          >
            Profile
          </MenuItem>
          <MenuItem icon={<IoLogOut />} onClick={handleLogout}>
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>
      <div style={{ width: "100%" }}>
        <AdminNavbar />

        {/* {active === "profile" && (
          <AdminProfile adminProfileUpdate={updateAdmin} />
        )} */}
      </div>
    </div>
  );
}

export default AccountantPannel;
