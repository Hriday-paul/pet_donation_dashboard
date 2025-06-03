"use client";
import Image from "next/image";
import userIcon from "@/assets/icons/user-group.png";
import ShelterTable from "./ShelterTable";

const SheltersContainer = () => {
  return (
    <div>
      

      {/* users table */}
      <ShelterTable></ShelterTable>
    </div>
  );
};

export default SheltersContainer;
