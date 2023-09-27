import React, { ReactNode } from "react";

export const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="h-16 shadow-md" />
      {children}
    </div>
  );
};
