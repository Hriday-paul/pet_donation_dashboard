"use client";
import { Image, TableProps } from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { ArrowDownWideNarrowIcon, Eye } from "lucide-react";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  type: string;
  status: string
};
const data: TDataType[] = Array.from({ length: 5 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "James Tracy",
  email: "james1234@gmail.comm",
  type: "User",
  date: "11 April 2025, 10:22 AM",
  status: "Pendng"
}));

const LatestUser = () => {
  const [open, setOpen] = useState(false);

  const columns: TableProps<TDataType>["columns"] = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (_, __, indx) => `#${indx + 1}`
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text) => (
        <div className="flex items-center gap-x-1">
          <p>{text}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        {
          text: "Pending",
          value: "Pendng",
        },
        {
          text: "Approved",
          value: "Approved",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      filterIcon: () => (
        <ArrowDownWideNarrowIcon
          className="flex justify-start items-start"
          color="#fff"
        />
      ),
      onFilter: (value, record) => record.status == value,
    },

    {
      title: "Join Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => <button onClick={() => setOpen(true)}><Eye /></button>
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default LatestUser;
