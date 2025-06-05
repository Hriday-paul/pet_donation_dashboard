"use client";
import { Avatar, Badge, Flex, Popover } from "antd";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import avatarImg from "@/assets/image/profile.png";

import Link from "next/link";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { MdLogout } from "react-icons/md";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  return (
    <div className="flex items-center justify-between w-[97%] font-poppins pl-5">
      {/* Header left side */}
      <Flex align="center" gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className="cursor-pointer hover:bg-gray-300 rounded-full duration-1000"
        >
          <FaBars size={28} />
        </button>
        <div className="flex flex-col ">
          <h2 className="md:text-2xl text-lg  font-medium">
            Welcome, Mantas
            <span className="block  text-sm font-normal">Have a nice day!</span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>
        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center bg-[#eceef1] items-center size-12 rounded-full cursor-pointer relative">
            {/* <IoNotificationsOutline size={24} color="#3A3C3B" /> */}
            <Bell size={24} color="#3A3C3B" />

            <Badge
              count={1}
              style={{
                border: "none",
                boxShadow: "none",
                backgroundColor: "var(--color-main)",
                color: "#fff",
                position: "absolute",
                top: "-24px",
                right: "-8px",
              }}
            ></Badge>
          </div>
        </Link>

        <Popover arrow={false} placement="topRight" content={<div className="w-40">

          <Link href={'/personal-information'} className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium hover:bg-slate-50 duration-200" >
            <User size={20} />
            <span className={`ml-3 transition-opacity duration-200`}>
              Profile
            </span>
          </Link>

          <Link href={'/login'} className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium hover:bg-slate-50 duration-200" >
            <LogOut size={20} />
            <span className={`ml-3 transition-opacity duration-200 text-red-500`}>
              Logout
            </span>
          </Link>

        </div>} trigger={"click"}>


          <div className="p-1 border border-stroke rounded-full flex flex-row gap-x-3 items-center cursor-pointer">
            <ChevronDown size={20} className="text-text-color ml-2" />
            <h2 className="text-black text-base font-medium">Mr. Paul</h2>
            <Avatar
              src={avatarImg.src}
              size={40}
              className="border border-main-color size-12"
            ></Avatar>
          </div>

        </Popover>

      </Flex>
    </div>
  );
};

export default Navbar;
