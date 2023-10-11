import React, { useEffect, useState } from "react";

import { Button, Img, Text } from "components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LandingPageCard = (props) => {
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(()=>{

    const handleLisitng = () =>{
      try {
        axios.get("http://localhost:3000/property/view").then((res)=>{
          setListing(res?.data?.properties);
          console.log(res?.data?.properties);

        })
      } catch (error) {
        console.log(error);
      }
    }
    handleLisitng();
  },[])
  
  const handlePropertyDetails = (id) =>{
    navigate(`/propertydetails/${id}`)
  }
  return (
    <>
       {listing?.map((property) => 
       <div className="bg-gray-51 border border-red-101 border-solid flex items-start justify-start rounded-lg w-full">
          <div className="flex flex-col gap-[27px] items-start justify-start w-full">
            <div className="flex flex-col">
              <Img className="h-96 w-full object-center object-cover rounded-t-lg" src={property?.images[0]} alt="eye" />
            <div className="flex w-full items-center justify-between pr-2 pl-2">
            <h2 className="text-xl font-semibold px-4 pt-4 font-manrope">{property?.name}</h2>
            <h2 className="text-xl font-semibold px-4 pt-4 font-manrope">{"$"+property?.fixedPrice}</h2>

            </div>
            </div>
            <div className="flex flex-col gap-[21px] items-start justify-start w-full px-4">
              <div className="flex flex-row gap-10 items-center justify-between w-full px-4">
                <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                  <Img
                    className="h-5 w-5"
                    src="images/img_bookmark.svg"
                    alt="bookmark"
                  />
                  <Text
                    className="flex-1 text-base text-gray-700 w-auto"
                    size="txtManropeSemiBold16Gray700"
                  >
                    {property?.specifications[0]}
                  </Text>
                </div>
                <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                  <Img
                    className="h-5 w-5"
                    src="images/img_ticket.svg"
                    alt="ticket"
                  />
                  <Text
                    className="text-base text-gray-700 w-auto"
                    size="txtManropeSemiBold16Gray700"
                  >
                    {property?.specifications[1]}
                  </Text>
                </div>
              </div>
              <div className="flex flex-row gap-10 items-center justify-between w-full px-4">
                <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                  <Img
                    className="h-5 w-5"
                    src="images/img_icon.svg"
                    alt="icon"
                  />
                  <Text
                    className="flex-1 text-base text-gray-700 w-auto"
                    size="txtManropeSemiBold16Gray700"
                  >
                    {property?.specifications[2]}
                  </Text>
                </div>
                <div className="flex flex-1 flex-row gap-3 items-center justify-start w-full">
                  <Img
                    className="h-5 w-5"
                    src="images/img_settings.svg"
                    alt="settings"
                  />
                  <Text
                    className="text-base text-gray-700 w-auto"
                    size="txtManropeSemiBold16Gray700"
                  >
                    {property?.specifications[3]}
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start w-full">
              
              <button className="bg-gray-900 cursor-pointer flex-1 font-manrope font-semibold py-[13px] rounded-[10px] text-base text-center text-white-A700 w-full" onClick={() => handlePropertyDetails(property?._id)}>
                Details
              </button>
              
            </div>
          </div>
        </div>)}
    </>
  );
};



export default LandingPageCard;
