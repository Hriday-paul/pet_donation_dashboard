"use client";
import ChangePasswordModal from "@/components/(adminDashboard)/(setting)/changePassword/ChangePasswordModal";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const links = [
  {
    lable: "Personal Information",
    path: "personal-information",
  },
  {
    lable: "Change Password",
    path: "changePassword",
  },
  {
    lable: "Terms & Condition",
    path: "admin/terms-condition",
  },
  {
    lable: "Privacy Policy",
    path: "admin/privacy-policy",
  },
  {
    lable: "About Us",
    path: "admin/about-us",
  },
];

const SettingContainer = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 gap-5">
      {links?.map((link, inx) => {
        if (link.path === "changePassword") {
          return (
            <div
              key={inx}
              onClick={() => setOpen(!open)}
              className="bg-white p-5 rounded flex justify-between items-center cursor-pointer shadow"
            >
              <h4 className="text-text-color font-medium text-lg">
                {link?.lable}
              </h4>
              <IoIosArrowForward size={18} color="#000000" />
            </div>
          );
        } else {
          return (
            <Link key={link.path} href={`/${link.path}`}>
              <div className="bg-white p-5 rounded flex justify-between items-center shadow">
                <h4 className="text-text-color font-medium text-lg">
                  {link?.lable}
                </h4>
                <IoIosArrowForward size={18} color="#000000" />
              </div>
            </Link>
          );
        }
      })}
      <ChangePasswordModal open={open} setOpen={setOpen}></ChangePasswordModal>
    </div>
  );
};

export default SettingContainer;
