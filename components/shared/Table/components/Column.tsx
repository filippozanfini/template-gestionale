import React, { FC } from "react";

export type ColumnComponent = FC<{ children: React.ReactNode }>;

const Column: ColumnComponent = ({ children }) => {
  return <div> {children}</div>;
};

export default Column;
