import { ArrowSmallLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "../../../fireabse";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const AllProperties = () => {
  var userId = localStorage.getItem("userId");
  var token = localStorage.getItem("JWT");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [properties, setProperties] = useState(null);
  const [show, setShow] = useState(true);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [loader, setLoader] = useState(false);
  const [imgMetaData, setImgMetaData] = useState("");
  const [specification, setSpecification] = useState([]);
  const [propertyReport, setPropertyReport] = useState(null);
  const navigate = useNavigate();

  // const handleImageChange = (e) => {
  //   if (e.target.files[0]) {
  //     setLoader(true);
  //     setImage(e.target.files[0]);
  //     handleUpload(e.target.files[0]);
  //   }
  // };

  // const handleUpload = (image) => {
  //   if (!image) {
  //     console.error("Please select an image.");
  //     return;
  //   }

  //   const storageRef = ref(storage, `images/${image.name}`);

  //   uploadBytes(storageRef, image)
  //     .then((snapshot) => {
  //       console.log("File uploaded successfully!", snapshot);
  //       setImgMetaData(snapshot?.metadata?.fullPath);
  //       // Get the download URL for the file
  //       getDownloadURL(snapshot.ref)
  //         .then((downloadURL) => {
  //           console.log("File Uploaded Successfully");
  //           toast.success("File Uploaded Successfully")
  //           setUrl(downloadURL);
  //           setLoader(false);
  //         })
  //         .catch((error) => {
  //           console.error("Error getting download URL:", error);
  //           setLoader(false);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error uploading file:", error);
  //       setLoader(false);
  //     });
  // };

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/property/view`).then((res) => {
        console.log(res?.data);
        setProperties(res?.data?.properties);
      });
    } catch (error) {
      console.log(error);
    }
  }, [show]);

  // const AddProperty = useFormik({
  //   initialValues: {},
  //   onSubmit: async (values) => {
  //     var json = {
  //       name: values.name,
  //       description: values.description,
  //       fixedPrice: values.fixedPrice,
  //       images: url,
  //       specifications: [values.bedrooms, values.bathrooms, values.square, values.other],
  //     };
  //     console.log("json", json);
  //       try {
  //         await axios
  //           .post(`http://localhost:3000/property/add`, json, config)
  //           .then((res) => {
  //             console.log(res.data);
  //             toast.success("Property Added Successfully")
  //             setProperties(res?.data?.properties)
  //             setShow(true)
  //           }).catch((err) =>
  //           toast.error("Property Added Failed"));
  //       } catch (error) {
  //         console.error("Error submitting form:", error);
  //       }
  //   },
  // });

  const handleDeleteProperty = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3000/property/delete/${id}`, config)
        .then((res) => {
          console.log(res.data);
          toast.success("Property Deleted Successfully");
          setProperties(res?.data?.properties?.deletedProperty);
        })
        .catch((err) => {
          toast.error("Property Delete Failed");
        });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const handleReport = (id) => {
    document.getElementById("my_modal_3").showModal();
    try {
      axios
        .get(`http://localhost:3000/auth/properties/reports/${id}`, config)
        .then((res) => {
          console.log(res?.data);
          setPropertyReport(res?.data?.reports);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Toaster richColors />

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              Properties
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the properties added by me.
            </p>
          </div>
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={() => setShow(false)}
                className="block rounded-md bg-blue-600 px-4 py-2 text-center text-white-A700 text-sm font-semibold tracking-wide text-white shadow-sm hover:bg-blue-500"
              >
                Add Property
              </button>
            </div> */}
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 h-[40rem] overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 border rounded-lg ">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Rating
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Bidding
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Report
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {properties?.map((property) => (
                    <tr key={property?._id}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full"
                              src={
                                property?.images[0]
                                  ? property?.images[0]
                                  : "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {property?.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 ">
                        <p className="truncate w-60">{property?.description}</p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <p className="truncate w-40">
                          {property?.location?.address}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {"Rs " + property?.fixedPrice}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        5.0 rating
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-500">
                        {property?.isBidding == true ? "Yes" : "No"}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-center text-sm text-gray-500">
                        <button
                          className="text-white px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 relative"
                          disabled={property?.reports?.length <= 0 && true}
                          onClick={() => handleReport(property?._id)}
                        >
                          Report
                          {property?.reports?.length > 0 && (
                            <span className="bg-red-500 text-white text-base rounded-full px-2 absolute -top-3 -right-3">
                              {property?.reports?.length}
                            </span>
                          )}
                        </button>
                      </td>
                      <td className="flex items-center gap-x-2 justify-center whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          className="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
                          onClick={() =>
                            navigate(
                              `/sellerdashboard/edit-properties/${property?._id}`
                            )
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="text-white px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500"
                          onClick={() => handleDeleteProperty(property?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dialog id="my_modal_3" className="modal custom-modal">
                <div className="modal-box">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-2xl mb-10">Report</h3>
                  <div className="flex items-center">
                    <div class="relative overflow-x-auto">
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Report Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Message
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Reason
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b ">
                            {propertyReport?.map((report) => (
                              <>
                                <td
                                  scope="row"
                                  class="px-4 py-4 font-medium text-gray-900 "
                                >
                               
                                  {report?._id.substring(0, 8)}
                                </td>
                                <td class="px-4 py-4">
                                  {report?.feedbackMessage}
                                </td>
                                <td class="px-4 py-4">
                                  {report?.feedbackReason}
                                </td>
                                <td class="px-4 py-4">{report?.timestamp.split("T")[0]}</td>
                              </>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProperties;
