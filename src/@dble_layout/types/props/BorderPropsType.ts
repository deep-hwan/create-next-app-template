import { CSSObject } from "@emotion/react";
import { ElementType, HTMLAttributes } from "react";
import { CursorType } from "../piece/CursorType";
import { LayoutElementType } from "../piece/LayoutElementType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { ShadowType } from "../piece/ShadowType";
import { TransitionType } from "../piece/TransitionType";

export interface BorderType
  extends Omit<HTMLAttributes<HTMLElement>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  // border
  fill?: string;
  radius?: number | string;
  stroke?: number;
  position?: "all" | "left" | "right" | "top" | "bottom";
  strokeColor?: string;
  shape?:
    | "solid"
    | "dotted"
    | "dashed"
    | "double"
    | "outset"
    | "inset"
    | "groove"
    | "ridge";

  shadow?: ShadowType;
  opacity?: number;
}

interface BorderPropsType<T extends ElementType>
  extends Omit<BorderType, ExcludedProps> {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: "none" | "auto" | "text" | "contain" | "all";

  _mq?: MediaQueryType<BorderType>;
  _hover?: Partial<BorderType>;
  _focus?: Partial<BorderType>;
  _active?: Partial<BorderType>;
}

export type BorderLayoutElement = Omit<
  BorderPropsType<LayoutElementType>,
  ExcludedProps
>;
