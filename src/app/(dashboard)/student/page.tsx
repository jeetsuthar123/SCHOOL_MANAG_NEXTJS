"use client";
import Announcement from "@/app/components/Announcement";
import BigCalendar from "@/app/components/BigCalender";
import CountChart from "@/app/components/CountChart";
import EventCalender from "@/app/components/EventCalender";

import "react-big-calendar/lib/css/react-big-calendar.css";

const StudentPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-2 bg-white rounded-xl p-4">
        <span className="text-xl font-semibold">Schedule (4A)</span>
        <BigCalendar />
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-6">
        {/* EVENT CALENDER */}
        <EventCalender />
        <Announcement />
      </div>
    </div>
  );
};

export default StudentPage;
