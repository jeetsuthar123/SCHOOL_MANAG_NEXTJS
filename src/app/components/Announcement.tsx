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
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>
    </div>
  );
};

export default Announcement;
