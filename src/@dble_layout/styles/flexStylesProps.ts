import { CSSObject } from "@emotion/react";
import { FlexType } from "../types/piece/FlexType";

const flexStylesProps = (props?: FlexType) => {
  const computedDirection: FlexType["direc"] = props?.isReverse
    ? (`${props.direc}-reverse` as "row-reverse" | "column-reverse")
    : props?.direc;

  const computedCrossAlign = props?.isReverse
    ? props.justify === "start"
      ? "flex-end"
      : "flex-start"
    : props?.justify;

  const baseStyle = {
    flexDirection: computedDirection,
    alignItems: props?.align,
    justifyContent: computedCrossAlign,
    gap: props?.gap,
    order: props?.order,
    flexGrow: props?.grow,
    flexShrink: props?.shrink,
    flexBasis: props?.basis,
    flex: props?.flex,
    alignContent: props?.alignContent,
    alignSelf: props?.alignSelf,
    flexWrap: props?.wrap,
  } as CSSObject;

  if (!props) return {};
  return baseStyle;
};

export { flexStylesProps };
