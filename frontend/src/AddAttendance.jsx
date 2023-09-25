import React, { useState,useEffect } from 'react';
import './AddAttendance.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAttendance = () => {

  const { id } = useParams();

  const [data,setData] = useState({
    month: 'January',
    day: '',
    year: '',
    status: 'present'
  });

  const navigate=useNavigate()

  const handleSubmit = async(e)=>{
    console.log("Valuessss",data); // Add this line
    e.preventDefault();
    
     axios.post(`http://localhost:8081/submitAttendance/${id}`,data)
    .then(res =>{
        if (res.data.Status === "Success") {
          alert('Attendance for employee added!');
            navigate('/attendance');
        }
    })
    .catch(err => console.log(err));
};



  const [employeeData, setEmployeeData] = useState({
    id: '',
    name: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/get/${id}`)
      .then(res => setEmployeeData(res.data.Result[0]))
      .catch(err => console.error(err));
  }, [id]);



  return (
    <div>
        <br></br>
        <h4 style={{color:'blueviolet'}} >Mark attendance for {employeeData.name}</h4>
    <div className="attendance-form">
      <h3>Record Attendance</h3>
      <form onSubmit={handleSubmit}>
       
        <div className="form-group">
          <label>Day:</label>
          <input
            type="text"
            name="day"
            id="inputDay"
            onChange={e=>setData({...data,day:e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Month:</label>
          <select
            type="text"
            name="month"
            onChange={e=>setData({...data,month:e.target.value})}
            required
          >
            
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>

          </select>
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input
            type="text"
            name="year"
            onChange={e=>setData({...data,year:e.target.value})}
            required
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select
            type="text"
            name="status"
            onChange={e=>setData({...data,status:e.target.value})}
            required
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>

          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Attendance</button>
      </form>
    </div>
    </div>
  );
};

export default AddAttendance;
