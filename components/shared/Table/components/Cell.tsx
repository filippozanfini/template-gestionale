import React, { FC, TdHTMLAttributes, ThHTMLAttributes, useMemo } from "react";
import { CellAlignment, CellVariant } from "../utils/types/types";

export interface CellProps {
  children?: React.ReactNode;
  variant?: CellVariant;
  align?: CellAlignment;
  clickable?: boolean;
}

/**
 *
 * @param align horizontal alignment
 * @returns th | td
 */
export type CellComponent = FC<
  CellProps & ThHTMLAttributes<HTMLTableCellElement> & TdHTMLAttributes<HTMLTableCellElement>
>;

const Cell: CellComponent = ({ children, variant, align = "left", clickable, ...props }) => {
  const HtmlTag = variant === "header" ? "th" : "td";

  const alignCss = useMemo(() => {
    if (align === "left") {
      return "text-left mr-auto";
    } else if (align === "center") {
      return "text-center mx-auto";
    } else if (align === "right") {
      return "text-right ml-auto";
    }
  }, [align]);

  return useMemo(
    () => (
      <HtmlTag
        className={["p-3.5 font-semibold first:pl-8 last:pr-8 ", clickable ? "cursor-pointer" : ""].join(" ")}
        {...props}
      >
        <div className={["w-fit", alignCss].join(" ")}>{children}</div>
      </HtmlTag>
    ),
    [children, props]
  );
};

export default Cell;
