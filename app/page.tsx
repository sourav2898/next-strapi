"use client";

import axios from "axios";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any>({});
  const [selected, setSelected] = useState<number>(0);

  const getData = async () => {
    try {
      // Fetch data from Strapi
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/about-page?populate=*`
      );
      let data = response?.data?.data;
      console.log(data);

      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      let errorMessage = "Failed to load data. Please try again later.";
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="h-screen p-6">
      <div className="w-1/2 mx-auto">
        <h3 className="text-center">WHY CHOOSE US</h3>
        <h1 className="text-center font-bold text-3xl my-4">
          {data?.attributes?.title || "-----"}
        </h1>
        <h3 className="text-center">
          {data?.attributes?.description || "-------"}
        </h3>
      </div>

      <div className="flex justify-between items-center w-full flex-wrap md:w-11/12  mx-auto my-10">
        <div className=" flex flex-wrap">
          <div className="bg-red-500/50 w-[400px] h-[400px] rounded-full flex p-4 justify-center gap-2 flex-col z-50">
            <h3 className="font-bold text-white">
              {data?.attributes?.services?.[selected]?.title}
            </h3>
            <p className="text-white">
              {data?.attributes?.services?.[selected]?.description}
            </p>
          </div>
          <div className="w-[400px] h-[400px] flex justify-center gap-2 flex-col z-40 -left-40 relative">
            <Image
              src={"/img.jpg"}
              alt="img"
              width={416}
              height={416}
              className="rounded-full"
            />
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          {data?.attributes?.services?.map((item: any, index: number) => (
            <div
              key={index}
              onClick={() => {
                setSelected(index);
              }}
              className={` p-2 ${
                index === selected ? "bg-red-500 text-white" : "bg-gray-200"
              } rounded-l-full flex items-center justify-between w-[300px] cursor-pointer`}
            >
              <ChevronLeft />
              <p className="font-bold">{item?.title}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
