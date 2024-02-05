import React, { useState,useEffect } from 'react';
import './ViewStats.css'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ViewStats() {

const [addAttendanceModalVisible, setAddAttendanceModalVisible] = useState(false);
const [editAttendanceModalVisible, setEditAttendanceModalVisible] = useState(false);

const [addDay, setAddDay] = useState('');
const [addMonth, setAddMonth] = useState('');
const [addYear, setAddYear] = useState('');
const [addStatus, setAddStatus] = useState('');
const { id } = useParams();


// const handleOpenAddAttendanceModal = (day) => {
//   // Set initial values for the form based on the clicked day
//   setAddDay(day);
//   setAddMonth(selectedMonth);
//   setAddYear(selectedYear);
//   setAddStatus('present');
//   setAddAttendanceModalVisible(true);
// };
const fetchEmployeeDetails = async (employeeId) => {
  try {
    const response = await axios.get(`http://localhost:8081/get/${employeeId}`);
    return response.data.Result[0]; // Assuming the employee details are in Result array
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching employee details');
  }
};


const handleOpenAddAttendanceModal = async (day) => {
  try {
    const employeeDetails = await fetchEmployeeDetails(id);

    const joiningDate = employeeDetails.date; // Replace 'date' with the actual column name

    const joiningDateStr = joiningDate ? new Date(joiningDate).toLocaleDateString('en-GB') : '';

    setAddDay(day);
    setAddMonth(selectedMonth);
    setAddYear(selectedYear);
    setAddStatus('present');

    // Compare selected date with joining date
    if (new Date(`${selectedYear}-${selectedMonth}-${day}`) < new Date(joiningDate)) {
      // Show an alert if the selected date is before the joining date
      alert(`Selected date is before the ${employeeData.name}'s  joining date : ${joiningDateStr}!`);
    } else {
      // Open the modal if the selected date is after or equal to the joining date
      setAddAttendanceModalVisible(true);
    }
  } catch (error) {
    console.error(error);
    // Handle the error as needed
  }
};


const handleOpenEditAttendanceModal = async(day) => {
  // Set initial values for the form based on the clicked day
  try {
    // Fetch attendance details for the selected date
    const attendanceDetails = await fetchAttendanceDetails(selectedYear, selectedMonth, day);
    console.log("Attendance Details: ", attendanceDetails);

    // Set initial values for the form based on the clicked day and fetched attendance details
    setAddDay(day);
    setAddMonth(selectedMonth);
    setAddYear(selectedYear);
    setAddStatus(attendanceDetails.Result[0].status);
    setEditAttendanceModalVisible(true);
  } 
  catch (error) {
    console.error(error);
    // Handle the error as needed
  }
};


const fetchAttendanceDetails = async (year, month, day) => {
  try {
    const response = await axios.get(`http://localhost:8081/getDayAttendance/${id}/${year}/${month}/${day}`);
    console.log("Atten  ",response);
    return response.data; // Assuming the API returns the attendance details
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching attendance details');
  }
};


const handleCloseAddAttendanceModal = () => {
  setAddAttendanceModalVisible(false);
};


const handleCloseEditAttendanceModal = () => {
  setEditAttendanceModalVisible(false);
};


const handleAddAttendance = async (e) => {
  e.preventDefault();

  try {
    const data = {
      day: addDay,
      month: addMonth,
      year: addYear,
      status: addStatus
    };

    // Make a POST request to submit the attendance
    const response = await axios.post(`http://localhost:8081/submitAttendance/${id}`, data);

    // Check the response and handle it accordingly
    if (response.data.success) {
      // Attendance successfully submitted
      console.log('Attendance submitted successfully');
      // Optionally, you can perform additional actions, such as updating the UI
    } else {
      // Handle errors or display a message to the user
      console.error('Failed to submit attendance');
    }
  } catch (error) {
    // Handle errors here
    console.error('Error submitting attendance:', error);
  } finally {
    // Close the modal after submitting or handle it according to your UI flow
    const fakeEvent = {
      preventDefault: () => {},  // Mocking preventDefault function
    };
    
    handleSubmit(fakeEvent);
    handleCloseAddAttendanceModal();
  }
};

const handleEditAttendance = async (e) => {
  e.preventDefault();

  try {
    const data = {
      day: addDay,
      month: addMonth,
      year: addYear,
      status: addStatus
    };

    // Make a PUT request to update the attendance based on ID, day, month, and year
    const response = await axios.put(`http://localhost:8081/updateAttendance/${id}/${addDay}/${addMonth}/${addYear}`, data);

    // Check the response and handle it accordingly
    if (response.data.success) {
      // Attendance successfully updated
      console.log('Attendance updated successfully');
      // Optionally, you can perform additional actions, such as updating the UI
    } else {
      // Handle errors or display a message to the user
      console.error('Failed to update attendance');
    }
  } catch (error) {
    // Handle errors here
    console.error('Error updating attendance:', error);
  } finally {
    // Close the modal after updating
    const fakeEvent = {
      preventDefault: () => {},  // Mocking preventDefault function
    };
    
    handleSubmit(fakeEvent);
    handleCloseEditAttendanceModal();
  }
};




    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [attendanceData, setAttendanceData] = useState([]);
    const [salary, setSalary] = useState(null);
    const[presentCount,setPresentCount]=useState(null);
    const [perDaySalary, setPerDaySalary] = useState(null);
    const[ndays,setDaysInMonth]=useState(0);


    const getDaysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December',
    ];

    
    

  const [employeeData, setEmployeeData] = useState({
    id: '',
    name: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8081/get/${id}`)
      .then(res => setEmployeeData(res.data.Result[0]))
      .catch(err => console.error(err));
  }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedMonth);
        console.log(selectedYear);
        try {
          
          const numericMonth = monthNames.indexOf(selectedMonth) + 1;
          const numericYear = parseInt(selectedYear, 10);
          const daysInMonth=getDaysInMonth(numericMonth,numericYear);
          // console.log("Number of days in month",ndays);
          // setDaysInMonth(ndays);
          // console.log("Global",{setDaysInMonth});
          setDaysInMonth(daysInMonth);
          
          const response = await axios.get(`http://localhost:8081/getAttendance/${id}`, {
            params: {
              month: selectedMonth,
              year: selectedYear
            }
          });
         
          setAttendanceData(response.data.Result);
          const presentCount = attendanceData.filter(record => record.status === 'present').length;
          // console.log(presentCount);
          setPresentCount(presentCount);
          const responseSalary = await axios.get(`http://localhost:8081/getSalary/${id}`);
          // console.log("Per day",responseSalary.data);
          setPerDaySalary(responseSalary.data.Salary);
          const totalSalary = (responseSalary.data.Salary)*presentCount;
          // console.log("Final Salary:",totalSalary);
          setSalary(totalSalary);
          console.log("Data Fetched");
        } 
        catch (error) {
          // Handle errors here
          console.error(error);
        }
      }

  return (
    <div>
    <div className="view-stats-container">
      <h3 style={{textAlign:'center'}}>Attendance Sheet</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="select-container">
          <label>
            Select Month:
            <select 
              className="select-input"
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
            <option value="Select">Select</option>
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
          </label>
          <label>
            Enter Year YYYY:
            <input 
              type="text" 
              className="select-input" 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              />
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        </form>
      
  </div>
   <div>
   <h2  className="table-header" style={{textAlign:'center',marginTop:'30px',fontStyle:'italic'}}>Attendance Data for {employeeData.name}</h2>
   <table className="attendance-table">
     <thead>
       <tr>
         <th>Day</th>
         <th>Month</th>
         <th>Year</th>
         <th>Status</th>
         <th>Action</th>
       </tr>
     </thead>
     <tbody>
 
       {Array.from({ length: ndays }, (_, index) => index + 1).map((day) => {
  const record = attendanceData.find((record) => record.day === day);
        // console.log("recorddd  ",day+" "+record);
  return (
    <tr key={day}>
      <td>{record ? record.day : day}</td>
      <td>{record ? record.month : selectedMonth}</td>
      <td>{record ? record.year : selectedYear}</td>
      <td className={record?.status === 'present' ? 'present-status' : (record?.status === 'absent' ? 'absent-status' : 'notmarked-status')}>
        {record ? record.status : 'not-marked'}
      </td>
      <td>
        {!record? (
          <button className="btn btn-warning" style={{ color: 'white' }} onClick={() => handleOpenAddAttendanceModal(day)}>Add</button>
        ) : (
          <button className="btn btn-info" style={{ color: 'white' }} onClick={() => handleOpenEditAttendanceModal(day)}>Edit</button>
          // or you can choose to render nothing here (empty JSX)
        )}
      </td>
    </tr>
  );
})}
{editAttendanceModalVisible && (
  <div className="edit-attendance-modal">
    <form onSubmit={handleEditAttendance}>
    <label>
    Date:
    <input type="text" value={`${addDay}/${addMonth}/${addYear}`} readOnly />
  </label>
      <label>
      Status:
        <select value={addStatus} onChange={(e) => setAddStatus(e.target.value)} style={{ fontSize: '22px' }}>
          <option value="present">present</option>
          <option value="absent">absent</option>
        </select>
      </label>
      <br></br>
      <button type="submit">Edit Attendance</button>

      <button type="button" onClick={handleCloseEditAttendanceModal} >Cancel</button>
    </form>
  </div>
)}

{addAttendanceModalVisible && (
  <div className="add-attendance-modal">
    <form onSubmit={handleAddAttendance}>
    <label>
    Date:
    <input type="text" value={`${addDay}/${addMonth}/${addYear}`} readOnly />
  </label>
      <label>
      Status:
        <select value={addStatus} onChange={(e) => setAddStatus(e.target.value)}  style={{ fontSize: '22px' }}>
          <option value="present">present</option>
          <option value="absent">absent</option>

        </select>
      </label>
      <br></br>
      <button type="submit">Add Attendance</button>
      <button type="button" onClick={handleCloseAddAttendanceModal}>Cancel</button>
    </form>
  </div>
)}


     </tbody>
      
   </table>
   <div style={{ 
  textAlign: 'center', 
  border: '1px solid #ccc', 
  padding: '20px', 
  borderRadius: '20px', 
  marginTop: '25px', 
  backgroundColor: '#f9f9f9',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
}}>
  <p style={{ margin: '0', fontWeight: 'bold', fontSize: '25px' ,color:'blue'}}>
    Salary for the selected month and year for employee:
  </p>
  <p style={{ margin: '0', fontSize: '18px',fontWeight: 'bold'}}>
    Total Salary: {salary}
  </p>
  <p style={{ margin: '0', fontSize: '18px',fontWeight: 'bold' }}>
    Number of Present Days: {presentCount}
  </p>
  <p style={{ margin: '0', fontSize: '18px' ,fontWeight: 'bold'}}>
    Per Day Salary: {perDaySalary}
  </p>
  

</div>

 </div>
 </div>
  )
}

export default ViewStats;