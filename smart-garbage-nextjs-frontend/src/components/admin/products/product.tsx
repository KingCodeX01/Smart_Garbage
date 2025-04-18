"use client";
import { useState, useEffect } from "react";
import { columns } from "./Columns";
import { DataTable } from "./data-table";
import { BaseUrl } from "@/utils/api";

type Product = {
  trash_name: string;
  trash_description: string;
  trash_image: string;
  trash_price: number;
  trash_category: string;
};

export default function Product() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BaseUrl}/getprice`, {
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
