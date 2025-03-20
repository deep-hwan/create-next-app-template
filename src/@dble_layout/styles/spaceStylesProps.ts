import { TrafficType } from "../types/piece/TrafficType";

const getSpaceValue = (
  spaceObj: TrafficType | undefined,
  dir: "all" | "vertical" | "horizontal" | "top" | "bottom" | "left" | "right"
) => {
  if (!spaceObj) return undefined;
  const value = spaceObj[dir];
  return value === 0 ? "0px" : value;
};

const spaceStylesProps = (props?: {
  padding?: TrafficType;
  margin?: TrafficType;
}) => {
  if (!props) return {};

  const createSpaceProps = (
    spaceObj: TrafficType | undefined,
    prefix: string
  ) => ({
    [`${prefix}Top`]:
      getSpaceValue(spaceObj, "all") ||
      getSpaceValue(spaceObj, "vertical") ||
      getSpaceValue(spaceObj, "top"),
    [`${prefix}Bottom`]:
      getSpaceValue(spaceObj, "all") ||
      getSpaceValue(spaceObj, "vertical") ||
      getSpaceValue(spaceObj, "bottom"),
    [`${prefix}Right`]:
      getSpaceValue(spaceObj, "all") ||
      getSpaceValue(spaceObj, "horizontal") ||
      getSpaceValue(spaceObj, "right"),
    [`${prefix}Left`]:
      getSpaceValue(spaceObj, "all") ||
      getSpaceValue(spaceObj, "horizontal") ||
      getSpaceValue(spaceObj, "left"),
  });

  return {
    ...createSpaceProps(props.padding, "padding"),
    ...createSpaceProps(props.margin, "margin"),
  };
};

export { spaceStylesProps };
