import { Link } from "react-router-dom";
import { useState } from "react";
import SalyImage from "../assets/saly.png";
import PropTypes from "prop-types";
import Facebook from "../assets/Facebook.png";
import google from "../assets/google.svg";
import apple from "../assets/apple.svg";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ isLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleClick() {
    const url = isLogin
      ? "http://localhost:3000/admin/login"
      : "http://localhost:3000/admin/signup";

    console.log("Sending request with data:", { username, password });
    if (username === "" && password === "") {
      toast.error("Please enter both Username and Password");
    } else {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          const token = data.token;
          localStorage.setItem("token", token);

          toast.success(`${buttonText} Successfully`);
          navigate("/addcourses");
        } else {
          toast.error(data.message || "Something went wrong");
        }
        console.log("Response:", data);
      } catch (error) {
        console.error("Error:", error.message);
        toast.error(error.message);
      }
    }

    setUsername("");
    setPassword("");
  }

  const buttonText = isLogin ? "Login" : "Sign In";
  const promptText = isLogin
    ? "If you don't have an account "
    : "Already have an account? ";
  const linkText = isLogin ? "Register here" : "Login here";

  return (
    <div className="login">
      <Toaster />
      <main className="flex justify-evenly relative top-[4.5em]">
        <div className="group11">
          <div className="group3">
            <div className="group1">
              <h1 className="font-semibold text-[3.2rem]">{buttonText} to </h1>
              <h1 className="font-medium text-4xl text-[3.30rem]  leading-[4.7rem]">
                Access Exclusive Courses{" "}
              </h1>
            </div>
            <div className="group2">
              <p className="font-normal text-sm leading-6 w-80 h-6">
                {promptText}
                <Link
                  to={isLogin ? "/signup" : "/login"}
                  className="text-indigo-700 text-base font-semibold"
                >
                  {linkText}
                </Link>
                !
              </p>
            </div>
            <div className="saly14">
              <img
                src={SalyImage}
                alt="salyimg"
                className="absolute top-[6.5rem] left-[28em] h-[27em]"
              />
            </div>
          </div>
        </div>
        <div className="group16">
          <div className="SignIn text-black text-3xl font-medium mb-5">
            {isLogin ? "Login" : "Sign In"}
          </div>

          <div className="input">
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="Rectangle1 w-[23.0625rem] h-[3.875rem] bg-indigo-50 rounded-lg pl-6 mb-4"
                placeholder="Enter email or username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <br />
              <br />
              <input
                type="password"
                className="Rectangle1 w-[23.0625rem] h-[3.875rem] bg-indigo-50 rounded-lg pl-6"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="ForgorPassword text-zinc-400 text-sm font-normal font-['Poppins'] text-right m-4">
                Forgot password ?
              </div>
              <button
                type="submit"
                className="Rectangle2 w-[23.0625rem] h-14 bg-indigo-700 rounded-lg shadow mt-7"
                onClick={handleClick}
              >
                <span className="text-white">{buttonText}</span>
              </button>
            </form>
          </div>
          <div className="OrContinueWith text-zinc-400 text-base font-medium font-['Poppins'] text-center m-5">
            or continue with
          </div>
          <div className="group12 flex justify-center gap-6">
            <img src={google} alt="googleimg" />
            <img src={apple} alt="" />
            <img src={Facebook} alt="Facebookimg" />
          </div>
        </div>
      </main>
    </div>
  );
};

AuthForm.propTypes = {
  isLogin: PropTypes.bool.isRequired,
};

export default AuthForm;
