import React from 'react';
import webImg from '@/assets/image/Baltukas-logotipat.png'
import catImg from '@/assets/image/cat.png'
import dogImg from '@/assets/image/dog.png'
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from "@dnd-kit/utilities"

const WebCard = ({ carddata }: { carddata: { id: number, title: string, details: string } }) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: carddata?.id,
    });

    const style = {
        transition,
        transform : CSS.Transform.toString(transform)
    }

    return (
        <div className='flex flex-row items-center gap-x-3' ref={setNodeRef} {...attributes}  style={style} >
            <div className='p-5 bg-white shadow border-t-2 border-main-color flex flex-row gap-x-5 items-center rounded-lg justify-between  cursor-default'>
                <div className='w-2/3'>
                    <h2 className='text-2xl font-semibold text-black'>{carddata?.title}</h2>
                    <section className='flex flex-row gap-x-2 items-center my-3'>
                        <Image placeholder='blur' src={catImg} className='h-8 w-auto' alt='web image' />
                        <Image placeholder='blur' src={dogImg} className='h-8 w-auto' alt='web image' />
                    </section>
                    <p className='text-text-color text-base font-medium'>{carddata?.details}</p>
                </div>
                <div className='w-1/3'>
                    <Image placeholder='blur' src={webImg} className='h-28 w-auto ml-auto' alt='web image' />
                </div>
            </div>
            <button {...listeners}>
                <Menu size={30} className='text-main-color' />
            </button>
        </div>
    )
}

export default WebCard;