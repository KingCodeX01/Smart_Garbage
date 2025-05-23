import Image from "next/image";
import React from "react";
import { format } from "date-fns";
const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow">
      <div className="w-full max-w-screen-full px-8 max-md:mt-4 mx-auto  md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://shreeminfortech.com.np/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              <Image
                src={"/images/logo.jpg"}
                alt="logo"
                width={200}
                height={50}
                className="w-full h-10"
              />
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 ">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center">
          © {format(new Date(), "yyyy")}{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            SmartKabadi
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
