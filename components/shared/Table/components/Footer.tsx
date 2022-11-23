import React, { FC, HTMLAttributes } from "react";

export type FooterComponent = FC<{ children: React.ReactNode } & HTMLAttributes<HTMLTableSectionElement>>;

const Footer: FooterComponent = ({ children, ...props }) => {
  return <tfoot {...props}>Footer {children}</tfoot>;
};

export default Footer;
