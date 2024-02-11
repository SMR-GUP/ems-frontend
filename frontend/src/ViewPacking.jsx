import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ViewPacking.css";

function ViewPacking() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ndays, setDaysInMonth] = useState(0);
  const [packingData, setPackingData] = useState([]);
  const [dayPacking, setDayPacking] = useState("");
  const [isViewModalOpen, setViewModalOpen] = useState(false);

  const { id } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployee")
      .then((res) => {
        if (res.data.status == "Success") {
          setData(res.data.Result);
          console.log("All employees", data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateTotalQuantity = () => {
    return dayPacking.reduce(
      (total, record) => total + parseFloat(record.quantity),
      0
    );
  };

  const calculateTotalValue = () => {
    return dayPacking.reduce(
      (total, record) => total + parseFloat(record.value),
      0
    );
  };

  const formatDate = (day, month, year) => {
    // Assuming day, month, and year are valid numbers
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

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

  const openViewModal = async (day) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/getDayPacking/${employeeData.name}/${day}/${selectedMonth}/${selectedYear}`
      );
      console.log("My response", response.data);
      const packing = response.data.Result;
      console.log("Overalll Data", packing);

      setViewModalOpen(true);
      setDayPacking(packing);
    } catch (error) {
      console.error("Error fetching progress data:", error);
    }
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
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
        `http://localhost:8081/getPacking/${employeeData.name}`,
        {
          params: {
            month: selectedMonth,
            year: selectedYear,
          },
        }
      );

      setPackingData(response.data.Result);
      console.log("Packing Data   ", packingData);

      console.log("Data Fetched");
    } catch (error) {
      // Handle errors here
      console.error(error);
    }
  };

  return (
    <div>
      <div className="view-stats-container">
        <h3 style={{ textAlign: "center",fontFamily: "Roboto, sans-serif",fontWeight:"500" }}>View Packing</h3>

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
            marginTop: "35px",
            fontFamily: "Roboto, sans-serif"
          }}
        >
          Packing Data for {employeeData.name}
        </h2>
        <table className="mark-table">
          <thead>
            <tr>
              <th style={{fontFamily: "Roboto, sans-serif",fontSize:"21px"}}>Day</th>
              <th style={{fontFamily: "Roboto, sans-serif",fontSize:"21px"}}>Month</th>
              <th style={{fontFamily: "Roboto, sans-serif",fontSize:"21px"}}>Year</th>
              <th style={{fontFamily: "Roboto, sans-serif",fontSize:"21px"}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: ndays }, (_, index) => index + 1).map(
              (day) => {
                const record = packingData.find((record) => record.day === day);
                return (
                  <tr key={day}>
                    <td style={{fontFamily: "Roboto, sans-serif",fontSize:"19px"}}>{record ? record.day : day}</td>
                    <td style={{fontFamily: "Roboto, sans-serif",fontSize:"19px"}}>{record ? record.month : selectedMonth}</td>
                    <td style={{fontFamily: "Roboto, sans-serif",fontSize:"19px"}}>{record ? record.year : selectedYear}</td>
                    <td>
                      {!record ? (
                        <span style={{ color: "blue", fontFamily: "Roboto, sans-serif",fontSize:"17px",fontWeight:"bold"}}>
                          No packing history
                        </span>
                      ) : (
                        <button
                          className="btn btn-success"
                          style={{
                            color: "white",
                            backgroundColor: "black",
                            borderColor: "black",
                            fontSize:"16px",
                            transition:
                              "background-color 0.3s, border-color 0.3s, color 0.3s", // Smooth transition
                          }}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = "lightgray";
                            e.target.style.color = "black";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = "black";
                            e.target.style.color = "white";
                          }}
                          onClick={() => openViewModal(day)}
                        >
                          View
                        </button>
                        // or you can choose to render nothing here (empty JSX)
                      )}
                    </td>
                  </tr>
                );
              }
            )}

         

            {isViewModalOpen && (
              <div className="progress-modal-overlay">
                <div className="progress-modal-content">
                  <span className="progress-close" onClick={closeViewModal}>
                    &times;
                  </span>

                  <div className="progress-data-container">
                    <h6 style={{ fontSize:"16px",fontWeight: "bold", color: "red" ,fontFamily:"Roboto, sans-serif"}}>
                      {employeeData.name} Packing -{" "}
                      {dayPacking.length > 0 &&
                        formatDate(
                          dayPacking[0].day,
                          dayPacking[0].month,
                          dayPacking[0].year
                        )}
                    </h6>

                    <table className="table">
                      <thead>
                        <tr>
                          <th style={{fontFamily:"Roboto, sans-serif"}}>Serial Number</th>
                          <th style={{fontFamily:"Roboto, sans-serif"}}>Size Number</th>
                          <th style={{fontFamily:"Roboto, sans-serif"}}>Quantity(in kg)</th>
                          <th style={{fontFamily:"Roboto, sans-serif"}}>Value</th>
                          <th style={{fontFamily:"Roboto, sans-serif"}}>Manufactured By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dayPacking.map((record, index) => (
                          <tr key={index}>
                            <td style={{fontFamily:"Roboto, sans-serif"}}>{index + 1}</td>
                            <td style={{fontFamily:"Roboto, sans-serif"}}>{record.sizeno}</td>
                            <td style={{fontFamily:"Roboto, sans-serif"}}>{record.quantity}</td>
                            <td style={{fontFamily:"Roboto, sans-serif"}}>{record.value}</td>
                            <td style={{fontFamily:"Roboto, sans-serif"}}>
                              {
                                data.find(
                                  (employee) => employee._id === record.emp_id.toString()
                                )?.name
                              }
                            </td>{" "}
                          </tr>
                        ))}

                        {/* Total row */}
                        <tr>
                          <td colSpan="2">
                            <b style={{fontFamily:"Roboto, sans-serif"}}>Total</b>
                          </td>
                          <td>
                            <b style={{fontFamily:"Roboto, sans-serif"}}>{calculateTotalQuantity()} kg</b>
                          </td>
                          <td>
                            <b style={{fontFamily:"Roboto, sans-serif"}}>{calculateTotalValue()}</b>
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewPacking;
