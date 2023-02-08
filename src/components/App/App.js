import React, { useState } from 'react';
import './App.css';
import Login from '../Login/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard'

function App() {
  const [token, setToken] = useState(); 

  if(!token) {
    return <Login setToken={setToken} /> 
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
