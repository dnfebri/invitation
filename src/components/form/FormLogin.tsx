import { TInputForm } from "@/types";
import React, { ChangeEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputForm, LabelErrorForm } from "./utils";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ROUTER } from "@/constants/routes";

interface IErrorForm {
  username: string | undefined;
  password: string | undefined;
  response?: string | undefined;
}

export const FormLogin = () => {
  const router = useRouter();
  const [inputs, setInputs] = useState<TInputForm>({});
  const [showPasswd, setShowPasswd] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isErrorForm, setIsErrorForm] = useState<IErrorForm>();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
    if (isErrorForm) {
      if (name === "username") {
        setIsErrorForm({ ...isErrorForm, username: undefined });
      }
      if (name === "password") {
        setIsErrorForm({ ...isErrorForm, password: undefined });
      }
    }
  };
  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd);
  };

  let optionCookie: { maxAge?: number } = {};
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.username || !inputs.password) {
      const error = {
        username: !inputs.username ? "Username tidak boleh kosong" : undefined,
        password: !inputs.password ? "Password tidak boleh kosong" : undefined,
      };
      setIsErrorForm(error);
      return;
    }
    if (isRememberMe) {
      optionCookie.maxAge = 60 * 60 * 24 * 7;
    }
    try {
      const response = await axios.post(`/api/auth/login`, inputs);
      const data = response.data;
      console.log(data);
      setCookie("token", data.token, optionCookie);
      router.push(ROUTER.ADMIN);
    } catch (error: any) {
      console.log("HandleSubmit", error);
      setIsErrorForm({
        ...isErrorForm,
        response: error.response.data.data.message,
      } as IErrorForm);
    }
  };
  return (
    <div className="w-full max-w-md">
      <h2 className="mb-8 font-black text-center">Login</h2>
      {isErrorForm?.response && (
        <p className="text-xs text-center text-red-500">
          {isErrorForm.response}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <InputForm
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
          label="Username"
        >
          {isErrorForm?.username && (
            <span className="mx-2 text-xs text-red-500">
              {isErrorForm.username}
            </span>
          )}
        </InputForm>
        <InputForm
          type={showPasswd ? "text" : "password"}
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
          label="Password"
        >
          <div className="absolute top-0 bottom-0 flex items-center right-3">
            <button type="button" onClick={handleShowPasswd}>
              {showPasswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          {isErrorForm?.password && (
            <span className="mx-2 text-xs text-red-500">
              {isErrorForm.password}
            </span>
          )}
        </InputForm>
        <button
          type="submit"
          className="w-full py-2 text-xl font-black transition-all duration-300 rounded-lg bg-primary hover:bg-pink-500"
        >
          Masuk
        </button>
      </form>
    </div>
  );
};
