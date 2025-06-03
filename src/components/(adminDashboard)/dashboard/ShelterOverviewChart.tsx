"use client";
import { Select } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useState } from "react";

const data = [
  { name: "Jan", shelters: 150 },
  { name: "Feb", shelters: 1502 },
  { name: "Mar", shelters: 800 },
  { name: "Apr", shelters: 822 },
  { name: "May", shelters: 1553 },
  { name: "Jun", shelters: 1634 },
  { name: "Jul", shelters: 1600 },
  { name: "Aug", shelters: 1324 },
  { name: "Sep", shelters: 1440 },
  { name: "Oct", shelters: 1256 },
  { name: "Nov", shelters: 1935 },
  { name: "Dec", shelters: 1000 },
];

const ShelterOverviewChart = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedUserType, setSelectedUserType] = useState("user");

  const handleChange = (value: string) => {
    setSelectedYear(value);
  };
  const handleUserChange = (value: string) => {
    setSelectedUserType(value);
  };

  return (
    <div className="bg-secondary-color border border-stroke rounded-3xl p-8 ">
      <div className="text-text-color flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl text-black font-medium">Shelter Overview</h1>

        <Select
          value={selectedYear}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "2025", label: "2025" },
            { value: "2026", label: "2026" },
            { value: "2027", label: "2027" },
            { value: "2028", label: "2028" },
            { value: "2029", label: "2029" },
            { value: "2030", label: "2030" },
          ]}
        />

      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="var(--color-main)" stopOpacity={1} />
              <stop offset="100%" stopColor="#e3f4f4" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            color="#fff"
            dataKey="name"
            tick={{ fill: "var(--color-text-color)" }}
          />
          <YAxis
            tickMargin={20}
            axisLine={false}
            tickLine={false}
            color="#fff"
            tick={{ fill: "var(--color-text-color)" }}
          />
          <Tooltip />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Area
            activeDot={false}
            type="monotone"
            dataKey="shelters"
            strokeWidth={0}
            stroke="#080E0E"
            fill="#95bed7"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShelterOverviewChart;
