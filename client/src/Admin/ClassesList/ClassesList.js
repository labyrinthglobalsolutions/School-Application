import React, { useState } from "react";
import Toast from "../../components/utlis/toast";

const ClassesList = () => {
  const [isAdd, setAddClass] = useState(false);
  const [data, setClassName] = useState({
    className: "",
    sectionName: "",
  });

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

  return (
    <div>
      <div>
        <button onClick={() => setAddClass(true)}>Add class</button>
        {isAdd && (
          <div>
            <input
              type="text"
              value={data.className}
              name="className"
              placeholder="Class Name"
              onChange={(event) => handleChange(event)}
            />
            <input
              type="text"
              name="sectionName"
              value={data.sectionName}
              placeholder="section name"
              onChange={(event) => handleChange(event)}
            />
            <button onClick={addClass}>Add</button>
          </div>
        )}
      </div>
      <div>
        <h1>Classes</h1>
        <div>
          <p>ClassName: Venu</p>
        </div>
      </div>
    </div>
  );
};

export default ClassesList;
