"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NavLinks = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "About Us", path: "/#about" },
  { id: 3, name: "Workflow", path: "/#workflow" },
  { id: 4, name: "Products", path: "/#products" },
  { id: 5, name: "Contact", path: "/contact" },
];

const Navbar = ({ navProps }: any) => {
  console.log(navProps);
  const [menuOpen, setMenuOpen] = useState(false);
  // const pathname = usePathname();
  const [hide, setHide] = useState(false);

  const isActive = (link: any) => {
    return (
      link.path?.includes("#") &&
      window.location.hash === link.path?.substring(link.path.indexOf("#"))
    );
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) {
        setHide(true);
      } else {
        setHide(false);
      }
    }
  }, []);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="w-full">
      <nav className="relative w-full main_padding py-4 flex justify-between bg-white">
        <Link
          className="text-3xl max-sm:text-sm font-bold leading-none"
          href="/"
        >
          <Image
            src="/images/logo.jpg"
            alt="logo"
            width={200}
            height={50}
            className="w-full h-8"
          />
        </Link>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="navbar-burger flex items-center text-blue-600 p-3 max-sm:p-0"
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:mx-auto lg:items-center lg:w-auto lg:space-x-6">
          {NavLinks.map((link) => (
            <li key={link.id}>
              <Link
                className={
                  isActive(link.path)
                    ? "text-sm text-blue-400 hover:text-gray-500 font-bold"
                    : "text-sm text-gray-400 hover:text-gray-500"
                }
                href={link.path}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex lg:ml-auto lg:space-x-1">
          {hide == false ? (
            <>
              <Link
                className="py-2 px-4 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-md transition duration-200"
                href="/signin"
              >
                Sign In
              </Link>
              <Link
                className="py-2 px-4 bg-green-500 hover:bg-green-600 text-sm text-white font-bold rounded-md transition duration-200"
                href="/signup"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <div className="">
                <Link href={"/contribution"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-user-circle"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#000"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </nav>
      {menuOpen && (
        <div className="navbar-menu fixed inset-0 z-50 flex">
          <div
            className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
            onClick={toggleMenu}
          ></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link
                className="mr-auto text-3xl font-bold leading-none"
                href="/"
              >
                Smart Garbage
              </Link>
              <button onClick={toggleMenu} className="navbar-close">
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div>
              <ul>
                {NavLinks.map((link) => (
                  <li key={link.id} className="mb-1">
                    <Link
                      className={
                        isActive(link.path)
                          ? "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                          : "block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      }
                      href={link.path}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                {hide === false ? (
                  <>
                    <Link
                      className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                      href="/signin"
                    >
                      Sign in
                    </Link>
                    <Link
                      className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-green-500 hover:bg-green-600 rounded-xl"
                      href="/signup"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="text-4xl text-black">
                      <Link href={"/contribution"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-user-circle"
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#000"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                        </svg>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
