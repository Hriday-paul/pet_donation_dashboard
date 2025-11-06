"use client";
import { Image, Table, TableColumnsType, TableProps } from "antd";
import { useAllusersQuery } from "@/redux/api/users.api";
import { IUser } from "@/redux/types";
import moment from "moment";


const LatestUser = () => {
  const { isLoading, isFetching, data } = useAllusersQuery({ limit: 10 })

  const columns: TableColumnsType<IUser> = [
    {
      title: "#SL",
      dataIndex: "serial",
      render: (_, __, indx) => indx + 1
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
    }
  ];

  return (
    <div>
      <h2 className="text-text-color text-xl pb-4">Recent Joined User</h2>
      <div className="bg-section-bg rounded-md">
        <Table<IUser>
          columns={columns}
          dataSource={data?.data?.data}
          loading={isLoading || isFetching}
          pagination={false}
          rowKey={(record) => record?._id}
          scroll={{ x: "max-content" }}
        ></Table>
      </div>
    </div>
  );
};

export default LatestUser;
