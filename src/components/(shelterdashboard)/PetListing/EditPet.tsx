import { Button, DatePicker, Form, FormProps, Input, InputNumber, Modal, Select, Upload } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { LoadScriptNext } from "@react-google-maps/api"

const GOOGLE_MAPS_API_KEY = config.MAP_KEY!

const EditPet = ({ defaultdata }: { defaultdata: IPet }) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button type='primary' onClick={() => setOpen(true)} size='small'>Edit</Button>

            <EditPetForm setOpen={setOpen} defaultdata={defaultdata} open={open} />
        </div>
    );
};

export default EditPet;


import type { UploadFile } from 'antd';
import { RiCloseLargeLine } from 'react-icons/ri';
import { CloudDownload } from 'lucide-react';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'sonner';
import { useDeletePetImageMutation, useUpdatePetMutation } from '@/redux/api/pet.api';
import { IPet } from '@/redux/types';
import { UploadFileStatus } from 'antd/es/upload/interface';
import SelectMap from './SelectMap';
import dayjs from 'dayjs';
import Dragger from 'antd/es/upload/Dragger';
import { config } from '@/utils/config';
import SelectAddress from './SelectAddress';

type TPropsType = {
    open: boolean,
    setOpen: (collapsed: boolean) => void;
    defaultdata: IPet;
};

type FieldType = {
    name: string;
    location: string;
    breed: string;
    description: string;
    gender: string;
    neutered: string;
    chipped: string;
    chip_number: string
    vaccinated: string;
    weight: number;
    date_of_birth: Date,
    pet_image: UploadFile[];
    pet_category: string;

    city: string,
    address: string,

    pet_status?: 'adopted' | 'deceased' | 'in quarantine' | 'reserved' | "available";
    medical_notes?: string;
    pet_reports?: UploadFile[];
    internal_notes?: string;
};

type Tcity = {
    "id": number,
    "name": string,
    "latitude": number,
    "longitude": number
}

export const EditPetForm = ({ open, setOpen, defaultdata }: TPropsType) => {
    const [handleUpdatePetApi, { isLoading }] = useUpdatePetMutation();
    const [handleDltPetImageApi] = useDeletePetImageMutation();

    const [pickupInputValue, setPickupInputValue] = useState<string>("");

    const [allCities, setAllCities] = useState<Tcity[]>([]);

    const [cities, setCities] = useState<Tcity[]>([]);

    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [form] = Form.useForm();

    useEffect(() => {
        if (defaultdata?.pet_image) {
            const formattedImages: UploadFile[] = defaultdata.pet_image.map((url, index) => ({
                uid: `${Date.now()}-${index}`,
                name: `image-${index}.png`,
                status: 'done' as UploadFileStatus,
                url,
            }));

            const defaultD = {
                name: defaultdata.full_name,
                description: defaultdata.description,
                neutered: defaultdata.neutered,
                vaccinated: defaultdata.vaccinated,
                weight: defaultdata.weight !== "N/A" ? parseFloat(defaultdata.weight?.split(' ')[0]) : 0,
                chipped: defaultdata.chipped,
                chip_number: defaultdata.chip_number !== "N/A" ? defaultdata.chip_number : "",
                breed: defaultdata.breed,
                gender: defaultdata.gender,
                date_of_birth: defaultdata?.date_of_birth ? dayjs(defaultdata.date_of_birth) : null,
                pet_category: defaultdata.pet_category,

                city: defaultdata.city,
                address: defaultdata.address,

                pet_status: defaultdata.pet_status,
                medical_notes: defaultdata.medical_notes,
                internal_notes: defaultdata.internal_notes
            }

            form.setFieldsValue({ ...defaultD, pet_image: formattedImages }); // sync with form field
        }

        if (defaultdata?.pet_reports) {
            const formattedImages: UploadFile[] = defaultdata.pet_reports.map((url, index) => ({
                uid: `${Date.now()}-${index}`,
                name: url,
                status: 'done' as UploadFileStatus,
                url,
            }));
            form.setFieldsValue({ pet_reports: formattedImages }); // sync with form field
        }
    }, [defaultdata, form]);

    useEffect(() => {
        fetch("/data/cities.json")
            .then((res) => res.json())
            .then((data) => {
                setCities(data.sort((i: Tcity, b: Tcity) => i?.name.localeCompare(b?.name)));
                setAllCities(data.sort((i: Tcity, b: Tcity) => i?.name.localeCompare(b?.name)));
            });
    }, []);

    const onSearch = (value: string) => {
        const searchTerm = value.toLowerCase();

        if (!searchTerm || searchTerm == "") {
            setCities(allCities);
            return;
        }

        const results = allCities.filter((city) =>
            city.name.toLowerCase().includes(searchTerm)
        );

        setCities(results);
    };

    useEffect(() => {
        if (pickupInputValue) {
            form.setFieldsValue({ address: pickupInputValue }); // sync with form field
        }
    }, [pickupInputValue, form]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const formdata = new FormData();

            const location = selectedLocation ? selectedLocation :
                { latitude: defaultdata?.location?.coordinates[1], longitude: defaultdata?.location?.coordinates[0] };

            const payload = {
                full_name: values.name,
                location: { type: "Point", coordinates: [location?.longitude, location?.latitude] },
                description: values.description,
                neutered: values.neutered,
                vaccinated: values.vaccinated,
                weight: values.weight ? `${values.weight} kg` : "N/A",
                chipped: values?.chipped,
                chip_number: values.chip_number ?? "N/A",
                breed: values.breed ?? "N/A",
                gender: values.gender,
                date_of_birth: values?.date_of_birth,
                pet_category: values.pet_category,

                city: values?.city,
                address: values?.address,
                pet_status: values?.pet_status,
                medical_notes: values?.medical_notes,
                internal_notes: values?.internal_notes
            };

            formdata.append('data', JSON.stringify(payload));

            const newUploadedImage = values.pet_image?.filter(i => {
                if (!i?.url) {
                    return i
                }
            })

            newUploadedImage.forEach((file) => {
                if (file.originFileObj) {
                    formdata.append('pet_image', file.originFileObj as File);
                }
            });

            if (values?.pet_reports) {
                values?.pet_reports.forEach(element => {
                    formdata.append("pet_reports", element?.originFileObj as File)
                });
            }

            await handleUpdatePetApi({ formData: formdata, id: defaultdata?._id }).unwrap();
            toast.success('Pet updated successfully');
            form.resetFields();
            setSelectedLocation(null);
            setOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    };

    const handleImageDlt = async (file: UploadFile) => {
        if (file?.originFileObj) {
            return true;
        }
        if (file?.url) {
            const loader = toast.loading("Loading...")
            try {
                await handleDltPetImageApi({ id: defaultdata?._id, url: file?.url }).unwrap();
                toast.success("Image deleted successfully")
            } catch (err: any) {
                toast.error(err?.data?.message || "Something went wrong, try again");
                return false;
            } finally {
                toast.dismiss(loader)
            }
        }
    }

    return (
        <Modal
            open={open}
            footer={null}
            centered
            onCancel={() => setOpen(false)}
            closeIcon={false}
        >
            <div>
                <div className="flex justify-end items-center">
                    <div
                        className="w-10 h-10 bg-main-color rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine size={18} color="#fff" />
                    </div>
                </div>

                <h4 className="text-center text-xl font-medium">Edit Pet Details</h4>

                <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        autoComplete="off"
                        style={{ width: '100%' }}

                        onFinish={onFinish}
                    >
                        <Form.Item<FieldType>
                            name="pet_image"
                            label="Pet Images"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            rules={[{ required: true, message: 'Minimum 1 image is required' }]}
                        >
                            <Upload
                                name="files"
                                beforeUpload={() => false}
                                accept="image/*"
                                listType="picture-card"
                                multiple
                                onPreview={() => { }}
                                onRemove={handleImageDlt}
                                showUploadList={{ showPreviewIcon: false, showRemoveIcon: true }}
                            >
                                <p className="ant-upload-drag-icon mx-auto flex justify-center">
                                    <CloudDownload size={30} />
                                </p>
                            </Upload>
                        </Form.Item>

                        <Form.Item<FieldType> name="name" label="Pet Name" rules={[{ required: true, message: 'Pet name is required' }]}>
                            <Input size="large" placeholder="Enter Pet Name" />
                        </Form.Item>

                        {/* <Form.Item<FieldType> name="location" label="Location" rules={[{ required: true, message: 'Location is required' }]}>
                        <Input size="large" placeholder="Enter Location" />
                    </Form.Item> */}

                        <Form.Item<FieldType> name="description" label="Description" rules={[{ required: true, message: 'Description is required' }]}>
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
                                onSearch={onSearch}
                                showSearch
                                options={cities?.map(i => {
                                    return { label: i?.name, value: i?.name }
                                })}
                            />
                        </Form.Item>

                        <SelectAddress pickupInputValue={pickupInputValue} selectedLocation={selectedLocation} setPickupInputValue={setPickupInputValue} setSelectedLocation={setSelectedLocation} />

                        <Form.Item<FieldType> name="breed" label="Pet Breed"
                        // rules={[{ required: true, message: 'Pet Breed is required' }]}
                        >
                            <Input size="large" placeholder="Enter Pet Breed" />
                        </Form.Item>

                        <div className="grid grid-cols-2 gap-x-5">
                            <Form.Item<FieldType> name="gender" label="Gender" rules={[{ required: true }]}>
                                <Select
                                    size="large"
                                    placeholder="Select Gender"
                                    options={[
                                        { value: 'Male', label: 'Male' },
                                        { value: 'Female', label: 'Female' },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item<FieldType> name="neutered" label="Neutered" rules={[{ required: true }]}>
                                <Select
                                    size="large"
                                    placeholder="Select Neutered"
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

                        <Form.Item<FieldType> name="pet_category" label="Category" rules={[{ required: true }]}>
                            <Select
                                size="large"
                                placeholder="Select category"
                                options={[
                                    { value: 'cat', label: 'Cat' },
                                    { value: 'dog', label: 'Dog' },
                                    // { value: 'both', label: 'Both' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item<FieldType> name="weight" label="Weight"
                        // rules={[{ required: true }]}
                        >
                            <InputNumber min={0} className="!w-full" size="large" placeholder="Enter Pet Weight" addonAfter="kg" />
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

                        <SelectMap selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} defaultLocation={{ latitude: defaultdata?.location?.coordinates[1], longitude: defaultdata?.location?.coordinates[0] }} />

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                className='!mt-3'
                                type="primary"
                                size="large"
                                block
                                disabled={isLoading}
                                icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>}
                                iconPosition="end"
                            >
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </LoadScriptNext>
            </div>
        </Modal>
    );
};
