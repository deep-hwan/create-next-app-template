import { CSSObject } from "@emotion/react";
import { ComponentPropsWithoutRef, ElementType, HTMLAttributes } from "react";
import { MediaQueryType } from "../piece/MediaQueryType";
import { TrafficType } from "../piece/TrafficType";
import { TransitionType } from "../piece/TransitionType";

export interface TextType
  extends Omit<
    HTMLAttributes<HTMLParagraphElement>,
    "size" | "sizes" | "color" | "title" | "hidden"
  > {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;
  padding?: TrafficType;
  margin?: TrafficType;
  size?: number | string;
  weight?: "lighter" | "normal" | "medium" | "bold";
  align?: "start" | "end" | "center";
  color?: string;
  shadow?: string;
  decoration?: "underline" | string;
  transform?:
    | "none"
    | "capitalize"
    | "uppercase"
    | "lowercase"
    | "initial"
    | "inherit";
  lineHeight?: number | string;
  whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap" | "pre-line";
  ellipsis?: { isActive?: boolean; line?: number };
  opacity?: number;
  scale?: number;
  rotate?: string | number;
  wordBreak?: "normal" | "break-all" | "keep-all" | "break-word";
  wordWrap?: "normal" | "break-word";
  overflowWrap?: "normal" | "break-word" | "anywhere";
}

interface TextPropsType<T extends ElementType = "p"> extends TextType {
  as?: T;
  children: React.ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  userSelect?: "none" | "auto" | "text" | "contain" | "all";

  _mq?: MediaQueryType<TextType>;
  _hover?: Partial<TextType>;
  _focus?: Partial<TextType>;
  _active?: Partial<TextType>;
}

export type TextElementType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "strong"
  | "b"
  | "i"
  | "p"
  | "span"
  | "div"
  | "li"
  | "label";

export type TextLayoutElement = Omit<
  TextPropsType<TextElementType>,
  ExcludedProps
>;

export type TextPropsRef = Omit<
  ComponentPropsWithoutRef<TextElementType>,
  ExcludedProps
>;

type ExcludedProps =
  | "sizes"
  | "title"
  | "hidden"
  | "title"
  | "translate"
  | "radioGroup";
