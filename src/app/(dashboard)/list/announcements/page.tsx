import FormModal from "@/app/components/FormModal";
import Pagination from "@/app/components/Pagination";
import Table from "@/app/components/Table";
import TableSearch from "@/app/components/TableSearch";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { string } from "zod";

type AnnouncementList = Announcement & { class: Class };

const announcementsListPage = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const { sessionClaims }: { sessionClaims: any | null } = await auth();
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITION
    const query: Prisma.AnnouncementWhereInput = {};

    const columns = [
        { header: "Title", accessor: "title" },
        {
            header: "Class",
            accessor: "class",
            className: "hidden md:table-cell",
        },
        {
            header: "Date",
            accessor: "date",
            className: "hidden md:table-cell",
        },
        ...(role === "admin"
            ? [{ header: "Actions", accessor: "actions" }]
            : []),
    ];

    // ROLE CONDITIONS

    const renderRow = (item: AnnouncementList) => (
        <tr
            key={item.id}
            className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-appPurpleLight"
        >
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.title}</h3>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.class.name}</td>
            <td className="hidden md:table-cell">
                {new Intl.DateTimeFormat("en-US").format(item?.date)}
            </td>
            <td>
                <div className="flex items-center gap-2 ">
                    {/* <Link href={`/list/announcements/${item.id}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appSky">
                            <Image
                                src={"/view.png"}
                                alt=""
                                width={16}
                                height={16}
                            />
                        </button>
                    </Link> */}
                    {role === "admin" && (
                        // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-appPurple">
                        //   <Image src={"/delete.png"} alt="" width={16} height={16} />
                        // </button>
                        <>
                            <FormModal
                                table="announcement"
                                type="update"
                                data={item}
                            />
                            <FormModal
                                table="announcement"
                                type="delete"
                                id={item.id}
                            />
                        </>
                    )}
                </div>
            </td>
        </tr>
    );

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.title = {
                            contains: value,
                            mode: "insensitive",
                        };

                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [data, count] = await prisma?.$transaction([
        prisma.announcement.findMany({
            where: query,
            include: {
                class: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1),
        }),
        prisma.announcement.count({ where: query }),
    ]);

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            <div className="flex flex-1 items-center justify-between p-4">
                <h1 className="hidden md:block text-lg font-semibold">
                    All announcements
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 md:w-auto">
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
                            <Image
                                src={"/filter.png"}
                                alt=""
                                width={20}
                                height={20}
                            />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
                            <Image
                                src={"/sort.png"}
                                alt=""
                                width={20}
                                height={20}
                            />
                        </button>
                        {/* <button className="w-8 h-8 flex items-center justify-center rounded-full bg-appYellow ">
              <Image src={"/plus.png"} alt="" width={20} height={20} />
            </button> */}
                        <FormModal table="announcement" type="create" />
                    </div>
                </div>
            </div>
            <Table columns={columns} data={data} renderRow={renderRow} />
            <Pagination page={p} count={count} />
        </div>
    );
};

export default announcementsListPage;
