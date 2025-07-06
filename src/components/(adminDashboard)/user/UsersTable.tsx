"use client";
import {
  Image,
  Input,
  message,
  Pagination,
  Popconfirm,
  PopconfirmProps,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import UserDetails from "./UserDetails";
import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { CgUnblock } from "react-icons/cg";
import { Eye, Search } from "lucide-react";
import { useAllusersQuery, useBlock_unblock_userMutation } from "@/redux/api/users.api";
import { IUser } from "@/redux/types";
import moment from "moment";
import { toast } from "sonner";

type TDataType = {
  key?: number;
  serial: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  type: string;
};
const data: TDataType[] = Array.from({ length: 18 }).map((data, inx) => ({
  key: inx,
  serial: inx + 1,
  name: "James Tracy",
  email: "james1234@gmail.comm",
  phone: "12345678",
  date: "11 Oct, 2024",
  type: "User",
}));

const confirmBlock: PopconfirmProps["onConfirm"] = (e) => {
  console.log(e);
  message.success("Blocked the user");
};

const UsersTable = () => {
  const [handleUpdate] = useBlock_unblock_userMutation();
  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };
  const { data, isLoading, isFetching } = useAllusersQuery(query)
  const [open, setOpen] = useState(false);

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
          {/* <Image
            src={record?."/user-profile.png"}
            alt="profile-picture"
            width={40}
            height={40}
            className="size-10"
          ></Image> */}
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
      dataIndex: "phone",
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
          <button onClick={() => setOpen(!open)}>
            <Eye
              size={22}
              color="var(--color-text-color)"
            />
          </button>

          <Popconfirm
            title="Block the user"
            description="Are you sure to block this user?"
            onConfirm={() => handleBlockUser(record?._id, !record?.isActive)}
            okText="Yes"
            cancelText="No"
          >
            <button>
              <CgUnblock size={22} color="#CD0335" />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Block user handler
  const handleBlockUser = async (id: string, status: boolean) => {
    const loadingToast = toast.loading("loading...")
    try {
      const res = await handleUpdate({ id: id, updatedData: { isActive: status } }).unwrap();

      toast.success(`User ${status ? "block" : "unblock"} successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    } finally {
      toast.dismiss(loadingToast)
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
      <UserDetails open={open} setOpen={setOpen}></UserDetails>
    </div>
  );
};

export default UsersTable;
