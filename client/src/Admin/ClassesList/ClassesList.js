import React, { useEffect, useState } from "react";
import Toast from "../../components/utlis/toast";
import notfound from "../../images/not-found.png";

import "./ClassesList.css";

const ClassesList = () => {
  const [isAdd, setAddClass] = useState(false);
  const [data, setClassName] = useState({
    className: "",
    sectionName: "",
    noOfPeriods: "",
  });

  const [classes, setClasses] = useState([]);

  const addClass = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/addClass`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const classes = await response.json();

      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: classes.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: classes.message,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClassName({ ...data, [name]: value });
  };

  const getClasses = async () => {
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getClasses`,
        options
      );
      const data = await response.json();
      setClasses(data.classes);
    } catch (error) {}
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <div>
      <div>
        <div className="classes-add-button-container">
          <button
            onClick={() => setAddClass(!isAdd)}
            className="classes-add-button"
          >
            Add class
          </button>
        </div>
        {isAdd && (
          <div className="classes-add-form-container">
            <input
              type="text"
              value={data.className}
              name="className"
              className="classes-add-input"
              placeholder="Class Name"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="text"
              name="sectionName"
              value={data.sectionName}
              className="classes-add-input"
              placeholder="section name"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="text"
              name="noOfPeriods"
              value={data.noOfPeriods}
              className="classes-add-input"
              placeholder="No Of Periods"
              onChange={(event) => handleChange(event)}
            />
            <button onClick={addClass} className="classes-add-button">
              Add
            </button>
          </div>
        )}
      </div>
      <div>
        {/* <h1 className="app-main-heading-2">Classes</h1> */}
        <div className="classes-add-card-container ">
          {classes.length>0 ? (
            classes.map((el) => (
            <div className="classes-add-card">
              <p className="class-add-class-name">
                Class :{" "}
                <span className="class-add-span">{el.className}</span>
              </p>
              <p className="class-add-class-name">
                Section :
                <span className="class-add-span"> {el.sectionName}</span>
              </p>
              <p className="class-add-class-name">
                No.Of Periods :
                <span className="class-add-span"> {el.noOfPeriods}</span>
              </p>
            </div>
          ))):
          <div className="projects-not-found-container">
                <h1 className="not-found-text">No Class Found </h1>
                <img
                  src={notfound}
                  alt="No Bills Found"
                  className="not-found-image"
                />
                
              </div>
            
          }
        </div>
      </div>
    </div>
  );
};

export default ClassesList;
