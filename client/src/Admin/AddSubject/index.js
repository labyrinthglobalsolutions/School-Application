import {useState} from 'react'
import './index.css'

const AddSubject = ()=>{

    const [subject,setSubject] = useState("")

    return (
      <div className="add-subject-main-container">
        <div className="add-subject-sub-container">
          <input
            type=""
            placeholder="Add Your Subject"
            value="subject"
            onChange={(e) => setSubject(e.target.value)}
            className="add-subject-input-field"
          />
          <button>Add</button>
        </div>
      </div>
    );
}
export default AddSubject