"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Input from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseUrl } from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// enum type {
//   Paper = "Paper",
//   Glass_and_Plastic = "Glass_and_Plastic",
//   Metal_and_Steel = "Metal_and_Steel",
//   Brass = "Brass",
//   PET_bottle = "PET_bottle",
//   Others = "Others",
// }

type formValues = {
  // product_name: string;
  // add_price: number;
  // description: string;
  // type: string;
  // images: FileList | null;

  trash_name: string;
  trash_image: FileList;
  trash_description: string;
  trash_category: string;
  trash_price: number;
  trash_unit?: string;
};

const Sell = () => {
  // const [data, setData] = useState<formValues[]>([]);
  const [err, setErr] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<formValues>();

  const [images, setImages] = useState();
  // const [files, setFiles] = useState<FileList | null>(null);

  const handleImage = async (e: any) => {
    console.log(e.target.files);
    setImages(e.target.files[0]);
  };

  // const handleFilesChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (event.target.files) {
  //     setFiles(event.target.files);
  //   }
  // };

  const onSubmit: SubmitHandler<formValues> = async (data) => {
    // if (files) {
    //   for (let i = 0; i < images.length; i++) {
    //     formData.append("images", images[i]);
    //   }
    // }

    // Append other form data
    // for (const key in data) {
    //   if (Object.prototype.hasOwnProperty.call(data, key) && key !== "images") {
    //     formData.append(key, (data as any)[key]);
    //   }
    // }

    const formData = new FormData();
    formData.append("trash_name", data.trash_name);
    formData.append("trash_description", data.trash_description);
    formData.append("trash_category", data.trash_category);
    formData.append("trash_price", data.trash_price.toString());
    if (data.trash_unit) formData.append("trash_unit", data.trash_unit);

    Array.from(data.trash_image).forEach((file) => {
      formData.append("images", file);
    });
    console.log(data);
    setErr("");
    try {
      // const formData = new FormData();
      // formData.append("images", images[0]);
      const response = await fetch(`${BaseUrl}/price`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(data),
        body: formData,
      });
      console.log(formData);
      if (response.status === 200) {
        toast.success("Product added successfully");
        reset(); // Reset the form fields
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData.message);
        setErr(errorData.message); // Set error state
      }
    } catch (err: any) {
      console.error("Error:", err);
      setErr(err.message); // Set error state
      toast.error("Failed to add");
    }
  };

  return (
    <div className="px-8 py-8 w-full h-full space-y-6">
      <ToastContainer />
      <div className="text-2xl text-center text-green-700 font-bold">
        Add Product
      </div>
      <form
        className="space-y-4 p-4 shadow-[0px_0px_11px_3px_#e2e8f0]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>Product Name</label>
          <input
            type="text"
            id="trash_name"
            placeholder="Paper, magazines"
            className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
            {...register("trash_name", { required: true })}
          ></input>

          {/* <Input
            label="Product Name"
            type="text"
            placeholder="Paper, Magazines"
            {...register("product_name", { required: true })}
          /> */}
        </div>
        {/* {console.log(errors)} */}

        <div>
          <label>Price</label>
          <input
            type="number"
            id="trash_price"
            placeholder="Rs.1"
            className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
            {...register("trash_price", { required: true })}
          ></input>
          {/* <Input
            id="price"
            label="Add Price"
            type="number"
            placeholder="Rs.1000"
            {...register("add_price", { required: true })}
          /> */}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea
            id="trash_description"
            placeholder="Your product description"
            className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
            {...register("trash_description", { required: true })}
          ></textarea>
        </div>

        <div className="flex gap-5 justify-between py-1.5">
          <div className="flex flex-col w-full">
            <div className="text-neutral-600">Type:</div>
            <div className="mt-3.5 w-full text-black">
              <Controller
                name="trash_category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-black"
                        placeholder="Select your Type"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paper">Paper</SelectItem>
                      <SelectItem value="Glass">Glass</SelectItem>
                      <SelectItem value="Glass">Plastic</SelectItem>
                      <SelectItem value="Metal">Metal</SelectItem>
                      <SelectItem value="E_Waste">E-waste</SelectItem>
                      <SelectItem value="Brass">Brass</SelectItem>
                      <SelectItem value="PET_bottle">PET bottle</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          {/* <Input
            label="Images"
            type="file"
            {...register("images")}
            onChange={handleFilesChange}
          /> */}
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="trash_image"
            // name="images"
            className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
            {...register("trash_image", { required: true })}
            onChange={handleImage}
            // multiple
          />
          {/* {errors.images && <p className="text-red-500">Images are required</p>} */}
        </div>

        <div className="flex items-start justify-end">
          <button
            type="submit"
            className="px-4 py-2.5 w-1/6 bg-green-700 rounded-md hover:bg-green-600 text-white font-semibold"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sell;
