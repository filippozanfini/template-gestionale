import React, { Children, FC, HTMLAttributes, useMemo } from "react";
import { useCloneComponentAddingNewProps } from "../hook/useCloneComponentAddingNewProps";
import { CellVariant } from "../utils/types/types";
import { CellProps } from "./Cell";

interface RowProps {
  children: React.ReactNode;
  variant?: CellVariant;
}

export type RowComponent = FC<RowProps & HTMLAttributes<HTMLTableRowElement>>;

const Row: RowComponent = ({ children, variant, ...props }) => {
  const childrenWithProps = useCloneComponentAddingNewProps({ component: children, props: { variant } });

  return <tr {...props}>{childrenWithProps}</tr>;
};

export default Row;
