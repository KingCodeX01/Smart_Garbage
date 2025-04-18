"use client";
import { BaseUrl } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

type formValues = {
  email: string;
  password: string;
};

const Login = () => {
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
      const response = await fetch(`${BaseUrl}/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        console.log(responseData);
        const dataToStore = responseData.data;
        const token = responseData.token;
        localStorage.setItem("myData", JSON.stringify(dataToStore));
        localStorage.setItem("token", token);
        toast.success("Login successfully");
        router.push("/admin/dashboard");
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
      router.push("/admin/dashboard");
    }
  }, [router]);
  return (
    <div>
      <ToastContainer />
      <div className="bg-yellow-300 dark:bg-gray-800 h-screen overflow-hidden flex items-center justify-center">
        <div className="bg-white lg:w-6/12 md:7/12 w-8/12 shadow-3xl rounded-xl">
          <div className="bg-gray-800 shadow shadow-gray-200 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
              <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
            </svg>
          </div>
          <form className="p-12 md:p-24" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-1c.012-2.668-.092-4.194-3.176-4.904z" />
              </svg>
              <input
                type="text"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <div className="flex items-center text-lg mb-6 md:mb-8">
              <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                <path d="M20 12h-1v-3c0-4.962-4.037-9-9-9s-9 4.038-9 9v3h-1c-.553 0-1 .447-1 1v10c0 .553.447 1 1 1h20c.553 0 1-.447 1-1v-10c0-.553-.447-1-1-1zm-10 7c-1.104 0-2-.896-2-2h4c0 1.104-.896 2-2 2zm5-7h-10v-3c0-2.762 2.238-5 5-5s5 2.238 5 5v3z" />
              </svg>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
                className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full"
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-900 rounded-full py-2 md:py-4 text-white"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
