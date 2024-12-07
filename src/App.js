// import './App.css';
import Login from "./User Components/Login Signup/Login";
import Logouts from "./User Components/Logout/Logouts";
import Signup from "./User Components/Login Signup/Signup";
import Nav from "./User Components/Navigation/Navigation";
import Demo from "./User Components/Logout/Demo";
import Setup_Profile from "./User Components/Login Signup/Setup Your Profile/SetupProfile";
import User_Profile from "./User Components/User Profile/UserProfile";
import Grid from "./User Components/AG Grid/Grid";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { dividerClasses } from "@mui/material";
import Dashboard from "./User Components/Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/nav" element={<Nav />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userprofile" element={<User_Profile />} />

        <Route path="/logout" element={<Logouts />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
    // <div>
    //   {/* <Setup_Profile /> */}
    //   {/* <User_Profile /> */}
    //   {/* <Grid /> */}
    // </div>
  );
}

export default App;
