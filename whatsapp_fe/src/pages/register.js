import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
export default function Register() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex item-center justify-center py-[19px] overflow-hidden">
      <div className="flex w-[1600px] mx-auto h-full">
        <RegisterForm />
      </div>
    </div>
  );
}
