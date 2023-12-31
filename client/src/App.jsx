import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Appbar from "./components/NavBar";
import AddCourses from "./components/Addcourses";
import Courses from "./components/Courses";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <div>
        <Appbar setIsLogin={setIsLogin} />
        <Routes>
          <Route
            path="/"
            element={<SignIn isLogin={isLogin} setIsLogin={setIsLogin} />}
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/addcourses" element={<AddCourses />} />
          <Route path="/signup" element={<SignIn isLogin={isLogin} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
