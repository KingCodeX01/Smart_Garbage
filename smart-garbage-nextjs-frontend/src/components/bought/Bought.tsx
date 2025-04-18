"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BaseUrl } from "@/utils/api";

type ActiveItem =
  | "Paper"
  | "Glass"
  | "Metal"
  | "Plastic"
  | "Ewaste"
  | "Brass"
  | "Others"
  | null;

type FormValues = {
  trash_name: string;
  trash_image: string;
  trash_description: string;
  trash_category: string;
  trash_price: number;
};

const Bought = () => {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FormValues[]>([]);
  const [activeItem, setActiveItem] = useState<ActiveItem>("Paper");

  const handleItemClick = (item: ActiveItem) => {
    if (activeItem !== item) {
      setActiveItem(item);
    }
  };

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
      console.log("API response:", res); // Log the entire response

      if (res.success && Array.isArray(res.data.data)) {
        const formattedData = res.data.data.map((item: FormValues) => ({
          ...item,
          trash_image: `${BaseUrl}/images/${item.trash_image}`,
        }));
        setData(formattedData); // Correctly access the nested data array and format the image URL
      } else {
        throw new Error("API response format is incorrect");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeItemData = data.filter(
    (item) => item.trash_category === activeItem
  );

  return (
    <>
      <div className="text-2xl text-center font-semibold py-2">
        What we buy?
      </div>
      <div className="h-full max-md:h-full main_padding">
        <div className="flex flex-col max-md:space-x-0 max-md:flex-col mt-4">
          <div className="mb-8">
            <div className="max-md:border-0">
              <ul className="grid grid-cols-6 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 max-md:px-0">
                {[
                  "Paper",
                  "Glass",
                  "Plastic",
                  "Metal",
                  "Ewaste",
                  "Brass",
                  "Others",
                ].map((item) => (
                  <li
                    key={item}
                    className={`hover:text-green-700 border-b-2 font-semibold border-black text-center ${
                      activeItem === item ? "text-green-700" : ""
                    }`}
                    onClick={() => handleItemClick(item as ActiveItem)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap space-x-4 w-full h-full">
            {activeItemData.map((item) => (
              <div
                key={item.trash_name}
                className="border w-56 border-gray-400 px-4 py-2 shadow-[0px_0px_11px_3px_#e2e8f0] max-md:w-2/5 max-sm:w-full mb-4 rounded-lg"
              >
                <div className="w-full h-full flex flex-col items-center">
                  <Image
                    src={item.trash_image}
                    alt={item.trash_name}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-contain"
                  />
                  <div className="space-y-1 text-center mt-2">
                    <div className="text-2xl text-green-700 font-semibold">
                      {item.trash_name}
                    </div>
                    <div className="text-green-500 text-sm">
                      {`Est. Rs.${item.trash_price}/kgs`}
                    </div>
                    <div className="pb-2">{item.trash_description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {error && <div className="text-red-500">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default Bought;
