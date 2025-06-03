import { Metadata } from "next";
import ForgetPassForm from "@/components/(auth)/forgetPassword/ForgetPassForm";
import { IoIosArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Forget Password",
};

const ForgetPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/auth_page_bg.png')] bg-no-repeat bg-cover origin-center relative z-0 text-main-color ">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="flex justify-center items-center w-[441px]   mx-auto md:px-12 px-11 py-10 rounded-[40px] bg-white text-main-color z-20">
        <div>
          <div className="mb-6  flex flex-col justify-center items-center gap-y-4">
            <div className="text-center space-y-4 mb-4">
              <div className="text-2xl  font-bold  text-center ">
                <h2 className="flex justify-center items-center ">
                  <Link href={"/login"}>
                    <IoIosArrowRoundBack size={40} />
                  </Link>
                  Forget Password
                </h2>
              </div>
              <p>Please enter your email address to reset your password.</p>
            </div>
          </div>
          <ForgetPassForm></ForgetPassForm>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
