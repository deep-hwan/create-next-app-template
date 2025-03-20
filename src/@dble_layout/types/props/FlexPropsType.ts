import { CSSObject } from "@emotion/react";
import { ElementType, HTMLAttributes } from "react";
import { LayoutElementType } from "../piece/LayoutElementType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { TransitionType } from "../piece/TransitionType";

export interface FlexType
  extends Omit<HTMLAttributes<HTMLElement>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  // flex
  flex?: string | number;
  direc?: "row" | "row-reverse" | "column" | "column-reverse";
  isReverse?: boolean;
  align?: "start" | "end" | "center" | "baseline" | "stretch"; // align-items
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"; // justify-content
  gap?: string | number;
  order?: number;
  grow?: number;
  shrink?: number; // flex-shrink
  basis?: string | number; // flex-basis
  alignContent?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "stretch"; // align-content
  alignSelf?: "auto" | "start" | "end" | "center" | "baseline" | "stretch"; // align-self
  wrap?: "nowrap" | "wrap" | "wrap-reverse"; // flex-wrap
}

interface FlexPropsType<T extends ElementType = "div">
  extends Omit<FlexType, ExcludedProps> {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;

  _mq?: MediaQueryType<FlexType>;
}

export type FlexLayoutElement = Omit<
  FlexPropsType<LayoutElementType>,
  ExcludedProps
>;
