import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './EditEmployee.css'

function EditEmployee() {
  const { id } = useParams();

  const navigate=useNavigate()


  const [employee, setEmployee] = useState({
    name: '',
    salary: '',
    weekday: '',
    joiningDate: null
  });

  useEffect(() => {
    // Fetch employee details based on the id
    axios.get(`http://localhost:8081/get/${id}`)
      .then(res => {
        const employeeData = res.data.Result[0];
        setEmployee({
          name: employeeData.name,
          salary: employeeData.salary,
          weekday: employeeData.day,
          joiningDate: new Date(employeeData.date)
        });
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleDateChange = date => {
    setEmployee(prevEmployee => ({
      ...prevEmployee,
      joiningDate: date,
      weekday: date ? new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) : ''
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Make the API call to update employee details
    axios.put(`http://localhost:8081/update/${id}`, {
      name: employee.name,
      joiningDate: employee.joiningDate,
      weekday: employee.weekday,
      salary: employee.salary
    })
      .then(res => {
        if (res.data.Status === 'Success') {
          // Handle success, e.g., redirect to employee list page
          navigate('/employee');


        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="edit-employee-body">
    <form onSubmit={handleSubmit} className="edit-employee-container">
      <div>
        <label className="edit-employee-label">Name:</label>
        <input
          type="text"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          className="edit-employee-input"
        />
      </div>
      <div>
        <label className="edit-employee-label">Date of Joining:</label>
        <DatePicker
          selected={employee.joiningDate}
          onChange={handleDateChange}
          dateFormat="dd-MM-yyyy"
          className="edit-employee-input"
        />
      </div>
      <div>
        <label className="edit-employee-label">Weekday:</label>
        <input
          type="text"
          value={employee.weekday}
          readOnly
          className="edit-employee-input"
        />
      </div>
      <div>
        <label className="edit-employee-label">Salary:</label>
        <input
          type="text"
          value={employee.salary}
          onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
          className="edit-employee-input"
        />
      </div>
      <button type="submit" className="edit-employee-button">
        Update
      </button>
    </form>
  </div>
  );
}

export default EditEmployee;
