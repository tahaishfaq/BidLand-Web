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
import { Fragment } from "react";
import {
  Dialog,
  Disclosure,
  Menu,
  Popover,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

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
  const [listing, setListing] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleLisitng = () => {
      try {
        axios.get("http://localhost:3000/property/view").then((res) => {
          setListing(res?.data?.properties);
          console.log(res?.data?.properties);
        });
      } catch (error) {
        console.log(error);
      }
    };
    handleLisitng();
  }, []);

  return (
    <>
      <div className="bg-white flex flex-col font-markoone sm:gap-10 md:gap-10 gap-[100px] items-start justify-start mx-auto w-auto sm:w-full md:w-full">
        <div className="flex flex-col md:gap-10 gap-y-10 items-center justify-center w-full">
          <LandingPageHeader className="bg-orange-50 flex gap-2 h-20 md:h-auto items-center justify-between md:px-5 px-[120px] py-[19px] w-full" />
         
            {/* Mobile filter dialog */}
           
            <div className="w-full sm:px-6 px-32 font-manrope">
              <section
                aria-labelledby="filter-heading"
              >
                <h2 id="filter-heading" className="text-4xl font-bold mb-10">
                  Find The Property
                </h2>

                <div className="flex items-center justify-between border-t border-gray-200 py-6">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white-A700 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option}>
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm font-medium text-gray-900"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Popover.Group className=" sm:flex sm:items-baseline sm:space-x-8 space-x-8">
                    {filters.map((section, sectionIdx) => (
                      <Popover
                        as="div"
                        key={section.name}
                        id={`desktop-menu-${sectionIdx}`}
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            <span>{section.name}</span>
                            {sectionIdx === 0 ? (
                              <span className="ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                                1
                              </span>
                            ) : null}
                            <ChevronDownIcon
                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Popover.Panel className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white-A700 p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <form className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </form>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    ))}
                  </Popover.Group>
                </div>
              </section>
            </div>
            <div className=" w-full inline-flex justify-end px-32">
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
                  type="search"
                  id="default-search"
                  class="block w-full py-3 pl-10 pr-20 text-sm text-gray-900 border font-manrope border-gray-300 rounded-lg bg-gray-50" placeholder="Search Properties"
                  required
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
                  <LandingPageCard className="flex flex- md:h-auto items-start justify-start w-full" />
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
