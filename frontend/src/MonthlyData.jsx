import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function MonthlyData(){


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
    return(

        <div className='px-5 py-3'>
        <div className=' d-flex justify-content-center mt-3' >
            <h2 style={{fontFamily: 'Open Sans, sans-serif',fontSize:'30px', textDecoration: 'underline',color:'black',marginBottom:'35px'}}>View Monthly Data</h2>
        </div>
      

        <div className='mt-3'>
        <table className='attendance-table' style={{textAlign: 'center' }}>
            <thead>
                <tr>
                    <th  style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Name </th>
                    <th  style={{color:'black',fontSize:'19px',fontFamily: 'Open Sans, sans-serif'}}>Joining Date </th>
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
                <td style={{color:'black',fontSize:'19px',fontFamily: 'Roboto, sans-serif'}}>{employee.salary}</td>
              
                <td style={{color:'black',fontSize:'19px',fontFamily: 'Roboto, sans-serif'}}>
                <Link 
  to={`/productionData/${employee._id}`} 
  className='btn btn-success'
  style={{
     color:'white'
  }}
>
Production
</Link>
<Link 
  to={`/packingData/${employee._id}`} 
  className='btn btn-danger'
  style={{
     color:'white',
     marginLeft:'10px'
  }}
>
Packing
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

export default MonthlyData;