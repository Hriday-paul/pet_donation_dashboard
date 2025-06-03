"use client";
import { Image, TableProps } from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import UserDetails from "../user/UserDetails";
import { Eye } from "lucide-react";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  date: string;
  type: string;
};
const data: TDataType[] = Array.from({ length: 5 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "James Tracy",
  email: "james1234@gmail.comm",
  type: "User",
  date: "11 April 2025, 10:22 AM",
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
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Join Date",
      dataIndex: "date",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => <button onClick={()=>setOpen(true)}><Eye /></button>
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <DataTable columns={columns} data={data}></DataTable>
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default LatestUser;
