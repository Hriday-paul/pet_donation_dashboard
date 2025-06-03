import { Metadata } from "next";
import LoginForm from "@/components/(auth)/login/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for SoleSwap.",
};

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[url('/auth_page_bg.png')] bg-no-repeat bg-cover origin-center relative z-0 text-main-color">
      <div className="absolute inset-0 bg-black opacity-10 z-10"></div>
      <div className="flex justify-center items-center mx-auto md:px-12 px-11 py-10 rounded-[40px] bg-white text-main-color z-20 relative">
        <div>
          <div className="mb-6 flex flex-col justify-center items-center gap-y-4">
            <h2 className="text-2xl font-bold">Sign In</h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
