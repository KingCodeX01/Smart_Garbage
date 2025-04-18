"use client";
import { useState, useEffect } from "react";
import { columns } from "../columns";
import { DataTable } from "../data-table";
import { BaseUrl } from "@/utils/api";

type Payment = {
  pickup_date: string;
  pickup_time: string;
  phone_no: bigint;
  alt_phone_no: bigint;
  location: string;
  type: string;
};

export default function GarbageCollection() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BaseUrl}/getgarbage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const res = await response.json();
      console.log("Fetched data:", res.data.data); // Log the fetched data
      setData(res.data.data);
    } catch (error) {
      console.log("Fetch error:", error);
      setData([]);
      setLoading(false); // Set empty array in case of an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />

      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )} */}
    </div>
  );
}
