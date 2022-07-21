import React, { Children, FC, HTMLAttributes, useMemo } from "react";
import { useCloneComponentAddingNewProps } from "../hook/useCloneComponentAddingNewProps";
import { CellVariant } from "../utils/types/types";

export type BodyComponent = FC<{ children: React.ReactNode } & HTMLAttributes<HTMLTableSectionElement>>;

const Body: BodyComponent = ({ children, ...props }) => {
  const variant: CellVariant = useMemo(() => {
    return "body";
  }, []);

  const childrenWithProps = useCloneComponentAddingNewProps({ component: children, props: { variant } });

  return <tbody {...props}>{childrenWithProps}</tbody>;
};

export default Body;
