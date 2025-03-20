import { GradientType } from "../types/piece/GradientType";

const gradientStylesProps = (props?: GradientType) => {
  if (!props) return {};
  if (!props.colors || props.colors.length === 0) return {};

  let background;
  const { type = "linear", colors, degree } = props;
  if (type === "linear") {
    background = `linear-gradient(${degree}deg, ${colors
      .map((c) => `${c.color} ${c.stop ? c.stop + "%" : ""}`)
      .join(", ")})`;
  } else if (type === "radial") {
    background = `radial-gradient(${colors
      .map((c) => `${c.color} ${c.stop ? c.stop + "%" : ""}`)
      .join(", ")})`;
  }

  return {
    background,
  };
};

export { gradientStylesProps };
