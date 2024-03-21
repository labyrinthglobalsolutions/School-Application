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
// import DeleteEmploeeModalPage from "./verifyAdmin";

const columns = [
  {
    id: "_id",
    label: "ID",
    hide: true,
  },
  {
    id: "class",
    label: "class",
    minWidth: 30,
    align: "center",
  },
  {
    id: "tuitionFee",
    label: "Tuition Fee",
    minWidth: 100,
    align: "center",
  },
  {
    id: "transportationFee",
    label: "Transportation Fee",
    minWidth: 100,
    align: "center",
  },
  {
    id: "booksFee",
    label: "Books Fee",
    minWidth: 100,
    align: "center",
  },
  {
    id: "examFee",
    label: "Exam Fee",
    minWidth: 100,
    align: "center",
  },

  {
    id: "uniformFee",
    label: "Uniform Fee",
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

export default function FeeDetailsList({ getFeeDetailsId, addFeeDetails }) {
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
        `${process.env.REACT_APP_FETCH_URL}/getFeeList`,
        options
      );

      if (!response.ok) {
        setLoading(false);
        setEmployees([]);
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      const updatedList = data.feeList.map((emp, index) => ({
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

  const handleCloseModal = () => {
    setDeleteEmployeeModal(false);
  };

  const setEmployeeId = (id) => {
    getFeeDetailsId(id);
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
  const addFee = () => {
    addFeeDetails("AddFeeDetails");
  };
  const options = { year: "numeric", month: "numeric", day: "numeric" };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="global-add-button-container">
            <button onClick={addFee} className="global-add-button">
              Add Fee
            </button>
          </div>
          {employees.length === 0 ? (
            <>
              <div className="projects-not-found-container">
                <h1 className="not-found-text">No Fees Found </h1>
                <img
                  src={notfound}
                  alt="No Bills Found"
                  className="not-found-image"
                />
                <button className="add-project-button" onClick={addFee}>
                  Add fee
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
                                            {/* <DeleteEmploeeModalPage
                                              onClose={handleCloseModal}
                                              deleteEmployeeId={
                                                deleteEmployeeId
                                              }
                                              deleteId={deleteId}
                                            /> */}
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
