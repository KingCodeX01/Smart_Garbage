"use client";
import { BaseUrl } from "@/utils/api";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [data, setData] = useState({
    Guser: 0,
    Ggarbage: 0,
    Gproduct: 0,
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // const handleLogout = () => {
    //   if (typeof window !== "undefined") {
    //     window.localStorage.removeItem("myData");
    //     window.localStorage.removeItem("token");
    //     router.push("/admin/login");
    //     toast.success("Logout Successfully");
    //   }
    // };
    const fetchData = async () => {
      try {
        const response = await fetch(`${BaseUrl}/dashboard`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const result = await response.json();
        console.log(result.data.data);
        setData(result.data.data);
        if (response.status === 200) {
          console.log("Data fetched successfully");
        }
      } catch (err) {
        console.log(err);
        // setError("Failed to fetched");
      }
    };

    // const getName = () => {
    //   if (typeof window !== "undefined") {
    //     const storedData = window.localStorage.getItem("myData");
    //     if (storedData) {
    //       const data = JSON.parse(storedData);
    //     } else {
    //       console.log("No data found in localStorage");
    //     }
    //   }
    // };
    // getName();
    fetchData();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="w-5/6 h-24 rounded-lg bg-green-600 m-auto flex items-center justify-center mt-6">
        <div className="flex items-center justify-evenly max-md:flex-wrap space-x-12 font-semibold">
          <div className="bg-white p-3 rounded-xl flex space-x-4">
            <div>
              <div>Total Collection</div>
              <div>{data.Ggarbage}</div>
            </div>
            <span className="material-symbols-outlined">orders</span>
          </div>

          <div className="bg-white p-3 rounded-xl flex space-x-4">
            <div>
              <div>Total Products</div>
              <div>{data.Gproduct}</div>
            </div>
            <span className="material-symbols-outlined">inventory_2</span>
          </div>

          <div className="bg-white p-3 rounded-xl flex space-x-4">
            <div>
              <div>Total Revenue</div>
              <div>1</div>
            </div>
            <span className="material-symbols-outlined">sell</span>
          </div>

          <div className="bg-white p-3 rounded-xl flex space-x-4">
            <div>
              <div>New Users</div>
              <div>{data.Guser}</div>
            </div>
            <span className="material-symbols-outlined">account_box</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
