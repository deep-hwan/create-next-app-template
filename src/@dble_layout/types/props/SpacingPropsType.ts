import { CSSObject } from "@emotion/react";
import { MediaQueryType } from "../piece/MediaQueryType";

type SpacingType = { direc?: "row" | "column"; size?: number };

export interface SpacingPropsType
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "children" | "size" | "dir" | "color"
    >,
    SpacingType {
  children?: never[];
  _mq?: MediaQueryType<SpacingType>;
  css?: CSSObject;
}
