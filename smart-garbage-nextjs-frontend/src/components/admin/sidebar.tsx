import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="container flex flex-col mx-auto bg-white">
          <aside
            className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all
                        duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
            id="sidenav-main"
          >
            <div className="flex shrink-0 px-8 items-center justify-between h-[96px]">
              <a
                className="transition-colors duration-200 ease-in-out"
                href="https://www.loopple.com"
              >
                <img
                  alt="Logo"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/loopple.svg"
                  className="inline"
                />
              </a>
            </div>

            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

            <div className="relative pl-3 my-1 overflow-y-scroll">
              <div className="flex flex-col w-full font-medium">
                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Dashboard
                    </Link>
                  </span>
                </div>

                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <Link
                      href="/admin/garbagecollection"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Garbage Collection
                    </Link>
                  </span>
                </div>
                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <Link
                      href="/admin/user"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Users
                    </Link>
                  </span>
                </div>
                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <Link
                      href="/admin/product"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Products
                    </Link>
                  </span>
                </div>

                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <Link
                      href="/admin/sell"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Sell
                    </Link>
                  </span>
                </div>

                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <a
                      href="javascript:;"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Orders
                    </a>
                  </span>
                </div>
                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <a
                      href="javascript:;"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Track Order
                    </a>
                  </span>
                </div>
                <div>
                  <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                    <a
                      href="javascript:;"
                      className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-green-600"
                    >
                      Products
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
