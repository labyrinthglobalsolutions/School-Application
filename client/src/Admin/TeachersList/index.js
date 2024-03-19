import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { Loader } from "../Loader";
import { useEffect, useState } from "react";
import "./index.css";
import Toast from "../../components/utlis/toast";
import notfound from "../../images/not-found.png";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { MdDelete, MdEditSquare } from "react-icons/md";
import { Box, Modal } from "@mui/material";
import DeleteEmploeeModalPage from "./verifyAdmin";

const columns = [
  {
    id: "_id",
    label: "ID",
    hide: true,
  },
  {
    id: "serialNumber",
    label: "S. No.",
    minWidth: 30,
    align: "center",
  },
  {
    id: "fullName",
    label: "Full Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
  },
  {
    id: "joinDate",
    label: "Join Date",
    minWidth: 100,
    align: "center",
  },

  {
    id: "phoneNumber",
    label: "Phone Number",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
];

export default function TeachersList({
  getTeacherId,
  createEmployee,
  changeSetActive,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [role, setRole] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState("");
  const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchRoles = () => {
    const role = sessionStorage.getItem("role");
    setRole(role);
  };
  const token = sessionStorage.getItem("token");

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getteachers`,
        options
      );

      if (!response.ok) {
        setLoading(false);
        setEmployees([]);
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      const updatedList = data.teachers.map((emp, index) => ({
        ...emp,
        serialNumber: index + 1,
      }));

      setEmployees(updatedList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchData();
  }, []);

  const deleteEmployeeId = async (id) => {
    const confirmDeletion = window.confirm(
      "Verification Successful ! Are you sure you want to delete this employee?"
    );
    // If the user confirms deletion, proceed with the delete request
    if (confirmDeletion) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Adjust the content type if needed
        },
        body: JSON.stringify({
          active: false, // Toggle the status
        }),
      };
      try {
        const response = await fetch(
          `${process.env.REACT_APP_FETCH_URL}/deleteTeacher/${id}`,
          options
        );
        const data = await response.json();
        if (!response.ok) {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
          throw new Error(`Request failed with status: ${response.status}`);
        }
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        fetchData();
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };
  const handleCloseModal = () => {
    setDeleteEmployeeModal(false);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    console.log(currentStatus, "status");
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: !currentStatus, // Toggle the status
        }),
      };
      const api = `${process.env.REACT_APP_FETCH_URL}/updatestatusofteacher/${id}`;
      const response = await fetch(api, options);
      const data = await response.json();
      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: data.message,
        });
        return;
      }
      Toast.fire({
        icon: "success",
        title: data.message,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const setEmployeeId = (id) => {
    getTeacherId(id);
  };

  const onClickDeleteEmployee = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this employee? This action is irreversible, and you will lose all associated data. Alternatively, you can choose to deactivate the employee."
    );

    if (!confirmDeletion) {
      return;
    }
    setDeleteId(id);
    setDeleteEmployeeModal(!deleteEmployeeModal);
  };

  useEffect(() => {
    setEmployees((prevEmp) => addSerialNumbers(prevEmp));
  }, []);

  const addSerialNumbers = (employee) => {
    return employee.map((emp, index) => ({
      ...emp,
      serialNumber: index + 1,
    }));
  };
  const addTeacher = () => {
    changeSetActive("AddTeacher");
  };

  const options = { year: "numeric", month: "numeric", day: "numeric" };

  return (
    <>
      <button onClick={addTeacher}>Add Teacher</button>
      {loading ? (
        <Loader />
      ) : (
        <>
          {employees.length === 0 ? (
            <>
              <div className="projects-not-found-container">
                <h1 className="not-found-text">No Employees Found </h1>
                <img
                  src={notfound}
                  alt="No Bills Found"
                  className="not-found-image"
                />
                <button className="add-project-button" onClick={addTeacher}>
                  Add Teacher
                </button>
              </div>
            </>
          ) : (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map(
                        (column) =>
                          // Check if column should be hidden
                          !column.hide && (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: "#293b51",
                                color: "#fff",
                                zIndex: 0,
                              }}
                            >
                              {column.label}
                            </TableCell>
                          )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees &&
                      employees.length > 0 &&
                      employees
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((employee) => (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={employee.id}
                            className="rowHover"
                          >
                            {columns.map(
                              (column) =>
                                !column.hide && (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.id === "serialNumber"
                                      ? employee[column.id]
                                      : column.id === "RoleName"
                                      ? employee[column.id]
                                      : column.id === "joinDate" &&
                                        employee[column.id]
                                      ? new Date(
                                          employee[column.id]
                                        ).toLocaleString(undefined, options)
                                      : employee[column.id]}
                                    {column.id === "actions" && (
                                      <div className="employee-list-actions-container">
                                        <MdEditSquare
                                          className="employee-list-edit-icon"
                                          onClick={() =>
                                            setEmployeeId(employee._id)
                                          }
                                        />
                                        {employee.status ? (
                                          <FaToggleOn
                                            className="employee-list-toggle-on-icon"
                                            onClick={() =>
                                              handleToggleStatus(
                                                employee._id,
                                                employee.status
                                              )
                                            }
                                          />
                                        ) : (
                                          <FaToggleOff
                                            className="employee-list-toggle-off-icon"
                                            onClick={() =>
                                              handleToggleStatus(
                                                employee._id,
                                                employee.status
                                              )
                                            }
                                          />
                                        )}
                                        <MdDelete
                                          className="employee-list-delete-icon"
                                          onClick={() =>
                                            onClickDeleteEmployee(
                                              employee._id,
                                              employee.active
                                            )
                                          }
                                        />
                                        <Modal
                                          open={deleteEmployeeModal}
                                          onClose={handleCloseModal}
                                          style={{
                                            width: "100%",
                                            backgroundColor: "transparent",
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              position: "relative",
                                              width: "500px",
                                              alignItems: "flex-start",
                                              height: "400px",
                                              overflow: "no-scroll",
                                              scrollbarWidth: "none",
                                              top: "50%",
                                              left: "50%",
                                              transform:
                                                "translate(-50%, -50%)",
                                              bgcolor: "background.paper",
                                              borderRadius: "8px",
                                              p: 1,
                                            }}
                                          >
                                            <DeleteEmploeeModalPage
                                              onClose={handleCloseModal}
                                              deleteEmployeeId={
                                                deleteEmployeeId
                                              }
                                              deleteId={deleteId}
                                            />
                                          </Box>
                                        </Modal>
                                      </div>
                                    )}
                                  </TableCell>
                                )
                            )}
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={employees.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}
        </>
      )}
    </>
  );
}
