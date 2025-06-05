import { Metadata } from "next";
import ForgetPassForm from "@/components/(auth)/forgetPassword/ForgetPassForm";
import logo from "@/assets/logo.png";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPasswordPage = () => {
  return (
    <div >

      <div>
        <Image
          src={logo}
          alt="logo_Image"
          className={"h-28 w-auto mx-auto"}
        />
        <h1 className="text-2xl text-text-color font-semibold text-center mt-8 mb-5">Forgot Password</h1>
        <p className="text-sm text-text-color text-center mb-8">Please enter your email address to reset your password</p>
      </div>

      <ForgetPassForm></ForgetPassForm>


    </div>
  );
};

export default ForgetPasswordPage;
