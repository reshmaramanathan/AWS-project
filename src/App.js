import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Update this line
import Sidebar from "./Sidebar";
import AttendanceApp from "./AttendanceApp";
import AboutPage from "./AboutPage";
import CheckAttendancePage from "./CheckAttendancePage";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<AttendanceApp />} /> 
            <Route path="/about" element={<AboutPage />} />
            <Route path="/check-attendance" element={<CheckAttendancePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;