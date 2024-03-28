import {useState} from 'react'
import './index.css'
import Toast from '../../components/utlis/toast';

const AddSubject = ()=>{

    const [subject,setSubject] = useState("")

    const token = sessionStorage.getItem("token");


    const handleAddSubject= async()=>{
      console.log(subject,"subject")
      console.log(`${JSON.stringify(subject)}`);
        try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/addSubject`,
        {
          method: "POST",
          headers: {
            'Content-type':'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subject }),
        }
      );
      const responseData = await response.json();

      console.log(responseData, "responseData");

      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: responseData.message,
        });
        return 
      }

      setSubject("")

      Toast.fire({
        icon: "success",
        title: responseData.message,
      });

    } catch (error) {
      console.error("Error adding subject:", error.message);
      Toast.fire({
        icon: "error",
        title: error.message,
      });
    }
    }

    return (
      <div className="add-subject-main-container">
        <div className="add-subject-sub-container">
          <input
            type=""
            placeholder="Add Your Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="add-subject-input-field"
          />
          <button className="add-subject-button" onClick={handleAddSubject}>Add</button>
        </div>
      </div>
    );
    }
export default AddSubject