import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrTasks, GrUser } from "react-icons/gr";
import { IoLogOut } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import { useEffect, useState } from "react";
import { PiUserListBold, PiUserCirclePlusBold } from "react-icons/pi";
import "./index.css";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";
import AdminProfile from "../AdminProfile";
import AddStudent from "../AddStudent";
import StudentList from "../StudentList";
import AddTeacher from "../AddTeacher";
import TeachersList from "../TeachersList";
import StudentDetail from "../StudentDetail";
import EditTeacher from "../TeacherDetailView";
import AddFeeDetails from "../AddFeeDetails";
import FeeDetailsList from "../FeeDetails";
import EditFeeDetails from "../EditFeeDetails/index,";
import ClassTeachersList from "../ClassTeachersList";
import AddClassTeacher from "../ClassTeachersList/AddClassTeacher";
import ParentsList from "../ParentList";
import AddParent from "../ParentList/AddParent";
import EditClassTeacher from "../ClassTeachersList/EditClassTeacher";
import Timetable from "../ClassTimeTable";
import { AddTask } from "@mui/icons-material";
import TimetableForm from "../ClassTimeTable/AddClassTimeTable";

function AdminPannel() {
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
            All Students
          </MenuItem>
          <MenuItem
            icon={<MdAddTask />}
            onClick={() => setActive("addstudent")}
            className={active === "addstudent" ? "menu-active" : ""}
          >
            Add Student
          </MenuItem>
          <MenuItem
            icon={<PiUserListBold />}
            onClick={() => setActive("TeachersList")}
            className={active === "TeachersList" ? "menu-active" : ""}
          >
            Teachers List
          </MenuItem>
          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("FeeDetailsList")}
            className={active === "FeeDetailsList" ? "menu-active" : ""}
          >
            Fee Details List
          </MenuItem>
          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("ClassTeachersList")}
            className={active === "ClassTeachersList" ? "menu-active" : ""}
          >
            Class Teachers List
          </MenuItem>
          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("ParentsList")}
            className={active === "ParentsList" ? "menu-active" : ""}
          >
            Parents List
          </MenuItem>
          <MenuItem
            icon={<PiUserCirclePlusBold />}
            onClick={() => setActive("TimeTable")}
            className={active === "TImeTable" ? "menu-active" : ""}
          >
            Time Table
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
        {active === "StudentList" && (
          <StudentList
            getStudentId={setUpdateStudentId}
            createStudent={navigateCreate}
          />
        )}
        {active === "addstudent" && <AddStudent />}
        {active === "TeachersList" && (
          <TeachersList
            getTeacherId={setUpdateTeacherId}
            createEmployee={navigateEmployeeCreate}
            changeSetActive={setActive}
          />
        )}
        {active === "AddTeacher" && <AddTeacher />}
        {active === "EditTeacher" && <EditTeacher teacherId={employeeId} />}
        {active === "studentDetail" && (
          <StudentDetail updateEmpId={employeeId} />
        )}
        {active === "profile" && (
          <AdminProfile adminProfileUpdate={updateAdmin} />
        )}
        {active === "AddFeeDetails" && <AddFeeDetails />}
        {active === "FeeDetailsList" && (
          <FeeDetailsList
            getFeeDetailsId={getFeeDetailsId}
            addFeeDetails={setActive}
          />
        )}
        {active === "EditFeeDetails" && (
          <EditFeeDetails FeeDetailId={feeDetailsId} />
        )}
        {active === "ClassTeachersList" && (
          <ClassTeachersList
            setClassTeacherId={setClassTeacherId}
            changeSetActive={setActive}
          />
        )}
        {active === "AddClassTeacher" && <AddClassTeacher />}
        {active === "EditClassTeacher" && (
          <EditClassTeacher classTeacherId={employeeId} />
        )}
        {active === "ParentsList" && (
          <ParentsList changeSetActive={setActive} />
        )}
        {active === "AddParent" && <AddParent />}
        {active === "TimeTable" && <Timetable changeSetActive={setActive} />}
        {active === "AddTimeTable" && <TimetableForm />}
      </div>
    </div>
  );
}

export default AdminPannel;
