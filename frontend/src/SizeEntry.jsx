import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SizeEntry.css';


function SizeEntry(){


    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);


    const [sizeName, setSizeName] = useState('');
    const [sizeValue, setSizeValue] = useState('');

    const openEditModal =(size)=>{
        setSizeName(size.sizeno);
        setSizeValue(size.sizecode);
        setSelectedSize(size);
        setEditModalOpen(true);
      }

      const closeEditModal = () => {
        setEditModalOpen(false);
      };
    
    const openModal = () => {
      setSizeName('');
      setSizeValue('');
      setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
        window.location.reload();

      };
    
      const addSizeEntry = () => {
        axios.post('http://localhost:8081/addsize', {
          sizeno: sizeName,
          sizecode: sizeValue,
        })
          .then(response => {
            console.log('Server Response:', response.data);
            openModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

      const editSizeEntry = () => {
        axios.put(`http://localhost:8081/updateSizeEntry/${selectedSize.id}`, {
          sizeno: sizeName,
          sizecode: sizeValue,
        })
          .then(response => {
            console.log('Server Response:', response.data);
            closeEditModal();
            window.location.reload();

          })
          .catch(error => {
            console.error('Error:', error);
          });
      };



      const handleDelete = (size) => {
        // Display a confirmation alert before deleting
        const isConfirmed = window.confirm(`Are you sure you want to delete the selected size entry?`);
    
        if (isConfirmed) {
          // If user confirms, proceed with deletion
          axios.delete(`http://localhost:8081/deleteSizeEntry/${size.id}`)
            .then(response => {
              console.log('Server Response:', response.data);
              window.location.reload();
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      };

    
  

    const [sizes, setSizes] = useState([]);
    useEffect(() => {
        // Fetch sizes data using Axios
        axios.get('http://localhost:8081/getSizes')
          .then(response => {
            setSizes(response.data.Result);
          })
          .catch(error => {
            console.error('Error fetching sizes:', error);
          });
      }, []);

    return (
        <div className='size-table mt-3 mx-auto'>
<div className=' d-flex justify-content-center mt-3' >
            <h3  style={{ marginTop: '30px' ,marginBottom:'30px'}}> List of Sizes</h3>

        </div>        
        <button className="btn btn-warning" style={{ marginLeft:'90px',marginBottom:'20px',backgroundColor: '#1565C0', color: 'white', border: '1px solid #1565C0', transition: 'background-color 0.3s' }} 
          onMouseOver={(e) => e.target.style.backgroundColor='#42A5F5'}
          onMouseOut={(e) => e.target.style.backgroundColor='#1565C0'}
          onClick={() => openModal()}>New Size Entry</button>

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
                 
                 {isEditModalOpen && (
        <div className="progress-modal-overlay">
          <div className="progress-modal-content">
            <span className="progress-close" onClick={closeEditModal}>&times;</span>
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
              <button className="progress-add-button" onClick={editSizeEntry}>Edit Size Entry</button>
              <button className="progress-cancel-button" onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}


        <table className='table' style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Size Number</th>
              <th>Size Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => (
              <tr key={index}>
                <td style={{color:'blue',fontSize:'20px'}}>{index + 1}</td>
                <td style={{color:'black',fontSize:'20px'}}>{size.sizeno}</td>
                <td style={{color:'black',fontSize:'20px'}}>{size.sizecode}</td>
                <td>
                  <button className='btn btn-success' onClick={() => openEditModal(size)}>Edit</button>
 
                  <button className='btn btn-danger' style={{marginLeft:'5px'}} onClick={() => handleDelete(size)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      );

}

export default SizeEntry;