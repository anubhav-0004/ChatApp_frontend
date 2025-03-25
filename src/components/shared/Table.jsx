import React, { useState } from "react";
import { useTable } from "react-table";

const Table = ({ rows, columns, heading, rowsPerPage = 5 }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(rowsPerPage);

  const startRow = pageIndex * itemsPerPage;
  const endRow = startRow + itemsPerPage;
  const paginatedRows = rows.slice(startRow, endRow);

  const totalPages = Math.ceil(rows.length / itemsPerPage);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows: tableRows,
    prepareRow,
  } = useTable({
    columns,
    data: paginatedRows,
  });

  return (
    <div className="max-h-[86vh] bg-[#564c4c] p-3 rounded-lg overflow-hidden">
      <h1 className="text-center mx-2 my-1 font-semibold text-2xl text-[#180d3c] uppercase">
        {heading}
      </h1>

      <div className="overflow-x-auto max-md:max-h-[25.5rem] max-h-[30rem]">
        <table
          {...getTableProps()}
          className="table-auto border-collapse border border-gray-300 w-full"
        >
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key, ...headerGroupProps } =
                headerGroup.getHeaderGroupProps();

              return (
                <tr key={key} {...headerGroupProps} className="bg-[#895f45d1]">
                  {headerGroup.headers.map((column) => {
                    const { key: colKey, ...columnProps } =
                      column.getHeaderProps();

                    return (
                      <th
                        key={colKey}
                        {...columnProps}
                        style={{ width: column.width }}
                        className="border-2 border-gray-300 p-2 text-left text-[#c8c8b3] whitespace-nowrap"
                      >
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody {...getTableBodyProps()}>
            {tableRows.map((row) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  {...rowProps}
                  className="even:bg-gray-300 odd:bg-[#6a6161] hover:even:bg-gray-200 hover:odd:bg-[#9a8383]"
                >
                  {row.cells.map((cell) => {
                    const { key, ...cellProps } = cell.getCellProps();

                    return (
                      <td
                        key={key}
                        {...cellProps}
                        className="border-2 border-gray-50 p-2 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={() => setPageIndex((prev) => Math.max(0, prev - 1))}
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
          disabled={pageIndex === 0}
        >
          Prev
        </button>

        <div className="flex items-center">
          <span className="mr-2">Page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={pageIndex + 1}
            onChange={(e) => {
              const value = Number(e.target.value) - 1;
              if (value >= 0 && value < totalPages) {
                setPageIndex(value);
              }
            }}
            className="w-12 text-center border rounded"
          />
          <span className="ml-2">of {totalPages}</span>
        </div>

        <button
          onClick={() =>
            setPageIndex((prev) => Math.min(totalPages - 1, prev + 1))
          }
          className="px-4 py-2 bg-gray-700 text-white rounded-md"
          disabled={pageIndex === totalPages - 1}
        >
          Next
        </button>
      </div>

      <div className="mt-2">
        <label htmlFor="rowsPerPage" className="mr-2">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setPageIndex(0);
          }}
          className="border rounded-md"
        >
          {[5, 10, 15, 20, 30, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Table;
