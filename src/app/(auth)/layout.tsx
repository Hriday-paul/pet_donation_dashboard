import Image from 'next/image';
import React from 'react';
import authImg from '@/assets/image/authBg.png'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex flex-col lg:flex-row gap-5 items-center max-h-screen'>
            <div className='hidden lg:block w-full lg:w-1/2'>
                <Image
                    src={authImg} placeholder='blur' alt="auth bf image" priority className="h-screen w-full object-cover relative" />
            </div>
            <div className='h-screen lg:h-auto w-full lg:w-1/2 flex justify-center items-center'>
                {children}
            </div>
        </div>
    );
};

export default layout;