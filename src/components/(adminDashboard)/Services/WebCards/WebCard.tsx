import React, { useState } from 'react';
import catImg from '@/assets/image/cat.png'
import dogImg from '@/assets/image/dog.png'
import Image from 'next/image';
import { PencilLine, Trash2 } from 'lucide-react';
import { TSubService } from '@/redux/types';
import { placeHolderBlurImg } from '@/utils/config';
import { useDeleteSubserviceMutation } from '@/redux/api/service.api';
import { toast } from 'sonner';
import AddwebDetails from './AddwebDetails';
import SetWebServicePosition from './SetWebServicePosition';
import { Button } from 'antd';

const WebCard = ({ carddata, serviceId }: { carddata: TSubService, serviceId: string }) => {

    const [isEdit, setIsedit] = useState<boolean>(false);
    const [addPositionOpen, setAddPositionOpen] = useState(false);

    const [handleDeleteApi, { }] = useDeleteSubserviceMutation();

    const handleDelete = async (id: string) => {
        const loader = toast.loading("Loading...")
        try {
            await handleDeleteApi({ webId: id, serviceId }).unwrap();
            toast.success("Website deleted successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        } finally {
            toast.dismiss(loader)
        }
    }

    return (

        <div className='flex flex-row items-center gap-x-3 w-full'>
            <div className='p-5 bg-white relative group shadow border-t-2 border-main-color flex flex-row gap-x-5 items-center rounded-lg justify-between  cursor-default w-full'>
                <div className='w-2/3'>
                    <h2 className='text-2xl font-semibold text-black'>{carddata?.web_name}</h2>
                    <section className='flex flex-row gap-x-2 items-center my-3'>
                        {
                            carddata?.pet_type == 'cat' ? <Image placeholder='blur' src={catImg} className='h-8 w-auto' alt='web image' /> : carddata?.pet_type == 'dog' ? <Image placeholder='blur' src={dogImg} className='h-8 w-auto' alt='web image' /> : <>
                                <Image placeholder='blur' src={catImg} className='h-8 w-auto' alt='web image' />
                                <Image placeholder='blur' src={dogImg} className='h-8 w-auto' alt='web image' />
                            </>

                        }
                    </section>
                    <p className='text-text-color text-base font-medium'>{carddata?.description}</p>
                </div>
                <div className='w-1/3'>
                    <Image placeholder='blur' src={carddata?.web_img} width={1000} height={1000} blurDataURL={placeHolderBlurImg} className='h-28 w-auto ml-auto object-cover' alt='web image' />
                </div>
                <div className='absolute top-0 left-0 h-full w-full hover:bg-black/30 duration-200 rounded-md'>

                    <Button type='primary' className='absolute top-6 right-36 opacity-0 group-hover:opacity-100 duration-200' onClick={() => setAddPositionOpen(true)}>Position</Button>

                    <button onClick={() => setIsedit(true)} className='bg-white text-primary-green p-3 rounded-full absolute top-5 right-20 opacity-0 group-hover:opacity-100 duration-200'>
                        <PencilLine size={20} />
                    </button>

                    <button onClick={() => handleDelete(carddata?._id)} className='bg-white p-3 rounded-full absolute top-5 right-5 opacity-0 group-hover:opacity-100 duration-200'>
                        <Trash2 size={20} color='red' />
                    </button>
                </div>

            </div>
            <AddwebDetails open={isEdit} setOpen={setIsedit} serviceId={serviceId} isEdit={true} defaultdata={carddata} />

            <SetWebServicePosition open={addPositionOpen} setOpen={setAddPositionOpen} defaultdata={carddata} />
        </div>

    )
}

export default WebCard;