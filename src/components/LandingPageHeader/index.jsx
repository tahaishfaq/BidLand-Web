import React, { useEffect, useState } from "react";

import { Button, Img, List, Text } from "components";
import { Link } from "react-router-dom";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { HomeModernIcon } from "@heroicons/react/20/solid";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const LandingPageHeader = (props) => {
  var token = localStorage.getItem("JWT")
  var userPic = localStorage.getItem("userData")
  console.log(token);
  console.log(userPic);
  // const [userPic, setUserPic] = useState("")

  useEffect(()=>{
    // setUserPic(localStorage.getItem("userData"))
  },[])
  return ( 
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="flex items-center">
            <Link to="/">
          <div className="flex flex-row gap-x-1 items-center justify-start">
                <HomeModernIcon className="h-8 w-8 text-orange-A700"/>
                <Text
                  className="text-orange-A700 text-xl mt-2.5"
                  size="txtMarkoOneRegular20"
                  >
                  BidLand
                </Text>
              </div>
                  </Link>
            <div className="mobile-menu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="flex sm:flex-1 sm:flex-col flex-row sm:hidden items-center justify-between w-[492px] sm:w-full">
            <List
              className="sm:flex-col flex-row gap-10 grid grid-cols-3"
              orientation="horizontal"
            >
             
              <div className="flex flex-row gap-1.5 items-start justify-start w-[77px]">
                <Link to="/listing">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    Listing
                  </Text>
                </Link>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-start w-[77px]">
                <Link to="/agentlist">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    Sellers
                  </Text>
                </Link>
              </div>
              <div className="flex flex-row gap-1.5 items-start justify-start w-[77px]">
                <Link to="/aboutus">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    About Us
                  </Text>
                </Link>
              </div>
            </List>
            <Link to="/contactpage">
              <Text
                className="text-base text-center text-gray-900 w-auto"
                size="txtManropeSemiBold16"
              >
                Contact Us
              </Text>
            </Link>
            <Link to="blogpage">
              <Text
                className="text-base text-gray-900 w-auto"
                size="txtManropeSemiBold16"
              >
                Blog
              </Text>
            </Link>
          </div>
          <div className="flex flex-row gap-x-4  md:h-auto sm:hidden items-center justify-center">
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
            {!token ? 
            <Link to="/login">
          <Button className="bg-gray-800 hover:bg-gray-900 cursor-pointer font-manrope font-semibold py-3 px-8 rounded-[10px] text-base text-center text-white-A700 ">
            Log in
          </Button>
            </Link> : 
            <>
             <Menu as="div" className="relative ml-3 font-manrope">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={userPic ? userPic : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                        alt=""
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
                    <Menu.Items className="absolute right-0 z-10 mt-3 w-48 origin-top-right rounded-md bg-white-A700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
            </>
}
        </div>
          </div>
      </header>
    </>
  );
};

LandingPageHeader.defaultProps = {};

export default LandingPageHeader;
