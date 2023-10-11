import React from "react";

import { Button, Img, List, Text } from "components";
import { Link } from "react-router-dom";

const LandingPageHeader = (props) => {
  return (
    <>
      <header className={props.className}>
        <div className="flex md:flex-col flex-row md:gap-10 items-center justify-between w-full">
          <div className="flex items-center">
            <div className="flex flex-row gap-[10px] items-end">
              <Img className="h-10 w-10" src="images/img_home.svg" alt="home" />
              <Text
                className="text-orange-A700 text-xl w-auto"
                size="txtMarkoOneRegular20"
              >
                BidLand
              </Text>
            </div>
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
                <Link to="/">
                  <Text
                    className="text-base text-gray-900 w-auto"
                    size="txtManropeSemiBold16"
                  >
                    Home
                  </Text>
                </Link>
              </div>
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
            </List>
            <Link to="/listingmapview">
              <Text
                className="text-base text-center text-gray-900 w-auto"
                size="txtManropeSemiBold16"
              >
                Property{" "}
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
          <Button className="bg-gray-800 hover:bg-gray-900 cursor-pointer font-manrope font-semibold py-3 px-8 rounded-[10px] text-base text-center text-white-A700 ">
            Log in
          </Button>
        </div>
          </div>
      </header>
    </>
  );
};

LandingPageHeader.defaultProps = {};

export default LandingPageHeader;
