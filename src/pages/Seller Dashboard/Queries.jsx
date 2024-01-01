import React, { useEffect, useState } from "react";
import { ArrowSmallLeftIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useFormik } from "formik";

const Queries = () => {
  var userId = localStorage.getItem("userId");
  var token = localStorage.getItem("JWT");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [properties, setProperties] = useState([]);
  const [queries, setQueries] = useState([]);
  const [show, setShow] = useState(false);
  const [propertyId, setPropertyId] = useState("")
  const [queryId, setQueryId] = useState("")

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:3000/property/${userId}/properties`)
        .then((res) => {
          console.log(res?.data);
          setProperties(res?.data?.properties);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handlePropertyBids = (id) => {
    setShow(true);
    setPropertyId(id)
    try {
      axios.get(`http://localhost:3000/property/view/${id}`).then((res) => {
        setQueries(res?.data?.property?.queries);
        console.log(res?.data?.property?.bids);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const Reply = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      console.log(values);
      const json = {
        propertyId: propertyId,
        replyText: values.replyText,
      }
      try {
        axios.post(`http://localhost:3000/property/reply-query/${queryId}`, json).then((res) => {
        //   setQueries(res?.data?.property?.queries);
          console.log(res?.data);
        });
      } catch (error) {
        console.log(error);
      }
    },
    enableReinitializer: true,
  });

  //   const handleWinBid = (bid) => {
  //     console.log(bid);
  //     const json = {
  //       propertyId: bid?.propertyId,
  //       winnerUserId: bid?.userId,
  //       bidId: bid?._id,
  //     };
  //     try {
  //       axios.post(`http://localhost:3000/property/win-bid`, json, config).then((res) =>{
  //         console.log(res?.data);
  //         toast.success(res?.data?.message)

  //       }).catch((err)=>{
  //         toast.error(err?.response?.data?.message);
  //       });
  //     } catch (error) {
  //       console.log(error?.response?.data?.message);
  //     }
  //   };
  return (
    <>
      <Toaster richColors />
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold leading-6 text-gray-900">
              Bids on Properties
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the properties added by me.
            </p>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 h-[20rem] overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full  align-middle sm:px-6 lg:px-8">
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
                      <td className="flex items-center gap-x-2 justify-center whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          className="text-white px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
                          onClick={() => handlePropertyBids(property?._id)}
                        >
                          Show Queries
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {show && (
          <>
            <div className="sm:flex sm:items-center my-10">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-semibold leading-6 text-gray-900">
                  Queries by Users
                </h1>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 h-[20rem] overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full  align-middle px-4 rounded-md">
                  <table className="min-w-full divide-y divide-gray-300 border">
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
                          Query
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Reply
                        </th>
                        {/*
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Actions
                      </th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 ">
                      {queries?.map((bid) => (
                        <tr key={bid._id}>
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex items-center">
                              <div className="h-11 w-11 flex-shrink-0">
                                <img
                                  className="h-11 w-11 rounded-full"
                                  src={bid?.userDetails?.profilePicture}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {bid?.userDetails?.name}
                                </div>
                                <div className="mt-1 text-gray-500">
                                  {bid?.userDetails?.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {bid?.queryText}
                            </div>
                            {/* <div className="mt-1 text-gray-500">{person.department}</div> */}
                          </td>

                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                            <form onSubmit={Reply.handleSubmit}>
                              <div className="flex gap-x-2">
                                <label
                                  for="replyText"
                                  class="block mb-2 text-sm font-medium text-gray-900 sr-only"
                                ></label>
                                <textarea
                                  id="replyText"
                                  name="replyText"
                                  value={Reply.values.replyText}
                                  onChange={Reply.handleChange}
                                  rows="1"
                                  class="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                                  placeholder="Write Query Reply...."
                                ></textarea>
                                <button
                                  type="submit"
                                  onClick={()=> setQueryId(bid?._id)}
                                  className="bg-blue-500 px-5 py-1 rounded-md text-white"
                                  
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Queries;
