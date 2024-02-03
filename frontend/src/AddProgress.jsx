import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function AddProgress(){


    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [progressData, setProgressData] = useState([]);
    const [progressDayData, setProgressDayData] = useState([]);

    const [addDay, setAddDay] = useState('');
    const [addMonth, setAddMonth] = useState('');
    const [addYear, setAddYear] = useState('');
    const [addPacked, setAddPacked] = useState('');
    const [addSizeno, setAddSizeno] = useState('');
    const [addValue, setAddValue] = useState('');
    const [addQuantity, setAddQuantity] = useState('');
    const [sizes, setSizes] = useState([]);
    const[employees,setEmployees]=useState([]);

    
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [isEntryModalOpen,setEntryModalOpen]=useState(false);
    const [isDeleteEntryModalOpen,setDeleteEntryModalOpen]=useState(false);
    const [selectedEntryId,setSelectedEntryId] =useState('');
    const [selectedDeleteEntryId,setSelectedDeleteEntryId] =useState('');



    const { id } = useParams();

    const handleEntrySelect = (selectedId) => {
      setSelectedEntryId(selectedId);
      console.log("Selected Entryyyy  ",selectedEntryId);
    };

    const handleDeleteEntrySelect = (selectedDeleteId) => {
      setSelectedDeleteEntryId(selectedDeleteId);
      console.log("Selected Entryyyy  ",selectedDeleteId);
    };
    

    const handleDeleteClick = async(day) => {
      const isConfirmed = window.confirm(`Are you sure you want to delete progress for ${employeeData.name} ?`);
    
      if (isConfirmed) {

        // console.log("data deleted ");
        // console.log("iddd  ",id);
        // console.log("data before ",progressDayData[selectedDeleteEntryId-1].day);
        // console.log("data before ",progressDayData[selectedDeleteEntryId-1].month);
        // console.log("data before ",progressDayData[selectedDeleteEntryId-1].year);
        // console.log("data before ",progressDayData[selectedDeleteEntryId-1].quantity);
        // console.log("data before ",progressDayData[selectedDeleteEntryId-1].sizeno);
        // console.log("data before ",progressDayData[selectedDeleteEntryId-1].value);
        // console.log("data before ",progressDayData[selectedDeleteEntryId-1].packed);

       
        try {


          const response = await axios.delete(`http://localhost:8081/deleteProgress/${id}/${progressDayData[selectedDeleteEntryId-1].day}/${progressDayData[selectedDeleteEntryId-1].month}/${progressDayData[selectedDeleteEntryId-1].year}/${progressDayData[selectedDeleteEntryId-1].quantity}/${progressDayData[selectedDeleteEntryId-1].sizeno}/${progressDayData[selectedDeleteEntryId-1].value}/${progressDayData[selectedDeleteEntryId-1].packed}`);
          if (response.data.Status === "Success") {
            console.log("deleted");
            const fakeEvent = {
              preventDefault: () => {},  // Mocking preventDefault function
            };
            
            handleSubmit(fakeEvent);
          } else {
            alert("Error");
          }
          closeDeleteEntryModal();
        } catch (error) {
          console.error(error.message);
          // Handle any additional error handling as needed
        }
      } else {
        // Handle the case where the user cancels the delete action
        console.log('Delete canceled');
      }
    };

    const openEntryModal = async(day) =>{
      try {
        const response = await axios.get(`http://localhost:8081/getDayProgress/${id}/${day}/${selectedMonth}/${selectedYear}`);
        console.log("My response", response.data);
        const progressDayData = response.data.Result;
        setProgressDayData(progressDayData);
      
       
          console.log("Data ",progressDayData);
          setEntryModalOpen(true);
        
      }
      catch (error) {
        console.error('Error fetching progress data:', error);
      }
    }


    const openDeleteEntryModal = async(day) =>{
      try {
        const response = await axios.get(`http://localhost:8081/getDayProgress/${id}/${day}/${selectedMonth}/${selectedYear}`);
        console.log("My response", response.data);
        const progressDayData = response.data.Result;
        setProgressDayData(progressDayData);
      
       
          console.log("Data ",progressDayData);
          setDeleteEntryModalOpen(true);
        
      }
      catch (error) {
        console.error('Error fetching progress data:', error);
      }
    }
    
    const openViewModal= async (day) =>{
      try {
        const response = await axios.get(`http://localhost:8081/getDayProgress/${id}/${day}/${selectedMonth}/${selectedYear}`);
        console.log("My response", response.data);
        const progressDayData = response.data.Result;
        console.log("Overalll Data",progressDayData)
    
        if (progressDayData.length > 0) {
          setViewModalOpen(true);
          setProgressDayData(progressDayData);
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }  
     };



      const closeViewModal = () => {
        setViewModalOpen(false);
      };

      const closeEntryModal =()=>{
        setEntryModalOpen(false);
      }

      const closeDeleteEntryModal=()=> {
        setDeleteEntryModalOpen(false);
      }


    const openModal = (day) => {
      setAddDay(day);
      setAddMonth(selectedMonth);
      setAddYear(selectedYear);
      setAddPacked('');
      setAddSizeno('');
      setAddValue('');
      setAddQuantity('');
      setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };

      const openEditModal = async (day) => {
        closeEntryModal();
       
        try {
          
              const firstRecord = progressDayData[selectedEntryId-1];
            
            setAddDay(firstRecord.day);
            setAddMonth(selectedMonth);
            setAddYear(selectedYear);
            setAddPacked(firstRecord.packed);
            setAddSizeno(firstRecord.sizeno);
            setAddValue(firstRecord.value);
            setAddQuantity(firstRecord.quantity);
            console.log("Data ",progressDayData);
            setEditModalOpen(true);
          
        }
        catch (error) {
          console.error('Error fetching progress data:', error);
        }
      };


        const closeEditModal = () => {
          setEditModalOpen(false);
        };
      
      useEffect(() => {
        // Fetch sizes from your backend
        const fetchSizes = async () => {
          try {
            const response = await axios.get('http://localhost:8081/getSizes');
            setSizes(response.data.Result);
          } 
          catch (error) {
            console.error('Error fetching sizes:', error.message);
          }
        };
    
        fetchSizes();
      }, []);


      useEffect(() => {
        // Fetch employees from your backend
        const fetchEmployees = async () => {
          try {
            const response = await axios.get('http://localhost:8081/getEmployee');
            setEmployees(response.data.Result);
          } 
          catch (error) {
            console.error('Error fetching employees', error.message);
          }
        };
    
        fetchEmployees();
      }, []);

    

    const[ndays,setDaysInMonth]=useState(0);
    
    const getDaysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
      };
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December',
      ];

      const handleProgressSubmit = async () => {
        try {
          // Assuming you have a unique identifier 'id' and other data
        
          const data = {
            day: addDay,
            month: addMonth,
            year: addYear,
            packed: addPacked,
            sizeno: addSizeno,
            value: addValue,
            quantity: addQuantity,
          };
    
          const response = await axios.post(`http://localhost:8081/submitProgress/${id}`, data);
    
          // Handle success, maybe close the modal or perform additional actions
          console.log('Progress submitted successfully:', response.data);
    
          // Close the modal or perform any other actions as needed
          setModalOpen(false);
          const fakeEvent = {
            preventDefault: () => {},  // Mocking preventDefault function
          };
          
          handleSubmit(fakeEvent);

        } 
        catch (error) {
          // Handle error, maybe show a message to the user
          console.error('Error submitting progress:', error.message);
        }
      };

      const handleProgressEdit = async () => {
      
        try {
          const data = {
            day: addDay,
            month: addMonth,
            year: addYear,
            quantity: addQuantity,
            packed:addPacked,
            sizeno:addSizeno,
            value:addValue
          };
      
          // Make a PUT request to update the attendance based on ID, day, month, and year
          console.log("new data ", data);
          console.log("iddd  ",id);
          console.log("data before ",progressDayData[selectedEntryId-1].day);
          console.log("data before ",progressDayData[selectedEntryId-1].month);
          console.log("data before ",progressDayData[selectedEntryId-1].year);
          console.log("data before ",progressDayData[selectedEntryId-1].quantity);
          console.log("data before ",progressDayData[selectedEntryId-1].sizeno);
          console.log("data before ",progressDayData[selectedEntryId-1].value);
          console.log("data before ",progressDayData[selectedEntryId-1].packed);

          const response = await axios.put(`http://localhost:8081/updateProgress/${id}/${progressDayData[selectedEntryId-1].day}/${progressDayData[selectedEntryId-1].month}/${progressDayData[selectedEntryId-1].year}/${progressDayData[selectedEntryId-1].quantity}/${progressDayData[selectedEntryId-1].sizeno}/${progressDayData[selectedEntryId-1].value}/${progressDayData[selectedEntryId-1].packed}`, data);
          // console.log("Response",response);
      
          // Check the response and handle it accordingly
          if (response.data.success) {
            // Attendance successfully updated
            console.log('Progress updated successfully');
            // Optionally, you can perform additional actions, such as updating the UI
          } else {
            // Handle errors or display a message to the user
            console.error('Failed to update progress');
          }
        } catch (error) {
          // Handle errors here
          console.error('Error updating progress:', error);
        } finally {
          // Close the modal after updating
          setEditModalOpen(false)       
          const fakeEvent = {
            preventDefault: () => {},  // Mocking preventDefault function
          };
          
          handleSubmit(fakeEvent);
         }
      };
      
      


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedMonth);
        console.log(selectedYear);
        try {
          
          const numericMonth = monthNames.indexOf(selectedMonth) + 1;
          const numericYear = parseInt(selectedYear, 10);
          const daysInMonth=getDaysInMonth(numericMonth,numericYear);
         
          setDaysInMonth(daysInMonth);
          const response = await axios.get(`http://localhost:8081/getProgress/${id}`, {
            params: {
              month: selectedMonth,
              year: selectedYear
            }
          });
          setProgressData(response.data.Result);
        } 
        catch (error) {
          // Handle errors here
          console.error(error);
        }
      }


      const [employeeData, setEmployeeData] = useState({
        id: '',
        name: ''
      });
    
      useEffect(() => {
        axios.get(`http://localhost:8081/get/${id}`)
          .then(res => setEmployeeData(res.data.Result[0]))
          .catch(err => console.error(err));
      }, [id]);

      useEffect(() => {
        // Calculate value based on quantity and selected size number
        const calculateValue = () => {
          const selectedSize = sizes.find((size) => size.sizeno === addSizeno);
          if (selectedSize) {
            const rawValue = selectedSize.sizecode * addQuantity;
            const roundedValue = parseFloat(rawValue.toFixed(2));
            setAddValue(roundedValue);
          }
        };
    
        calculateValue();
      }, [addSizeno, addQuantity, sizes]);


    
    return(
        <div>
    <div className="view-stats-container">
      <h3 style={{textAlign:'center'}}>Track Progress</h3>
      
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
   <h2  className="table-header" style={{textAlign:'center',marginTop:'30px',fontStyle:'italic'}}>Progress Data for {employeeData.name}</h2>
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
     

{Array.from({ length: ndays }, (_, index) => {
  const day = index + 1;
  const record = progressData.find((record) => record.day === day);

  return (
    <tr key={day}>
      <td>{record ? record.day : day}</td>
      <td>{record ? record.month : selectedMonth}</td>
      <td>{record ? record.year : selectedYear}</td>
      <td>
        {record ? (
          <button className="btn btn-success" style={{ color: 'white' }} onClick={() => openViewModal(day)}>View</button>
        ) : (
          <span style={{ fontWeight: 'bold', color: 'black' }}>Not Marked</span>
        )}
      </td>
      <td>
        {!record ? (
          <button className="btn btn-warning" style={{ backgroundColor: '#1565C0', color: 'white', border: '1px solid #1565C0', transition: 'background-color 0.3s' }} 
          onMouseOver={(e) => e.target.style.backgroundColor='#42A5F5'}
          onMouseOut={(e) => e.target.style.backgroundColor='#1565C0'}
          onClick={() => openModal(day)}>Add</button>
        ) : (
          <buttons>
         <button className="btn btn-danger" style={{ color: 'white' }} onClick={() => openEntryModal(day)}>Edit</button>
<span style={{ marginRight: '10px' }}></span>
<button className="btn btn-info" style={{ color: 'white', backgroundColor: 'purple', borderColor: 'purple' }} onMouseOver={(e) => e.target.style.backgroundColor = 'darkorchid'} onMouseOut={(e) => e.target.style.backgroundColor = 'purple'} onClick={() => openDeleteEntryModal(day)}>Delete</button>
<span style={{ marginRight: '10px' }}></span>

<button className="btn btn-warning" style={{ backgroundColor: '#1565C0', color: 'white', border: '1px solid #1565C0', transition: 'background-color 0.3s' }} 
          onMouseOver={(e) => e.target.style.backgroundColor='#42A5F5'}
          onMouseOut={(e) => e.target.style.backgroundColor='#1565C0'}
          onClick={() => openModal(day)}>Add</button>
          </buttons>
        )}
      </td>
    </tr>
  );
})}

{/* delete entry modal */}


{isDeleteEntryModalOpen && (
        <div className="progress-modal-overlay">
          <div className="progress-modal-content">

            <span className="progress-close" onClick={closeDeleteEntryModal}>&times;</span>
            <label htmlFor="selectEntry">Select Serial Number:</label>
<select
  id="selectEntry"
  value={selectedDeleteEntryId}
  onChange={(e) => handleDeleteEntrySelect(e.target.value)}
>
  <option value="">Select Entry</option>
  {progressDayData.map((entry, index) => (
    <option key={index} value={index + 1}>
      {index + 1}
    </option>
  ))}
</select>


            <div className="progress-button-container"  style={{marginTop:'20px'}}>
              <button className="progress-add-button" onClick={handleDeleteClick} >Delete Progress</button>
              <button className="progress-cancel-button" onClick={closeDeleteEntryModal}>Cancel</button>
            </div>
          </div>
        </div>
      )} 


{/* edit entry modal */}




{isEntryModalOpen && (
        <div className="progress-modal-overlay">
          <div className="progress-modal-content">

            <span className="progress-close" onClick={closeEntryModal}>&times;</span>
            <label htmlFor="selectEntry">Select Serial Number:</label>
<select
  id="selectEntry"
  value={selectedEntryId}
  onChange={(e) => handleEntrySelect(e.target.value)}
>
  <option value="">Select Entry</option>
  {progressDayData.map((entry, index) => (
    <option key={index} value={index + 1}>
      {index + 1}
    </option>
  ))}
</select>


            <div className="progress-button-container"  style={{marginTop:'20px'}}>
              <button className="progress-add-button" onClick={openEditModal} >Edit Progress</button>
              <button className="progress-cancel-button" onClick={closeEntryModal}>Cancel</button>
            </div>
          </div>
        </div>
      )} 

{/* edit modal */}




{isEditModalOpen && (
        <div className="progress-modal-overlay">
          <div className="progress-modal-content">

            <span className="progress-close" onClick={closeEditModal}>&times;</span>
            <label htmlFor="day">Day:</label>
            <input
              type="text"
              id="day"
              value={addDay}
              onChange={(e) => setAddDay(e.target.value)}
              placeholder="enter day"
            />
            <label htmlFor="month">Month:</label>
            <input
              type="text"
              id="month"
              value={addMonth}
              onChange={(e) => setAddMonth(e.target.value)}
              
              placeholder="Enter Month"
            />

          <label htmlFor="year">Year:</label>
            <input
              type="text"
              id="year"
              value={addYear}
              onChange={(e) => setAddYear(e.target.value)}
              
              placeholder="Enter Year"
            />

            
<label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              value={addQuantity}
              onChange={(e) => setAddQuantity(e.target.value)}
              placeholder="Enter Quantity"
            />

         
<label htmlFor="size number">Size Number:</label>
<select
        id="size no"
        value={addSizeno}
        onChange={(e) => setAddSizeno(e.target.value)}
      >
        <option value="">Select Size Number</option>
        {Array.isArray(sizes) &&
          sizes.map((size) => (
            <option key={size.sizeno} value={size.sizeno}>
              {size.sizeno}
            </option>
          ))}
      </select>


      <label htmlFor="value"  style={{marginTop:'20px'}}>Value:</label>
      <input
        type="text"
        id="value"
        value={addValue}
        readOnly // Make the field read-only
      />
         
<label htmlFor="packed">Packed By:</label>
          <select
        id="packed"
        value={addPacked}
        onChange={(e) => setAddPacked(e.target.value)}
      >
        <option value="">Select Employee</option>
        {Array.isArray(employees) &&
          employees.map((employee) => (
            <option key={employee.name} value={employee.name}>
            {employee.name}
            </option>
          ))}
      </select>


            <div className="progress-button-container"  style={{marginTop:'20px'}}>
              <button className="progress-add-button" onClick={handleProgressEdit} >Edit Progress</button>
              <button className="progress-cancel-button" onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )} 

      {/* view modal */}

{isViewModalOpen && (
  <div className="progress-modal-overlay">
    <div className="progress-modal-content">
      <span className="progress-close" onClick={closeViewModal}>&times;</span>

      <div className="progress-data-container">

        {progressDayData.map((record, index) => (
          <div key={index}>
                  <h6 style={{ fontWeight: 'bold', color: 'red' }}>{employeeData.name} Progress - {record.day}/{record.month}/{record.year}</h6>

            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Serial Number:</span> <span style={{ fontWeight: 'bold', color: 'blue' }}>{index+1}</span></p>
            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Size Number:</span> <span style={{ fontWeight: 'bold', color: 'green' }}>{record.sizeno}</span></p>
            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Quantity:</span> <span style={{ fontWeight: 'bold', color: 'green' }}>{record.quantity}</span></p>
            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Value:</span> <span style={{ fontWeight: 'bold', color: 'green' }}>{record.value}</span></p>
            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Packed By:</span> <span style={{ fontWeight: 'bold', color: 'green' }}>{record.packed}</span></p>
          </div>
        ))}
        <div className="progress-button-container">
          <button className="progress-cancel-button" onClick={closeViewModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
)} 



{/* add modal */}

{isModalOpen && (
        <div className="progress-modal-overlay">
          <div className="progress-modal-content">

            <span className="progress-close" onClick={closeModal}>&times;</span>
            <label htmlFor="day">Day:</label>
            <input
              type="text"
              id="day"
              value={addDay}
              onChange={(e) => setAddDay(e.target.value)}
              placeholder="enter day"
            />
            <label htmlFor="month">Month:</label>
            <input
              type="text"
              id="month"
              value={addMonth}
              onChange={(e) => setAddMonth(e.target.value)}
              
              placeholder="Enter Month"
            />

          <label htmlFor="year">Year:</label>
            <input
              type="text"
              id="year"
              value={addYear}
              onChange={(e) => setAddYear(e.target.value)}
              
              placeholder="Enter Year"
            />

            
<label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              value={addQuantity}
              onChange={(e) => setAddQuantity(e.target.value)}
              placeholder="Enter Quantity"
            />

         
<label htmlFor="size number">Size Number:</label>
<select
        id="size no"
        value={addSizeno}
        onChange={(e) => setAddSizeno(e.target.value)}
      >
        <option value="">Select Size Number</option>
        {Array.isArray(sizes) &&
          sizes.map((size) => (
            <option key={size.sizeno} value={size.sizeno}>
              {size.sizeno}
            </option>
          ))}
      </select>


      <label htmlFor="value"  style={{marginTop:'20px'}}>Value:</label>
      <input
        type="text"
        id="value"
        value={addValue}
        readOnly // Make the field read-only
      />
          
<label htmlFor="packed">Packed By:</label>
          <select
        id="packed"
        value={addPacked}
        onChange={(e) => setAddPacked(e.target.value)}
      >
        <option value="">Select Employee</option>
        {Array.isArray(employees) &&
          employees.map((employee) => (
            <option key={employee.name} value={employee.name}>
            {employee.name}
            </option>
          ))}
      </select>


            <div className="progress-button-container" style={{marginTop:'20px'}}>
              <button className="progress-add-button" onClick={handleProgressSubmit} >Add Progress</button>
              <button className="progress-cancel-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
</tbody>
      
      </table>
      </div>
      </div>
    )
}

export default AddProgress