import { useAddEarningMutation } from "@/redux/api/earning.api";
import { Button, DatePicker, Form, FormProps, Input, InputNumber, Modal } from "antd";
import { useState } from "react";
import { ImSpinner3 } from "react-icons/im";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

type FieldType = {
    name: string,
    amount: number,
    date: string
}

const AddTransaction = () => {

    const [handleAddTransaction, { isLoading }] = useAddEarningMutation();
    const [open, setOpen] = useState(false)

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await handleAddTransaction({ amount: Number(values?.amount), clientName: values?.name, transactionDate: values?.date }).unwrap();
            toast.success("Transaction added successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    return (

        <>
            <Button onClick={() => setOpen(true)} type='primary' size='large'>Add Transaction</Button>

            <Modal
                open={open}
                footer={null}
                centered={true}
                onCancel={() => setOpen(false)}
                closeIcon={false}>

                <div className="pb-5">

                    <div className="flex justify-end items-center">
                        <div
                            className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                            onClick={() => setOpen(false)}
                        >
                            <RiCloseLargeLine size={18} color="#fff" className="" />
                        </div>
                    </div>

                    <h4 className="text-center text-xl font-medium">Add Transaction</h4>

                    <Form
                        name="basic"
                        style={{ width: '100%' }}
                        initialValues={{}}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >

                        <Form.Item<FieldType> name="name" label={"Client Name"} rules={[{ required: true, message: "Client name is required" }]}>
                            <Input size="large" placeholder="Client Name" />
                        </Form.Item>

                        <Form.Item<FieldType> name="amount" label={"Amount"} rules={[{ required: true, message: "Amount is required" }]}>
                            <InputNumber min={1} size="large" className="!w-full" defaultValue={1} />
                        </Form.Item>

                        <Form.Item<FieldType> name="date" label={"Transaction Date"} rules={[{ required: true, message: "Date is required" }]}>
                            <DatePicker size="large" className="!w-full" />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" type="primary" size="large" block disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                                Save
                            </Button>
                        </Form.Item>

                    </Form>
                    
                </div>
            </Modal>
        </>
    );
};


export default AddTransaction;