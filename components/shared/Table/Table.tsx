import React, { FC, TableHTMLAttributes, useMemo } from "react";
import Head, { HeadComponent } from "./components/Head";
import Column, { ColumnComponent } from "./components/Column";
import Row, { RowComponent } from "./components/Row";
import Body, { BodyComponent } from "./components/Body";
import Cell, { CellComponent } from "./components/Cell";

interface TableProps {
  children?: React.ReactNode;
}

type TableComponent = FC<TableProps & TableHTMLAttributes<HTMLTableElement>> & {
  Row: RowComponent;
  Column: ColumnComponent;
  Header: HeadComponent;
  Body: BodyComponent;
  Cell: CellComponent;
};

export const Table: TableComponent = ({ children, ...props }) => {
  return useMemo(
    () => (
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="w-full table-auto border-collapse divide-y divide-gray-300" {...props}>
          {children}
        </table>
      </div>
    ),
    [children, props]
  );
};

Table.Row = Row;
Table.Column = Column;
Table.Header = Head;
Table.Body = Body;
Table.Cell = Cell;
