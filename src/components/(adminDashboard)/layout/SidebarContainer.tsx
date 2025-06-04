"use client";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { navLinks as adminNavlinks, ShelterNavLinks } from "@/utils/navLinks";
import { usePathname } from "next/navigation";
import { IoLogInOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {

  const { user } = useSelector((state: RootState) => state.userSlice);

  const onClick: MenuProps["onClick"] = (e) => {

    if (e.key === "logout") {
      localStorage.removeItem("activeNav");
      return;
    }
    localStorage.setItem("activeNav", e.key);
  };

  const currentPathname = usePathname()?.replace(user?.role == "ADMIN" ? "/admin/" : "/shelter/", "")?.split(" ")[0];

  return (
    <Sider
      width={280}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        paddingInline: `${collapsed ? "5px" : "10px"}`,
        backgroundColor: "var(--color-secondary)",
        maxHeight: "100vh",
        overflow: "auto",
        borderRight: "1px solid #E2E8F0",
      }}
    >
      <div className="demo-logo-vertical" />
      {/* logo  */}
      <div className="mt-10 flex flex-col justify-center items-center gap-y-5">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo_Image"
            className={` ${collapsed ? "size-16" : "size-32"}`}
          />
        </Link>
        <h1
          className={`${collapsed ? "text-sm" : "text-xl"
            }   font-extrabold text-white`}
        ></h1>
      </div>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu text-lg space-y-4 !border-none"
        items={user?.role == "ADMIN" ? adminNavlinks : ShelterNavLinks}
      />

    </Sider>
  );
};

export default SidebarContainer;
