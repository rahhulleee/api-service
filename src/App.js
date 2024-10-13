// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Register from "./components/pages/register";
import Login from "./components/pages/login";
import Landing from "./components/pages/landing";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Default route redirects to the login page */}
        <Routes>
          {/* Redirect the root route to the Login component */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
