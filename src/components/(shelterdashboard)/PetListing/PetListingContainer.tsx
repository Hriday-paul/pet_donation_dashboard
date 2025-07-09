"use client"
import { Input, Pagination } from 'antd';
import { Loader, Search } from 'lucide-react';
import React, { useState } from 'react';
import AddPet from './AddPet';
import PetCard from './PetCard';
import { usePetListQuery } from '@/redux/api/pet.api';
import ErrorComponent from '@/utils/ErrorComponent';
import Image from 'next/image';

const PetListingContainer = () => {
    return (
        <div>
            <AddPet />

            <AllPetLists />
        </div>
    );
};

export default PetListingContainer;

const AllPetLists = () => {
    const [searchText, setSearchText] = useState("");
    const [page, setpage] = useState(1);
    const { isLoading, isSuccess, data, isError } = usePetListQuery({ searchTerm: searchText });

    if (isLoading) return <div className='min-h-40 flex items-center justify-center'>
        <Loader size={30} className='text-main-color animate-spin' />
    </div>

    if (isError) return <ErrorComponent />

    return (
        <div>
            <div className="flex justify-between items-center px-10 py-5">
                <h1 className="  text-2xl text-text-color font-medium">Pet Listing</h1>
                <Input
                    className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                    placeholder="Search Pets..."
                    prefix={<Search size={20} color="#000" />}
                    onChange={(e) => setSearchText(e?.target?.value)}
                ></Input>
            </div>


            {/* -------------------------------all pets-------------------- */}
            {isSuccess && <>
                <div className='bg-[#F9F9FA] p-5 lg:p-8 xl:p-10 border border-stroke rounded-xl flex flex-row flex-wrap gap-5 items-center shadow-sm mb-3'>
                    {
                        data?.data?.data?.map(pet => {
                            return <PetCard key={pet?._id} pet={pet} />
                        })
                    }
                </div>
                <Pagination defaultCurrent={page} total={data?.meta?.total} pageSize={10} hideOnSinglePage align="end" showSizeChanger={false} onChange={(page) => setpage(page)} />
                {
                    data?.data?.data?.length <= 0 && <div className='min-h-40 min-w-40 flex flex-col justify-center items-center'>
                        <Image src={"/empty-data.png"} className='h-24 w-24 mx-auto' height={1000} width={1000} alt='empty image' />
                        <p>Empty data</p>
                    </div>
                }
            </>}


        </div>
    )
}