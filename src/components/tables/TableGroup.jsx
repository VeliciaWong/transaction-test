import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { uniq } from "lodash";
import { classnames } from "components/helpers/classnames";
import { useEffect, useRef, useState } from "react";
import { debounce } from "components/helpers/utils";

const TableGroup = ({
  columns = [],
  data = [],
  keyProp = "key",
  perPage = 5,
  layout = "auto",
  tableOpt = {},
}) => {
  const table = useReactTable({
    initialState: {
      pagination: {
        pageSize: perPage,
      },
    },
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...tableOpt,
  });

  const makeVisiblePages = ({ pagePointer, margin = 2, pageCount }) => {
    const pages = new Array(margin * 2 + 1)
      .fill(null)
      .map((_, i) => pagePointer - margin + i)
      .filter((page) => page > 0 && page <= pageCount);
    return pages;
  };

  const [isLoading, setIsloading] = useState(true);
  const [groupCells, setGroupCells] = useState({});

  useEffect(() => {
    setGroupCells({});
    table.getRowModel().rows.map((row) =>
      row.getVisibleCells().map((cell) => {
        const value = cell.getValue();
        if (cell.column.columnDef.group)
          setGroupCells((old) => ({
            ...old,
            [cell.column.id]: {
              ...old[cell.column.id],
              [value]: uniq([
                ...(old[cell.column.id]?.[value] || []),
                cell.row.id,
              ]),
            },
          }));
      })
    );
    setLoadingFalseDeb();
  }, [columns, table.getState().pagination.pageIndex]);

  const setLoadingFalseDeb = debounce(() => setIsloading(false), 500);

  const handleGroupCells = (row) => {
    const render = (cell, isGroup) => {
      const value = cell.getValue();
      return (
        ((cell.column.columnDef.group &&
          groupCells[cell.column.id]?.[value]?.[0] === cell.row.id) ||
          !cell.column.columnDef.group) && (
          <td
            key={cell.id}
            className="px-4 py-2.5 break-words whitespace-pre-line max-w-2xl"
            rowSpan={groupCells[cell.column.id]?.[value]?.length || 1}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        )
      );
    };
    return row.getVisibleCells().map((cell) => render(cell));
  };

  const handleNext = () => {
    setIsloading(true);
    table.nextPage();
  };

  const handlePrevious = () => {
    setIsloading(true);
    table.previousPage();
  };

  const handleGoToPage =  (pageIndex) => {
    const pageIndexState = table.getState().pagination.pageIndex
    if (pageIndex !== pageIndexState) {
      table.setPageIndex(pageIndex);
      setIsloading(true); 
    }
  };

  return (
    <>
      <div className="border-2 border-gray-100 rounded-xl p-4">
        <table
          className={classnames(
            "w-full",
            layout === "auto" && "table-auto",
            layout === "fixed" && "table-fixed"
          )}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-center bg-gray-100 px-4 first:rounded-l-xl last:rounded-r-xl"
                    style={header.column.columnDef.headerStyle}
                  >
                    <span className="font-semibold text-black text-m leading-10">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
            <tr aria-hidden={true} className="mt-2.5 block"></tr>
          </thead>
          <tbody className="font-semibold text-center text-white text-m">
            {!isLoading ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>{handleGroupCells(row)}</tr>
                ))}
                <tr>
                  <td
                    colSpan={columns.length}
                    style={{
                      height: `calc(${
                        perPage -
                        (isLoading ? 0 : table.getRowModel().rows.length)
                      }*3rem)`,
                    }}
                  />
                </tr>
              </>
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    height: `calc(${perPage}*3rem)`,
                  }}
                />
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-center mt-2.5">
          <div className="flex">
            <button
              className={classnames(
                "w-9 h-9 bg-gray-100 rounded-l-xl",
                table.getState().pagination.pageIndex === 0
                  ? "cursor-not-allowed"
                  : null
              )}
              disabled={table.getState().pagination.pageIndex === 0}
              onClick={handlePrevious}
            >
              <BiChevronLeft
                className={classnames(
                  "mx-auto",
                  table.getState().pagination.pageIndex === 0
                    ? "text-gray-300"
                    : "text-gray-500"
                )}
              />
            </button>
            <div className="bg-gray-100">
              {makeVisiblePages({
                pagePointer: table.getState().pagination.pageIndex + 1,
                pageCount: table.getPageCount() || 1,
              }).map((page) => (
                <button
                  key={page}
                  className={classnames(
                    "w-9 h-9 rounded-xl",
                    page === table.getState().pagination.pageIndex + 1 &&
                      "bg-blue-500"
                  )}
                  onClick={() => handleGoToPage(page - 1)}
                >
                  <span
                    className={classnames(
                      "font-bold text-sm leading-9",
                      page === table.getState().pagination.pageIndex + 1
                        ? "text-white"
                        : "text-black"
                    )}
                  >
                    {page}
                  </span>
                </button>
              ))}
            </div>
            <button
              className={classnames(
                "w-9 h-9 bg-gray-100 rounded-r-xl",
                table.getState().pagination.pageIndex ===
                  (table.getPageCount() || 1) - 1
                  ? "cursor-not-allowed"
                  : null
              )}
              disabled={
                table.getState().pagination.pageIndex ===
                (table.getPageCount() || 1) - 1
              }
              onClick={handleNext}
            >
              <BiChevronRight
                className={classnames(
                  "mx-auto",
                  table.getState().pagination.pageIndex ===
                    (table.getPageCount() || 1) - 1
                    ? "text-gray-300"
                    : "text-gray-500"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableGroup;
