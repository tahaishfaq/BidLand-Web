
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import LandingPageHeader from "components/LandingPageHeader";
import LandingPageFooter from "components/LandingPageFooter";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import storage from "../../../fireabse";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const  EditProfile = () => {
  const [user, setUser] = useState(null)
  const [userPic, setUserPic] = useState("")
  const {id} = useParams();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [imgMetaData, setImgMetaData] = useState("")

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setLoader(true);
      setImage(e.target.files[0]);
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = (image) => {
    if (!image) {
      console.error("Please select an image.");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);

    uploadBytes(storageRef, image)
      .then((snapshot) => {
        console.log("File uploaded successfully!", snapshot);
        setImgMetaData(snapshot?.metadata?.fullPath)
        // Get the download URL for the file
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            console.log("File download URL:", downloadURL);
            setUrl(downloadURL);
            setLoader(false); // Set the download URL in the component state
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setLoader(false);
          });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setLoader(false);
      });
  };

  useEffect(() => {
    const handleUserProfile = () => {
      try {
        axios.get(`http://localhost:3000/auth/user/${id}`).then((res) => {
          console.log(res?.data?.user);
          setUser(res?.data?.user);
          setUserPic(res?.data?.user?.profilePicture)
          ProfileForm.setValues({
            username: res?.data?.user?.username,
            email: res?.data?.user?.email,
            phone: res?.data?.user?.phone,
          })

        });
      } catch (error) {
        console.log(error);
      }
    };
    handleUserProfile();
  }, []);
  
  const ProfileForm = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      profilePicture: "",
    },
    onSubmit: async (values) => {
      var json = {
        username: values.username,
        email: values.email,
        password: values.password,
        phone: values.phone,
        profilePicture: url,
      };
      console.log("json", json);
      try {
        await axios
          .put(`http://localhost:3000/auth/user/${id}`, json)
          .then((res) => {
            localStorage.setItem("userData", res?.data?.profilePicture);
            console.log(res.data);
          });
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
          <div className="divide-y divide-white/5 font-manrope">
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  You can edit your personal information here.
                </p>
              </div>

              <form className="md:col-span-2" onSubmit={ProfileForm.handleSubmit}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full flex items-center gap-x-8">
                    <img
                      src={url ? url : userPic}
                      alt=""
                      className="h-24 w-24 flex-none rounded-full bg-gray-800 object-cover"
                    />
                     {loader ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    ) : (
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

                         {url ? <span className="bg-purple-100 text-sm rounded-full px-2 text-purple-800">{imgMetaData}
                         </span>: <p class="text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>}
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          class="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        value={ProfileForm.values.username}
                        onChange={ProfileForm.handleChange}
                        type="text"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  
                  <div className="col-span-full">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={ProfileForm.values?.email}
                        onChange={ProfileForm.handleChange}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                     Phone No
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        value={ProfileForm.values?.phone}
                        onChange={ProfileForm.handleChange}
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                  Change password
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Update your password associated with your account.
                </p>
              </div>

              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Current password
                    </label>
                    <div className="mt-2">
                      <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      New password
                    </label>
                    <div className="mt-2">
                      <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            

            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">
                  Delete account
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  No longer want to use our service? You can delete your account
                  here. This action is not reversible. All information related
                  to this account will be deleted permanently.
                </p>
              </div>

              <form className="flex items-start md:col-span-2">
                <button
                  type="submit"
                  className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                >
                  Yes, delete my account
                </button>
              </form>
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
}
export default EditProfile