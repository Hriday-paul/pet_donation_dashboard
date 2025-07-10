"use client";
import { useShelterStatsQuery } from "@/redux/api/dashboard.api";
import ErrorComponent from "@/utils/ErrorComponent";
import { Loader, PawPrint, Users } from "lucide-react";
import { useState } from "react";

const Statistic = () => {

  const { isLoading, data, isError } = useShelterStatsQuery({});

  if (isError) return <ErrorComponent />

  return (
    <div className="flex justify-between items-center gap-5 flex-wrap text-text-color ">

      {/* ====================================== Total Pet ========================================== */}
      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-main-color text-lg font-medium">Total Pets</span>
            {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <span className="text-main-color text-3xl font-semibold">{data?.data?.totalPet}</span>}
          </div>
        </div>
      </div>


      {/* ====================================== Total Donated pet ========================================== */}
      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-[#3D5473] rounded-full p-4 flex items-center justify-center">
            <PawPrint className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#3D5473] text-lg font-medium">Total Pet Donated</span>
            {isLoading ? <Loader size={25} className='text-main-color animate-spin' /> : <span className="text-main-color text-3xl font-semibold">{data?.data?.totalPetDonations}</span>}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistic;
