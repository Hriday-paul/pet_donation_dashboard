"use client";
import Image from "next/image";
import userProfile from "@/assets/image/userImage.png";
import { Button, message, Popconfirm, PopconfirmProps } from "antd";
import { useState } from "react";
import UserModal from "./UserModal";

type TProps = {
  name: string;
  type: string;
};

const UserRequestCard = ({ data }: { data: TProps }) => {
  const [open, setOpen] = useState(false);
  const confirm: PopconfirmProps["onConfirm"] = (e) => {
    message.success("Successfully blocked this user");
  };
  return (
    <div className="bg-main-color-bg p-4 flex gap-x-3  text-text-color rounded-md">
      <Image
        src={userProfile}
        alt="profile_image"
        className="size-20 cursor-pointer rounded-full"
        onClick={() => setOpen(true)}
      ></Image>
      <div className="space-y-2 ">
        <h3
          className="text-xl font-bold cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {data?.name}
        </h3>
        <p>
          Account Type: <span className="font-medium">{data?.type}</span>
        </p>

        <div className="flex gap-x-5">
          <Button className="bg-main-colo !border-none  !rounded-none !rounded-tl-xl  !rounded-br-xl !px-5">
            Accept
          </Button>

          <Popconfirm
            title="Delete Request"
            description="Are you sure to delete this request?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button className="!bg-primary-red !border-none   !rounded-none !rounded-tl-xl  !rounded-br-xl !px-5">
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      <UserModal open={open} setOpen={setOpen}></UserModal>
    </div>
  );
};

export default UserRequestCard;
