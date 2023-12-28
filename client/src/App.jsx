import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import Appbar from "./components/NavBar";

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
          <Route path="/signup" element={<SignIn isLogin={isLogin} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
