import { CSSObject } from "@emotion/react";
import { ElementType, HTMLAttributes } from "react";
import { BorderType } from "../piece/BorderType";
import { CursorType } from "../piece/CursorType";
import { GradientType } from "../piece/GradientType";
import { LayoutElementType } from "../piece/LayoutElementType";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { ShadowType } from "../piece/ShadowType";
import { TransitionType } from "../piece/TransitionType";

export interface BackgroundType
  extends Omit<HTMLAttributes<HTMLElement>, ExcludedProps> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  flex?: number | string;

  // background
  fill?: string;
  imageFill?: {
    url?: never | string;
    repeat?:
      | "repeat-x"
      | "repeat-y"
      | "repeat"
      | "space"
      | "round"
      | "no-repeat";
    size?: "contain" | "cover" | string;
    position?: "top" | "bottom" | "center" | "left" | "right" | "string";
    clip?: "border-box" | "padding-box" | "content-box" | "initial" | "inherit";
  };

  gradient?: GradientType | never;
  border?: BorderType;
  shadow?: ShadowType;
  blur?: number;
  opacity?: number;
  scale?: number;
  rotate?: string | number;
}

interface BackgroundPropsType<T extends ElementType>
  extends Omit<BackgroundType, ExcludedProps> {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: "none" | "auto" | "text" | "contain" | "all";

  _mq?: MediaQueryType<BackgroundType>;
}

export type BackgroundLayoutElement = Omit<
  BackgroundPropsType<LayoutElementType>,
  ExcludedProps
>;
