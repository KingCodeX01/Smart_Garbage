"use client";
import React, { useState } from "react";
import Input from "./ui/input";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { BaseUrl } from "@/utils/api";

type formValues = {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const Signup = () => {
  const [err, setErr] = useState<string>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<formValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<formValues> = async (data) => {
    console.log(data);
    setErr("");
    try {
      const response = await fetch(`${BaseUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        toast.success("Signup Successful");
        router.push("/signin");
      }
    } catch (err) {
      toast.error("Unable to Signup.Please try again");
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-2 space-x-4 px-16 w-full max-md:grid-cols-1 mt-12 max-md:space-y-6 max-md:grid-">
        <div className="w-full h-full max-md:order-2">
          <div className="flex items-center justify-center">
            <Image
              src="/images/earth.jpg"
              alt="Logo"
              width={500}
              height={200}
              className=""
            ></Image>
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-full max-md:order-first">
          <div className="flex flex-col space-y-4 shadow-[0px_0px_11px_3px_#e2e8f0] w-full">
            <div className="text-center font-semibold text-2xl text-green-700 mt-4">
              Register With Us
            </div>
            <div className="flex flex-col items-center">
              <form
                className="flex flex-col space-y-2  p-4 w-5/6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  {/* <Input
                  label="Full Name"
                  type={"text"}
                  name="name"
                  placeholder="John Doe"
                /> */}

                  <label>Full Name</label>
                  <input
                    type="text"
                    id="full_name"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                    {...register("full_name", {
                      required: "Email is required.",
                      // pattern: {
                      //   value: /^[a-zA-Z]$/,
                      //   message: "Enter your full name",
                      // },
                    })}
                  ></input>
                </div>

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
                    className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                    {...register("email", {
                      required: "Email is required.",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "invalid email address",
                      },
                    })}
                  ></input>
                </div>

                <div>
                  {/* <Input
                  label="Password"
                  type={"password"}
                  name="password"
                  placeholder="**********"
                /> */}

                  <label>Password</label>
                  <input
                    type="password"
                    id="password"
                    placeholder="**********"
                    className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                    {...register("password", {
                      required: "Password is required.",
                      // pattern: {
                      //   value: /^[a-zA-Z0-9]{2,4}$/,
                      //   message: "Password needed",
                      // },
                    })}
                  ></input>
                </div>

                <div>
                  {/* <Input
                  label="Confirm Password"
                  type={"password"}
                  name="confirm_password"
                  placeholder="**********"
                /> */}

                  <label>Confirm Password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    placeholder="**********"
                    className="w-full px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                    {...register("confirm_password", {
                      required: "Confirm password is required.",
                      // pattern: {
                      //   value: /^[a-zA-Z0-9]{2,4}$/,
                      //   message: "Passsword doesnot match",
                      // },
                    })}
                  ></input>
                </div>
                <div>
                  <button
                    type="submit"
                    className="border  rounded-md bg-green-500 text-md p-2 text-white font-semibold mb-4 mt-2 w-full hover:bg-green-600"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
