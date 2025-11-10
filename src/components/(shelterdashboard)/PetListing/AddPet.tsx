import { Button, DatePicker, Form, FormProps, Input, InputNumber, Modal, Select, Upload } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { GoPlusCircle } from "react-icons/go";
import { LoadScriptNext } from "@react-google-maps/api"

const GOOGLE_MAPS_API_KEY = config.MAP_KEY!

const AddPet = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button onClick={() => setOpen(true)} type='primary' size='large' block icon={<GoPlusCircle />} iconPosition='start'>Add New Pet</Button>


            <Modal
                open={open}
                footer={null}
                centered={true}
                onCancel={() => setOpen(false)}
                closeIcon={false}>

                <AddPetForm setOpen={setOpen} />

            </Modal>
        </div>
    );
};

export default AddPet;

import { RiCloseLargeLine } from "react-icons/ri";
import { useAddPetMutation } from '@/redux/api/pet.api';
import { CloudDownload } from 'lucide-react';
import type { UploadFile } from 'antd';
import { toast } from 'sonner';
import { ImSpinner3 } from 'react-icons/im';
import SelectMap from './SelectMap';
import Dragger from 'antd/es/upload/Dragger';
import SelectAddress from './SelectAddress';
import { config } from '@/utils/config';

type TPropsType = {
    setOpen: (collapsed: boolean) => void;
};

type FieldType = {
    name: string,
    location: string,
    breed: string,
    description: string,
    gender: string,
    neutered: string,
    chipped: string,
    chip_number: number;
    vaccinated: string,
    weight: number,
    date_of_birth: Date,
    pet_image: UploadFile[],
    pet_category: string,

    city: string,
    address: string,

    pet_status?: 'adopted' | 'deceased' | 'in quarantine' | 'reserved' | "available";
    medical_notes?: string;
    pet_reports?: UploadFile[];
    internal_notes?: string;
}

export const AddPetForm = ({ setOpen }: TPropsType) => {

    const [handleAddPetApi, { isLoading }] = useAddPetMutation();
    const [form] = Form.useForm();
    const [pickupInputValue, setPickupInputValue] = useState<string>("");

    const [cities, setCities] = useState<{
        "id": number,
        "name": string,
        "latitude": number,
        "longitude": number
    }[]>([]);

    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);

    useEffect(() => {
        fetch("/data/cities.json")
            .then((res) => res.json())
            .then((data) => {
                setCities(data);
            });
    }, []);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        if (!selectedLocation) {
            toast.error("Choose your pet location")
            return;
        }
       
        try {

            const formdata = new FormData();

            formdata.append("data", JSON.stringify({
                full_name: values?.name,
                location: { type: "Point", coordinates: [selectedLocation?.longitude, selectedLocation?.latitude] },
                description: values?.description,
                neutered: values?.neutered,
                vaccinated: values?.vaccinated,
                weight: values?.weight ? values?.weight + " kg" : "N/A",
                chip_number: values?.chip_number ?? "N/A",
                chipped: values?.chipped,
                breed: values?.breed ?? "N/A",
                gender: values?.gender,
                date_of_birth: values?.date_of_birth,
                pet_category: values?.pet_category,
                city: values?.city,
                address: values?.address,
                pet_status: values?.pet_status,
                medical_notes: values?.medical_notes,
                internal_notes: values?.internal_notes
            }));

            values?.pet_image.forEach(element => {
                formdata.append("pet_image", element?.originFileObj as File)
            });

            if (values?.pet_reports) {
                values?.pet_reports.forEach(element => {
                    formdata.append("pet_reports", element?.originFileObj as File)
                });
            }

            await handleAddPetApi(formdata).unwrap();
            toast.success("New Pet added successfully");
            form.resetFields();

        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    useEffect(() => {
        if (pickupInputValue) {
            form.setFieldsValue({ address: pickupInputValue }); // sync with form field
        }
    }, [pickupInputValue, form]);

    return (

        <div className="">

            <div className="flex justify-end items-center">
                <div
                    className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                    onClick={() => setOpen(false)}
                >
                    <RiCloseLargeLine size={18} color="#fff" className="" />
                </div>
            </div>

            <h4 className="text-center text-xl font-medium">{"Add New Pet"}</h4>

            <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={{ weight: 0, pet_status: "available" }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    form={form}>

                    <Form.Item<FieldType>
                        name="pet_image"
                        label="Pet Images"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                        rules={[{ required: true, message: "Minimum 1 image is required" }]}
                    >
                        <Upload
                            name="files"
                            // maxCount={1}
                            beforeUpload={() => false} // prevents automatic upload
                            accept="image/*"
                            listType="picture-card"
                            multiple
                            onPreview={() => { }}
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                            }}
                        >
                            <p className="ant-upload-drag-icon mx-auto flex justify-center">
                                <CloudDownload size={30} />
                            </p>
                        </Upload>
                    </Form.Item>

                    <Form.Item<FieldType> name="name" label={"Pet Name"} rules={[{ required: true, message: "Pet name is required" }]}>
                        <Input size="large" placeholder="Enter Pet Name" />
                    </Form.Item>

                    {/* <Form.Item<FieldType> name="location" label={"Location"} rules={[{ required: true, message: "Location is required" }]}>
                        <Input size="large" placeholder="Enter Location" />
                    </Form.Item> */}

                    <SelectAddress pickupInputValue={pickupInputValue} selectedLocation={selectedLocation} setPickupInputValue={setPickupInputValue} setSelectedLocation={setSelectedLocation} />

                    <Form.Item<FieldType> name="description" label={"Description"} rules={[{ required: true, message: "Description is required" }]}>
                        <Input.TextArea rows={4} size="large" placeholder="Write pet Description" />
                    </Form.Item>

                    <Form.Item<FieldType> name="city" label={"City"} rules={[{ required: true, message: "City is required" }]}>
                        <Select
                            // defaultValue="lucy"
                            // style={{ width: 120 }}
                            // onChange={handleChange}
                            size="large"
                            placeholder="Select city"
                            className='!w-full'
                            options={cities?.map(i => {
                                return { label: i?.name, value: i?.name }
                            })}
                        />
                    </Form.Item>

                    {/* <Form.Item<FieldType> name="address" label={"Address"}
                    // rules={[{ required: true, message: "City is required" }]}
                    >
                        <Input size="large" placeholder="eg: Dublin, Ireland" />
                    </Form.Item> */}

                    <Form.Item<FieldType> name="breed" label={"Pet Breed"}
                    // rules={[{ required: true, message: "Pet Breed is required" }]}
                    >
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
                                    { value: 'Male', label: 'Male' },
                                    { value: 'Female', label: 'Female' },
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
                                    { value: "Yes", label: 'YES' },
                                    { value: "No", label: 'NO' },
                                    { value: "N/A", label: 'N/A' },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <div className='grid grid-cols-2 gap-x-5 items-center'>

                        <Form.Item<FieldType> name="chipped" label={"Chipped"} rules={[{ required: true, message: "Chipped is required" }]}>
                            <Select
                                // defaultValue="lucy"
                                // style={{ width: 120 }}
                                // onChange={handleChange}
                                size="large"
                                placeholder="Select a option"
                                className='!w-full'
                                options={[
                                    { value: "Yes", label: 'YES' },
                                    { value: "No", label: 'NO' },
                                    { value: "N/A", label: 'N/A' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item shouldUpdate noStyle>
                            {({ getFieldValue }) => {
                                const chipped = getFieldValue('chipped') == "Yes";

                                return <Form.Item<FieldType> name="chip_number" label={"Chipp Number"}
                                // rules={[{ required: true, message: "Chipp number is required" }]}
                                >
                                    <Input size="large" disabled={!chipped} placeholder="Enter Chip Number" />
                                </Form.Item>

                            }}
                        </Form.Item>


                    </div>

                    <Form.Item<FieldType> name="vaccinated" label={"Vaccinated"} rules={[{ required: true, message: "Pet Vaccinated is required" }]}>

                        <Select
                            // defaultValue="lucy"
                            // style={{ width: 120 }}
                            // onChange={handleChange}
                            placeholder="Select Vaccinated"
                            size="large"
                            className='!w-full'
                            options={[
                                { value: "Yes", label: 'YES' },
                                { value: "No", label: 'NO' },
                                { value: "N/A", label: 'N/A' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item<FieldType> name="pet_category" label={"Category"} rules={[{ required: true, message: "Pet category is required" }]}>
                        <Select
                            // defaultValue="lucy"
                            // style={{ width: 120 }}
                            // onChange={handleChange}
                            placeholder="Select category"
                            size="large"
                            className='!w-full'
                            options={[
                                { value: 'cat', label: 'Cat' },
                                { value: 'dog', label: 'Dog' },
                                // { value: 'both', label: 'Both' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item<FieldType> name="weight" label={"Weight"}
                    // rules={[{ required: true, message: "Weight is required" }]}
                    >
                        <InputNumber min={0} className='!w-full' size="large" placeholder="Enter Pet Weight" addonAfter="kg" />
                    </Form.Item>


                    <Form.Item<FieldType> name="date_of_birth" label={"Birth Date"} rules={[{ required: true, message: "Date of Birth is required" }]}>
                        <DatePicker className='!w-full' size="large" placeholder="Select Pet Birth date" />
                    </Form.Item>

                    <Form.Item<FieldType> name="pet_status" label={"Status"} rules={[{ required: true, message: "Pet Status is required" }]}>
                        <Select
                            // defaultValue="lucy"
                            // style={{ width: 120 }}
                            // onChange={handleChange}
                            size="large"
                            placeholder="Select Status"
                            className='!w-full'
                            options={[
                                { value: 'available', label: 'Available' },
                                { value: 'adopted', label: 'Adopted' },
                                { value: 'deceased', label: 'Deceased' },
                                { value: 'in quarantine', label: 'In Quarantine' },
                                { value: 'reserved', label: 'Reserved' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item<FieldType> name="medical_notes" label={"Medical Notes"}
                    // rules={[{ required: true, message: "Description is required" }]}
                    >
                        <Input.TextArea rows={4} size="large" placeholder="Write medical notes..." />
                    </Form.Item>
                    <Form.Item<FieldType> name="internal_notes" label={"Internal Notes"}
                    // rules={[{ required: true, message: "Description is required" }]}
                    >
                        <Input.TextArea rows={4} size="large" placeholder="Write internal notes..." />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="pet_reports"
                        label="Attach reports"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                    // rules={[{ required: true, message: "Minimum 1 image is required" }]}
                    >
                        <Dragger
                            name="files"
                            // maxCount={1}
                            beforeUpload={() => false} // prevents automatic upload
                            // accept="image/*"
                            listType="text"
                            multiple
                            onPreview={() => { }}
                            showUploadList={{
                                showPreviewIcon: false,
                                showRemoveIcon: true,
                            }}
                        >
                            <div className='flex flex-col justify-center'>
                                <p className="ant-upload-drag-icon flex justify-center">
                                    <CloudDownload size={30} />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                    Can upload some report files for your personal cases.
                                </p>
                            </div>
                        </Dragger>
                    </Form.Item>

                    <SelectMap selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />

                    <Form.Item>
                        <Button htmlType="submit" className='!mt-4' type="primary" size="large" block disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                            Save
                        </Button>
                    </Form.Item>

                </Form>

            </LoadScriptNext>

        </div>

    );
};