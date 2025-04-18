"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [navProps, setNavProps] = useState(true); // State for navbar props
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (!token) {
        router.push("/admin/login");
      } else {
        setNavProps(false);
        // Set navbar props when token exists
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <div className="sticky inset-0 z-[8988]">
        <Navbar navProps={navProps} />
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-1 hidden md:block">
          <Sidebar />
        </div>
        <div className="overflow-y-scroll col-span-5 md:col-span-4 w-full max-md:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
