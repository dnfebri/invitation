import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constants/routes";

export const FormLogout = () => {
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
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};
