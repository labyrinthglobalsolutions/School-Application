import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../../components/utlis/toast";
import AdminUpdatePassword from "../AdminUpdatePassword/AdminUpdatePassword";
import { Box, Modal } from "@mui/material";

const AdminProfile = ({ adminProfileUpdate }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cId, setCountryId] = useState("");
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);

  const [formData, setFormData] = useState({
    organizationName: "",
    description: "",
    industry: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    companyEmail: "",
    website: "",
    responsiblePerson: "",
    companyRegistrationNumber: "",
    packageId: "",
    packageName: "",
    startDate: "",
    endDate: "",
    noOfUsers: "",
  });
  const token = sessionStorage.getItem("token");
  const [companyLogo, setCompanyLogo] = useState("");

  const fetchUserData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const orgResponse = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/admin-userinfo`,
        options
      );
      const data = await orgResponse.json();
      const formattedStartDate = new Date(
        data.data.subscriptionDetails.startDate
      )
        .toISOString()
        .split("T")[0];
      const formattedEndDate = new Date(data.data.subscriptionDetails.endDate)
        .toISOString()
        .split("T")[0];
      setFormData({
        ...data.data.organization,
        noOfUsers: data.data.subscriptionDetails.noOfUsers,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onClickUpdatePassword = () => {
    setUpdatePasswordModal(!updatePasswordModal);
  };
  const handleCloseModal = () => {
    setUpdatePasswordModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setCompanyLogo(file);
  };

  const updateAdminDetails = () => {
    adminProfileUpdate();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      newFormData.append(key, value);
    });
    newFormData.append("companyLogo", companyLogo);
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: newFormData,
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
        adminProfileUpdate();
        fetchUserData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCountries = async () => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "bjNPeE1FZEZYRnhsUmo5ZzBRTWRPWHBaRGEzRWl4MWVKbmxWalYxTQ=="
    );
    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://api.countrystatecity.in/v1/countries",
        requestOptions
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryId) => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "bjNPeE1FZEZYRnhsUmo5ZzBRTWRPWHBaRGEzRWl4MWVKbmxWalYxTQ=="
    );
    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };
    setCountryId(countryId);
    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryId}/states/`,
        requestOptions
      );
      const data = await response.json();

      setStates(data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateId) => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "bjNPeE1FZEZYRnhsUmo5ZzBRTWRPWHBaRGEzRWl4MWVKbmxWalYxTQ=="
    ); // Replace YOUR_API_KEY with your actual API key

    const requestOptions = {
      method: "GET",
      headers: headers,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/${cId}/states/${stateId}/cities`,
        requestOptions
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountryId = e.target.value;
    const name = e.target.name;
    const value = e.target.value;
    if (selectedCountryId) {
      setFormData({ ...formData, [name]: value });
      fetchStates(selectedCountryId);
    } else {
      setStates([]);
      setCities([]);
    }
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    const name = e.target.name;
    const value = e.target.value;
    if (selectedStateId) {
      setFormData({ ...formData, [name]: value });
      fetchCities(selectedStateId);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    const name = e.target.name;
    const value = e.target.value;
    if (selectedCityId) {
      setFormData({ ...formData, [name]: value });
    } else {
      setCities([]);
    }
  };

  useEffect(() => {
    const selectCountry = () => {
      const selectedCountry = countries.find(
        (country) => country.iso2 === formData.country
      );

      if (selectedCountry) {
        setCountryId(selectedCountry.iso2);
        fetchStates(selectedCountry.iso2);
      }
    };

    selectCountry();
  }, [countries, formData.country]);

  useEffect(() => {
    const selectState = () => {
      const selectedState = states.find(
        (state) => state.iso2 === formData.state
      );
      if (selectedState) {
        fetchCities(selectedState.iso2);
      }
    };

    selectState();
  }, [states, formData.state]);

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div className="organization-form-main-container">
        <form
          className="organization-form-sub-container"
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="organization-form-main-heading">
              Update Organization
            </h1>
            <p
              style={{ marginRight: "100px", cursor: "pointer" }}
              onClick={onClickUpdatePassword}
            >
              Update Password?
            </p>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Organization Name
              </label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.organizationName}
                name="organizationName"
                placeholder="Enter Your Organization Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Industry</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.industry}
                name="industry"
                placeholder="Ex:IT,Medical"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Country</label>
              <select
                value={formData.country}
                onChange={handleCountryChange}
                className="organization-form-input-text"
                name="country"
              >
                {countries.map((country) => (
                  <option key={country.id} value={country.iso2}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">State</label>
              <select
                onChange={handleStateChange}
                className="organization-form-input-text"
                name="state"
                value={formData.state}
              >
                {states.map((state) => (
                  <option key={state.id} value={state.iso2}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">City</label>
              <select
                onChange={handleCityChange}
                className="organization-form-input-text"
                name="city"
                value={formData.city}
              >
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Address</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.address}
                name="address"
                placeholder="Ex:2-1/720,Hyderbad"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Postal Code
              </label>
              <input
                type="number"
                className="organization-form-input-text"
                value={formData.postalCode}
                name="postalCode"
                placeholder="Ex:500000"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Phone No</label>
              <input
                type="number"
                className="organization-form-input-text"
                value={formData.phone}
                name="phone"
                placeholder="Ex:9879879870"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Company Email
              </label>
              <input
                type="Email"
                className="organization-form-input-text"
                value={formData.companyEmail}
                name="companyEmail"
                placeholder="Ex:abc@company.com"
                // onChange={handleInputChange}
                readOnly
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Website</label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.website}
                name="website"
                placeholder="Ex:www.abc.com"
                onChange={handleInputChange}
              />
            </div>

            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Membership Plan
              </label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.packageName}
                readOnly
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Responsible Person
              </label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.responsiblePerson}
                name="responsiblePerson"
                placeholder="Ex:Name"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Registration Number
              </label>
              <input
                type="text"
                className="organization-form-input-text"
                value={formData.companyRegistrationNumber}
                name="companyRegistrationNumber"
                placeholder="Ex:Company registration number"
                onChange={handleInputChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Company Logo
              </label>
              <input
                type="file"
                className="organization-form-input-text"
                placeholder="Ex:Logo"
                name="companyLogo"
                onChange={handleFileChange}
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">Start date</label>
              <input
                value={formData.startDate}
                readOnly
                type="date"
                className="organization-form-input-text"
                name="startDate"
              />
            </div>
          </div>
          <div className="organization-form-input-flex-container">
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">End date</label>
              <input
                value={formData.endDate}
                readOnly
                type="date"
                name="endDate"
                className="organization-form-input-text"
              />
            </div>

            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                No of Users
              </label>
              <input
                value={formData.noOfUsers}
                readOnly
                name="noOfUsers"
                className="organization-form-input-text"
              />
            </div>
            <div className="organization-form-input-container">
              <label className="organization-form-label-name">
                Description
              </label>
              <textarea
                value={formData.description}
                placeholder="Enter the description about the company"
                onChange={handleInputChange}
                cols={16}
                rows={3}
                name="description"
                className="organization-form-input-text"
              />
            </div>
          </div>
          <div className="organization-form-submit-button-container">
            <button type="submit" className="organization-form-submit-button">
              UPDATE
            </button>
          </div>
        </form>
      </div>
      <Modal
        open={updatePasswordModal}
        onClose={handleCloseModal}
        style={{ width: "100%", backgroundColor: "transparent" }}
      >
        <Box
          sx={{
            position: "relative",
            width: "500px",
            alignItems: "flex-start",
            height: "450px",
            overflow: "no-scroll",
            scrollbarWidth: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 1,
          }}
        >
          <AdminUpdatePassword onClose={onClickUpdatePassword} />
        </Box>
      </Modal>
    </div>
  );
};

export default AdminProfile;
