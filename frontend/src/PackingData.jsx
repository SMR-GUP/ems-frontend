import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PackingData(){

    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [ndays, setDaysInMonth] = useState(0);
    const [packingData, setPackingData] = useState([]);
    let totQuantity=0;
    let totValue=0;

    const {id}=useParams();

    
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



    return(
        <div>
    <div className="view-stats-container">
      <h3 style={{textAlign:'center',fontWeight:'500',fontFamily: 'Roboto, sans-serif'}}>Packing Sheet</h3>
      
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
              <th style={{fontFamily: "Roboto, sans-serif",fontSize:"21px"}}>Quantity(in kg)</th>
              <th style={{fontFamily: "Roboto, sans-serif",fontSize:"21px"}}>Value</th>
            </tr>
          </thead>
          
          <tbody>
            
          {Array.from({ length: ndays }, (_, index) => {
              const day = index + 1;

              const recordsOfDay = packingData.filter(record => record.day === day);
              
              let totalQuantity = 0;
              let totalValue = 0;
        
              if (recordsOfDay.length > 0) {
                recordsOfDay.forEach(record => {
                  totalQuantity += parseFloat(record.quantity);
                  totalValue += parseFloat(record.value);
                });
              } else {
                // If no records found for the day, set totalQuantity and totalValue to 0
                totalQuantity = 0;
                totalValue = 0;
              }

              totQuantity+=parseFloat(totalQuantity);
              totValue+=parseFloat(totalValue);

              return (
                <tr key={day}>
                  <td style={{fontSize:'18px',fontFamily: 'Roboto, sans-serif', width: '10%'}}>{ day}</td>
                  <td style={{fontFamily: 'Roboto, sans-serif',fontSize:'19px', width: '20%'}}>{selectedMonth}</td>
                  <td style={{fontFamily: 'Roboto, sans-serif',fontSize:'19px', width: '10%'}}>{ selectedYear}</td>
                  <td style={{fontFamily: 'Roboto, sans-serif',fontSize:'19px', width: '30%'}}>{totalQuantity.toFixed(2)}</td>
                 <td style={{fontFamily: 'Roboto, sans-serif',fontSize:'19px', width: '30%'}}>{totalValue.toFixed(2)}</td>
              
                </tr>
              );
            })}

    <tr key="total">
        <td colSpan="3" style={{textAlign: 'center', fontFamily: 'Roboto, sans-serif', fontSize: '19px'}}>Total</td>
        <td style={{fontFamily: 'Roboto, sans-serif',fontSize:'19px'}}>{totQuantity.toFixed(2)}{' kg'}</td>
        <td style={{fontFamily: 'Roboto, sans-serif',fontSize:'19px'}}>{totValue.toFixed(2)}</td>
    </tr>
    <br></br>

         
          </tbody>
        </table>
      </div>
  </div>
    )
}

export default PackingData;