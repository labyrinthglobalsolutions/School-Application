import { useState, useEffect } from "react";
import { IoIosRocket } from "react-icons/io";
import { BsPersonFillAdd } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "@mui/material/Modal";
import { MdModeEdit } from "react-icons/md";
import Box from "@mui/material/Box";
import "./index.css";
import { ImCancelCircle } from "react-icons/im";
import Toast from "../utlis/toast";
import { Buffer } from "buffer";
import logo from "../../images/w_logo.png";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [date, updateDate] = useState(new Date());
  const [orgData, setOrgData] = useState({});
  const [profile, setProfile] = useState({});
  const [isModalOpen, setModal] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const navigate = useNavigate();

  const fetchImageUrl = process.env.REACT_APP_IMAGE_FETCH_URL;
  const fetchurl = process.env.REACT_APP_FETCH_URL;

  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const userApi = `${process.env.REACT_APP_FETCH_URL}/admin-userinfo`;
      const orgResponse = await fetch(userApi, options);
      const orgJson = await orgResponse.json();
      const organization = orgJson.data.organization;
      setProfile(organization.companyLogo);
      setOrgData(organization);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    const intervalId = setInterval(() => {
      ticking();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const ticking = () => {
    updateDate(new Date());
  };

  const handleCloseModal = () => {
    setModal(!isModalOpen);
  };
  const handleEditModal = () => {
    setEditModal(!isEditModalOpen);
  };

  const changeValue = (event) => {
    setOrgData({
      ...orgData,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    setProfile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    const form = event.currentTarget;
    const formData = new FormData();

    Object.entries(orgData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    formData.append("companyLogo", profile);
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // Use the FormData directly as the body
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/update-admin-profile-details`,
        options
      );
      if (response.ok === true) {
        const responseData = await response.json();
        Toast.fire({
          icon: "success",
          title: responseData.message,
        });
        setEditModal(!isEditModalOpen);
        fetchUserData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const encodeObjectId = (objectId) => {
    return Buffer.from(objectId.toString()).toString("base64");
  };
  const upgradePlan = async () => {
    const token = sessionStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_FETCH_URL}/onClickUpgradePackage`,
      options
    );
    const data = await response.json();
    navigate(`/PricingSelectionPage/${encodeObjectId(data.data)}`);
  };

  return (
    <nav className="user-navbar-main-nav-container">
      <div className="user-navbar-mini-nav-container">
        <div className="user-navbar-organization-name-searchbar-main-container">
          <img src={logo} alt="product-logo" className="product-image" />
        </div>
        {/* <div className="user-navbar-date-main-container">
          <span>{date.toLocaleTimeString()}</span>
        </div> */}

        <div className="employee-navbar-username-main-container">
          {/* <button
            className="user-navbar-upgrade-btn-main-container"
            onClick={upgradePlan}
          >
            <IoIosRocket />
            <p className="user-navbar-text">Upgrade</p>
          </button> */}
          <p className="employee-navbar-text">{orgData.responsiblePerson}</p>

          <img
            src={`${fetchImageUrl}/${profile}`}
            alt={orgData.responsiblePerson}
            className="user-info-navbar-logo"
          />
        </div>
        {/* AdminPoPUp */}
        <Modal
          open={isEditModalOpen}
          onClose={handleEditModal}
          style={{ width: "100%" }}
        >
          <Box
            sx={{
              position: "absolute",
              width: "60%",
              height: "400px",
              overflow: "scroll",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              borderRadius: "8px",
              p: 3,
            }}
          >
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <ImCancelCircle
                onClick={handleEditModal}
                style={{ color: "red", fontSize: "21px", cursor: "pointer" }}
              />
            </div>
            <div className="profile-edit-main-container">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group
                    as={Col}
                    controlId="validationCustom09"
                    md="4"
                    sm="6"
                    xs="12"
                  >
                    <label
                      className="employee-add-label"
                      htmlFor="validationCustom09"
                    >
                      Responsible Person
                    </label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Full Name"
                      value={orgData.responsiblePerson}
                      onChange={changeValue}
                      required
                      className="employee-add-input"
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    controlId="validationCustom09"
                    md="4"
                    sm="6"
                    xs="12"
                  >
                    <label
                      className="employee-add-label"
                      htmlFor="validationCustom09"
                    >
                      Phone Number
                    </label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      placeholder="Enter Your Full Name"
                      value={orgData.phone}
                      onChange={changeValue}
                      required
                      className="employee-add-input"
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    sm="6"
                    xs="12"
                    controlId="validationCustom03"
                  >
                    <label
                      htmlFor="validationCustom03"
                      className="employee-add-label"
                    >
                      Password
                    </label>
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={changeValue}
                      placeholder="Enter Your Password"
                      className="employee-add-input"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    md="4"
                    sm="6"
                    xs="12"
                    controlId="validationCustom08"
                  >
                    <label
                      htmlFor="validationCustom08"
                      className="employee-add-label"
                    >
                      Profile Pic
                    </label>
                    <Form.Control
                      type="file"
                      name="profilePic"
                      onChange={handleProfilePicChange}
                      placeholder="Type your Remark"
                      className="employee-add-input"
                    />

                    <Form.Control.Feedback type="invalid">
                      Please provide Your Image.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className="update-profile-button-container">
                  <button
                    type="submit"
                    className="update-profile-submit-button"
                  >
                    UPDATE
                  </button>
                </div>
              </Form>
            </div>
          </Box>
        </Modal>
      </div>
    </nav>
  );
};

export default AdminNavbar;
