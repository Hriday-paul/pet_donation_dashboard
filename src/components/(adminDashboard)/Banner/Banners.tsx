"use client"

import { useDeleteBannerMutation, useGetBannerQuery } from '@/redux/api/service.api';
import { placeHolderBlurImg } from '@/utils/config';
import { Loader, PencilLine, Trash2 } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'
import AddBanner from './AddBanner';
import EditBanner from './EditBanner';
import { toast } from 'sonner';
import { Empty } from 'antd';

export default function Banners() {

    const { isLoading: currentLoading, data: currentBanner, isSuccess } = useGetBannerQuery();

    if (currentLoading) {
        return <div className='min-h-40 flex items-center justify-center min-w-40'>
            <Loader size={30} className='text-main-color animate-spin' />
        </div>
    }

    return (
        <div className='max-w-3xl mx-auto'>
            <div className='flex flex-row justify-end mb-5'>
                <AddBanner />
            </div>
            <div className='gap-y-5 flex flex-col'>
                {currentBanner?.data?.bannerInfo?.map(i => <BannerCard data={i} />)}
            </div>
            {isSuccess && currentBanner?.data?.bannerInfo?.length <= 0 && <Empty />}
        </div>
    )
}

const BannerCard = ({ data }: { data: { image: string, websiteLink: string, _id: string } }) => {

    const [isEdit, setIsedit] = useState(false);

    const [handleDeleteApi] = useDeleteBannerMutation();

    const handleDelete = async (id: string) => {
        const loader = toast.loading("Loading...")
        try {
            await handleDeleteApi({ id }).unwrap();
            toast.success("Banner deleted successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        } finally {
            toast.dismiss(loader)
        }
    }

    return (
        <div className='p-3 bg-white relative group shadow rounded-lg cursor-default w-[359px]'>

            <div>
                <Image placeholder='blur' src={data?.image} height={1000} width={1000} className='h-[174px] w-[335px] object-contain' alt='web image' blurDataURL={placeHolderBlurImg} />
            </div>

            <div className='absolute top-0 left-0 h-full w-full hover:bg-black/30 duration-200 rounded-md'>

                <button onClick={() => setIsedit(true)} className='bg-white text-primary-green p-3 rounded-full absolute top-5 right-20 opacity-0 group-hover:opacity-100 duration-200'>
                    <PencilLine size={20} />
                </button>

                <button onClick={() => handleDelete(data?._id)} className='bg-white p-3 rounded-full absolute top-5 right-5 opacity-0 group-hover:opacity-100 duration-200'>
                    <Trash2 size={20} color='red' />
                </button>
            </div>

            <EditBanner defaultData={data} open={isEdit} setOpen={setIsedit} />

        </div>
    )
}