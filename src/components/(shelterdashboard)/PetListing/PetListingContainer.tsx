"use client"
import { Input } from 'antd';
import { Search } from 'lucide-react';
import React from 'react';
import AddPet from './AddPet';
import PetCard from './PetCard';

const PetListingContainer = () => {
    return (
        <div>
            <AddPet />
            <div className="flex justify-between items-center px-10 py-5">
                <h1 className="  text-2xl text-text-color font-medium">Pet Listing</h1>
                <Input
                    className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                    placeholder="Search Pets..."
                    prefix={<Search size={20} color="#000" />}
                ></Input>
            </div>



            {/* -------------------------------all pets-------------------- */}
            <div className='bg-[#F9F9FA] p-5 lg:p-8 xl:p-10 border border-stroke rounded-xl flex flex-row flex-wrap gap-5 items-center shadow-sm mb-3'>
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
                <PetCard />
            </div>



        </div>
    );
};

export default PetListingContainer;