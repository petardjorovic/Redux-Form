import React from "react";
import FormComponent from "../components/FormComponent";

function RegisterPage() {
  return (
    <div className="bg-red-950">
      <div className="container mx-auto flex flex-col items-center gap-[20px] py-[20px] px-[16px]">
        <h2 className="text-2xl text-blue-600 font-semibold">Register</h2>
        <FormComponent />
      </div>
    </div>
  );
}

export default RegisterPage;
