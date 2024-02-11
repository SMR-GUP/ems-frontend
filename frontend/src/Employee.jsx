import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style.css'




function Employee() {


    const handleDelete = (id) => {

        console.log("Iddd  ",id);
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
            if(res.data.status==="Success")
            {
                setData(res.data.Result);
            }
        })
        .catch(err =>(console.log(err)))
    },[])


  return (
    <div className='px-5 py-3'>
        <div className=' d-flex justify-content-center mt-3' >
            <h2 style={{fontFamily: 'Open Sans, sans-serif',fontSize:'30px', textDecoration: 'underline',color:'black',marginBottom:'35px'}}>Employee List</h2>
        </div>
      

<Link to="/create" className='btn btn-success btn-lg' 
style={{marginLeft:'1px'}}>
    <i style={{fontSize:'19px'}} className="bi bi-person-fill-add me-2"></i>
    <span  className="fs-5">Add Employee</span>
</Link>


<br></br>

     

        <div className='mt-3'>
        <table className='attendance-table' style={{textAlign: 'center' }}>
            <thead>
                <tr>
                    <th  style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Name </th>
                    <th  style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Joining Date </th>
                    <th  style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Day </th>
                    <th  style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Salary </th>
                    <th  style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Actions</th>

                </tr>
            </thead>
            <tbody>
    {data.map((employee, index) => {
    const formattedDate = new Date(employee.date).toLocaleDateString();
    return (
            <tr key={index}>
                <td style={{color:'black',fontSize:'19px',fontFamily: 'Roboto, sans-serif'}}>{employee.name}</td>
               <td style={{color:'black',fontSize:'19px',fontFamily: 'Roboto, sans-serif'}}>{new Date(formattedDate).toLocaleDateString('en-GB')}</td>
               <td style={{color:'black',fontSize:'19px',fontFamily: 'Roboto, sans-serif'}}>{employee.day}</td>
                <td style={{color:'black',fontSize:'19px',fontFamily: 'Roboto, sans-serif'}}>{employee.salary}</td>
                {/* <td>{
                    <img src={`http://localhost:8081/images/`+employee.image } alt="" className='employee_image'/>
                    }</td> */}
                <td style={{color:'black',fontSize:'19px',fontFamily: 'Roboto, sans-serif'}}>
                    <button  className="btn btn-primary mr-1"> 
                <Link 
  to={`/employeeEdit/${employee._id}`} 
  className='bi bi-pencil-fill' 

  style={{
     color:'white'
  }}
>
  
</Link>
</button>

<button type="button" className="btn btn-danger" style={{marginLeft:'15px'}} onClick={e => handleDelete(employee._id)}>
                <i className="bi bi-trash-fill bi-sm"></i>
            </button>
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