import { RiDashboardHorizontalFill } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import Link from "next/link";
import { PiListPlusFill } from "react-icons/pi";
import { MessagesSquare, ScanQrCode, TextSelect, UsersRound, Wallet } from "lucide-react";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
  },
  {
    key: "earnings",
    icon: <Wallet size={18} />,
    label: <Link href={"/admin/earnings"}> Earnings</Link>,
  },
  {
    key: "banners",
    icon: <ScanQrCode size={18} />,
    label: <Link href={"/admin/banners"}>Banners</Link>,
  },
  {
    key: "services",
    icon: <TextSelect size={18} />,
    label: <Link href={"/admin/services"}>Service Category</Link>,
  },
  {
    key: "users",
    icon: <PiListPlusFill size={18} />,
    label: <Link href={"/admin/users"}>Users</Link>,
  },
  {
    key: "shelters",
    icon: <UsersRound size={20} />,
    label: <Link href={"/admin/shelters"}>Shelters</Link>,
  },

  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/admin/settings"}>Settings</Link>,
  },
  // {
  //   key: "logout",
  //   icon: <RiLogoutCircleLine size={18} />,
  //   label: <Link href={"/login"}>Logout</Link>,
  // },
];


export const ShelterNavLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/shelter/dashboard"}>Dashboard</Link>,
  },
  {
    key: "pets",
    icon: <TextSelect size={18} />,
    label: <Link href={"/shelter/pets"}>Pet Listing</Link>,
  },
  {
    key: "survey-ques",
    icon: <MessagesSquare size={18} />,
    label: <Link href={"/shelter/survey-ques"}>Set Survey Question</Link>,
  },
  {
    key: "surveys",
    icon: <PiListPlusFill size={18} />,
    label: <Link href={"/shelter/surveys"}>Submited Surveys</Link>,
  },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/shelter/settings"}>Settings</Link>,
  },
];