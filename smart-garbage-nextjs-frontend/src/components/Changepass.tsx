"use client";
import { BaseUrl } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type formValues = {
  new_password: string;
  password: string;
  email: string;
};

const Changepass = () => {
  const [error, setErr] = useState<string>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>();

  const onSubmit: SubmitHandler<formValues> = async (data) => {
    console.log(data);
    setErr("");
    try {
      const response = await fetch(`${BaseUrl}/ChangePassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // const result = await response.json();
      // console.log(result);
      if (response.status === 200) {
        // console.log(response);
        toast.success("Password changed successfully");
        router.push("/signin");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
      console.log(err);
    }
  };
  return (
    <div className="px-16 mt-12 grid grid-cols-2 max-md:grid-cols-1 space-x-6 space-y-4">
      <div className="p-8">
        <form
          className="shadow-[0px_0px_11px_3px_#e2e8f0] p-4 space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center text-2xl font-semibold">{`Change Password`}</div>

          <div>
            {/* <Input
                  label="Email"
                  type={"text"}
                  name="email"
                  placeholder="example@gmail.com"
                /> */}

            <label>Email</label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="w-full px-3 py-2 border border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
              {...register("email", { required: true })}
            ></input>
            {errors.email && <p className="text-red-600">Email is required</p>}
          </div>
          <div>
            <label htmlFor="password">Old Password</label>
            <input
              type="password"
              id="password"
              placeholder="**********"
              className="w-full px-3 py-2 border border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
              {...register("password", { required: true })}
            ></input>
            {errors.password && (
              <p className="text-red-600">Password is required</p>
            )}
          </div>

          <div>
            <label htmlFor="new_password">New Password</label>
            <input
              type="new_password"
              id="new_password"
              placeholder="**********"
              className="w-full px-3 py-2 border border-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
              {...register("new_password", { required: true })}
            ></input>
            {errors.new_password && (
              <p className="text-red-600">New password is required</p>
            )}
          </div>

          <div className="mt-4 mb-2.5 items-center justify-start flex">
            <button
              type="submit"
              className="p-2 bg-green-700 text-white rounded-md w-20"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src="/images/env.jpg"
          alt="image"
          width={300}
          height={200}
          className="w-5/6"
        />
      </div>
    </div>
  );
};

export default Changepass;
