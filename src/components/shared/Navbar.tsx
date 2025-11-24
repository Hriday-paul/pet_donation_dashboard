"use client";
import { Avatar, Badge, Flex, Popover } from "antd";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useGetUserProfileQuery } from "@/redux/api/auth.api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails, removeUser } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { LanguageSwitcher } from "@/utils/LanguageSwitcher";
import { HandleLogoutServer } from "@/utils/ServerEffect";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {

  const { data: res, isSuccess, isError } = useGetUserProfileQuery();
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(addUserDetails({ name: res?.data?.first_name, role: res?.data?.role, profilePicture: res?.data?.profile_image || "/empty-user.png", location: res?.data?.location || null, coordinates: res?.data?.address?.coordinates || [] }));
    }
    if (isError) {
      dispatch(removeUser())
      router.push("/login")
    }
  }, [isError, router, isSuccess, res])

  const { user } = useSelector((state: RootState) => state.userSlice);

  const handleLogout = async() => {
    dispatch(removeUser())
    await HandleLogoutServer();
  };

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
            Welcome, {user?.name}
            <span className="block  text-sm font-normal">Have a nice day!</span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align="center" gap={20}>

        <LanguageSwitcher />

        {/* Notification */}
        <Link href={"/notifications"}>
          <div className="flex justify-center bg-[#eceef1] items-center size-12 rounded-full cursor-pointer relative">
            {/* <IoNotificationsOutline size={24} color="#3A3C3B" /> */}
            <Bell size={24} color="#3A3C3B" />

            <Badge
              count={0}
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

          <button onClick={handleLogout} className="w-full flex items-center px-3 py-2 mt-1 text-sm font-medium hover:bg-slate-50 duration-200" >
            <LogOut size={20} />
            <span className={`ml-3 transition-opacity duration-200 text-red-500`}>
              Logout
            </span>
          </button>

        </div>} trigger={"click"}>


          <div className="p-1 border border-stroke rounded-full flex flex-row gap-x-3 items-center cursor-pointer">
            <ChevronDown size={20} className="text-text-color ml-2" />
            <h2 className="text-black text-base font-medium">{user?.name}</h2>
            <Avatar
              src={user?.profilePicture}
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
