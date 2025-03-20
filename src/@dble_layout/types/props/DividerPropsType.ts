import { CSSObject } from "@emotion/react";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";
import { TrafficType } from "../piece/TrafficType";

// Divider
export interface DividerType {
  direc?: "horizontal" | "vertical";
  w?: number | string;
  h?: number | string;
  color?: string;
  radius?: number | string;
  spacing?: TrafficType;
}

export interface DividerPropsType
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "children" | "dir" | ExcludedProps
    >,
    DividerType {
  children?: never[];
  _mq?: MediaQueryType<DividerType>;
  css?: CSSObject;
}
