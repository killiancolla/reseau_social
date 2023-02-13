import React from 'react';
import './App.css';
import Login from '../Login/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard'
import useToken from './useToken';
import Disconnect from '../Disconnect/Disconnect';

function App() {
  const { token, setToken } = useToken();
  
  if(!token) {
    return <Login setToken={setToken} /> 
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dc" element={<Disconnect />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
