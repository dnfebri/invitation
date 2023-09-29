import React, { ReactNode } from "react";
import { Navigation } from "../menu";

export const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="h-16 shadow-md" />
      <Navigation />
      {children}
    </div>
  );
};
