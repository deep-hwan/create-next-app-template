import { PositionType } from '../types/piece/PositionType';

const positionStylesProps = (props?: { position?: PositionType }) => {
  if (!props) return {};
  return {
    position: props.position?.type,
    top: props?.position?.top,
    bottom: props.position?.bottom,
    left: props.position?.left,
    right: props.position?.right,
  };
};

export { positionStylesProps };
