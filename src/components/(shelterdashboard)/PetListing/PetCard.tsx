import React from 'react';
import { Button, Carousel, Popconfirm, Tooltip } from 'antd';
import { toast } from 'sonner';
import { BsGenderAmbiguous } from 'react-icons/bs';
import { PiPawPrint } from 'react-icons/pi';
import { IPet } from '@/redux/types';
import { placeHolderBlurImg } from '@/utils/config';
import Image from 'next/image';
import { useDeletePetMutation } from '@/redux/api/pet.api';
import EditPet from './EditPet';
import moment from 'moment';
import { FaFileAlt } from 'react-icons/fa';
import ViewAttachments from './ViewAttachments';

const PetCard = ({ pet }: { pet: IPet }) => {

    const [handleDeleteApi, { }] = useDeletePetMutation();

    const handleDelete = async (id: string) => {
        try {
            await handleDeleteApi(id).unwrap();
            toast.success("Pet deleted successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Pet deleted successfully.")
        }
    }


    return (
        <div className='bg-white border border-stroke rounded-xl shadow-sm w-60'>

            <div className='h-32 rounded-t-lg relative'>
                <Carousel autoplay arrows infinite>
                    {pet?.pet_image?.map(img => {
                        return <Image key={img} src={img} placeholder='blur' blurDataURL={placeHolderBlurImg} alt='pet image' height={1000} width={1000} className='h-32 w-full object-contain mx-auto rounded-t-2xl' />
                    })}
                </Carousel>
                <span className='absolute top-3 right-3 rounded px-1 py-0.5 text-xs bg-main-color text-white font-medium'>
                    {pet?.pet_status}
                </span>
            </div>

            <section className='p-4 pt-1'>

                {/* <div className='bg-zinc-100 px-4 py-1.5 rounded-full inline-block'>
                    <p className='text-sm text-zinc-700'>Adoption</p>
                </div> */}

                <Tooltip title={pet?.full_name}>
                    <h4 className='text-lg font-semibold my-3 text-zinc-700 line-clamp-1'>{pet?.full_name}</h4>
                </Tooltip>

                <div className='flex flex-row gap-x-5 items-center my-3'>
                    <div className='flex flex-row gap-x-2 items-center'>
                        <div className='bg-[#FF90CC]/10 p-1.5 rounded-md'>
                            <BsGenderAmbiguous className='text-pink-400' size={15} />
                        </div>
                        <p className='text-sm font-medium text-zinc-600'>{pet?.gender}</p>
                    </div>

                    <div className='flex flex-row gap-x-2 items-center'>
                        <div className='bg-[#FF9900]/10 p-1.5 rounded-md'>
                            <PiPawPrint className='text-[#FF9900]' size={15} />
                        </div>
                        <p className='text-sm font-medium text-zinc-600'>{moment().diff(moment(pet?.date_of_birth), "years", true).toFixed(1)} year</p>
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
                        <Button type='default' size='small'>Delete</Button>
                    </Popconfirm>

                    <EditPet defaultdata={pet} />

                    <ViewAttachments pet_reports={pet?.pet_reports}/>


                </div>

            </section>

        </div>
    );
};

export default PetCard;