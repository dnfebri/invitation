import { IPagination } from "@/types/interface";
import React, { useState } from "react";

interface IPaginationProps {
  dataPagination: IPagination;
  getIsPage: (props: string) => void;
}

export const Pagination = (props: IPaginationProps) => {
  const { getIsPage, dataPagination } = props;
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];
  function right() {
    num < dataPagination.total_pages - 3 && setNum(++num);
  }
  function left() {
    num > 1 && setNum(--num);
  }

  const leftBack = () => {
    if (cur <= 1) return;
    const newCur = --cur;
    setCur(newCur);
    getIsPage(newCur.toString());
    if (cur < num + 1) {
      left();
    }
  };

  const rightNext = () => {
    if (cur >= dataPagination.total_pages) return;
    const newCur = ++cur;
    setCur(newCur);
    getIsPage(newCur.toString());
    if (cur > num + 2) {
      right();
    }
  };

  const handleBtn = (i: number) => {
    setCur(i);
    getIsPage(i.toString());
  };
  return (
    <div className="flex rounded-lg">
      <button
        className={`hidden sm:inline-block h-8 px-4 transition-all duration-300 border-2 border-r-0 border-black rounded-l-lg ${
          dataPagination.has_previous_page
            ? "hover:bg-black hover:text-white"
            : "hover:bg-black/30 cursor-not-allowed"
        }`}
        onClick={leftBack}
      >
        prev
      </button>
      {dataPagination.total_pages > 4 && (
        <button
          onClick={left}
          className={`min-w-[2rem] h-8 transition-all duration-300 border-2 border-r-0 border-black rounded-l-lg sm:rounded-l-none ${
            num > 1
              ? "hover:bg-black hover:text-white"
              : "hover:bg-black/30 cursor-not-allowed"
          }`}
        >
          <svg className="w-4 h-4 mx-auto fill-current" viewBox="0 0 20 20">
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
      {pages.map(
        (pg, i) =>
          i < dataPagination.total_pages && (
            <button
              key={i}
              onClick={() => handleBtn(pg.page)}
              className={`h-8 border-2 sm:border-r-0 border-black
            min-w-[2rem] ${cur === pg.page && "bg-black text-white"} ${
                i + 1 != dataPagination.total_pages && "border-r-0"
              }`}
            >
              {pg.page}
            </button>
          )
      )}
      {dataPagination.total_pages > 4 && (
        <button
          onClick={right}
          className={`min-w-[2rem] h-8 transition-all duration-300 border-2 border-black rounded-r-lg sm:rounded-r-none sm:border-r-0 ${
            num < dataPagination.total_pages - 3
              ? "hover:bg-black hover:text-white"
              : "hover:bg-black/30 cursor-not-allowed"
          }`}
        >
          <svg className="w-4 h-4 mx-auto fill-current" viewBox="0 0 20 20">
            <path
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      )}
      <button
        className={`hidden sm:inline-block h-8 px-4 transition-all duration-300 border-2 border-black rounded-r-lg ${
          dataPagination.has_next_page
            ? "hover:bg-black hover:text-white"
            : "hover:bg-black/30 cursor-not-allowed"
        }`}
        onClick={rightNext}
      >
        next
      </button>
    </div>
  );
};
