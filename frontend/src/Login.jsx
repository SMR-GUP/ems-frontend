import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  
  const[values,setValues] = useState({
    email:'',
    password:''
})

const navigate = useNavigate()

const [error,setError] = useState('')

const handleSubmit = (event) => {
event.preventDefault();
axios.post('http://localhost:8081/login',values)
.then(res => {
  if(res.data.Status === "Success")
  {
      navigate('/');
  }
  else{
    alert('Wrong Admin name or Password!');
  }
})
.catch(err => console.log(err));
}

  return (
    <div className='login-container'>
    <div className='vh-100 d-flex justify-content-center align-items-center' style={{width:"100%"}}>
      <div className='p-3 rounded loginForm' >
        <div className='text-danger'>
          {error && error}
        </div>
        <h2 className="text-center" style={{color:'white',fontFamily: "Open Sans, sans-serif"}}>Login</h2>
        <form  onSubmit={handleSubmit}>
          <div className='mb-3' >
            <label htmlFor="email" style={{color:'white',fontFamily: "Open Sans, sans-serif"}}><>ADMIN</></label>
            <input type="name" placeholder='Enter Admin Name' name='email' onChange={e => setValues({...values , email: e.target.value })} className='form-control rounded-0' autoComplete='off'/>
          </div>
          <div className='mb-3' >
            <label htmlFor="password" style={{color:'white',fontFamily: "Open Sans, sans-serif"}}><>PASSWORD</></label>
            <input type="password" placeholder='Enter Password' name='password' onChange={e => setValues({...values ,password: e.target.value })} className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-2' style={{fontFamily:'Roboto ,sans-serif'}}> Log in</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;