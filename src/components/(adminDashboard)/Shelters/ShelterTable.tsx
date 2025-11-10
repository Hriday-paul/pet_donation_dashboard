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
import { useState } from "react";
import { CgUnblock } from "react-icons/cg";
import { Eye, Search, Trash2 } from "lucide-react";
import ShelterDetails from "./ShelterDetails";
import { useAllsheltersQuery, useBlock_userMutation, useDeleteShelterMutation, useUnblock_userMutation } from "@/redux/api/users.api";
import { IUser } from "@/redux/types";
import { toast } from "sonner";
import moment from "moment";
import { MdBlockFlipped } from "react-icons/md";

const ShelterTable = () => {

  const [page, setPage] = useState(1);
  const limit = 10
  const [searchText, setSearchText] = useState("");
  const query: { page: number, limit: number, searchTerm: string } = { page, limit, searchTerm: searchText };

  const { isLoading, isFetching, data } = useAllsheltersQuery(query);

  const [handleUnblockUpdate] = useUnblock_userMutation();
  const [handleBlockUpdate] = useBlock_userMutation();
  const [handleDeleteShalter] = useDeleteShelterMutation();


  const [open, setOpen] = useState(false);

  const [userDetails, setUserDetails] = useState<IUser | null>(null)

  const columns: TableColumnsType<IUser> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1 + (page - 1) * limit
    },
    {
      title: "Shelter Name",
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
            title="Block the shelter"
            description={`Are you sure to ${record?.isActive ? "block" : "unblock"} this shelter?`}
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
          <Popconfirm
            title="Delete the shelter"
            description={`After delete you can not restore the shelter`}
            onConfirm={() => handleDeleteShelter(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title={"Delete"}>
              <button>
                {<Trash2 size={22} color="#CD0335" />}
              </button>
            </Tooltip>
          </Popconfirm>

        </div>
      ),
    },
  ];

  const handleBlockUser = async (id: string, status: boolean) => {
    try {
      if (status) {
        await handleUnblockUpdate({ id: id }).unwrap();
      } else {
        await handleBlockUpdate({ id: id }).unwrap();
      }

      toast.success(`Shelter ${status ? "unblock" : "block"} successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  };
  const handleDeleteShelter = async (id: string) => {
    try {

      await handleDeleteShalter({ id: id }).unwrap();

      toast.success(`Shelter deleted successfully`)

    } catch (err: any) {
      toast.error(err?.data?.message || "something went wrong, try again")
    }
  };

  return (
    <div className="rounded-md">
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl text-text-color">Shelter</h1>
        <Input
          className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
          placeholder="Search Users..."
          prefix={<Search size={20} color="#000"></Search>}
          onChange={(e) => setSearchText(e?.target?.value)}
        ></Input>
      </div>
      <Table<IUser>
        columns={columns}
        dataSource={data?.data?.data}
        loading={isLoading || isFetching}
        rowKey={(record) => record?._id}
        pagination={false}
        footer={() =>
          <Pagination defaultCurrent={page} total={data?.data?.meta?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={(page) => setPage(page)} />
        }
        scroll={{ x: "max-content" }}
      ></Table>
      {userDetails && <ShelterDetails open={open} setOpen={setOpen} userDetails={userDetails} />}
    </div>
  );
};

export default ShelterTable;
