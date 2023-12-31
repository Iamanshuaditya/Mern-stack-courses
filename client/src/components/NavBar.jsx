import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Appbar({ setIsLogin }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSignInClick = () => {
    navigate("/signup");
    setIsLogin(false);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("token does not exist");
      setLoading(false);
      return;
    }
    function callback(data) {
      if (data.username) {
        setUserEmail(data.username);
        setLoading(false);
      }
    }
    fetch("http://localhost:3000/admin/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(callback);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (userEmail) {
    return (
      <div className="logo flex justify-between items-center p-2 ">
        <h1 className=" font-semibold text-xl leading-8 m-3">Your Logo</h1>
        <div className="flex justify-between w-[17em] mobile:w-[45%] items-center">
          {userEmail}
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
              localStorage.removeItem("token");
              setUserEmail("");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="logo flex justify-between items-center p-2 ">
      <h1 className=" font-semibold text-xl leading-8 m-3">Your Logo</h1>
      <div className="flex justify-between w-[12em] mobile:w-[45%]">
        <Button variant="contained" onClick={handleSignInClick}>
          Sign Up
        </Button>
        <Button variant="contained" onClick={handleLoginClick}>
          Login
        </Button>
      </div>
    </div>
  );
}

Appbar.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
};

export default Appbar;
