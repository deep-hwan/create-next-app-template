import { BackgroundType } from '../types/piece/BackgroundType';

const backgroundStylesProps = (props?: BackgroundType) => {
  if (!props) return {};

  return {
    backgroundColor: props.fill,
    backgroundRepeat: props.repeat,
    backgroundSize: props.size,
    backgroundPosition: props.position,
    backgroundImage: props?.imageUrl ? `url(${props?.imageUrl})` : undefined,
    backgroundClip: props.clip,
    filter: !!props.blur ? `blur(${props.blur}px)` : undefined,
  };
};

export { backgroundStylesProps };
