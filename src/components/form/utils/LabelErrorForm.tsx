import React, { ReactNode } from "react";

interface ILabelErrorFormProps {
  children: ReactNode;
}

export const LabelErrorForm = (props: ILabelErrorFormProps) => {
  return <span className="text-xs text-red-500">{props.children}</span>;
};
