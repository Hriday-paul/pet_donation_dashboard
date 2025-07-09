"use client";
import { Image, Table, TableColumnsType, TableProps } from "antd";

import { useState } from "react";
import DataTable from "@/utils/DataTable";
import { ArrowDownWideNarrowIcon, Eye } from "lucide-react";
import Link from "next/link";
import { ISurveyAnswers } from "@/redux/types";
import moment from "moment";
import { useSurveyAnswersQuery } from "@/redux/api/survey.api";

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

  const { isLoading, data, isFetching } = useSurveyAnswersQuery({});

  const columns: TableColumnsType<ISurveyAnswers> = [
    {
      title: "Serial",
      dataIndex: "serial",
      render: (_, __, indx) => `#${indx + 1}`
    },
    {
      title: "Pet",
      dataIndex: ["adopted_pet", "full_name"],
    },
    {
      title: "Adopter Name",
      dataIndex: ["adopter", "first_name"],
      render: (text, record) => (
        <div className="flex items-center gap-x-1">
          <p>{text} {record?.adopter?.last_name}</p>
        </div>
      ),
    },
    {
      title: "Adopter Email",
      dataIndex: ["adopter", "email"],
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   filters: [
    //     {
    //       text: "Pending",
    //       value: "Pendng",
    //     },
    //     {
    //       text: "Approved",
    //       value: "Approved",
    //     },
    //     {
    //       text: "Rejected",
    //       value: "Rejected",
    //     },
    //   ],
    //   filterIcon: () => (
    //     <ArrowDownWideNarrowIcon
    //       className="flex justify-start items-start"
    //       color="#fff"
    //     />
    //   ),
    //   onFilter: (value, record) => record.status == value,
    // },

    {
      title: "Requested Date",
      dataIndex: "createdAt",
      render: (value) => moment(value).format("MMMM Do YYYY, h:mm a"),
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (v) => <Link href={`/shelter/survey-ques/${v}`}><Eye /></Link>
    },
  ];

  return (
    <div className="bg-section-bg rounded-md">
      <Table<ISurveyAnswers>
        columns={columns}
        dataSource={data?.data?.data}
        loading={isLoading || isFetching}
        pagination={false}
        rowKey={(record) => record?._id}
        scroll={{ x: "max-content" }}
      ></Table>
    </div>
  );
};

export default LatestUser;
