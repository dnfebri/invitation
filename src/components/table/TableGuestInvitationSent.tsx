import { HelperAxiosAuthorization } from "@/lib/helpers";
import { IGuest, IPagination } from "@/types/interface";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "../pagination";
import { DEFAULT_PAGINATION } from "@/constants/pagination";

export const TableGuestInvitationSent = () => {
  const [isGuest, setIsGuest] = useState<IGuest[]>();
  const [isPagination, setIsPagination] =
    useState<IPagination>(DEFAULT_PAGINATION);
  const [isPage, setIsPage] = useState("1");
  const [isLoading, setIsLoading] = useState(false);

  const getGuest = async (page: string = isPage) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/admin/visitor?page=${page}&limit=10`,
        HelperAxiosAuthorization()
      );
      const data = response.data;
      setIsGuest(data.data);
      setIsPagination(data.metadata);
      setIsLoading(false);
    } catch (error) {
      console.log("getGuest", error);
      setIsLoading(false);
    }
  };

  const getIsPage = (cur: string) => {
    setIsLoading(true);
    setIsPage(cur);
    getGuest(cur);
  };

  useEffect(() => {
    getGuest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="my-4">
      <h4 className="font-black text-center">Daftar Undangan Terkirim</h4>
      <div className="my-4 overflow-x-auto">
        <table className="table mx-4">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Undangan Dilihat</th>
              <th>kehadiran</th>
            </tr>
          </thead>
          <tbody>
            {isGuest?.map((row, idx) => (
              <tr key={idx}>
                <th>{row.id}</th>
                <td>{row.name}</td>
                <td>{row.read}</td>
                <td>
                  {row.attend === null ? (
                    ""
                  ) : row.attend ? (
                    <span className="px-2 rounded-lg bg-success">Hadir</span>
                  ) : (
                    "Tidak Haridir"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <Pagination dataPagination={isPagination} getIsPage={getIsPage} />
      </div>
    </div>
  );
};
