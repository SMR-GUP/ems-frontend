import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Progress.css';


function Progress() {

   
 
      
  
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
          <h4 style={{marginTop:'30px'}}>Daily Entry</h4>
      </div>
      
      <br></br>

      <div className='mt-3' style={{ textAlign: 'center' }}>
      <table className='table' >
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
                <Link 
                    to=
                      {`/addProgress/${employee._id}`}
                   
                    className="btn btn-success"
                >
                    Add Manufacturing
                </Link>

                <Link 
                    to=
                      {`/viewPacking/${employee._id}`}
                   
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                >
                    View Packing
                </Link>

            </td>
        </tr>
    );
})}

</tbody>

      </table>
      </div>
  </div>
)
}

export default Progress
