import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

function Attendance() {
  
  const[data,setData]=useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/getEmployee')
    .then(res =>{
        if(res.data.status=="Success")
        {
            setData(res.data.Result);
        }
    })
    .catch(err =>(console.log(err)))

},[])


return (
  <div className='px-5 py-3'>
      <div className=' d-flex justify-content-center mt-3' >
          <h4 style={{marginTop:'10px',marginBottom:'30px',color:'black',fontSize:'30px',fontFamily: 'Open Sans, sans-serif',textDecoration:'underline'}}>Manage Attendance</h4>
      </div>
      
      <div className='mt-4' style={{ textAlign: 'center' }}>
      <table className='attendance-table'>
          <thead>
              <tr>
                  <th style={{color:'black',fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Name </th>
                  <th style={{color:'black',fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Joining Date </th>
                  <th style={{color:'black',fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Salary </th>
                  <th style={{color:'black',fontSize:'21px',fontFamily: 'Open Sans, sans-serif'}}>Actions</th>
              </tr>
          </thead>


          <tbody>
          {data.map((employee, index) => {
            
    const formattedDate = new Date(employee.date).toLocaleDateString();
    return (
        <tr key={index}>
            <td style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>{employee.name}</td>
            <td style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>{new Date(formattedDate).toLocaleDateString('en-GB')}</td>
            <td style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>{employee.salary}</td>
            <td  style={{fontSize:'19px'}}>
               
                <Link to={`/viewStats/${employee._id}`} className="btn btn-success"
                style={{
                    backgroundColor: "#4B0082", // Set background color to violet
                    color: "white", // Text color
                    border: "1px solid #4B0082", // Border color
                    borderRadius: "5px", // Border radius
                    transition: "background-color 0.1s", // Transition effect
                    fontSize:'17px',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#9370DB"; // Change background color to lighter shade of violet on hover
                    e.target.style.borderColor = "#9370DB"; // Change border color to lighter shade of violet on hover
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#4B0082"; // Revert background color on mouse out
                    e.target.style.borderColor = "#4B0082"; // Revert border color on mouse out
                  }}
                >Mark Attendance</Link>

            </td>
        </tr>
    );
})}

</tbody>

      </table>
      </div>
  </div>
)
};

export default Attendance