import React,{useState,useEffect} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function EditEmployee() {

  //editing employee details
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    salary: '',
    // image: '',
    weekday: '',
    joiningDate: ''
});

useEffect(() => {
  // Make an API request to get the employee details based on the id
  axios.get(`http://localhost:8081/get/${id}`)
      .then(res => {
          const employeeData = res.data.Result[0];
          setEmployee({
              name: employeeData.name,
              salary: employeeData.salary,
              // image: employeeData.image,
              weekday: employeeData.weekday,
              joiningDate: employeeData.date // Assuming date is the field name in the API response
          });
      })
      .catch(err => console.error(err));
}, [id]);

    const [joiningDate, setJoiningDate] = useState(null);
    const [weekday, setWeekday] = useState('');
    const[data,setData] = useState({

            name:'',
            salary:'',
            image:'',
            weekday:'',
            joiningDate:''
    });

    
    const handleDateChange = date => {
      setJoiningDate(date);
      if (date) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const selectedDay = days[date.getDay()];
        setWeekday(selectedDay);
        setData(prevData => ({
            ...prevData,
            weekday: selectedDay,
            joiningDate: date
          }));
      } else {
        setWeekday('');
        setData(prevData => ({
            ...prevData,
            weekday: '',
            joiningDate: null
          }));
      }
    };
    
    const navigate=useNavigate()

    const handleSubmit = (event) => {
      event.preventDefault();
      
  
      axios.put(`http://localhost:8081/update/${id}`, data) // Send a PUT request
      .then(res => {
          if (res.data.Status === "Success") {
              navigate('/employee');
          }
      })
      .catch(err => console.log(err));
  }
  
  return (
    <div className='d-flex flex-column align-items-center pt-2 mt-3'>
    <h3>Update Employee</h3>
    <form class="row g-3 w-50" onSubmit={handleSubmit}>
    <div class="col-12">
            <label for="inputName" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputName" placeholder='Enter Name'  autoComplete='off'
             onChange={e=>setData({...data,name:e.target.value})}/>
        </div>
        <div className="col-12">
          <label htmlFor="inputJoiningDate" className="form-label p-2" autoComplete='off'  >Date of Joining</label>
          <DatePicker
            selected={joiningDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            id="inputJoiningDate"
            className="form-control"
            placeholderText="Select Date"
            autoComplete='off'
            />
        </div>
        <div className="col-12">
          <label className="form-label">Weekday</label>
          <input
            type="text"
            className="form-control"
            value={weekday}
            readOnly
          />
        </div>
        <div class="col-12">
            <label for="inputSalary" class="form-label">Salary</label>
            <input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete='off' 
            onChange={e=>setData({...data,salary:e.target.value})}/>
        </div>
       
        {/* <div class="col-12 mb-3">
            <label class="form-label" for="inputGroupFile01" autoComplete='off'>Select Image</label>
            <input type="file" class="form-control" id="inputGroupFile01"
            onChange={e=>setData({...data,image:e.target.files[0]})}/>
        </div> */}
        
        <div class="col-12">
            <button type="submit" class="btn btn-primary">Update</button>
        </div>
    </form>
</div>

  )
}

export default EditEmployee
