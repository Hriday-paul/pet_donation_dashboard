"use client"
import React, { useEffect, useState } from 'react';
import WebCard from './WebCard';
import { closestCorners, DndContext } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useAllSubServicesQuery, useSwapWebserviceMutation } from '@/redux/api/service.api';
import { Loader } from 'lucide-react';
import { TSubService } from '@/redux/types';
import Image from 'next/image';
import { toast } from 'sonner';

const WebCards = ({ serviceId }: { serviceId: string }) => {

    const [handleSwapApi] = useSwapWebserviceMutation();
    const { isLoading, data, isSuccess } = useAllSubServicesQuery({ id: serviceId, sort: "-position" });

    const [webCards, setWebCards] = useState<TSubService[]>([]);

    const getTaskPosition = (position: number) => {
        return webCards.findIndex(i => {
            return i.position == position
        })
    }

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        try {
            await handleSwapApi({ pos1: active?.id, pos2: over?.id, serviceId }).unwrap();
            toast.success("Position updated successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something, went wrong, try again")
        }

        setWebCards(prev => {
            const originalPos = getTaskPosition(active.id);
            const newPos = getTaskPosition(over.id);
            return arrayMove(webCards, originalPos, newPos);
        });
    };

    useEffect(() => {
        if (data) {
            setWebCards(data?.data)
        }
    }, [data])


    return (
        <div>
            {
                isLoading ? <div className='min-h-40 flex items-center justify-center min-w-40'>
                    <Loader size={30} className='text-main-color animate-spin' />
                </div>
                    :
                    isSuccess ? (webCards?.length > 0 ? <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                        <div className='bg-[#F9F9FA] p-5 border border-stroke rounded-2xl space-y-5'>
                            <SortableContext items={webCards.map(item => item.position)} strategy={verticalListSortingStrategy}>
                                {
                                    webCards?.map(item => {
                                        return <WebCard key={item?.position} carddata={item} serviceId={serviceId} />
                                    })
                                }
                            </SortableContext>
                        </div>
                    </DndContext> : <div className='min-h-40 min-w-40 flex flex-col justify-center items-center'>
                        <Image src={"/empty-data.png"} className='h-24 w-24 mx-auto' height={1000} width={1000} alt='empty image' />
                        <p>Empty data</p>
                    </div>) : <></>
            }

        </div>
    );
};

export default WebCards;