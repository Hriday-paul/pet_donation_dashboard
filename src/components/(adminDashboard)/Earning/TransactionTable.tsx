import { Pagination, Popconfirm, Table, TableColumnsType } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import { Eye, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useDeleteEarningMutation, useEarningListQuery } from '@/redux/api/earning.api';
import { IEarning } from '@/redux/types';
import moment from 'moment';

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

    const [handleDeletApi] = useDeleteEarningMutation()
    const [page, setPage] = useState(1);
    const limit = 10
    const query: { page: number, limit: number } = { page, limit };

    const { isLoading, isFetching, data } = useEarningListQuery(query)

    const [open, setOpen] = useState(false);
    const [earningDetails, setearningdetials] = useState<null | IEarning>(null)

    const handleDeleteTransation = async (id: string) => {
        try {
            await handleDeletApi(id).unwrap();
            toast.success("Transaction deleted successfully.")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    }

    const columns: TableColumnsType<IEarning> = [
        {
            title: "Serial",
            dataIndex: "serial",
            render: (_, __, indx) => indx + 1 + (page - 1) * limit
        },
        {
            title: "Client Name",
            dataIndex: "clientName",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            render: (value) => "$" + value
        },

        {
            title: "Transaction Date",
            dataIndex: "transactionDate",
            render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (_, record) => <div className='flex flex-row gap-5 items-center'>
                <button onClick={() => {
                    setearningdetials(record)
                    setOpen(true)
                }}><Eye /></button>
                <Popconfirm
                    title="Delete the transaction"
                    description="Are you sure to delete this transaction?"
                    onConfirm={() => handleDeleteTransation(record?._id)}
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
                dataSource={data?.data?.data}
                loading={isLoading || isFetching}
                pagination={false}
                rowKey={(record) => record?._id}
                footer={() =>
                    <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
                }
                scroll={{ x: "max-content" }}
            />
            {earningDetails && <TransactionDetails open={open} setOpen={setOpen} details={earningDetails} />}
        </div>
    );
};

export default TransactionTable;