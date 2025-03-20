import { CSSObject } from "@emotion/react";
import { ElementType, HTMLAttributes } from "react";
import { LayoutElementType } from "../piece/LayoutElementType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { TransitionType } from "../piece/TransitionType";

export interface PositionType
  extends Omit<HTMLAttributes<HTMLElement>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  // position
  type?: "static" | "relative" | "fixed" | "absolute" | "sticky";
  top?: string | number;
  bottom?: string | number;
  left?: string | number;
  right?: string | number;
  axis?: { x?: string | number; y?: string | number };
}

export interface PositionPropsType<T extends ElementType = "div">
  extends Omit<PositionType, ExcludedProps> {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;

  _mq?: MediaQueryType<PositionType>;
}

export type PositionLayoutElement = Omit<
  PositionPropsType<LayoutElementType>,
  ExcludedProps
>;
