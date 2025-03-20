import { BorderType } from "../types/piece/BorderType";

const borderStylesProps = (border: BorderType) => {
  const { radius, stroke, position, shape, color } = border ?? {};

  const defaultShape = shape ?? "solid";

  if (!stroke && !position && !shape && !color) {
    return {
      border: undefined,
      borderBottom: undefined,
      borderTop: undefined,
      borderRight: undefined,
      borderLeft: undefined,
      borderRadius: radius,
    };
  }

  return {
    border:
      !position || position === "all"
        ? `${stroke}px ${defaultShape} ${color}`
        : undefined,
    borderBottom:
      position === "bottom"
        ? `${stroke}px ${defaultShape} ${color}`
        : undefined,
    borderTop:
      position === "top" ? `${stroke}px ${defaultShape} ${color}` : undefined,
    borderRight:
      position === "right" ? `${stroke}px ${defaultShape} ${color}` : undefined,
    borderLeft:
      position === "left" ? `${stroke}px ${defaultShape} ${color}` : undefined,
    borderRadius: radius,
  };
};

export { borderStylesProps };
