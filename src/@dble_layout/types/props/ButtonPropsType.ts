import { CSSObject } from "@emotion/react";
import { HTMLAttributes } from "react";
import { BorderType } from "../piece/BorderType";
import { CursorType } from "../piece/CursorType";
import { GradientType } from "../piece/GradientType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { ShadowType } from "../piece/ShadowType";
import { TransitionType } from "../piece/TransitionType";

export interface ButtonType
  extends Omit<HTMLAttributes<HTMLButtonElement>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

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
export interface ButtonPropsType extends Omit<ButtonType, ExcludedProps> {
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: "none" | "auto" | "text" | "contain" | "all";

  _mq?: MediaQueryType<ButtonType>;
  _hover?: Partial<ButtonType>;
  _focus?: Partial<ButtonType>;
  _active?: Partial<ButtonType>;
  _disabled?: Partial<ButtonType>;
}

export type ButtonLayoutElement = Omit<ButtonPropsType, ExcludedProps>;
