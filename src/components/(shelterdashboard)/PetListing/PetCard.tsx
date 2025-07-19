import React, { useState } from 'react';
import { Button, Carousel, Popconfirm, Tooltip } from 'antd';
import { toast } from 'sonner';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { PiPawPrint } from 'react-icons/pi';
import { AddPetForm } from './AddPet';
import { IPet } from '@/redux/types';
import { placeHolderBlurImg } from '@/utils/config';
import Image from 'next/image';
import { useDeletePetMutation } from '@/redux/api/pet.api';
import EditPet from './EditPet';

const PetCard = ({ pet }: { pet: IPet }) => {

    const [handleDeleteApi, { }] = useDeletePetMutation();

    const [open, setOpen] = useState(false);

    const handleDelete = async (id: string) => {
        try {
            await handleDeleteApi(id).unwrap();
            toast.success("Pet deleted successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Pet deleted successfully.")
        }
    }


    return (
        <div className='bg-white border border-stroke rounded-xl shadow-sm w-72'>

            <div className='h-40  rounded-t-lg'>
                <Carousel autoplay arrows infinite>
                    {pet?.pet_image?.map(img => {
                        return <Image key={img} src={img} placeholder='blur' blurDataURL={placeHolderBlurImg} alt='pet image' height={1000} width={1000} className='h-40 w-full object-cover mx-auto rounded-t-2xl' />
                    })}
                </Carousel>
            </div>

            <section className='p-6'>

                <div className='bg-zinc-100 px-4 py-1.5 rounded-full inline-block'>
                    <p className='text-sm text-zinc-700'>Adoption</p>
                </div>

                <Tooltip title={pet?.full_name}>
                    <h4 className='text-xl font-semibold my-3 text-zinc-700 line-clamp-1'>{pet?.full_name}</h4>
                </Tooltip>

                <div className='flex flex-row gap-x-5 items-center my-3'>
                    <div className='flex flex-row gap-x-2 items-center'>
                        <div className='bg-[#FF90CC]/10 p-1.5 rounded-md'>
                            <BsGenderAmbiguous className='text-pink-400' size={18} />
                        </div>
                        <p className='text-base font-medium text-zinc-600'>{pet?.gender}</p>
                    </div>

                    <div className='flex flex-row gap-x-2 items-center'>
                        <div className='bg-[#FF9900]/10 p-1.5 rounded-md'>
                            <PiPawPrint className='text-[#FF9900]' size={18} />
                        </div>
                        <p className='text-base font-medium text-zinc-600'>{pet?.age}</p>
                    </div>
                </div>

                <div className='flex flex-row gap-x-3 items-center justify-center'>
                    <Popconfirm
                        title="Delete Pet"
                        description="Are you sure to delete this pet?"
                        onConfirm={() => handleDelete(pet?._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='default'>Delete</Button>
                    </Popconfirm>

                    <EditPet defaultdata={pet} />

                </div>

            </section>

        </div>
    );
};

export default PetCard;