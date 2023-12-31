import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Appbar from "./components/NavBar";
import AddCourses from "./components/Addcourses";
import Courses from "./components/Courses";
import Course from "./components/Course";
import { RecoilRoot } from "recoil";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <div>
        <Appbar setIsLogin={setIsLogin} />
        <RecoilRoot>
          <Routes>
            <Route
              path="/"
              element={<SignIn isLogin={isLogin} setIsLogin={setIsLogin} />}
            />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/addcourses" element={<AddCourses />} />
            <Route path="/signup" element={<SignIn isLogin={isLogin} />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </RecoilRoot>
      </div>
    </Router>
  );
}

export default App;
