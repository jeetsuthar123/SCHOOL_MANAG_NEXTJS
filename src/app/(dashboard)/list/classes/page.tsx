import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, classesData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type classes = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

const columns = [
  { header: "Class Name", accessor: "name" },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },
  { header: "Grade", accessor: "grade", className: "hidden md:table-cell" },
  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  { header: "Actions", accessor: "actions" },
];

const classesListPage = () => {
  const renderRow = (item: classes) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-appPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.grade}</td>
      <td className="hidden md:table-cell">{item.supervisor}</td>
      <td>
        <div>
          <Link
            href={`/list/classes/${item.id}`}
            className="flex items-center gap-2 "
          >
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appSky">
              <Image src={"/view.png"} alt="" width={16} height={16} />
            </button>
            {role === "admin" && (
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appPurple">
                <Image src={"/delete.png"} alt="" width={16} height={16} />
              </button>
            )}
          </Link>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex flex-1 items-center justify-between p-4">
        <h1 className="hidden md:block text-lg font-semibold">All classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
              <Image src={"/filter.png"} alt="" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
              <Image src={"/sort.png"} alt="" width={20} height={20} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
              <Image src={"/plus.png"} alt="" width={20} height={20} />
            </button>
          </div>
        </div>
      </div>
      <Table columns={columns} data={classesData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};

export default classesListPage;
