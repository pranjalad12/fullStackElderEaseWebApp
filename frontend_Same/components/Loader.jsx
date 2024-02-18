import React from "react";
import Image from "next/image";

const Spinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={loader} alt="loading.." />
    </div>
  );
};

export default Spinner;