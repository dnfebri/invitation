import React, { ChangeEvent, ReactNode, useState } from "react";

export type TInputForm = {
  [key: string]: string;
};

interface IPropsInput {
  type: string;
  name: string;
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
  label?: string;
}

export const InputForm = (props: IPropsInput) => {
  const {
    type,
    name,
    value,
    placeholder,
    onChange,
    children,
    className,
    disabled,
    label,
  } = props;
  const [isFocus, setIsFocus] = useState(false);
  const handleOnBlur = () => {
    if (!value) {
      setIsFocus(false);
    }
  };
  return (
    <div className="relative my-6">
      {label && (
        <span
          className={`absolute transition-all duration-300 ${
            isFocus
              ? "-top-3 left-0 bg-base-100 scale-75"
              : "top-3 bg-transparent left-3"
          } `}
        >
          {label}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder || ""}
        className={`w-full input border-zinc-900 focus:border-brand dark:bg-dark-components focus:outline-none ${className}`}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleOnBlur}
        disabled={disabled}
        onFocus={() => setIsFocus(true)}
      />
      {children}
    </div>
  );
};
