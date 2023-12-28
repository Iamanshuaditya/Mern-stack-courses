import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Appbar({ setIsLogin }) {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate("/signup");
    setIsLogin(false);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
    navigate("/login");
  };

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
