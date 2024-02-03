import React, { useState } from 'react';

const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const generateTableData = (month, year) => {
  const daysInMonth = getDaysInMonth(month, year);
  const tableData = [];

  for (let day = 1; day <= daysInMonth; day++) {
    tableData.push({
      day: day,
      month: month,
      year: year,
      status: '', // You can set the initial status as needed
    });
  }

  return tableData;
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December',
];



const NewAttendance = () => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [tableData, setTableData] = useState([]);
  const { id } = useParams();

  const fetchAttendanceData = async (id, month, year, day) => {
    try {
      const response = await axios.get(`/getStatus/${id}`, {
        params: {
          month,
          year,
          day,
        },
      });
  
      return response.data.status;
    } catch (error) {
      console.error('Error in fetching attendance data', error);
      return 'Not Marked';
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericMonth = monthNames.indexOf(month) + 1;
    const numericYear = parseInt(year, 10);

    if (isNaN(numericMonth) || isNaN(numericYear) || numericMonth < 1 || numericMonth > 12) {
      // Handle invalid input
      return;
    }

    const newTableData = generateTableData(numericMonth, numericYear);
    setTableData(newTableData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Month:
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} />
        </label>
        <label>
          Year:
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <button type="submit">Generate Table</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Month</th>
            <th>Year</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.day}</td>
              <td>{monthNames[data.month - 1]}</td>
              <td>{data.year}</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewAttendance;

