import { Metadata } from "next";
import LoginForm from "@/components/(auth)/login/LoginForm";
import logo from "@/assets/logo.png";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for Amipeta.",
};

const LoginPage = () => {
  return (
    <div>

      <div>
        <Image
          src={logo}
          alt="logo_Image"
          className={"h-28 w-auto mx-auto"}
        />
      </div>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
