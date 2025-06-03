"use client"
import React, { useState } from 'react';
import WebCard from './WebCard';
import { closestCorners, DndContext } from "@dnd-kit/core"
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

const WebCards = () => {

    const [webCards, setWebCards] = useState([
        { id: 1, title: "Pet24.lt", details: "Food, toys, grooming, litter, and care products for dogs and cats." },
        { id: 2, title: "Keturkojams.lt", details: "Offers food, accessories, toys, and care products for dogs and cats." },
        { id: 3, title: "Baltukas.lt", details: "Food, toys, grooming, litter, and care products for dogs. " },
    ]);

    const getTaskPosition = (id: number) => {
        return webCards.findIndex(i => {
            return i.id == id
        })
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        setWebCards(prev => {

            const originalPos = getTaskPosition(active.id);
            const newPos = getTaskPosition(over.id);

            return arrayMove(webCards, originalPos, newPos);
        });
    };


    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <div className='bg-[#F9F9FA] p-5 border border-stroke rounded-2xl space-y-5'>
                <SortableContext items={webCards} strategy={verticalListSortingStrategy}>
                    {
                        webCards?.map(item => {
                            return <WebCard key={item?.id} carddata={item} />
                        })
                    }
                </SortableContext>
            </div>
        </DndContext>
    );
};

export default WebCards;