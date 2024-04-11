
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function ProductionData(){

    const { id } = useParams();



    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [progressData, setProgressData] = useState([]);
    let totQuantity=0;
    let totValue=0;

    
  const calculateTotalQuantity = () => {
    console.log("Datttaaa ", progressData);
    const total = progressData.reduce(
        (total, record) => total + parseFloat(record.quantity),
        0
    );
    return total.toFixed(2);
};

const calculateTotalValue = () => {
    const total = progressData.reduce(
        (total, record) => total + parseFloat(record.value),
        0
    );
    return total.toFixed(2);
};


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
          .then(res => setEmployeeData(res.data.Result))
          .catch(err => console.error(err));
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
          const daysInMonth=getDaysInMonth(numericMonth,numericYear);
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
        
        } 
        catch (error) {
          // Handle errors here
          console.error(error);
        }
      }


    return(
        <div>
    <div className="view-stats-container">
      <h3 style={{textAlign:'center',fontWeight:'500',fontFamily: 'Roboto, sans-serif'}}>Production Sheet</h3>
      
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
            marginTop: "30px",
            fontWeight:'500',
            fontFamily: 'Roboto, sans-serif'
          }}
        >
          Production Data for {employeeData.name}
        </h2>
        <table className="mark-table">
          <thead>
            <tr>
              <th style={{fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Day</th>
              <th style={{fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Month</th>
              <th style={{fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Year</th>
              <th style={{fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Quantity (in kg)</th>
              <th style={{fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Value</th>
            </tr>
          </thead>
          <tbody>
          {Array.from({ length: ndays }, (_, index) => {
              const day = index + 1;
              const recordsOfDay = progressData.filter(record => record.day === day);
              
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

              if (totalQuantity === 0 && totalValue === 0) {
                // If totalQuantity and totalValue are both zero, skip rendering this table row
                return null;
            }
        

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
    


          </tbody>
        </table>
        <br></br>
      </div>
  </div>
    )
}

export default ProductionData;