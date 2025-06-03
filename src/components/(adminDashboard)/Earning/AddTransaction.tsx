import { Button, DatePicker, Divider, Form, FormProps, Input, InputNumber, Modal } from "antd";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
};

type FieldType = {
    name : string,
    amount : number,
    date : string
}

const AddTransaction = ({ open, setOpen }: TPropsType) => {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    return (

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
                        <InputNumber min={1} size="large" className="!w-full" defaultValue={1}  />
                    </Form.Item>

                    <Form.Item<FieldType> name="date" label={"Transaction Date"} rules={[{ required: true, message: "Date is required" }]}>
                        <DatePicker size="large" className="!w-full"  />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" size='large' htmlType="submit" block>Save</Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};


export default AddTransaction;