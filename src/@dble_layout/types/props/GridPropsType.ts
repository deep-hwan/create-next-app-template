import { CSSObject } from "@emotion/react";
import { ElementType } from "react";
import { GridType as GridExtendedType } from "../piece/GridType";
import { LayoutElementType } from "../piece/LayoutElementType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { TransitionType } from "../piece/TransitionType";

export interface GridType extends GridExtendedType {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  // grid
  templateColumns?: string;
  templateRows?: string; // grid-template-rows
  templateAreas?: string; // grid-template-areas
  gap?: string | number; // grid-gap
  autoFlow?: "row" | "column" | "dense" | "row dense" | "column dense"; // grid-auto-flow
  autoColumns?: string; // grid-auto-columns
  autoRows?: string; // grid-auto-rows
  justifyItems?: "start" | "end" | "center" | "stretch"; // justify-items
  alignItems?: "start" | "end" | "center" | "stretch"; // align-items
  justifyContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"; // justify-content
  alignContent?:
    | "start"
    | "end"
    | "center"
    | "stretch"
    | "space-between"
    | "space-around"; // align-content
}

interface GridPropsType<T extends ElementType = "div">
  extends Omit<GridType, ExcludedProps> {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;

  _mq?: MediaQueryType<GridType>;
}

export type GridLayoutElement = Omit<
  GridPropsType<LayoutElementType>,
  ExcludedProps
>;
