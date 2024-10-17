"use client";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  {
    id: 1,
    title: "Books",
    time: "12AM TO 2PM",
    description: "This related to books",
  },
  {
    id: 2,
    title: "Books",
    time: "12AM TO 2PM",
    description: "This related to books",
  },
  {
    id: 3,
    title: "Books",
    time: "12AM TO 2PM",
    description: "This related to books",
  },
  {
    id: 4,
    title: "Books",
    time: "12AM TO 2PM",
    description: "This related to books",
  },
];

const EventCalender = () => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white rounded-xl p-4 w-full h-auto">
      <Calendar onChange={onChange} value={value} />
      {/* EVENTS */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Events</h1>
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <div
            className="p-3 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-appSky even:border-t-appPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalender;
