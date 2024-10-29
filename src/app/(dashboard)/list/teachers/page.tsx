import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import prisma from "@/lib/prisma";
import { Class, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type TeacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const columns = [
  { header: "Info", accessor: "info" },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subject",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  { header: "Classes", accessor: "classes", className: "hidden md:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden md:table-cell" },
  { header: "Address", accessor: "address", className: "hidden md:table-cell" },
  { header: "Actions", accessor: "actions" },
];

const renderRow = (item: TeacherList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-appPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">
      <Image
        src={item.img || "/noAvatar.png"}
        alt=""
        width={40}
        height={40}
        className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">{item.address}</p>
      </div>
    </td>
    <td className="hidden md:table-cell">{item.name}</td>
    <td className="hidden md:table-cell">
      {item.subjects.map((s) => s.name).join(",")}
    </td>
    <td className="hidden md:table-cell">
      {item.classes.map((c) => c.name).join(",")}
    </td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>
    <td>
      <div className="flex items-center gap-2 ">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appSky">
            <Image src={"/view.png"} alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appPurple">
          //   <Image src={"/delete.png"} alt="" width={16} height={16} />
          // </button>
          <FormModal table="teacher" type="delete" id={item.id} />
        )}
      </div>
    </td>
  </tr>
);

const TeacherListPage = async () => {
  const data = await prisma.teacher.findMany({
    include: {
      subjects: true,
      classes: true,
    },
    take: 10,
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex flex-1 items-center justify-between p-4">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
              <Image src={"/filter.png"} alt="" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
              <Image src={"/sort.png"} alt="" width={20} height={20} />
            </button>
            {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
              <Image src={"/plus.png"} alt="" width={20} height={20} />
            </button> */}
            <FormModal table="teacher" type="create" />
          </div>
        </div>
      </div>
      <Table columns={columns} data={data} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};

export default TeacherListPage;
