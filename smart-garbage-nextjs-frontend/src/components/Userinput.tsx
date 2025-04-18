import React, { useState } from "react";
import Image from "next/image";
import { DatePicker } from "@/components/ui/DatePicker";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
import Input from "@/components/ui/input";

type formValues = {
  pickup_date: Date | null;
  pickup_time: string;
  phone_no: BigInt;
  alt_phone_no: BigInt;
  location: String;
  type: String;
};

const Userinput = () => {
  const [error, setErr] = useState<string>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formValues>();

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
    console.log(data);
    setErr("");
    try {
      const response = await fetch(`${BaseUrl}/pickup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status == 200) {
        toast.success("Date book successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full px-16 mt-8">
      <div className="flex items-center justify-start">
        <form
          className="w-full shadow-[0px_0px_11px_3px_#e2e8f0] p-4 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-green-700 font-bold text-center text-2xl px-4 py-1.5">
            <p>Contribute to Recycle</p>
          </div>
          <div className="flex flex-col py-2">
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
                name="pickup_date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    name={field.name}
                    setValue={field.onChange} // Ensure setValue is called correctly
                  />
                )}
              /> */}
            </div>
          </div>

          <div className="flex gap-5 justify-between py-1.5">
            <div className="flex flex-col w-full">
              <div className="text-neutral-600">Time:</div>
              <div className="mt-3.5 w-full text-black">
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

          <div>
            <Input
              label="Image"
              type={"file"}
              name="file"
              placeholder="image"
              register={register}
            />
          </div>

          <div className="mt-2">
            <Input
              label="Location"
              type={"text"}
              name="location"
              placeholder="Koteshwor,Kathmandu"
              register={register}
            />
          </div>

          <div className="mt-8 text-black max-md:max-w-full">Type:</div>
          <div className="flex gap-5  px-0.5 mt-2 w-full text-black max-md:flex-wrap max-md:max-w-full">
            <div className="flex gap-2.5 py-1 whitespace-nowrap">
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
              <label htmlFor="donation" className="my-auto">
                Donation
              </label>
            </div>
            <div className="flex gap-2.5 py-1 whitespace-nowrap">
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
              <label htmlFor="sell" className="my-auto">
                Sell
              </label>
            </div>
            <div className="flex gap-2.5 py-1">
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
                        field.value === "sellAndDonate" ? "" : "sellAndDonate"
                      )
                    }
                  />
                )}
              />
              <label htmlFor="sellAndDonate" className="flex-auto my-auto">
                Sell and Donate
              </label>
            </div>
          </div>

          <div className="mt-4 mb-2.5 items-center justify-center flex">
            <button
              type="submit"
              className="p-2 bg-green-700 text-white rounded-md w-5/6"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Userinput;
