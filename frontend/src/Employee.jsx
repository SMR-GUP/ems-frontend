import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style.css'


function Employee() {


    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee???');
        if (confirmDelete) {
            axios.delete('http://localhost:8081/delete/' + id)
                .then(res => {
                    if (res.data.Status === "Success") {
                        window.location.reload(true);
                    } else {
                        alert("Error");
                    }
                })
                .catch(err => console.log(err));
        }
    }

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
            <h2>Employee List</h2>
        </div>
        <Link to="/create" className='btn btn-success'>
            Add Employee
        </Link>
        <div className='mt-3'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name </th>
                    <th>Joining Date </th>
                    <th>Day </th>
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
               <td>{employee.day}</td>
                <td>{employee.salary}</td>
                {/* <td>{
                    <img src={`http://localhost:8081/images/`+employee.image } alt="" className='employee_image'/>
                    }</td> */}
                <td>
                <Link 
  to={`/employeeEdit/${employee.id}`} 
  className='btn btn-sm btn-info mr-5' 
  style={{
    color:'white',
    border:'blue',
    backgroundColor:'blue',
    transition: 'background-color 0.3s' // Add transition for smooth effect
  }}
  onMouseEnter={e => e.target.style.backgroundColor = 'darkblue'} // Change color on hover
  onMouseLeave={e => e.target.style.backgroundColor = 'blue'} // Revert to original color on hover out
>
  Edit
</Link>
        <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger ' style={{marginLeft:'5px'}}>Delete</button>
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

export default Employee