import React, { Children, FC, HTMLAttributes, useMemo } from "react";
import { useCloneComponentAddingNewProps } from "../hook/useCloneComponentAddingNewProps";
import { CellVariant } from "../utils/types/types";

export type HeadComponent = FC<{ children: React.ReactNode } & HTMLAttributes<HTMLTableSectionElement>>;

const Head: HeadComponent = ({ children, ...props }) => {
  const variant: CellVariant = useMemo(() => {
    return "header";
  }, []);

  const childrenWithProps = useCloneComponentAddingNewProps({ component: children, props: { variant } });

  return useMemo(
    () => (
      <thead className="bg-gray-800 text-sm text-white" {...props}>
        {childrenWithProps}
      </thead>
    ),
    [children, props]
  );
};

export default Head;
