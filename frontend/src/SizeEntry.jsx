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
        axios.post('https://puffy-burst-production.up.railway.app/addsize', {
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
        axios.put(`https://puffy-burst-production.up.railway.app/updateSizeEntry/${selectedSize._id}`, {
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
          axios.delete(`https://puffy-burst-production.up.railway.app/deleteSizeEntry/${size._id}`)
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
        axios.get('https://puffy-burst-production.up.railway.app/getSizes')
          .then(response => {
            setSizes(response.data.Result);
            console.log("sizess  data   ",sizes);
          })
          .catch(error => {
            console.error('Error fetching sizes:', error);
          });
      }, []);



    return (
        <div className='size-table mt-3 mx-auto'>
<div className=' d-flex justify-content-center mt-3' >
            <h3 style={{marginTop:'25px',marginBottom:'25px',fontFamily: 'Open Sans, sans-serif',fontSize:'30px', textDecoration: 'underline',color:'black'}}> List of Sizes</h3>

        </div>    

      

<button 
  className="btn btn-warning" 
  style={{ 
    marginLeft: '60px',
    backgroundColor: '#1565C0',
    color: 'white',
    border: '1px solid #1565C0',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center' // Center the icon and text vertically
  }} 
  onMouseOver={(e) => {
    e.target.style.backgroundColor = "#6666ff"; // Change background color to lighter shade of violet on hover
    e.target.style.borderColor = "#1565C0";
     // Change border color to lighter shade of violet on hover
  }}
  onMouseOut={(e) => e.target.style.backgroundColor='#1565C0'}
  onClick={() => openModal()}
>
  <i style={{fontSize:'19px'}} className="bi bi-plus-circle me-2"></i> {/* Icon */}
  <span  className="fs-5">New Size Entry</span>
</button>

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
              autoComplete='off'

            />
            <label htmlFor="sizeValue">Size Code:</label>
            <input
              type="number"
              id="sizeValue"
              value={sizeValue}
              onChange={(e) => setSizeValue(e.target.value)}
              step="0.01"
              placeholder="Enter decimal value"
              autoComplete='off'

            />
            <div className="progress-button-container">
              <button className="progress-add-button" onClick={editSizeEntry}>Edit Size Entry</button>
              <button className="progress-cancel-button" onClick={closeEditModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}

<div className='px-5 py-3'>
<div className='mt-2' style={{ textAlign: 'center' }}>

        <table className='attendance-table' style={{ marginLeft:'10px', marginRight:'10px',textAlign: 'center',tableLayout: 'fixed' }}>
          <thead>
            <tr>
              <th style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Serial Number</th>
              <th style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Size Number</th>
              <th style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Size Code</th>
              <th style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => (
              <tr key={index}>
                <td style={{color:'blue',fontSize:'21px',fontFamily: 'Roboto, sans-serif'}}>{index + 1}</td>
                <td style={{color:'black',fontSize:'21px',fontFamily: 'Roboto, sans-serif'}}>{size.sizeno}</td>
                <td style={{color:'black',fontSize:'21px',fontFamily: 'Roboto, sans-serif'}}>{size.sizecode}</td>
                <td>
                  <button className='btn btn-success'  onClick={() => openEditModal(size)} >Edit</button>
 
                  <button className='btn btn-danger' style={{marginLeft:'5px'}} onClick={() => handleDelete(size)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      </div>
      );

}

export default SizeEntry;