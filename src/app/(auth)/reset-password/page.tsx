import { Metadata } from "next";
import { IoIosArrowRoundBack } from "react-icons/io";
import logo from "@/assets/logo.png";
import Link from "next/link";
import ResetPasswordForm from "@/components/(auth)/ResetPasswordForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ResetPassword = () => {
  return (
    <div>
      <div>
        <Image
          src={logo}
          alt="logo_Image"
          className={"h-28 w-auto mx-auto"}
        />
        <h1 className="text-2xl text-text-color font-semibold text-center mt-8 mb-5">Create New Password</h1>
        <p className="text-sm text-text-color text-center mb-8">Please enter the otp we have sent you in your email.</p>
      </div>

      <ResetPasswordForm></ResetPasswordForm>

    </div>
  );
};

export default ResetPassword;
