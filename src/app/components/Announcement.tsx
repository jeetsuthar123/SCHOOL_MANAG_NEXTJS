import Image from "next/image";

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

const Announcement = () => {
  return (
    <div className="bg-white rounded-xl p-4 w-full h-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Announcements</h1>
        <span className="text-xs text-gray-300 ">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {events.map((event) => (
          <div
            className="odd:bg-appSkyLight  even : bg-appYellowLight p-3 rounded-md "
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs p-1 rounded-md bg-white">
                {event.time}
              </span>
            </div>
            <p className="text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
