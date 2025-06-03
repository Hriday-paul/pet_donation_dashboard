import { Popconfirm, Table, TableColumnsType } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type TDataType = {
    key?: number;
    serial: number;
    name: string;
    amount: number;
    date: string;
    type: string;
};

const data: TDataType[] = Array.from({ length: 20 }).map((data, inx) => ({
    key: inx,
    serial: inx + 1,
    name: "James Tracy",
    amount: 100,
    type: "User",
    date: "11 April 2025, 11:10 PM",
}));

const TransactionTable = () => {

    const [open, setOpen] = useState(false);

    const handleDeleteTransation = () => {
        toast.success("Transaction deleted successfully.")
    }

    const columns: TableColumnsType<TDataType> = [
        {
            title: "#Tr.ID",
            dataIndex: "serial",
            render: (_, __, indx) => `#${indx + 1}`
        },
        {
            title: "Full Name",
            dataIndex: "name",
            render: (text, record) => (
                <div className="flex items-center gap-x-1">
                    <Image
                        src={"/user-profile.png"}
                        alt="profile-picture"
                        width={40}
                        height={40}
                    ></Image>
                    <p>{text}</p>
                </div>
            ),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (value) => "$" + value
        },

        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Action",
            dataIndex: "action",
            render: () => <div className='flex flex-row gap-5 items-center'>
                <button onClick={() => setOpen(true)}><Eye /></button>
                <Popconfirm
                    title="Delete the transaction"
                    description="Are you sure to delete this transaction?"
                    onConfirm={handleDeleteTransation}
                    okText="Yes"
                    cancelText="No"
                >
                    <button><Trash2 color='red' /></button>
                </Popconfirm>

            </div>
        },
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 8 }}
                scroll={{ x: "max-content" }}
            />
            <TransactionDetails open={open} setOpen={setOpen} />
        </div>
    );
};

export default TransactionTable;