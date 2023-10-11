import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import React, { useState } from "react";
import { useFormik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();
    const LoginForm = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit: values => {
          var JSON = {
            email: values.email,
          password: values.password,
          }
          try {
            axios.post(`http://localhost:3000/auth/login` , JSON).then((res) =>{
                console.log(res.data);
                localStorage.setItem("token", res?.data?.token)
                localStorage.setItem("expire", res?.data?.expiresIn)
                setUser(res?.data?.user)
                navigate("/")
            })
          } catch (error) {
            console.log(error);
          }
        },
      });
  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone  items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col  items-center justify-center w-full">
          <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
          <div class="w-full h-screen flex font-manrope">
            <div class="relative overflow-hidden flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center ">
              <div>
                <h1 class="text-white font-bold text-4xl font-sans">
                 BidLand
                </h1>
                <p class="text-white mt-1">
                  The most popular property selling platform
                </p>
                <button
                  type="submit"
                  class="block w-28  bg-white-A700 text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
                >
                  Read More
                </button>
              </div>
              <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
              <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div class="flex w-1/2 justify-center py-10  items-center bg-white font-manrope">
              <form class=" w-1/2" onSubmit={LoginForm.handleSubmit}>
                <h1 class="text-gray-800 text-center font-bold text-2xl mb-1">
                  Welcome Back
                </h1>
                <p class="text-sm text-center font-normal text-gray-600 mb-7">
                 Login Your Account
                </p>
                <div class="flex items-center justify-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="email"
                    name="email"
                    id="email"
                    value={LoginForm.email}
                    onChange={LoginForm.handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="password"
                    name="password"
                    id="password"
                    value={LoginForm.password}
                    onChange={LoginForm.handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                <span class="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                  Forgot Password ?
                </span>
                <span class="text-sm mr-3">
                    Don't have an account? <Link className="hover:text-blue-500 cursor-pointer hover:underline" to="/register">Create</Link>
                </span>
                </div>
                <button
                  type="submit"
                  class="block w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-4  text-white-A700 rounded-2xl tracking-wide font-semibold mb-2"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default Login;
