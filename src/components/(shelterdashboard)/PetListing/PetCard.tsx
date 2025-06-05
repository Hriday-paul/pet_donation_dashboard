import Image from 'next/image';
import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { toast } from 'sonner';
import Link from 'next/link';
import catLg from '@/assets/image/catLG.png'
import { BsGenderAmbiguous } from 'react-icons/bs';
import { PiPawPrint } from 'react-icons/pi';
import { AddPetForm } from './AddPet';

const PetCard = () => {

    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        toast.success("Pet deleted successfully.")
    }

    return (
        <div className='bg-white border border-stroke rounded-xl shadow-sm'>

            <div className='h-40 w-full'>
                <Image src={catLg} placeholder='blur' alt='service icon' className='h-full w-full object-cover mx-auto rounded-t-2xl' />
            </div>

            <section className='p-6'>

                <div className='bg-zinc-100 px-4 py-2 rounded-full inline-block'>
                    <p className='text-base text-zinc-700'>Adoption</p>
                </div>

                <h4 className='text-xl font-semibold my-3 text-zinc-700'>Miki</h4>

                <div className='flex flex-row gap-x-5 items-center my-3'>
                    <div className='flex flex-row gap-x-2 items-center'>
                        <div className='bg-[#FF90CC]/10 p-1.5 rounded-md'>
                            <BsGenderAmbiguous className='text-pink-400' size={18} />
                        </div>
                        <p className='text-base font-medium text-zinc-600'>Female</p>
                    </div>

                    <div className='flex flex-row gap-x-2 items-center'>
                        <div className='bg-[#FF9900]/10 p-1.5 rounded-md'>
                            <PiPawPrint className='text-[#FF9900]' size={18} />
                        </div>
                        <p className='text-base font-medium text-zinc-600'>Female</p>
                    </div>
                </div>

                <div className='flex flex-row gap-x-3 items-center justify-center'>
                    <Popconfirm
                        title="Delete Pet"
                        description="Are you sure to delete this pet?"
                        onConfirm={handleDelete}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type='default'>Delete</Button>
                    </Popconfirm>

                    <Button type='primary' onClick={() => setOpen(true)}>Edit</Button>
                </div>

            </section>

            <AddPetForm open={open} setOpen={setOpen} isEdit={true} />

        </div>
    );
};

export default PetCard;