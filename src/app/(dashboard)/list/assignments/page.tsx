import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import { role, assignmentsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type assignments = {
  id: number;
  subject: string;
  class: number;
  teacher: string;
  dueDate: string;
};

const columns = [
  { header: "Subject", accessor: "subject" },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
  {
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },

  { header: "Actions", accessor: "actions" },
];

const assignmentsListPage = () => {
  const renderRow = (item: assignments) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-appPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.subject}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.teacher}</td>
      <td className="hidden md:table-cell">{item.dueDate}</td>

      <td>
        <div className="flex items-center gap-2 ">
          <Link href={`/list/assignments/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appSky">
              <Image src={"/view.png"} alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appPurple">
            //   <Image src={"/delete.png"} alt="" width={16} height={16} />
            // </button>
            <FormModal table="assignment" type="delete" id={item.id} />
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex flex-1 items-center justify-between p-4">
        <h1 className="hidden md:block text-lg font-semibold">
          All assignments
        </h1>
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
            <FormModal table="assignment" type="create" />
          </div>
        </div>
      </div>
      <Table columns={columns} data={assignmentsData} renderRow={renderRow} />
      <Pagination />
    </div>
  );
};

export default assignmentsListPage;
