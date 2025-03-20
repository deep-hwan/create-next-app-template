import { CSSObject } from "@emotion/react";
import { MediaQueryType } from "../piece/MediaQueryType";
import { ExcludedProps } from "../piece/PipeLinePropsType";

export interface SkeletonType {
  w?: number;
  h?: number;
  primaryColor?: string;
  moveColor?: string;
  radius?: number | string;
}

export interface SkeletonPropsType
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "children" | "dir" | ExcludedProps
    >,
    SkeletonType {
  children?: never[];
  _mq?: MediaQueryType<SkeletonType>;
  css?: CSSObject;
}
