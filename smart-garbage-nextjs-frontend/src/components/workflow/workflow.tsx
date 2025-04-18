import Image from "next/image";
import React from "react";

const Workflow = () => {
  return (
    <>
      <div className="text-2xl text-center font-semibold py-2">How we work</div>
      <div className="h-[80vh] max-md:h-[50vh] flex items-start justify-center p-4">
        <Image
          src="/images/recycle_works.jpg"
          alt="recycle_works"
          width={600}
          height={200}
          className="w-full h-full object-cover max-md:object-fill"
        />
      </div>
    </>
  );
};

export default Workflow;
