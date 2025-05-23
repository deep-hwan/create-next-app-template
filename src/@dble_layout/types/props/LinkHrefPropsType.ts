import { CSSObject } from "@emotion/react";
import { LinkProps } from "next/link";
import { HTMLAttributes } from "react";
import { BorderType } from "../piece/BorderType";
import { CursorType } from "../piece/CursorType";
import { GradientType } from "../piece/GradientType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { ShadowType } from "../piece/ShadowType";
import { TrafficType } from "../piece/TrafficType";
import { TransitionType } from "../piece/TransitionType";

export interface LinkHrefType
  extends Omit<HTMLAttributes<HTMLAnchorElement>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  //flex
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
  wrap?: "nowrap" | "wrap" | "wrap-reverse"; // flex-wrap

  // typography
  txtSize?: number | string;
  txtWeight?: "lighter" | "normal" | "medium" | "bold";
  txtAlign?: "start" | "end" | "center";
  txtColor?: string;
  txtShadow?: string;
  txtTransform?:
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "initial"
    | "inherit";
  lineHeight?: number | string;
  whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line";

  // padding
  padding?: TrafficType;

  // background
  fill?: string;
  gradient?: GradientType | never;
  border?: BorderType;
  shadow?: ShadowType;
  opacity?: number;
  scale?: number;
}

// LinkHref Props
export interface LinkHrefPropsType
  extends Omit<LinkHrefType, ExcludedProps>,
    Omit<LinkProps, "as"> {
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: "none" | "auto" | "text" | "contain" | "all";
  target?: string;

  _mq?: MediaQueryType<LinkHrefType>;
  _hover?: Partial<LinkHrefType>;
  _focus?: Partial<LinkHrefType>;
  _active?: Partial<LinkHrefType>;
  _disabled?: Partial<LinkHrefType>;
  disabled?: boolean;
}

export type LinkHrefLayoutElement = Omit<LinkHrefPropsType, ExcludedProps>;
