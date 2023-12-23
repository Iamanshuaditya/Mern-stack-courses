import SalyImage from "../assets/saly.png";
import Facebook from "../assets/Facebook.png";
import google from "../assets/google.svg";
import apple from "../assets/apple.svg";
import { useState } from "react";
export default function Signin() {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  function handleEmailChange(event) {
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value);
    if (validEmail) {
      SetEmail(event.target.value);
    }
  }

  function handlePasswordChange(event) {
    SetPassword(event.target.value);
  }
  return (
    <div className="login ">
      <div className="logo ">
        <h1 className=" font-semibold text-xl leading-8 m-3">Your Logo</h1>
      </div>
      <main className="flex justify-evenly relative top-[4.5em]">
        <div className="group11 ">
          <div className="group3">
            <div className="group1">
              <h1 className="font-semibold text-[3.2rem] ">Sign in to </h1>
              <h1 className="font-medium text-4xl text-[3.30rem]  leading-[4.7rem]">
                Lorem Ipsum is simply{" "}
              </h1>
            </div>
            <div className="group2">
              <p className="font-normal text-sm leading-6 w-80 h-6 ">
                If you dont have an account register
              </p>
              <p className="text-black text-base font-normal">
                You can{" "}
                <span className="text-indigo-700 text-base font-semibold">
                  Register here
                </span>{" "}
                !
              </p>
            </div>
            <div className="saly14   ">
              <img
                src={SalyImage}
                alt="salyimg"
                className="absolute top-[6.5rem] left-[28em] h-[27em]"
              />
            </div>
          </div>
        </div>
        <div className="group16">
          <div className="SignIn text-black text-3xl font-medium  mb-5">
            Sign in
          </div>

          <div className="input">
            <form action="">
              <input
                className="Rectangle1 w-[23.0625rem] h-[3.875rem] bg-indigo-50 rounded-lg pl-6 mb-4"
                placeholder="Enter email or username"
                type="email"
                onChange={handleEmailChange}
              />{" "}
              <br /> <br />
              <input
                type="password"
                className="Rectangle1 w-[23.0625rem] h-[3.875rem] bg-indigo-50 rounded-lg pl-6"
                placeholder="password"
                onChange={handlePasswordChange}
                required
              />
              <div className="ForgorPassword text-zinc-400 text-sm font-normal font-['Poppins'] text-right m-4">
                Forgot password ?
              </div>
              <button
                disabled={email.length === 0 || password.length === 0}
                type="submit"
                className="Rectangle2 w-[23.0625rem] h-14 bg-indigo-700 rounded-lg shadow mt-7"
                onClick={(e) => {
                  SetEmail((e.target.value = ""));
                  SetPassword((e.target.value = ""));
                  console.log({ email: email, password: password });
                }}
              >
                <span className="text-white"> Login</span>
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
}
