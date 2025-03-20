import { CSSObject } from "@emotion/react";
import { ElementType, HTMLAttributes } from "react";
import { BorderType } from "../piece/BorderType";
import { CursorType } from "../piece/CursorType";
import { LayoutElementType } from "../piece/LayoutElementType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { PositionType } from "../piece/PositionType";
import { ShadowType } from "../piece/ShadowType";
import { TrafficType } from "../piece/TrafficType";
import { TransitionType } from "../piece/TransitionType";

export interface LayerType
  extends Omit<HTMLAttributes<HTMLElement>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  //flex
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
  wrap?: "nowrap" | "wrap" | "wrap-reverse"; // flex-wrap

  // position
  position?: PositionType;
  axis?: { x?: string | number; y?: string | number };

  // padding
  padding?: TrafficType;

  // margin
  margin?: TrafficType;

  // background
  fill?: string;
  border?: BorderType;
  shadow?: ShadowType;
  blur?: number;
  opacity?: number;
  scale?: number;
  rotate?: string | number;
}

interface LayerPropsType<T extends ElementType>
  extends Omit<LayerType, ExcludedProps> {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: "none" | "auto" | "text" | "contain" | "all";

  _mq?: MediaQueryType<LayerType>;
  _hover?: Partial<LayerType>;
  _focus?: Partial<LayerType>;
  _active?: Partial<LayerType>;
}

export type LayerLayoutElement = Omit<
  LayerPropsType<LayoutElementType>,
  ExcludedProps
>;
