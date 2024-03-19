import React, { useState, useEffect } from "react";
import Toast from "../../components/utlis/toast";
import { useNavigate } from "react-router-dom";
import "./OrganizationSignup.css";
import { Buffer } from "buffer";
import Header from "../../components/Home/Header";
import Footer from "../../components/Home/Footer";

const OrganizationSignup = ({ setUpdate }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [cId, setCountryId] = useState("");
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
    password: "",
    website: "",
    responsiblePerson: "",
    companyRegistrationNumber: "",
    packageId: "",
  });
  const [companyLogo, setCompanyLogo] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setCompanyLogo(file); // Update the state with the selected file
  };
  const encodeObjectId = (objectId) => {
    return Buffer.from(objectId.toString()).toString("base64");
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });
    form.append("companyLogo", companyLogo);
    const options = {
      method: "POST",
      body: form,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/RegisterOrganizationSelf`,
        options
      );

      if (response.ok) {
        const data = await response.json();
        Toast.fire({
          icon: "success",
          title: data.message,
        });
        const encodeId = encodeObjectId(data.organizationId);
        if (encodeId === undefined) {
          navigate("/");
        }
        navigate(`/PricingSelectionPage/${encodeId}`);
        setUpdate();
      } else {
        console.error("Error sending data to server:", response.statusText);
        const data = await response.json();
        Toast.fire({
          icon: "error",
          title: data.message,
        });
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const navigate = useNavigate();

  const fetchCountries = async () => {
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
    ); // Replace YOUR_API_KEY with your actual API key

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
    fetchCountries();
  }, []);
  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        {/* <SideBar /> */}
        <div className="organization-form-main-container">
          <form
            className="organization-form-sub-container"
            onSubmit={handleFormSubmit}
          >
            <h1
              style={{
                marginTop: "25px",
                textAlign: "center",
                color: "#293b51",
              }}
              className="organization-form-main-heading"
            >
              Register Your Organization
            </h1>
            <div
              style={{ marginTop: "35px" }}
              className="organization-form-input-flex-container"
            >
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
                  required
                />
              </div>
              <div className="organization-form-input-container">
                <label className="organization-form-label-name">
                  Industry Type
                </label>
                <input
                  type="text"
                  className="organization-form-input-text"
                  value={formData.industry}
                  name="industry"
                  placeholder="Ex:IT,Medical"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="organization-form-input-container">
                <label className="organization-form-label-name">Country</label>
                <select
                  onChange={handleCountryChange}
                  className="organization-form-input-text"
                  name="country"
                >
                  <option value="">Select Country</option>
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
                >
                  <option value="">Select State</option>
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
                >
                  <option value="">Select City</option>
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
            </div>
            <div className="organization-form-input-flex-container">
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
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="organization-form-input-container">
                <label className="organization-form-label-name">Website</label>
                <input
                  type="text"
                  className="organization-form-input-text"
                  value={formData.website}
                  name="website"
                  placeholder="Ex:www.abc.com"
                  onChange={handleInputChange}
                  required
                />
              </div>
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
                  required
                />
              </div>
            </div>
            <div className="organization-form-input-flex-container">
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
                <label className="organization-form-label-name">
                  Create Password
                </label>
                <input
                  type="password"
                  className="organization-form-input-text"
                  value={formData.password}
                  name="password"
                  placeholder="Enter Password"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="organization-form-input-container">
                <label className="organization-form-label-name">
                  Description
                </label>
                <textarea
                  placeholder="Enter the description about the company"
                  style={{ border: "2px solid black" }}
                  className="organization-form-input-text-area"
                  onChange={handleInputChange}
                  cols={12}
                  rows={3}
                  name="description"
                />
              </div>
            </div>

            <div className="organization-sign-up-form-submit-button-container">
              <button
                type="submit"
                style={{ backgroundColor: "#293b51" }}
                className="organization-form-submit-button"
              >
                Signup
              </button>
              <p
                onClick={() => navigate("/login")}
                className="organization-sign-up-have-account"
              >
                Already have an account? Login
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrganizationSignup;
