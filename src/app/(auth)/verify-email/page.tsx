import { Metadata } from "next";
import VerifyEmailForm from "@/components/(auth)/verifyEmail/VerifyForm";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forget Password",
};

const verifyEmail = () => {
  return (
    <div>
      <div>
        <Image
          src={logo}
          alt="logo_Image"
          className={"h-28 w-auto mx-auto"}
        />
        <h1 className="text-2xl text-text-color font-semibold text-center mt-8 mb-5">Verify Email </h1>
        <p className="text-sm text-text-color text-center mb-8">Please enter the otp we have sent you in your email.</p>
      </div>
      <VerifyEmailForm></VerifyEmailForm>
      
    </div>
  );
};

export default verifyEmail;
