import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ id: null, firstName: '', lastName: '', age: '' });
  const [data, setData] = useState([]);

  // Load data from fake API (json-server or static)
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')  // You can replace with your mock API
      .then(response => {
        const users = response.data.slice(0, 3).map((user, index) => ({
          id: user.id,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1] || '',
          age: 20 + index * 5
        }));
        setData(users);
      });
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (formData.id) {
      // Update
      setData(prev =>
        prev.map(item => item.id === formData.id ? formData : item)
      );
    } else {
      // Create
      setData(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, firstName: '', lastName: '', age: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
  };

  const handleDelete = (id) => {
    setData(prev => prev.filter(item => item.id !== id));
  };

  const handleClear = () => {
    setFormData({ id: null, firstName: '', lastName: '', age: '' });
  };

  return (
    <div className="App">
      <h2>CRUD with Fake API</h2>
      <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
      <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
      <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={handleClear}>Clear</button>

      <table border="1" style={{ marginTop: '20px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={() => handleEdit(item)} style={{ backgroundColor: 'blue', color: 'white' }}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: 'red', color: 'white' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;