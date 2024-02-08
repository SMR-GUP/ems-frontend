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
          <h4>Manage Attendance</h4>
      </div>
      
      <div className='mt-4' style={{ textAlign: 'center' }}>
      <table className='table'>
          <thead>
              <tr>
                  <th>Name </th>
                  <th>Joining Date </th>
                  <th>Salary </th>
                  <th>Actions</th>
              </tr>
          </thead>


          <tbody>
          {data.map((employee, index) => {
            
    const formattedDate = new Date(employee.date).toLocaleDateString();
    return (
        <tr key={index}>
            <td>{employee.name}</td>
            <td>{new Date(formattedDate).toLocaleDateString('en-GB')}</td>
            <td>{employee.salary}</td>
            <td>
               
                <Link to={`/viewStats/${employee._id}`} className="btn btn-success">Mark Attendance</Link>
                {/* <Link to={`/newAttendance/${employee.id}`} className="btn btn-success" style={{marginLeft:'16px'}}>Statistics</Link> */}

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