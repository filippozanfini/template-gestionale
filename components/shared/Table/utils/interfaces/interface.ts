import { CellProps } from "../../components/Cell";

export interface HeadCell {
  title: string;
  align: CellProps["align"];
  onClick?: () => void;
}
