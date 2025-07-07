"use client";
import {
  Image,
  Input,
  Pagination,
  Popconfirm,
  Table,
  TableColumnsType,
  Tooltip,
} from "antd";

import UserDetails from "./UserDetails";
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { Eye, Search } from "lucide-react";
import { useAllusersQuery, useBlock_userMutation, useUnblock_userMutation } from "@/redux/api/users.api";
import { IUser } from "@/redux/types";
import moment from "moment";
import { toast } from "sonner";
import { MdBlockFlipped } from "react-icons/md";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
};

const UsersTable = () => {
  const [handleUnblockUpdate] = useUnblock_userMutation();
  const [handleBlockUpdate] = useBlock_userMutation();
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
  const { data, isLoading, isFetching } = useAllusersQuery(query)
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<IUser | null>(null)

  const columns: TableColumnsType<IUser> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1 + (page - 1) * limit
    },
    {
      title: "User Name",
      dataIndex: "first_name",
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <Image
            src={record?.profile_image || "/empty-user.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10 rounded-full"
          ></Image>
          <p>{text + " " + record?.last_name}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Phone number",
      dataIndex: "contact_number",
      render(value) {
        return value ?? "N/A"
      },
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="flex gap-2 ">
          <button onClick={() => {
            setUserDetails(record)
            setOpen(prev => !prev)
          }}>
            <Eye
              size={22}
              color="var(--color-text-color)"
            />
          </button>

          <Popconfirm
            title="Block the user"
            description={`Are you sure to ${record?.isActive ? "block" : "unblock"} this user?`}
            onConfirm={() => handleBlockUser(record?._id, !record?.isActive)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title={record?.isActive ? "Block" : "Unblock"}>
              <button>
                {record?.isActive ? <MdBlockFlipped size={22} color="green" /> : <CgUnblock size={22} color="#CD0335" />}
              </button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Block user handler
  const handleBlockUser = async (id: string, status: boolean) => {
    try {
      if (status) {
        await handleUnblockUpdate({ id: id }).unwrap();
      } else {
        await handleBlockUpdate({ id: id }).unwrap();
      }

      toast.success(`User ${status ? "unblock" : "block"} successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="  text-2xl text-text-color">Users</h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search Users..."
          prefix={<Search size={20} color="#000"></Search>}
          onChange={(e) => setSearchText(e.target.value)}
        ></Input>
      </div>
      <Table<IUser>
        columns={columns}
        dataSource={data?.data?.data}
        loading={isLoading || isFetching}
        pagination={false}
        footer={() =>
          <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
        }
        scroll={{ x: "max-content" }}
      ></Table>
      {
        userDetails && <UserDetails open={open} setOpen={setOpen} userDetails={userDetails} />
      }
    </div>
  );
};

export default UsersTable;
