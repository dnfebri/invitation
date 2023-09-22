import { TInputForm } from "@/types";
import React, { ChangeEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputForm } from "./utils";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constants/routes";

export const FormLogin = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<TInputForm>({});
  const [showPasswd, setShowPasswd] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd);
  };

  let optionCookie: { maxAge?: number } = {};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRememberMe) {
      optionCookie.maxAge = 60 * 60 * 24 * 7;
    }
    try {
      const response = await axios.post(`/api/auth/login`, inputs);
      const data = response.data;
      console.log(data);
      setCookie("token", data.token, optionCookie);
      router.push(ROUTER.ADMIN);
    } catch (error) {
      console.log("HandleSubmit", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputForm
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
        <InputForm
          type={showPasswd ? "text" : "password"}
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
          placeholder="*********"
        >
          <div className="absolute top-0 bottom-0 flex items-center right-3">
            <button type="button" onClick={handleShowPasswd}>
              {showPasswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </InputForm>
        <button type="submit">Masuk</button>
      </form>
    </div>
  );
};
