"use client";
import { Users } from "lucide-react";
import { useState } from "react";

const Statistic = () => {
  const [selectedMonth, setSelectedMonth] = useState("Apr");

  const handleMonthChange = (value: string) => {
    setSelectedMonth(value);
  };

  return (
    <div className="flex justify-between items-center gap-5 flex-wrap text-text-color ">
      {/* ====================================== Total User ========================================== */}

      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-main-color text-lg font-medium">Total User</span>
            <span className="text-main-color text-3xl font-semibold">5,021</span>
          </div>
        </div>
      </div>


      {/* ====================================== Total Vendor ========================================== */}
      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-[#3D5473] rounded-full p-4 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#3D5473] text-lg font-medium">Total Shelter</span>
            <span className="text-[#3D5473] text-3xl font-semibold">1,024</span>
          </div>
        </div>
      </div>

      {/* ====================================== Total Vendor ========================================== */}
      <div className="bg-section-bg rounded-3xl border border-stroke p-8 flex-1">
        <div className="flex items-center gap-4">
          <div className="bg-main-color rounded-full p-4 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-main-color text-lg font-medium">Total User</span>
            <span className="text-main-color text-3xl font-semibold">5,021</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
