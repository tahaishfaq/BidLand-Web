import React, { useEffect, useState } from "react";

import {
  Button,
  GoogleMap,
  Img,
  Input,
  List,
  SelectBox,
  Text,
} from "components";
import LandingPageCard from "components/LandingPageCard";
import LandingPageFooter from "components/LandingPageFooter";
import LandingPageHeader from "components/LandingPageHeader";
import axios from "axios";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import { Fragment } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

const sortOptions = [
  { name: "Most Popular", href: "#" },
  { name: "Best Rating", href: "#" },
  { name: "Newest", href: "#" },
];
const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "tees", label: "Tees" },
      { value: "crewnecks", label: "Crewnecks" },
      { value: "hats", label: "Hats" },
    ],
  },
  {
    id: "brand",
    name: "Brand",
    options: [
      { value: "clothing-company", label: "Clothing Company" },
      { value: "fashion-inc", label: "Fashion Inc." },
      { value: "shoes-n-more", label: "Shoes 'n More" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "grey", label: "Grey" },
    ],
  },
  {
    id: "sizes",
    name: "Sizes",
    options: [
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ListingPage = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListing, setFilteredListing] = useState([]);
  const [priceValue, setPriceValue] = useState([100000, 20000000]);
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("")
  useEffect(() => {
    const handleLisitng = () => {
      try {
        axios.get("http://localhost:3000/property/view").then((res) => {
          setListing(res?.data?.properties);
          setFilteredListing(res?.data?.properties);
          console.log(res?.data?.properties);
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleLisitng();
  }, []);

  const handlePropertyDetails = (id) => {
    navigate(`/propertydetails/${id}`);
  };

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const filtered = listing?.filter((property) =>
      property?.name?.toLowerCase()?.includes(searchValue?.toLowerCase())
    );
    setFilteredListing(filtered);
  };

  const handleWishList = (property) => {
    if (!wishlist?.find((item) => item?._id === property?._id)) {
      if (wishlist?.length <= 0) {
        setWishlist([property]);
        localStorage.setItem("wishlist", JSON.stringify([property]));
      } else {
        setWishlist([...wishlist, property]);
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...wishlist, property])
        );
      }
    }
  };

  const handlePropertyTypeFilter  = (value) =>{
    if(value == "Commercial" || value == "Industrial" || value == "Residential"){
    try {
      axios.get(`http://localhost:3000/property/filterByPropertyType?propertyType=${value}`).then((res)=>{
        console.log(res?.data);
        setListing(res?.data);
        setFilteredListing(res?.data);
      })
    } catch (error) {
      console.log(error);
    }
  }
  else{
    try {
      axios.get("http://localhost:3000/property/view").then((res) => {
        setListing(res?.data?.properties);
        setFilteredListing(res?.data?.properties);
        console.log(res?.data?.properties);
      });
    } catch (error) {
      console.log(error);
    }
  }
  }
  const handleCityFilter  = (value) =>{
    if(value == "Lahore" || value == "Karachi" || value == "Islamabad" || value == "Peshawar" || value == "Multan" || value =="Rawalpindi"){
    try {
      axios.get(`http://localhost:3000/property/filterByPropertyCity?city=${value}`).then((res)=>{
        console.log(res?.data);
        setListing(res?.data);
        setFilteredListing(res?.data);
      })
    } catch (error) {
      console.log(error);
    }
  }
  else{
    try {
      axios.get("http://localhost:3000/property/view").then((res) => {
        setListing(res?.data?.properties);
        setFilteredListing(res?.data?.properties);
        console.log(res?.data?.properties);
      });
    } catch (error) {
      console.log(error);
    }
  }
  }
  useEffect(() =>{
    try {
      axios.get(`http://localhost:3000/property/filterByPriceRange?minPrice=${priceValue[0]}&maxPrice=${priceValue[1]}`).then((res) =>{
        console.log(res?.data);
        setListing(res?.data);
        setFilteredListing(res?.data);
      })
    } catch (error) {
      console.log(error);
    }
  },[priceValue])

  return (
    <>
      <div className="bg-white flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-y-10 items-center justify-center w-full">
          <LandingPageHeader className="bg-orange-50 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />

          {/* Mobile filter dialog */}

          <div className="w-full sm:px-6 px-32 font-manrope">
            <section aria-labelledby="filter-heading">
              <h2 id="filter-heading" className="text-4xl font-bold mb-12">
                Find The Property
              </h2>
              <div className="flex items-center justify-end gap-x-4 rounded-md">
              <h2 className="text-2xl mb-1 font-bold ">Apply Filters</h2>
              </div>
              <div className="flex items-center justify-end gap-x-4 rounded-md">
                <div className="w-96 bg-gray-51 rounded-md p-2">
                  <label
                    htmlFor="filter_price"
                    className="text-[16px] font-semibold"
                  >
                    Price
                  </label>

                  <div className="flex justify-between items-center font-semibold">
                    <p>{"Rs " + priceValue[0].toLocaleString()}</p>
                    <p>{"Rs " + priceValue[1].toLocaleString()}</p>
                  </div>
                  <div id="range-slider" className="py-1">
                    <RangeSlider
                      value={priceValue}
                      onInput={setPriceValue}
                      min={100000}
                      max={20000000}
                    />
                  </div>
                </div>
                <div className="w-60">
                  <select
                    id="city"
                    name="city"
                    onChange={(e) => handleCityFilter(e.target.value)}
                    class="bg-gray-51 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="">All City</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>
                <div className="w-60">
                  <select
                    id="propertyType"
                    name="propertyType"
                    onChange={(e) => handlePropertyTypeFilter(e.target.value)}
                    class="bg-gray-51 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option value="">All Property Type</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>
            </section>
          </div>
          <div className="w-full flex justify-end px-32">
            <form>
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  class="flex w-[22rem] py-3 pl-10 pr-20 text-sm text-gray-900 border font-manrope border-gray-300 rounded-lg bg-gray-50"
                  placeholder="Search Properties"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="flex flex-row font-manrope items-center justify-center md:px-10 sm:px-5 px-[120px] w-full ">
            <div className="flex  flex-row gap-6 items-start justify-center mx-auto w-full">
              <div className="h-[511px] relative w-[32%] md:w-full">
                <div className="h-[511px] m-auto w-full">
                  <GoogleMap
                    className="h-[611px] m-auto rounded-[10px] w-full"
                    showMarker={false}
                  ></GoogleMap>
                  <Img
                    className="absolute h-[427px] inset-y-[0] my-auto right-[6%]"
                    src="images/img_group1000001533.svg"
                    alt="group1000001533"
                  />
                </div>
                <div className="absolute bg-white-A700-A700 border border-gray-600 border-solid flex flex-col h-max inset-y-[0] items-center justify-start left-[7%] my-auto px-4 py-6 rounded-lg w-[308px]">
                  <div className="flex flex-col gap-[21.66px] items-start justify-start w-full">
                    <div className="flex flex-row gap-[9.63px] items-center justify-start w-full">
                      <Img
                        className="h-[19px] w-[19px]"
                        src="images/img_eye.svg"
                        alt="eye"
                      />
                      <Text
                        className="flex-1 text-[12.83px] text-gray-900 w-auto"
                        size="txtManropeSemiBold1283"
                      >
                        2861 62nd Ave, Oakland, CA 94605
                      </Text>
                    </div>
                    <List
                      className="flex flex-col gap-[16.84px] items-start w-full"
                      orientation="vertical"
                    >
                      <div className="flex flex-1 flex-row gap-[32.08px] items-center justify-between my-0 w-full">
                        <div className="flex flex-1 flex-row gap-[9.63px] items-center justify-start w-full">
                          <Img
                            className="h-4 w-4"
                            src="images/img_bookmark.svg"
                            alt="bookmark"
                          />
                          <Text
                            className="flex-1 text-[12.83px] text-gray-700 w-auto"
                            size="txtManropeSemiBold1283Gray700"
                          >
                            3 Bed Room
                          </Text>
                        </div>
                        <div className="flex flex-1 flex-row gap-[9.63px] items-center justify-start w-full">
                          <Img
                            className="h-4 w-4"
                            src="images/img_ticket.svg"
                            alt="ticket"
                          />
                          <Text
                            className="text-[12.83px] text-gray-700 w-auto"
                            size="txtManropeSemiBold1283Gray700"
                          >
                            1 Bath
                          </Text>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-row gap-[32.08px] items-center justify-between my-0 w-full">
                        <div className="flex flex-1 flex-row gap-[9.63px] items-center justify-start w-full">
                          <Img
                            className="h-4 w-4"
                            src="images/img_icon.svg"
                            alt="icon"
                          />
                          <Text
                            className="flex-1 text-[12.83px] text-gray-700 w-auto"
                            size="txtManropeSemiBold1283Gray700"
                          >
                            1,032 sqft
                          </Text>
                        </div>
                        <div className="flex flex-1 flex-row gap-[9.63px] items-center justify-start w-full">
                          <Img
                            className="h-4 w-4"
                            src="images/img_iocnmenu.svg"
                            alt="iocnmenu"
                          />
                          <Text
                            className="text-[12.83px] text-gray-700 w-auto"
                            size="txtManropeSemiBold1283Gray700"
                          >
                            Family
                          </Text>
                        </div>
                      </div>
                    </List>
                    <div className="flex flex-col items-center justify-start w-full">
                      <Text
                        className="text-[19.25px] text-gray-900 tracking-[-0.39px] w-auto"
                        size="txtManropeBold1925"
                      >
                        $649,900
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-start justify-start w-full">
                <div className="md:gap-5 gap-6 grid md:grid-cols-1 grid-cols-2 justify-center min-h-[auto] w-full">
                  {filteredListing?.length > 0 ?
                  filteredListing?.map((property) => (
                    <div className="border border-solid flex items-start justify-start rounded-lg w-full">
                      <div className="flex flex-col gap-[27px] items-start justify-start w-full">
                        <div className="flex flex-col relative">
                          <img
                            className="h-96 w-full object-center object-cover rounded-t-lg "
                            src={property?.images[0]}
                            alt="eye"
                          />
                          <div className="flex w-full items-center justify-between pr-2 pl-2">
                            <h2 className="text-xl font-semibold px-4 pt-4 font-manrope">
                              {property?.name}
                            </h2>
                            <h2 className="text-xl font-semibold px-4 pt-4 font-manrope">
                              {"Rs " + property?.fixedPrice.toLocaleString()}
                            </h2>
                          </div>
                          <div
                            className="absolute bg-gray-100 items-center rounded-full p-2 top-4 right-4"
                            onClick={() => handleWishList(property)}
                          >
                            <span>
                              <HeartIcon className="w-8 h-8 text-gray-600 cursor-pointer hover:text-gray-800" />
                            </span>
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
                          <button
                            className="bg-gray-900 cursor-pointer text-white flex-1 font-manrope font-semibold py-5 rounded-[10px] text-base text-center  w-full"
                            onClick={() => handlePropertyDetails(property?._id)}
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    </div>
                  )): "No Properties"}
                </div>
              </div>
              {/* <div className="flex flex-1 flex-col md:gap-10 gap-[60px] items-start justify-start w-full">
                <div className="flex sm:flex-col flex-row gap-5 items-center justify-between w-full">
                  <div className="flex flex-row gap-[5px] items-start justify-start w-auto">
                    <Button className="border border-gray-700 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                      1
                    </Button>
                    <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                      2
                    </Button>
                    <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                      3
                    </Button>
                    <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                      4
                    </Button>
                    <Button className="border border-bluegray-102 border-solid cursor-pointer font-semibold h-12 py-[13px] rounded-[10px] text-base text-center text-gray-900 w-12">
                      5
                    </Button>
                  </div>
                  <Button
                    className="border border-bluegray-102 border-solid cursor-pointer flex items-center justify-center min-w-[134px] px-[17px] py-[13px] rounded-[10px]"
                    rightIcon={
                      <Img
                        className="h-4 mt-px mb-[5px] ml-1"
                        src="images/img_arrowright_gray_900.svg"
                        alt="arrow_right"
                      />
                    }
                  >
                    <div className="font-semibold text-base text-gray-900 text-left">
                      Next Page
                    </div>
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <LandingPageFooter className="bg-orange-50 flex gap-2 items-center justify-center md:px-5 px-[120px] py-20 w-full" />
      </div>
    </>
  );
};

export default ListingPage;
