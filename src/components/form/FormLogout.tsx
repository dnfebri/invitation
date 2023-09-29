import axios from "axios";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constants/routes";

interface IFormLogout {
  children: ReactNode;
  className?: string;
}

export const FormLogout = (props: IFormLogout) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.delete("/api/auth/logout");
      router.push(ROUTER.LOGIN);
    } catch (error) {
      console.log("handleLogout", error);
    }
  };
  return (
    <>
      <button onClick={handleLogout} className={props.className}>
        {props.children}
      </button>
    </>
  );
};
