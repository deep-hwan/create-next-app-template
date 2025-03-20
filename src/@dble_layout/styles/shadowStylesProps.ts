import { ShadowType } from "../types/piece/ShadowType";

const shadowStylesProps = (props?: ShadowType) => {
  if (!props) return {};

  return {
    boxShadow: props
      ? `${props.x ?? 0}px ${props.y}px ${props.blur}px ${props.color}`
      : undefined,
  };
};

export { shadowStylesProps };
