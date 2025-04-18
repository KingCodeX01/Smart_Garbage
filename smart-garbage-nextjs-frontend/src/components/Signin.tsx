"use client";
import React, { useEffect, useState } from "react";
import Input from "./ui/input";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { BaseUrl } from "@/utils/api";

type formValues = {
  email: string;
  password: string;
};
const Signin = () => {
  const [error, setErr] = useState<string>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formValues>();

  const onSubmit: SubmitHandler<formValues> = async (data) => {
    setErr("");
    try {
      const response = await fetch(`${BaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        const dataToStore = responseData.data.data;
        const token = responseData.data.token;
        localStorage.setItem("myData", JSON.stringify(dataToStore));
        localStorage.setItem("token", token);
        toast.success("Login successfully");
        router.push("/contribution");
      }
    } catch (err) {
      toast.error("Login failed");
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token, "jjjjj");
    if (token) {
      router.push("/contribution");
    }
  }, [router]);
  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-2 space-x-4 px-16 max-md:grid-cols-1 max-md:space-y-6 w-full mt-12">
        <div className="w-full h-full ">
          <div className="flex justify-center items-center">
            <Image
              src="/images/env.jpg"
              alt="Logo"
              width={600}
              height={200}
            ></Image>
          </div>
        </div>
        <div className="flex items-center justify-center max-md:order-first">
          <div className="flex flex-col space-y-4 shadow-[0px_0px_11px_3px_#e2e8f0] rounded-md  w-3/4 max-sm:w-full">
            <div className="text-center font-semibold text-2xl text-green-700 mt-4">
              Login to contribute
            </div>
            <div className="flex flex-col items-center space-y-4">
              <form
                className="flex flex-col space-y-2 p-4 w-5/6"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                    {...register("email", { required: true })}
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
                    {...register("password", { required: true })}
                  ></input>
                </div>
                <div>
                  <button
                    type="submit"
                    className="border rounded-md bg-green-500 text-md p-2 w-full mt-2 text-white font-semibold hover:bg-green-600"
                  >
                    Login
                  </button>
                  <div className="flex justify-start mt-3 mb-4">
                    {/* <Link href="/changepass" className="hover:text-blue-500">
                      forget Password?
                    </Link> */}
                    <Link
                      href="/signup"
                      className="hover:text-blue-500 text-lg"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
