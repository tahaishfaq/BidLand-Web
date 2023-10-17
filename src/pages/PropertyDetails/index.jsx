import React, { useEffect, useState } from "react";

import { Button, GoogleMap, Img, Input, List, Text } from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { EnvelopeIcon, PhoneIcon, StarIcon } from "@heroicons/react/20/solid";

const PropertyDetailsPage = () => {
  const landingPageCardPropList = [
    {},
    { image: "images/img_image_1.png" },
    { image: "images/img_image_2.png" },
  ];

  const {id} = useParams();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [propertyImages, setPropertyImages] = useState([])
  useEffect(() => {
    const handleLisitng = async() => {
      try {
      await  axios.get(`http://localhost:3000/property/view/${id}`).then((res) => {
          setPropertyDetails(res?.data?.property);
          setPropertyImages(res?.data?.property?.images)
          console.log(res?.data?.property);
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleLisitng();
  }, []);

  useEffect(() => {
    const handleSellerInfo = async() => {
      try {
      await  axios.get(`http://localhost:3000/auth/seller/${propertyDetails?.addedBy}`).then((res) => {
        console.log(res?.data?.seller);
          setSellerInfo(res?.data?.seller)
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleSellerInfo();
  }, [propertyDetails]);
  


  return (
    <>
      <div className="bg-gray-51 flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
           <div className="flex flex-col gap-10 items-start justify-start w-full">
            <LandingPageHeader className="bg-white-A700 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
            
            <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
              <div className="flex md:flex-col flex-row gap-x-6 items-center justify-center max-w-[1200px] mx-auto w-full">
                <div className="flex flex-1 flex-col items-center justify-start w-full">
                  <Img
                    className="object-cover rounded-lg w-full h-full object-center"
                    src={propertyImages[0]}
                    alt="rectangle5610"
                  />
                </div>
                <div className="flex sm:flex-1 flex-col gap-y-3 h-[530px] md:h-auto items-start justify-start w-auto sm:w-full">
                {propertyImages?.map((img) => 
                  <Img
                    className="h-40 w-40 object-cover object-center rounded-lg"
                    src={img}
                    alt="rectangle5611"
                  />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
              <div className="flex md:flex-col flex-row gap-6 items-start justify-center max-w-[1200px] mx-auto w-full">
                <div className="flex flex-1 flex-col gap-6 items-start justify-start w-full">
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                    <div className="flex flex-col gap-11 items-start justify-start w-full">
                     
                     <div className="flex flex-col gap-6 items-start justify-start w-full">
                        <div className="flex flex-col gap-4 items-start justify-start w-full">
                          <Text
                            className="leading-[135.00%] max-w-[712px] md:max-w-full sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px]"
                            size="txtManropeExtraBold28"
                          >
                            {propertyDetails?.name}
                          </Text>
                          <Text
                            className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                            size="txtManropeSemiBold20Gray900"
                          >
                            {propertyDetails?.location?.address}
                          </Text>
                        </div>
                        <div className="flex sm:flex-col flex-row gap-4 items-start justify-start md:pr-10 sm:pr-5 pr-[180px] w-full">
                          <div className="bg-white-A700 border border-gray-600 border-solid flex flex-1 flex-col items-center justify-center sm:px-5 px-6 py-[7px] rounded-[10px] w-full">
                            <div className="flex flex-col gap-1 items-start justify-start w-full">
                              <Text
                                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                                size="txtManropeBold24Gray900"
                              >
                                {"$"+ propertyDetails?.fixedPrice}
                              </Text>
                              <Text
                                className="text-gray-600 text-xs w-full"
                                size="txtManropeSemiBold12"
                              >
                                Online / Cash Payment
                              </Text>
                            </div>
                          </div>
                          <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-1 flex-col items-center justify-center sm:px-5 px-6 py-[7px] rounded-[10px] w-full">
                            <div className="flex flex-col gap-1 items-start justify-start w-full">
                              <Text
                                className="text-2xl md:text-[22px] text-gray-900 sm:text-xl tracking-[-0.48px] w-full"
                                size="txtManropeBold24Gray900"
                              >
                                {"$"+ Math.floor(propertyDetails?.fixedPrice /12)} / month
                              </Text>
                              <Text
                                className="text-gray-600 text-xs w-full"
                                size="txtManropeSemiBold12"
                              >
                                0% EMI for 6 Months
                              </Text>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-4 items-start justify-start w-full">
                        <Text
                          className="text-gray-900 text-xl tracking-[-0.40px] w-full"
                          size="txtManropeSemiBold20Gray900"
                        >
                          {"Well-constructed (" + propertyDetails?.specifications[2] +") Home Is Now Offering To You In Uttara For Sale"}
                        </Text>
                        <Text
                          className="leading-[180.00%] max-w-[712px] md:max-w-full text-gray-600 text-lg"
                          size="txtManropeRegular18Gray600"
                        >
                          <>
                          {propertyDetails?.description}
                          </>
                        </Text>
                      </div>
                      <div className="flex flex-col gap-4 items-start justify-start w-full">
                        <h2 className="text-xl font-semibold font-manrope">Location:</h2>
                        <div className="h-[400px] relative w-full">
                          <GoogleMap
                            className="h-[400px] m-auto rounded-[10px] w-full"
                            showMarker={true}
                          ></GoogleMap>
                          <Img
                            className="absolute h-[54px] inset-[0] m-auto w-[389px]"
                            src="images/img_frame1000001425.svg"
                            alt="frame1000001425"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                    <div className="flex flex-col gap-6 items-start justify-start w-full">
                      <Text
                        className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                        size="txtManropeExtraBold28"
                      >
                        Home Highlights
                      </Text>
                      <List
                        className="sm:flex-col flex-row md:gap-10 gap-[150px] grid md:grid-cols-1 grid-cols-2 justify-start w-full"
                        orientation="horizontal"
                      >
                        <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                          <div className="flex flex-row gap-[55px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Parking
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              No Info
                            </Text>
                          </div>
                          <div className="flex flex-row gap-[47px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Outdoor
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              No Info
                            </Text>
                          </div>
                          <div className="flex flex-row gap-[85px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                A/C
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              No Info
                            </Text>
                          </div>
                          <div className="flex flex-row gap-10 items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Year Built
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              2021
                            </Text>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
                          <div className="flex flex-row gap-20 items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                HOA
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              None
                            </Text>
                          </div>
                          <div className="flex flex-row gap-8 items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Price/Sqft
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              $560
                            </Text>
                          </div>
                          <div className="flex flex-row gap-[66px] items-start justify-start w-full">
                            <div className="flex flex-1 flex-row gap-2.5 items-center justify-start w-full">
                              <div className="bg-gray-600 h-2 rounded-[50%] w-2"></div>
                              <Text
                                className="flex-1 text-gray-600 text-lg w-auto"
                                size="txtManropeRegular18Gray600"
                              >
                                Listed
                              </Text>
                            </div>
                            <Text
                              className="flex-1 text-gray-900 text-lg text-right w-auto"
                              size="txtManropeSemiBold18"
                            >
                              Yes
                            </Text>
                          </div>
                        </div>
                      </List>
                    </div>
                  </div>
                  <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col items-start justify-start p-10 sm:px-5 rounded-[10px] w-full">
                    <div className="flex flex-col gap-[26px] items-start justify-start w-full">
                      <Text
                        className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                        size="txtManropeExtraBold28"
                      >
                        Seller Information
                      </Text>
                      <div className="flex flex-row gap-6 items-center justify-start w-full hover:bg-gray-100 rounded-lg cursor-pointer">
                        <Img
                          className="h-40 object-cover object-center rounded-full w-40"
                          src={sellerInfo?.profilePicture}
                          alt="rectangle5599"
                        />
                        <div className="flex flex-col gap-[3px] items-start justify-start w-auto">
                          <Text
                            className="text-gray-900 text-xl tracking-widder w-auto"
                            size="txtManropeSemiBold20Gray900"
                          >
                            {sellerInfo?.username.toUpperCase()}
                          </Text>
                          <div className="flex flex-row gap-3.5 items-center justify-start w-full">
                            <div className="flex flex-row gap-1 items-start justify-start w-auto">
                             <StarIcon className="w-5 h-5 text-orange-500"/>
                             <StarIcon className="w-5 h-5 text-orange-500"/>
                             <StarIcon className="w-5 h-5 text-orange-500"/>
                             <StarIcon className="w-5 h-5 text-orange-500"/>
                             <StarIcon className="w-5 h-5 text-orange-500"/>
                            <Text
                              className="text-base text-gray-900 w-auto"
                              size="txtManropeSemiBold16"
                            >
                              (5.0 rating)
                            </Text>
                            </div>
                          </div>
                          <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                            <EnvelopeIcon className="w-5 h-5 text-gray-600"/>
                            <Text
                              className="text-base text-gray-600 w-auto"
                              size="txtManropeMedium16"
                            >
                              {sellerInfo?.email}
                            </Text>
                          </div>
                          <div className="flex flex-row gap-2.5 items-center justify-start w-full">
                            <PhoneIcon className="w-5 h-5 text-gray-600"/>
                            <Text
                              className="text-base text-gray-600 w-auto"
                              size="txtManropeMedium16"
                            >
                              {sellerInfo?.phone}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white-A700 border border-bluegray-100 border-solid flex sm:flex-1 flex-col items-start justify-start p-6 sm:px-5 rounded-[10px] w-auto sm:w-full">
                  <div className="flex flex-col gap-10 items-start justify-start w-[336px]">
                    <div className="flex flex-col gap-6 items-start justify-start w-full">
                      <Text
                        className="sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-full"
                        size="txtManropeExtraBold28"
                      >
                        Request for Visit
                      </Text>
                      <div className="flex flex-col gap-3 h-[440px] md:h-auto items-start justify-start w-full">
                        <Input
                          name="textfieldlarge"
                          placeholder="Full Name"
                          className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                          wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                          type="text"
                          prefix={
                            <Img
                              className="mt-auto mb-px h-6 mr-3.5"
                              src="images/img_user.svg"
                              alt="user"
                            />
                          }
                        ></Input>
                        <Input
                          name="textfieldlarge_One"
                          placeholder="Email Address"
                          className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                          wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                          type="email"
                          prefix={
                            <Img
                              className="mt-auto mb-px h-6 mr-3.5"
                              src="images/img_mail_gray_600_24x24.svg"
                              alt="mail"
                            />
                          }
                        ></Input>
                        <Input
                          name="textfieldlarge_Two"
                          placeholder="Phone Number"
                          className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                          wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                          type="number"
                          prefix={
                            <Img
                              className="mt-auto mb-px h-6 mr-3.5"
                              src="images/img_call.svg"
                              alt="call"
                            />
                          }
                        ></Input>
                        <Input
                          name="textfieldlarge_Three"
                          placeholder="Date"
                          className="font-semibold p-0 placeholder:text-gray-600 sm:pr-5 text-gray-600 text-left text-lg w-full"
                          wrapClassName="bg-white-A700 border border-bluegray-100 border-solid flex pl-4 pr-[35px] py-[17px] rounded-[10px] w-full"
                          prefix={
                            <Img
                              className="mt-auto mb-px h-6 mr-3.5"
                              src="images/img_calendar.svg"
                              alt="calendar"
                            />
                          }
                        ></Input>
                        <div className="bg-white-A700 border border-bluegray-100 border-solid flex flex-col h-[152px] md:h-auto items-start justify-start px-[19px] py-3.5 rounded-[10px] w-full">
                          <Text
                            className="text-gray-600 text-lg w-auto"
                            size="txtManropeSemiBold18Gray600"
                          >
                            Message
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-gray-900 cursor-pointer font-semibold py-[17px] rounded-[10px] text-base text-center text-white-A700 w-full">
                      Send Request
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full">
            <div className="flex flex-col gap-10 items-center justify-center max-w-[1200px] mx-auto w-full">
              <div className="flex sm:flex-col flex-row gap-5 items-center justify-start w-full">
                <Text
                  className="flex-1 sm:text-2xl md:text-[26px] text-[28px] text-gray-900 tracking-[-0.56px] w-auto"
                  size="txtManropeExtraBold28"
                >
                  Latest Property Listings
                </Text>
                <Button
                  className="bg-transparent cursor-pointer flex items-center justify-center min-w-[124px]"
                  rightIcon={
                    <Img
                      className="h-6 mb-[3px] ml-2"
                      src="images/img_arrowright.svg"
                      alt="arrow_right"
                    />
                  }
                >
                  <div className="font-bold text-left text-lg text-orange-A700">
                    Explore All
                  </div>
                </Button>
              </div>
              <List
                className="sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start w-full"
                orientation="horizontal"
              >
                {landingPageCardPropList.map((props, index) => (
                  <React.Fragment key={`LandingPageCard${index}`}>
                    <LandingPageCard
                      className="flex flex-1 flex-col h-full items-start justify-start w-full"
                      {...props}
                    />
                  </React.Fragment>
                ))}
              </List>
            </div>
          </div> */}
        </div>
        <LandingPageFooter className="bg-white-A700 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default PropertyDetailsPage;
