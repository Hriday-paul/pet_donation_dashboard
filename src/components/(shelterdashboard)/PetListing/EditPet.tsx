import { Button, Form, FormProps, Input, InputNumber, Modal, Select, Upload } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';

const EditPet = ({ defaultdata }: { defaultdata: IPet }) => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button type='primary' onClick={() => setOpen(true)}>Edit</Button>

            <EditPetForm setOpen={setOpen} open={open} defaultdata={defaultdata} />
        </div>
    );
};

export default EditPet;


import type { UploadFile } from 'antd';
import { RiCloseLargeLine } from 'react-icons/ri';
import { CloudDownload } from 'lucide-react';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'sonner';
import { useAddPetMutation, useDeletePetImageMutation, useUpdatePetMutation } from '@/redux/api/pet.api';
import { IPet } from '@/redux/types';
import { UploadFileStatus } from 'antd/es/upload/interface';

type TPropsType = {
    open: boolean;
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
    vaccinated: string;
    weight: number;
    age: number;
    pet_image: UploadFile[];
    pet_category: string;
};

export const EditPetForm = ({ open, setOpen, defaultdata }: TPropsType) => {
    const [handleUpdatePetApi, { isLoading }] = useUpdatePetMutation();
    const [handleDltPetImageApi] = useDeletePetImageMutation();

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useEffect(() => {
        if (defaultdata?.pet_image) {
            const formattedImages: UploadFile[] = defaultdata.pet_image.map((url, index) => ({
                uid: `${Date.now()}-${index}`,
                name: `image-${index}.png`,
                status: 'done' as UploadFileStatus,
                url,
            }));

            setFileList(formattedImages);
            form.setFieldsValue({ pet_image: formattedImages }); // sync with form field
        }
    }, [defaultdata, form]);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const formdata = new FormData();
            const payload = {
                full_name: values.name,
                location: values.location,
                description: values.description,
                neutered: values.neutered,
                vaccinated: values.vaccinated,
                weight: `${values.weight} kg`,
                chip_number: values.chipped,
                breed: values.breed,
                gender: values.gender,
                age: `${values.age} year`,
                pet_category: values.pet_category,
            };

            formdata.append('data', JSON.stringify(payload));

            const newUploadedImage = values.pet_image?.filter(i=>{
                if(!i?.url){
                    return i
                }
            })

            newUploadedImage.forEach((file) => {
                if (file.originFileObj) {
                    formdata.append('pet_image', file.originFileObj as File);
                }
            });

            await handleUpdatePetApi({ formData: formdata, id: defaultdata?._id }).unwrap();
            toast.success('Pet updated successfully');
            form.resetFields();
            setFileList([]);
            setOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
    };

    const handleImageDlt = async (file: UploadFile) => {
        if (file?.url) {
            const loader = toast.loading("Loading...")
            try {
                await handleDltPetImageApi({ id: defaultdata?._id, url: file?.url }).unwrap();
                toast.success("Image deleted successfully")
            } catch (err: any) {
                toast.error(err?.data?.message || "Something went wrong, try again")
            } finally {
                toast.dismiss(loader)
            }
        }
        setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
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

                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                    style={{ width: '100%' }}
                    initialValues={{
                        name: defaultdata.full_name,
                        location: defaultdata.location,
                        description: defaultdata.description,
                        neutered: defaultdata.neutered,
                        vaccinated: defaultdata.vaccinated,
                        weight: parseFloat(defaultdata.weight?.split(' ')[0]),
                        chipped: defaultdata.chip_number,
                        breed: defaultdata.breed,
                        gender: defaultdata.gender,
                        age: parseFloat(defaultdata.age?.split(' ')[0]),
                        pet_category: defaultdata.pet_category,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item<FieldType>
                        name="pet_image"
                        label="Pet Images"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        rules={[{ required: fileList?.length < 1, message: 'Minimum 1 image is required' }]}
                    >
                        <Upload
                            name="files"
                            beforeUpload={() => false}
                            accept="image/*"
                            listType="picture-card"
                            fileList={fileList}
                            onChange={({ fileList }) => setFileList(fileList)}
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

                    <Form.Item<FieldType> name="location" label="Location" rules={[{ required: true, message: 'Location is required' }]}>
                        <Input size="large" placeholder="Enter Location" />
                    </Form.Item>

                    <Form.Item<FieldType> name="description" label="Description" rules={[{ required: true, message: 'Description is required' }]}>
                        <Input.TextArea rows={4} size="large" placeholder="Write pet Description" />
                    </Form.Item>

                    <Form.Item<FieldType> name="breed" label="Pet Breed" rules={[{ required: true, message: 'Pet Breed is required' }]}>
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
                                    { value: true, label: 'YES' },
                                    { value: false, label: 'NO' },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-x-5">
                        <Form.Item<FieldType> name="chipped" label="Chip Number" rules={[{ required: true }]}>
                            <Input size="large" placeholder="Enter Chip Number" />
                        </Form.Item>

                        <Form.Item<FieldType> name="vaccinated" label="Vaccinated" rules={[{ required: true }]}>
                            <Select
                                size="large"
                                placeholder="Select Vaccinated"
                                options={[
                                    { value: true, label: 'YES' },
                                    { value: false, label: 'NO' },
                                ]}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item<FieldType> name="pet_category" label="Category" rules={[{ required: true }]}>
                        <Select
                            size="large"
                            placeholder="Select category"
                            options={[
                                { value: 'cat', label: 'Cat' },
                                { value: 'dog', label: 'Dog' },
                                { value: 'both', label: 'Both' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item<FieldType> name="weight" label="Weight" rules={[{ required: true }]}>
                        <InputNumber min={0} className="!w-full" size="large" placeholder="Enter Pet Weight" addonAfter="kg" />
                    </Form.Item>

                    <Form.Item<FieldType> name="age" label="Age" rules={[{ required: true }]}>
                        <InputNumber min={0} className="!w-full" size="large" placeholder="Enter Pet Age" addonAfter="year" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            htmlType="submit"
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
            </div>
        </Modal>
    );
};
