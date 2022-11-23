import React, { Children, useMemo } from "react";

interface ComponentsAndProps {
  component: React.ReactNode;
  props: any;
}

export const useCloneComponentAddingNewProps = ({ component, ...props }: ComponentsAndProps) => {
  return useMemo(
    () =>
      Children.map(component, (child) => {
        if (React.isValidElement(child) && typeof child.type !== "string") {
          return React.cloneElement(child, {
            ...props,
          });
        }
        return child;
      }),
    [component, props]
  );
};
