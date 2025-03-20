import { CSSObject } from "@emotion/react";
import { ElementType, HTMLAttributes } from "react";
import { BorderType } from "../piece/BorderType";
import { CursorType } from "../piece/CursorType";
import { GradientType } from "../piece/GradientType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { ShadowType } from "../piece/ShadowType";
import { TrafficType } from "../piece/TrafficType";
import { TransitionType } from "../piece/TransitionType";

export type TouchableOpacityElementsType =
  | "div"
  | "ul"
  | "ol"
  | "li"
  | "button"
  | "a";

export interface TouchableOpacityType
  extends Omit<HTMLAttributes<HTMLElement>, ExcludedProps> {
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

//
// TouchableOpacity
export interface TouchableOpacitPropsType<T extends ElementType>
  extends Omit<TouchableOpacityType, ExcludedProps> {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: "none" | "auto" | "text" | "contain" | "all";

  _mq?: MediaQueryType<TouchableOpacityType>;
  _hover?: Partial<TouchableOpacityType>;
  _focus?: Partial<TouchableOpacityType>;
  _active?: Partial<TouchableOpacityType>;
  _disabled?: Partial<TouchableOpacityType>;
  disabled?: boolean;
}

export type TouchableOpacityLayoutElement = Omit<
  TouchableOpacitPropsType<ElementType>,
  ExcludedProps
>;
