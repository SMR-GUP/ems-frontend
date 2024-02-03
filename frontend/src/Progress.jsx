import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import './Progress.css';


function Progress() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [sizeName, setSizeName] = useState('');
    const [sizeValue, setSizeValue] = useState('');
    
    const openModal = () => {
      setSizeName('');
      setSizeValue('');
      setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
    
      const addSizeEntry = () => {
        axios.post('http://localhost:8081/addsize', {
          sizeno: sizeName,
          sizecode: sizeValue,
        })
          .then(response => {
            console.log('Server Response:', response.data);
            closeModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    
  
  const[data,setData]=useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/getEmployee')
    .then(res =>{
        if(res.data.Status=="Success")
        {
            setData(res.data.Result);
        }
    })
    .catch(err =>(console.log(err)))

},[])


return (
  <div className='px-5 py-3'>
      <div className=' d-flex justify-content-center mt-3' >
          <h4>Progress Tracker</h4>
      </div>
      <button className="sizeEntryButton" onClick={openModal}>New Size Entry</button>
      {isModalOpen && (
        <div className="progress-modal-overlay">
          <div className="progress-modal-content">
            <span className="progress-close" onClick={closeModal}>&times;</span>
            <label htmlFor="sizeName">Size Number:</label>
            <input
              type="text"
              id="sizeName"
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
              placeholder="Enter alphanumeric text"
            />
            <label htmlFor="sizeValue">Size Code:</label>
            <input
              type="number"
              id="sizeValue"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              step="0.01"
              placeholder="Enter decimal value"
            />
            <div className="progress-button-container">
              <button className="progress-add-button" onClick={addSizeEntry}>Add Size Entry</button>
              <button className="progress-cancel-button" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <br></br>
      <br></br>

      <div className='mt-3'>
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
            <td>{formattedDate}</td> 
            <td>{employee.salary}</td>
            <td>
                <Link 
                    to=
                      {`/addProgress/${employee.id}`}
                   
                    className="btn btn-success"
                >
                    Add Progress
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
