import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import logo from "@/assets/logo.png";
import SignUpForm from '@/components/(auth)/SignUp/SignUpForm';

export const metadata: Metadata = {
    title: "shelter signup",
    description: "shelter signup for Amipeta.",
};

const SignUpPage = () => {
    return (
        <div>
            <div>

                <div>
                    <Image
                        src={logo}
                        alt="logo_Image"
                        className={"h-28 w-auto mx-auto"}
                    />
                </div>

                <SignUpForm />
            </div>
        </div>
    );
};

export default SignUpPage;