import { HelperAxiosAuthorization } from "@/lib/helpers";
import { IGuest, IPagination } from "@/types/interface";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "../pagination";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import { IRemark } from "@/types/interface/iRemark";

export const TableWeddingComments = () => {
  const [isRemark, setIsRemark] = useState<IRemark[]>();
  const [isRemarkCount, setIsRemarkCount] = useState<number>(5);
  const [isPagination, setIsPagination] =
    useState<IPagination>(DEFAULT_PAGINATION);
  const [isPage, setIsPage] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const getRemark = async (page: string = isPage) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/admin/congratulate?page=${page}&limit=10`,
        HelperAxiosAuthorization()
      );
      const data = response.data;
      setIsRemark(data.data);
      setIsPagination(data.metadata);
      setIsRemarkCount(data.data.length);
      setIsLoading(false);
    } catch (error) {
      console.log("getRemark", error);
      setIsLoading(false);
    }
  };

  const getIsPage = (cur: string) => {
    setIsLoading(true);
    setIsPage(cur);
    getRemark(cur);
  };

  useEffect(() => {
    getRemark();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatusComment = async (data: IRemark) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/admin/congratulate/${data.id}`, {
        active: !data.is_active,
      });
      if (response.status === 200) {
        getRemark();
      }
      setIsLoading(false);
    } catch (error) {
      console.log("updateStatusComment", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-4">
      <h4 className="font-black text-center">Daftar Komentar Tamu Undangan</h4>
      <div className="my-4 overflow-x-auto">
        <table className="table mx-4">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Balasan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? [...Array(isRemarkCount)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td>
                      <div className="w-full h-6 rounded-md bg-zinc-300" />
                    </td>
                    <td>
                      <div className="w-full h-6 rounded-md bg-zinc-300" />
                    </td>
                    <td>
                      <div className="w-full h-6 rounded-md bg-zinc-300" />
                    </td>
                    <td>
                      <div className="w-full h-6 rounded-md bg-zinc-300" />
                    </td>
                    <td>
                      <div className="w-full h-6 rounded-md bg-zinc-300" />
                    </td>
                  </tr>
                ))
              : isRemark?.map((row, idx) => (
                  <tr key={idx}>
                    <th>{row.id}</th>
                    <td>{row.author}</td>
                    <td>
                      {row.is_active ? (
                        <span className="px-2 rounded-lg bg-success">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 bg-gray-400 rounded-lg">
                          Not Active
                        </span>
                      )}
                    </td>
                    <td>{row.reply.length}</td>
                    <td className="flex items-center justify-end gap-3">
                      {row.reply.length > 0 && (
                        <button className="px-2 ml-2 rounded-lg bg-info">
                          Lihat balasan
                        </button>
                      )}
                      <input
                        type="checkbox"
                        className="toggle toggle-success"
                        checked={row.is_active}
                        onChange={() => updateStatusComment(row)}
                      />
                    </td>
                  </tr>
                ))}
            {}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <Pagination dataPagination={isPagination} getIsPage={getIsPage} />
      </div>
    </div>
  );
};
