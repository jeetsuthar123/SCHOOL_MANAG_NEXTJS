"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 70,
    absent: 30,
  },
  {
    name: "Tue",
    present: 60,
    absent: 40,
  },
  {
    name: "Wed",
    present: 40,
    absent: 60,
  },
  {
    name: "Thu",
    present: 80,
    absent: 20,
  },
  {
    name: "Fri",
    present: 10,
    absent: 90,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-xl p-4 w-full h-full">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[95%]">
        <ResponsiveContainer>
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#d1d5db" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#d1d5db" }}
            />
            <Tooltip
              contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "20px" }}
            />
            <Bar
              dataKey="absent"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
              barSize={20}
              radius={[10, 10, 0, 0]}
            />
            <Bar
              dataKey="present"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
              barSize={20}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
