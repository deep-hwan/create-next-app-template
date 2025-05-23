type TransformType = {
  axis?: { x?: string | number; y?: string | number };
  scale?: number;
  rotate?: string | number;
};

const transformStylesProps = (props?: TransformType) => {
  const { axis, scale, rotate } = props ?? {};

  if (!props) return {};

  let transform = "";

  // Add translation if axis is provided
  if (axis) {
    transform += `translate(${
      typeof axis.x === "number" ? `${axis.x}px` : axis.x ?? "0"
    }, ${typeof axis.y === "number" ? `${axis.y}px` : axis.y ?? "0"})`;
  }

  // Add scale if provided
  if (scale !== undefined) {
    if (transform) transform += " ";
    transform += `scale(${scale})`;
  }

  // Add rotation if provided
  if (rotate !== undefined) {
    if (transform) transform += " ";
    transform += `rotate(${
      typeof rotate === "number" ? rotate + "deg" : rotate
    })`;
  }

  return transform ? { transform } : {};
};

export { transformStylesProps };
