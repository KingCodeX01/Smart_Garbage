"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const [navProps, setNavProps] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (!token) {
        router.push("/");
      } else {
        setNavProps(false);
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col">
      <div className={"sticky inset-0 z-[8988]"}>
        <Navbar navProps={navProps} />
      </div>
      <div className={"mb-10"}>{children}</div>
      <div className={"main_padding"}>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
