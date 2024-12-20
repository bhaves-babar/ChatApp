// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
// import ChatPage from "./pages/ChatPage";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Admin from "./pages/admin"
import Users from "./FunctionComponents/SeeUsers";
import Report from "./FunctionComponents/SeeReports";
function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/report" element={<Report/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
