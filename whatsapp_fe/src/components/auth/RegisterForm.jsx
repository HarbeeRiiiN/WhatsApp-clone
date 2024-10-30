import { React, useState } from "react";
import LoginForm from "./LoginForm";
export default function RegisterForm() {
  const handleSubmit = (onSubmit) => {};
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
          <div className="text-center dark:text-dark_text_1">
            <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
            <p className="mt-2 text-sm">Sign in</p>
          </div>

          <form className="mt-6 space-y-6">
            <LoginForm />
          </form>
        </div>
      </div>
    </>
  );
}
