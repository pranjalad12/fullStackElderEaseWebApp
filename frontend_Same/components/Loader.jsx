import React from "react";
import Image from "next/image";
// import loader from "/home/pranjaladwani12/next_full_stack_servicenow/public/nextjs_13_assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={loader} alt="loading.." />
    </div>
  );
};

export default Spinner;