import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/20/solid";
const Register = () => {
    const [base64Image, setBase64Image] = useState(""); // State to hold base64 image data

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64Image(e.target.result); // Set the base64 image data
      };
      reader.readAsDataURL(file);
    }
  };

  const LoginForm = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
      phone: "",
      rating: 4
    },
    onSubmit: async (values) => {
      try {
        // Add the base64 image data to the form values
        const updatedValues = {
          ...values,
          profilePicture: base64Image,
        };

        await axios.post("http://localhost:3000/auth/register", updatedValues).then((res) =>{
            console.log(res.data);
        })
      } catch (error) {
        console.error("Error submitting form:", error);
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
                <h1 class="text-white font-bold text-4xl font-sans">BidLand</h1>
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
                  Welcome To BidLand
                </h1>
                <p class="text-sm text-center font-normal text-gray-600 mb-7">
                  Create Your Account
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
                      d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                    />
                  </svg>
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="text"
                    name="username"
                    id="username"
                    value={LoginForm.username}
                    onChange={LoginForm.handleChange}
                    placeholder="Username"
                    required
                  />
                </div>
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
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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
                <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <input
                    class="pl-2 outline-none border-none w-full rounded-lg"
                    type="text"
                    name="phone"
                    id="phone"
                    value={LoginForm.phone}
                    onChange={LoginForm.handleChange}
                    placeholder="Phnoe Number"
                    required
                  />
                </div>
                <div class="flex items-center  mb-4">
                  <select
                    id="role"
                    name="role"
                    value={LoginForm.role}
                    onChange={LoginForm.handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-600 font-medium text-sm  py-4 px-4 rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Choose a role</option>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
                <div class="flex items-center">
                  <div class="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center">
                        <svg
                          class="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                       
                       <p class="text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden"  onChange={handleFileChange}/>
                    </label>
                    {/* <button className="bg-blue-600 px-4 py-" onClick={handleUpload}>Upload</button> */}
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span class="text-sm mr-3">
                    Already have account?{" "}
                    <Link
                      className="hover:text-blue-500 cursor-pointer hover:underline"
                      to="/login"
                    >
                      Login
                    </Link>
                  </span>
                </div>
                <button
                  type="submit"
                  class="block w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-4  text-white-A700 rounded-2xl tracking-wide font-semibold mb-2"
                >
                  Register
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

export default Register;
