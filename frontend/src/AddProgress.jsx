import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AddProgress() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [progressData, setProgressData] = useState([]);
  const [progressDayData, setProgressDayData] = useState([]);

  const [addDay, setAddDay] = useState("");
  const [addMonth, setAddMonth] = useState("");
  const [addYear, setAddYear] = useState("");
  const [addPacked, setAddPacked] = useState("");
  const [addSizeno, setAddSizeno] = useState("");
  const [addValue, setAddValue] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  const [sizes, setSizes] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [editSelect,setEditSelect]=useState('');
  const [deleteSelect,setDeleteSelect]=useState('');

  const { id } = useParams();

  // Add these functions somewhere in your component or utility functions

  const handleProgressDelete = async(record)=>{
    console.log("HOOO");
    console.log(record);
    setDeleteSelect(record._id);
    console.log("Id", record._id);
    const isConfirmed = window.confirm(
      `Are you sure you want to delete progress for ${employeeData.name} ?`
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:8081/deleteProgress/${id}/${record._id}`);
        console.log("responseee   ",response);
        if (response.data.Status === "Success") {
          console.log("deleted");
          const fakeEvent = {
            preventDefault: () => {}, // Mocking preventDefault function
          };
          handleSubmit(fakeEvent);
          
      const simulateClick = async () => {
        await openViewModal(record.day);
    };
    simulateClick();

      setViewModalOpen(true);
      
        } 
        else {
          alert("Error");
        }

      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Delete canceled");
    }
  }

  const handleEdit = (record)=>{
      console.log("record obtained  ",record);
      setEditSelect(record._id);
      setAddDay(record.day);
      setAddMonth(record.month);
      setAddYear(record.year);
      setAddQuantity(record.quantity);
      setAddPacked(record.packed);
      setAddSizeno(record.sizeno);
      setAddValue(record.value);
      setViewModalOpen(false);
      setEditModalOpen(true);
  }


  const calculateTotalQuantity = () => {
    const total = progressDayData.reduce(
        (total, record) => total + parseFloat(record.quantity),
        0
    );
    return total.toFixed(2);
};

const calculateTotalValue = () => {
    const total = progressDayData.reduce(
        (total, record) => total + parseFloat(record.value),
        0
    );
    return total.toFixed(2);
};

  const formatDate = (day, month, year) => {
    // Assuming day, month, and year are valid numbers
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  

  const openViewModal = async (day) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/getDayProgress/${id}/${day}/${selectedMonth}/${selectedYear}`
      );
      console.log("My response", response.data);
      const progressDayData = response.data.Result;
      console.log("Overalll Data", progressDayData);

      if (progressDayData.length > 0) {
        setViewModalOpen(true);
        setProgressDayData(progressDayData);
      }
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };



  const closeViewModal = () => {
    setViewModalOpen(false);
  };

 

  const fetchEmployeeDetails = async (employeeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/get/${employeeId}`
      );

      return response.data.Result; // Assuming the employee details are in Result array
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching employee details");
    }
  };

  const openModal = async (day) => {
    try {
      const employeeDetails = await fetchEmployeeDetails(id);
      const joiningDate = employeeDetails.date;
      const joiningDateStr = joiningDate
        ? new Date(joiningDate).toLocaleDateString("en-GB")
        : "";
      setAddDay(day);
      setAddMonth(selectedMonth);
      setAddYear(selectedYear);
      setAddPacked("not packed");
      setAddSizeno("no value assigned");
      setAddValue("0");
      setAddQuantity("0");
      if (
        new Date(`${selectedYear}-${selectedMonth}-${day}`).toLocaleDateString('en-GB') <
        new Date(joiningDate).toLocaleDateString('en-GB')
      ) {
        alert(
          `Selected date is before the ${employeeData.name}'s  joining date : ${joiningDateStr}!`
        );
      } else {
        // Open the modal if the selected date is after or equal to the joining date
        setModalOpen(true);
      }
    } catch {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  
  const closeEditModal = () => {
    setEditModalOpen(false);
    setViewModalOpen(true);
  };

  useEffect(() => {
    // Fetch sizes from your backend
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getSizes");
        setSizes(response.data.Result);
      } catch (error) {
        console.error("Error fetching sizes:", error.message);
      }
    };

    fetchSizes();
  }, []);

  useEffect(() => {
    // Fetch employees from your backend
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8081/getEmployee");
        setEmployees(response.data.Result);
      } catch (error) {
        console.error("Error fetching employees", error.message);
      }
    };

    fetchEmployees();
  }, []);

  const [ndays, setDaysInMonth] = useState(0);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

      const response = await axios.post(
        `http://localhost:8081/submitProgress/${id}`,
        data
      );

      // Handle success, maybe close the modal or perform additional actions
      console.log("Progress submitted successfully:", response);

      // Close the modal or perform any other actions as needed
      setModalOpen(false);
      const fakeEvent = {
        preventDefault: () => {}, // Mocking preventDefault function
      };

      handleSubmit(fakeEvent);
    } catch (error) {
      // Handle error, maybe show a message to the user
      console.error("Error submitting progress:", error.message);
    }
  };

  const handleProgressEdit = async () => {
    try {
      const data = {
        quantity: addQuantity,
        packed: addPacked,
        sizeno: addSizeno,
        value: addValue,
      };     

      const response = await axios.put(
        `http://localhost:8081/updateProgress/${id}/${editSelect}`,
        data
      );
      // console.log("Response",response);

      // Check the response and handle it accordingly
      if (response.data.success) {
        // Attendance successfully updated
        console.log("Progress updated successfully");
        // Optionally, you can perform additional actions, such as updating the UI
      } else {
        // Handle errors or display a message to the user
        console.error("Failed to update progress");
      }
    } catch (error) {
      // Handle errors here
      console.error("Error updating progress:", error);
    } finally {
      // Close the modal after updating
      const fakeEvent = {
        preventDefault: () => {}, // Mocking preventDefault function
      };

      handleSubmit(fakeEvent);
      setEditModalOpen(false);

      const simulateClick = async () => {
        // Assuming you have defined these variables elsewhere
       
    
        await openViewModal(addDay);
    };
    
    // Call the simulateClick function
    simulateClick();

      setViewModalOpen(true);
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedMonth);
    console.log(selectedYear);
    const isValidYear = selectedYear >= 1950 && selectedYear <= 2070;

        if (!isValidYear) {
            alert("Enter a year in 1950-2070 range ");
            return; // Exit the function early
        }
    try {
      const numericMonth = monthNames.indexOf(selectedMonth) + 1;
      const numericYear = parseInt(selectedYear, 10);
      const daysInMonth = getDaysInMonth(numericMonth, numericYear);

      setDaysInMonth(daysInMonth);
      const response = await axios.get(
        `http://localhost:8081/getProgress/${id}`,
        {
          params: {
            month: selectedMonth,
            year: selectedYear,
          },
        }
      );
      setProgressData(response.data.Result);
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  const [employeeData, setEmployeeData] = useState({
    id: "",
    name: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8081/get/${id}`)
      .then((res) => setEmployeeData(res.data.Result))
      .catch((err) => console.error(err));
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

  return (
    <div>
      <div className="view-stats-container">
        <h3 style={{ textAlign: "center" }}>Track Progress</h3>

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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <div>
        <h2
          className="table-header"
          style={{
            textAlign: "center",
            marginTop: "30px",
            fontStyle: "italic",
          }}
        >
          Progress Data for {employeeData.name}
        </h2>
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
                      <button
                        className="btn btn-success"
                        style={{ color: "white" }}
                        onClick={() => openViewModal(day)}
                      >
                        View
                      </button>
                    ) : (
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Not Marked
                      </span>
                    )}
                  </td>
                  <td>
                    {!record ? (
                      <buttons>
                        <button
                          className="btn btn-warning"
                          style={{
                            backgroundColor: "#1565C0",
                            color: "white",
                            border: "1px solid #1565C0",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#42A5F5")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#1565C0")
                          }
                          onClick={() => openModal(day)}
                        >
                          Add
                        </button>
                      </buttons>
                    ) : (
                      <buttons>
                
                        <button
                          className="btn btn-warning"
                          style={{
                            backgroundColor: "#1565C0",
                            color: "white",
                            border: "1px solid #1565C0",
                            transition: "background-color 0.3s",
                          }}
                          onMouseOver={(e) =>
                            (e.target.style.backgroundColor = "#42A5F5")
                          }
                          onMouseOut={(e) =>
                            (e.target.style.backgroundColor = "#1565C0")
                          }
                          onClick={() => openModal(day)}
                        >
                          Add
                        </button>
                      </buttons>
                    )}
                  </td>
                </tr>
              );
            })}
            {/* edit modal */}

            {isEditModalOpen && (
              <div className="progress-modal-overlay">
                <div className="progress-modal-content">
                  <label>
                    Date:
                    <input
                      type="text"
                      value={`${addDay}/${addMonth}/${addYear}`}
                      readOnly
                    />
                  </label>
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

                  <label htmlFor="value" style={{ marginTop: "20px" }}>
                    Value:
                  </label>
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

                  <div
                    className="progress-button-container"
                    style={{ marginTop: "20px" }}
                  >
                    <button
                      className="progress-add-button"
                      onClick={handleProgressEdit}
                    >
                      Edit Progress
                    </button>
                    <button
                      className="progress-cancel-button"
                      onClick={closeEditModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

         
            {isViewModalOpen && (
              <div className="progress-modal-overlay">
                <div className="progress-modal-content">
                  <span className="progress-close" onClick={closeViewModal}>
                    &times;
                  </span>

                  <div className="progress-data-container">
                    <h6 style={{ fontWeight: "bold", color: "red" }}>
                      {employeeData.name} Progress -{" "}
                      {progressDayData.length > 0 &&
                        formatDate(
                          progressDayData[0].day,
                          progressDayData[0].month,
                          progressDayData[0].year
                        )}
                    </h6>

                    <table className="table">
                      <thead>
                        <tr>
                          <th>Serial Number</th>
                          <th>Size Number</th>
                          <th>Quantity(in kg)</th>
                          <th>Value</th>
                          <th>Packed By</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {progressDayData.map((record, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td style={{fontSize:'18px'}}>{record.sizeno}</td>
                            <td style={{fontSize:'18px'}}>{record.quantity}</td>
                            <td style={{fontSize:'18px'}}>{record.value}</td>
                            <td style={{fontSize:'18px'}}>{record.packed}</td>
                            <td>
            <button type="button" className="btn btn-primary mr-1" style={{fontSize:'14px'}} onClick={() => handleEdit(record)}>
                <i className="bi bi-pencil-fill bi-sm"></i>
            </button>
            <button type="button" className="btn btn-danger" style={{marginLeft:'4px',fontSize:'14px'}} onClick={() => handleProgressDelete(record)}>
                <i className="bi bi-trash-fill bi-sm"></i>
            </button>
        </td>
                          </tr>
                        ))}

                        {/* Total row */}
                        <tr>
                          <td colSpan="2">
                            <b>Total</b>
                          </td>
                          <td style={{fontSize:'18px'}}>
                            <b>{calculateTotalQuantity()} kg</b>
                          </td>
                          <td style={{fontSize:'18px'}}>
                            <b>{calculateTotalValue()}</b>
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="progress-button-container">
                      <button
                        className="progress-cancel-button"
                        onClick={closeViewModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* add modal */}

            {isModalOpen && (
              <div className="progress-modal-overlay">
                <div className="progress-modal-content">
                  <label>
                    Date:
                    <input
                      type="text"
                      value={`${addDay}/${addMonth}/${addYear}`}
                      readOnly
                    />
                  </label>

                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="text"
                    id="quantity"
                    value={addQuantity}
                    onChange={(e) => setAddQuantity(e.target.value)}
                    placeholder="Enter Quantity in kg"
                    autoComplete="off"
                  />

                  <label htmlFor="size number">Size Number:</label>
                  <select
                    id="size no"
                    value={addSizeno}
                    onChange={(e) => setAddSizeno(e.target.value)}
                  >
                    <option>Select Size Number</option>
                    {Array.isArray(sizes) &&
                      sizes.map((size) => (
                        <option key={size.sizeno} value={size.sizeno}>
                          {size.sizeno}
                        </option>
                      ))}
                  </select>

                  <label htmlFor="value" style={{ marginTop: "20px" }}>
                    Value:
                  </label>
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
                    <option value="No value choosen">Select Employee</option>
                    {Array.isArray(employees) &&
                      employees.map((employee) => (
                        <option key={employee.name} value={employee.name}>
                          {employee.name}
                        </option>
                      ))}
                  </select>

                  <div
                    className="progress-button-container"
                    style={{ marginTop: "20px" }}
                  >
                    <button
                      className="progress-add-button"
                      onClick={handleProgressSubmit}
                    >
                      Add Progress
                    </button>
                    <button
                      className="progress-cancel-button"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AddProgress;
