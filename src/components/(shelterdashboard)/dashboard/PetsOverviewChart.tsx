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
import { useShelterTotalPetChartQuery } from "@/redux/api/dashboard.api";
import ErrorComponent from "@/utils/ErrorComponent";
import { IMonth } from "@/redux/types";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => {
  const year = currentYear - i;
  return { value: year.toString(), label: year.toString() };
});

const PetsOverviewChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { isError, data } = useShelterTotalPetChartQuery({ "year": selectedYear }, { refetchOnMountOrArgChange: true });

  const handleChange = (value: number) => {
    setSelectedYear(value);
  };

  if (isError) return <ErrorComponent />

  const realdata: { name: string, pets: number }[] = [];

  const monthlyData = data?.data?.monthlyPostPet;

  for (let i in monthlyData) {
    const month = i as keyof IMonth;
    realdata.push({ name: month.substring(0, 3), pets: monthlyData[month] })
  }

  return (
    <div className="bg-secondary-color border border-stroke rounded-3xl p-8 ">
      <div className="text-text-color flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl text-black font-medium">Pets Overview</h1>

        <Select
          value={selectedYear}
          style={{ width: 120 }}
          onChange={handleChange}
          options={years}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={realdata}
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
            dataKey="pets"
            strokeWidth={0}
            stroke="#080E0E"
            fill="url(#color)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PetsOverviewChart;
