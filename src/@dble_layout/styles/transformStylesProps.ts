type TransformType = {
  axis?: { x?: string | number; y?: string | number };
  scale?: number;
  rotate?: string | number;
};

const transformStylesProps = (props?: TransformType) => {
  const { axis, scale, rotate } = props ?? {};

  if (!props) return {};
  return {
    transform: axis
      ? `translate(${typeof axis.x === 'number' ? `${axis.x}px` : (axis.x ?? '0')}, ${
          typeof axis.y === 'number' ? `${axis.y}px` : (axis.y ?? '0')
        })`
      : undefined,
    scale: scale,
    rotate: typeof rotate === 'number' ? rotate + 'deg' : rotate,
  };
};

export { transformStylesProps };
