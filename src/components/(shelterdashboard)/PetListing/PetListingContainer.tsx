"use client"
import { Empty, Input, Pagination, Select } from 'antd';
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
    const [status, setStatus] = useState<string>("");
    const [page, setpage] = useState(1);

    const query: { searchTerm: string, pet_status?: string } = { searchTerm: searchText }

    if (status && status != "") {
        query.pet_status = status
    }

    const { isLoading, isSuccess, data, isError } = usePetListQuery(query);

    const handleSelect = (value: string) => {
        setStatus(value)
    }

    if (isLoading) return <div className='min-h-40 flex items-center justify-center'>
        <Loader size={30} className='text-main-color animate-spin' />
    </div>

    if (isError) return <ErrorComponent />

    return (
        <div>
            <div className="flex justify-between items-center px-10 py-5">
                <h1 className="  text-2xl text-text-color font-medium">Pet Listing</h1>
                <section className='flex flex-row gap-x-3 items-center'>
                    <Select
                        // defaultValue="lucy"
                        style={{ width: 120 }}
                        // onChange={handleChange}
                        //'adopted' | 'deceased' | 'in quarantine' | 'reserved' | "available"
                        size="large"
                        placeholder="Status"
                        onChange={handleSelect}
                        value={status}
                        options={[
                            {
                                label: "All",
                                value: ""
                            },
                            {
                                label: "Available",
                                value: "available"
                            },
                            {
                                label: "Adopted",
                                value: "adopted"
                            },
                            {
                                label: "Deceased",
                                value: "deceased"
                            },
                            {
                                label: "In quarantine",
                                value: "in quarantine"
                            },
                            {
                                label: "Reserved",
                                value: "reserved"
                            }
                        ]}
                    />

                    <Input
                        className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                        placeholder="Search Pets..."
                        prefix={<Search size={20} color="#000" />}
                        onChange={(e) => setSearchText(e?.target?.value)}
                    ></Input>
                </section>
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

                <Pagination defaultCurrent={page} total={data?.meta?.total} pageSize={10} align="end" showSizeChanger={false} onChange={(page) => setpage(page)} />

                {
                    data?.data?.data?.length <= 0 && <Empty />
                }
            </>}


        </div>
    )
}