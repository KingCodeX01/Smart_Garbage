"use client";
import Input from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Userinput from "../Userinput";
import { BaseUrl } from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type formValues = {
  full_name: string;
};

const Contribution = () => {
  const [data, setData] = useState<formValues[]>([]);
  const router = useRouter();
  const [userid, setUserID] = useState("");
  const [dropdown, setDropDown] = useState(false);
  const [fullName, setFullName] = useState();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("myData");
      window.localStorage.removeItem("token");
      router.push("/signin");
      toast.success("Logout Successfully");
    }
  };
  const togggleDropDown = () => {
    setDropDown(!dropdown);
  };
  const getName = () => {
    if (typeof window !== "undefined") {
      const storedData = window.localStorage.getItem("myData");
      if (storedData) {
        const data = JSON.parse(storedData);
        setFullName(data.full_name);
      } else {
        console.log("No data found in localStorage");
      }
    }
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <ToastContainer />
      <div>
        <div className="flex items-center justify-center space-x-4 px-16 w-full mt-12">
          {/* <div>
          <div className="max-md:hidden">
            <Image src="/" alt="images" width={200} height={200} />
          </div>
        </div> */}
          <div className="bg-green-700 text-white font-semibold w-full relative">
            <div className="flex items-center justify-between p-4">
              <p>Namaste, {fullName}</p>
              <div>
                <button type="button" onClick={togggleDropDown}>
                  <span className="material-symbols-outlined">settings</span>
                  <span className="material-symbols-outlined">
                    arrow_drop_down
                  </span>
                </button>
                {dropdown && (
                  <ul className="bg-white text-sm text-black absolute right-0 top-14 rounded-sm z-50 space-y-2 p-2">
                    <li className="flex justify-start items-center space-x-1">
                      <span className="material-symbols-outlined">
                        lock_open
                      </span>
                      <Link href={"/changepass"}>Change Password</Link>
                    </li>
                    <li className="flex items-center justify-start space-x-1">
                      <span className="material-symbols-outlined">logout</span>
                      <button onClick={handleLogout}>Logout</button>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* <div className="bg-green-700 text-white text-center w-4/6 mt-2">
            <div className="p-4 font-semibold">
              <p>
                <Link href={"/"}>Contribute More</Link>
              </p>
            </div>
          </div> */}
        </div>

        <div className="grid grid-cols-2  max-[900px]:grid-cols-1 max-md:space-y-4 space-x-4 w-full mt-12">
          <div className="w-full">
            <Userinput />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/images/user_logo.jpg"
              alt="user_logo"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contribution;
