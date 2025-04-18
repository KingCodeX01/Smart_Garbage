"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Input from "@/components/ui/input";
import { BaseUrl } from "@/utils/api";
import { Value } from "@radix-ui/react-select";

type formValues = {
  pickup_date: Date;
  pickup_time: string;
  phone_no: BigInt;
  alt_phone_no: BigInt;
  location: String;
  type: String;
};

const Hero = () => {
  const [error, setErr] = useState<string>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formValues>();

  // const [formValues, setFormValues] = useState({
  //   pickup_date: "",
  //   pickup_time: "",4

  //   phone_no: "",
  //   alt_phone_no: "",
  //   location: "",
  //   type: "",
  // });

  const [isSell, setIsSell] = useState(true);
  const [isDonate, setIsDonate] = useState(false);
  const [isSDonate, setIsSDonate] = useState(false);

  const handleSubmitSell = () => {
    setIsSell(true);
    setIsDonate(false);
    setIsSDonate(false);
  };

  const handleSubmitDonate = () => {
    setIsSell(false);
    setIsDonate(true);
    setIsSDonate(false);
  };

  const handleSubmitSDonate = () => {
    setIsSell(false);
    setIsDonate(false);
    setIsSDonate(true);
  };
  const onSubmit: SubmitHandler<formValues> = async (data) => {
    console.log(data); // Check the initial data format
    setErr("");

    try {
      // Convert pickup_date string to Date object and then to ISO string
      const date = new Date(data.pickup_date);
      const isoDate = date.toISOString();

      console.log(isoDate); // Log the ISO date string

      // Prepare the data with the ISO date string
      const preparedData = {
        ...data,
        pickup_date: isoDate,
      };

      const response = await fetch(`${BaseUrl}/pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      if (response.status === 200) {
        toast.success("Date booked successfully!");
      }
    } catch (err: any) {
      console.log(err);
      setErr(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className={"h-[80vh] max-[1000px]:h-[110dvh] w-full relative"}>
        <div className={"h-full"}>
          <Image
            src={require("../../public/images/background.png")}
            alt={"background"}
            height={300}
            className={`w-full h-full object-cover`}
            width={300}
          />
        </div>
        {/* <Input type="hidden" name="fk_user_id" value="1" register={register} /> */}
        <div className={"absolute max-[800px]:flex top-0 left-0 w-full h-full"}>
          <div
            className={
              "main_padding flex justify-center max-sm:justify-start max-[1000px]:space-y-6 items-center max-[1000px]:flex-col w-full h-full gap-x-4"
            }
          >
            <div
              className={
                "text-white text-6xl max-[1000px]:text-4xl max-md:text-3xl w-1/2 max-[1000px]:w-full mt-8 font-semibold flex justify-center items-center"
              }
            >
              {`Contribution for the better world`}
            </div>

            {/*search box container*/}
            <div
              className={"text-white w-[46%] flex items-center justify-center "}
            >
              <form
                className="flex flex-col justify-center  max-md:mx-10 overflow-hidden px-6 py-6 text-base font-light leading-6 bg-white rounded-xl shadow-sm min-w-[530px] max-w-[900px] max-md:min-w-[400px] 
                max-sm:min-w-[300px]  max-md:max-w-[450px]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="self-center text-2xl font-semibold leading-7 max-md:text-lg text-lime-700 max-sm:text-base">
                  START RECYCLING TODAY
                </div>
                <div className="flex gap-x-5 mt-4 max-md:mt-2 w-full max-md:max-w-full">
                  <div className="flex flex-col w-1/2 max-md:w-full">
                    <div className="text-neutral-600 max-sm:text-sm">
                      {/* Date : */}
                      <label htmlFor="phone_no">Date :</label>
                    </div>

                    <div className="text-black">
                      <input
                        type="date"
                        id="pickup_date"
                        placeholder="Select"
                        className="w-full px-3 py-2 border rounded-md text-base border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                        {...register("pickup_date", { required: true })}
                      ></input>
                      {/* <DatePicker name={"pickup_date"} />  */}
                      {/* <Controller
                        control={control}
                        name="ReactDatepicker"
                        render={(props) => (
                          <ReactDatePicker
                            className="input"
                            placeholderText="Select date"
                            onChange={(e) => props.onChange(e)}
                            selected={props.value}
                          />
                        )}
                      /> */}
                    </div>
                  </div>
                  <div className="flex gap-x-5 justify-between w-1/2 max-sm:text-sm max-md:w-full  py-2 pr-1.5 max-md:pr-0">
                    <div className="flex flex-col w-full">
                      <div className="text-neutral-600 max-sm:text-sm">
                        Time:
                      </div>
                      <div className="mt-2 w-full text-black">
                        <Controller
                          name="pickup_time"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select {...field} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full border border-gray-400">
                                <SelectValue
                                  className="text-black"
                                  placeholder="Select Your Time"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="9-10Am">9-10Am</SelectItem>
                                <SelectItem value="10-12Am">10-12Am</SelectItem>
                                <SelectItem value="18-20PM">18-20Pm</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-5 justify-between w-full  max-md:max-w-full">
                  <div className="flex w-1/2 max-md:w-full flex-col py-2">
                    <div className=" text-black">
                      <Input
                        label="Mobile No."
                        type={"number"}
                        name="phone_no"
                        placeholder="Mobile No."
                        register={register}
                      />

                      {/* <label htmlFor="phone_no">Mobile No.</label>
                      <input
                        type="number"
                        id="phone_no"
                        placeholder="Mobile No."
                        className="w-full px-3 py-2 border rounded-md text-base border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                        {...register("phone_no", { required: true })}
                      ></input> */}
                    </div>
                  </div>
                  <div className="flex w-1/2 max-md:w-full  flex-col py-2">
                    <div className="text-black">
                      <Input
                        label="Alternative No."
                        type={"number"}
                        name="alt_phone_no"
                        placeholder="Alternative Mobile No."
                        register={register}
                      />
                      {/* <label htmlFor="alt_phone_no">Alternative No.</label>
                      <input
                        type="number"
                        id="alt_phone_no"
                        placeholder="Alternative Mobile No."
                        className="w-full px-3 py-2 border rounded-md text-base border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                        {...register("alt_phone_no", { required: true })}
                      ></input> */}
                    </div>
                  </div>
                </div>
                <div className="w-1/2 max-md:w-full ">
                  <div className="mt-2 text-black">
                    <Input
                      label="Location"
                      type={"text"}
                      name="location"
                      placeholder="Koteshwor,Kathmandu"
                      register={register}
                    />

                    {/* <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      placeholder="location"
                      className="w-full px-3 py-2 border rounded-md text-base border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3.5 text-black"
                      {...register("location", { required: true })}
                    ></input> */}
                  </div>
                </div>

                <div className="mt-2 text-black max-md:max-w-full max-sm:text-sm">
                  Type:
                </div>
                <div className="flex gap-x-5 px-0.5 mt-3 w-full text-black  max-md:max-w-full">
                  <div className="flex gap-x-2.5 py-1 whitespace-nowrap">
                    {/* <input
                      type="checkbox"
                      id="donation"
                      name="type"
                      value="donation"
                      checked={isSell}
                      onChange={handleSubmitSell}
                    /> */}
                    <Controller
                      name="type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="donation"
                          value="donation"
                          checked={field.value === "donation"}
                          onChange={() =>
                            field.onChange(
                              field.value === "donation" ? "" : "donation"
                            )
                          }
                        />
                      )}
                    />
                    <label
                      htmlFor="donation"
                      className="my-auto max-sm:text-sm"
                    >
                      Donation
                    </label>
                  </div>
                  <div className="flex gap-2.5 py-1 whitespace-nowrap">
                    {/* <input
                      type="checkbox"
                      id="sell"
                      name="type"
                      value="sell"
                      checked={isDonate}
                      onChange={handleSubmitDonate}
                    /> */}
                    <Controller
                      name="type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="sell"
                          value="sell"
                          checked={field.value === "sell"}
                          onChange={() =>
                            field.onChange(field.value === "sell" ? "" : "sell")
                          }
                        />
                      )}
                    />

                    <label htmlFor="sell" className="my-auto max-sm:text-sm">
                      Sell
                    </label>
                  </div>
                  <div className="flex gap-2.5 py-1">
                    {/* <input
                      type="checkbox"
                      id="sellAndDonate"
                      name="type"
                      value="sellAndDonate"
                      checked={isSDonate}
                      onChange={handleSubmitSDonate}
                    /> */}
                    <Controller
                      name="type"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          id="sellAndDonate"
                          value="sellAndDonate"
                          checked={field.value === "sellAndDonate"}
                          onChange={() =>
                            field.onChange(
                              field.value === "sellAndDonate"
                                ? ""
                                : "sellAndDonate"
                            )
                          }
                        />
                      )}
                    />
                    <label
                      htmlFor="sellAndDonate"
                      className="flex-auto my-auto max-sm:text-sm"
                    >
                      Sell and Donate
                    </label>
                  </div>
                </div>
                <div className="justify-center self-end px-11 py-3 mt-4 max-md:mt-2 text-white whitespace-nowrap bg-green-500 hover:bg-green-600 rounded-md max-md:px-5">
                  <button type="submit">Continue</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
