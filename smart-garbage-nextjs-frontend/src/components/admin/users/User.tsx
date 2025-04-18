"use client";
import { useState, useEffect } from "react";
import { columns } from "./Columns";
import { DataTable } from "./data-Table";
import { BaseUrl } from "@/utils/api";

type User = {
  email: string;
  full_name: string;
  password: string;
  profile_picture: string;
  is_verified: string;
};
export default function User() {
  const [data, setData] = useState<User[]>([]);

  const fetchData = async () => {
    // Fetch data from your API here.
    try {
      const response = await fetch(`${BaseUrl}/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const res = await response.json();
      console.log("Fetched data:", res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
