import { Button, Form, FormProps, Input, InputNumber, Modal, Select, Upload } from 'antd';
import React from 'react';
import { useState } from 'react';
import { GoPlusCircle } from "react-icons/go";

const AddPet = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button onClick={() => setOpen(true)} type='primary' size='large' block icon={<GoPlusCircle />} iconPosition='start'>Add New Pet</Button>

            <AddPetForm setOpen={setOpen} open={open} />
        </div>
    );
};

export default AddPet;

import { CloudDownload } from "lucide-react";
import { RiCloseLargeLine } from "react-icons/ri";
import Image from 'next/image';
import { useCallback } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { GoPlus } from 'react-icons/go';

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    isEdit?: boolean
};

type FieldType = {
    name: string,
    location: string,
    breed: string,
    description: string,
    gender: string,
    neutered: string,
    chipped: string,
    vaccinated: string,
    weight: number,
    age: number
}

export const AddPetForm = ({ open, setOpen, isEdit }: TPropsType) => {

    const [images, setImages] = useState<File[]>([]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImages(prev => [...prev, ...fileList])
    };

    const removeImg = useCallback((indxParam: number) => {
        const finalImgs = images?.filter((i, indx) => {
            return indx !== indxParam
        })
        setImages(finalImgs)
    }, [images])

    return (

        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}>

            <div className="">

                <div className="flex justify-end items-center">
                    <div
                        className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine size={18} color="#fff" className="" />
                    </div>
                </div>

                <h4 className="text-center text-xl font-medium">{isEdit ? "Edit Pet Details" : "Add New Pet"}</h4>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >

                    <section className='mb-3'>
                        <p className="mb-1.5 block text-black font-poppins text-base text-left">Upload Image</p>
                        <div className='flex flex-row gap-x-2 items-center flex-wrap'>
                            {
                                images?.map((img, indx) => {
                                    return <div key={indx} >
                                        <div className='relative w-20 h-20 group'>
                                            <Image src={URL.createObjectURL(img)} fill className='h-full w-full object-cover rounded-md' alt='uploaded car' />

                                            <button type='button' onClick={() => removeImg(indx)} className='hidden group-hover:block transition-all duration-200 absolute top-1 right-1 bg-slate-100 rounded-full p-1'>
                                                <MdDeleteOutline className='text-base text-red-500' />
                                            </button>
                                        </div>
                                    </div>
                                })
                            }
                            <label htmlFor='addImage' className='h-20 w-20 rounded-md border-2 border-dotted border-strokeinput hover:border-main-color duration-200 flex flex-col justify-center items-center cursor-pointer'>
                                <GoPlus className='text-main-color text-base' />
                                <p className="mb-1.5 block text-main-color font-poppins text-xs text-center">{"Upload"}</p>
                            </label>
                            <input onChange={fileonChange} type="file" name="addImage" id="addImage" className='!hidden' accept="image/*" multiple />
                        </div>
                    </section>

                    <Form.Item<FieldType> name="name" label={"Pet Name"} rules={[{ required: true, message: "Pet name is required" }]}>
                        <Input size="large" placeholder="Enter Pet Name" />
                    </Form.Item>

                    <Form.Item<FieldType> name="location" label={"Location"} rules={[{ required: true, message: "Location is required" }]}>
                        <Input size="large" placeholder="Enter Location" />
                    </Form.Item>

                    <Form.Item<FieldType> name="description" label={"Description"} rules={[{ required: true, message: "Description is required" }]}>
                        <Input.TextArea rows={4} size="large" placeholder="Write pet Description" />
                    </Form.Item>

                    <Form.Item<FieldType> name="breed" label={"Pet Breed"} rules={[{ required: true, message: "Pet Breed is required" }]}>
                        <Input size="large" placeholder="Enter Your Pet Breed" />
                    </Form.Item>

                    <div className='grid grid-cols-2 gap-x-5 items-center'>
                        <Form.Item<FieldType> name="gender" label={"Gender"} rules={[{ required: true, message: "Pet Gender is required" }]}>

                            <Select
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                // onChange={handleChange}
                                size="large"
                                placeholder="Select Gender"
                                className='!w-full'
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' },
                                ]}
                            />

                        </Form.Item>

                        <Form.Item<FieldType> name="neutered" label={"Neutered"} rules={[{ required: true, message: "Pet Neutered is required" }]}>

                            <Select
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                // onChange={handleChange}
                                size="large"
                                placeholder="Select Neutered"
                                className='!w-full'
                                options={[
                                    { value: 'yes', label: 'YES' },
                                    { value: 'no', label: 'NO' },
                                ]}
                            />

                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-x-5 items-center'>
                        <Form.Item<FieldType> name="chipped" label={"Chipped"} rules={[{ required: true, message: "Pet Chipped is required" }]}>
                            <Select
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                // onChange={handleChange}
                                placeholder="Select Chipped"
                                size="large"
                                className='!w-full'
                                options={[
                                    { value: 'yes', label: 'YES' },
                                    { value: 'no', label: 'NO' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item<FieldType> name="vaccinated" label={"Vaccinated"} rules={[{ required: true, message: "Pet Vaccinated is required" }]}>

                            <Select
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                // onChange={handleChange}
                                placeholder="Select Vaccinated"
                                size="large"
                                className='!w-full'
                                options={[
                                    { value: 'yes', label: 'YES' },
                                    { value: 'no', label: 'NO' },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item<FieldType> name="weight" label={"Weight"} rules={[{ required: true, message: "Weight is required" }]}>
                        <InputNumber min={0} className='!w-full' size="large" placeholder="Enter Pet Weight" />
                    </Form.Item>

                    <Form.Item<FieldType> name="age" label={"Age"} rules={[{ required: true, message: "Age is required" }]}>
                        <InputNumber min={0} className='!w-full' size="large" placeholder="Enter Pet Age" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" size='large' htmlType="submit" block>Save</Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};