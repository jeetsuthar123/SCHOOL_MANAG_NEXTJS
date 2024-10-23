const Table = ({
  columns,
  data,
  renderRow,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  data: any[];
  renderRow: (item: any) => React.ReactNode;
}) => {
  return (
    <table className="w-full mt-4">
      <thead className="text-sm text-left text-gray-500">
        <tr>
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
