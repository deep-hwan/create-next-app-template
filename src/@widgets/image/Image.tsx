/** @jsxImportSource @emotion/react */
import { Skeleton } from '@/@dble_layout';
import { useUid } from '@/libs/hooks';
import Image from 'next/image';
import { ForwardedRef, forwardRef, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { PopupImageWrapper } from './instances/PopupImageWrapper';

type SizeThemeType = {
  isLoading?: boolean;
  size?: {
    width?: 'auto' | '100%' | string | number;
    minWidth?: number | string;
    maxWidth?: number | string;
    height?: 'auto' | '100%' | string | number;
    minHeight?: number | string;
    maxHeight?: number | string;
  };
  ratio?: { x?: number; y?: number };
  shadow?: { x?: number; y?: number; blur?: number; color?: string };
  scale?: number;
  borderRadius?: string | number;
};

type Types = {
  source: string;
  alt: string;
  zoomUp?: boolean;
  objectFit?: 'cover' | 'fill' | 'contain';
  priority?: boolean;
  quality?: number;
  isHover?: boolean;
  isLoading?: boolean;
} & SizeThemeType &
  Omit<HTMLAttributes<HTMLImageElement>, 'objectFit'>;

const ImageInstance = forwardRef(function ImageInstance(
  { source, alt, objectFit, zoomUp, isLoading, ...props }: Types,
  ref?: ForwardedRef<HTMLImageElement>
) {
  const uid = useUid();

  const imgRef = useRef<HTMLImageElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [zoomImg, setZoomImg] = useState(false);
  const [showZoomImage, setShowZoomImage] = useState(false);
  const [imageAspectRatio, setImageAspectRatio] = useState<number | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (source && !imageDimensions) {
      const img = new window.Image();
      img.src = source;

      img.onload = () => {
        setImageDimensions({
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
        setImageAspectRatio(img.naturalWidth / img.naturalHeight);
      };
    }
  }, [source, imageDimensions]);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    const aspectRatio = naturalWidth / naturalHeight;
    setImageAspectRatio(aspectRatio);
    setIsLoaded(true);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (source && zoomUp) {
      setZoomImg(true);
      props.onClick?.(event);
    } else {
      props.onClick?.(event);
    }
  };

  const imageWrapperStyle = (styleProps: SizeThemeType) => ({
    position: 'relative',
    width: styleProps.size?.width ?? '100%',
    minWidth: styleProps.size?.minWidth,
    maxWidth: styleProps.size?.maxWidth,
    minHeight: styleProps.size?.minHeight,
    maxHeight: styleProps.size?.maxHeight,
    height: styleProps.size?.height,
    borderRadius: styleProps.borderRadius,
    aspectRatio: styleProps.ratio
      ? `${styleProps.ratio.x}/${styleProps.ratio.y}`
      : imageAspectRatio
        ? `${imageAspectRatio}/1`
        : undefined,
    transition: '0.3s ease-in-out',
    boxShadow: styleProps.shadow
      ? `${styleProps.shadow.x}px ${styleProps.shadow.y}px ${styleProps.shadow.blur}px ${styleProps.shadow.color}`
      : undefined,
    userSelect: 'none',
    overflow: 'hidden',
    scale: styleProps.scale,
  });

  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (zoomImg && imgRef.current && !imgRef.current.contains(event.target as Node)) setZoomImg(false);
    },
    [zoomImg]
  );

  useEffect(() => {
    if (zoomImg) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = 'hidden';

      const timer = setTimeout(() => {
        setShowZoomImage(true);
      }, 200);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = 'auto';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      setShowZoomImage(false);
    }

    document.addEventListener('mousedown', clickModalOutside);
    return () => document.removeEventListener('mousedown', clickModalOutside);
  }, [zoomImg]);

  const onHover = () => {
    if (props.isHover) setIsHover(!isHover);
  };

  return (
    <>
      <div
        id={`image-wrap-${uid}`}
        onMouseEnter={onHover}
        onMouseLeave={onHover}
        css={{
          ...(imageWrapperStyle(props) as any),
          cursor: props.onClick || zoomUp ? 'pointer' : 'default',
        }}
        {...props}
      >
        {isLoading ? (
          <Skeleton h={'100%' as any} w={'100%' as any} />
        ) : (
          <Image
            id={`image-${uid}`}
            itemProp='image'
            ref={ref}
            src={source}
            alt={alt}
            priority={props.priority}
            fill
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nAEoANf/AP7+//j9/+ry/wDe3NbEqorX1cwAkn9ndUYhjHddAAgEBBIODgcHCB3XE9M/sWuRAAAAAElFTkSuQmCC'
            quality={props.quality ?? 75}
            placeholder='blur'
            loading={props?.priority ? 'eager' : 'lazy'}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            onClick={handleOnClick}
            onLoad={handleImageLoad}
            css={{
              overflow: 'hidden',
              objectFit: objectFit ?? 'cover',
              width: '100%',
              height: '100%',
              filter: isLoaded ? 'none' : 'blur(10px)',
              transition: 'filter 0.3s ease-in-out',
              scale: isHover ? 1.05 : 1,
              boxShadow: props.shadow
                ? `${props.shadow.x}px ${props.shadow.y}px ${props.shadow.blur}px ${props.shadow.color}`
                : undefined,
            }}
          />
        )}
      </div>

      {!isLoading && zoomImg && showZoomImage && (
        <PopupImageWrapper onCancel={() => setZoomImg(false)}>
          <div
            className='zoom-image'
            ref={imgRef}
            css={{
              position: 'relative',
              width: '100%',
              height: '100%',
              maxWidth: 1200,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Image
              ref={ref}
              src={source}
              alt={alt}
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVR4nAEoANf/AP7+//j9/+ry/wDe3NbEqorX1cwAkn9ndUYhjHddAAgEBBIODgcHCB3XE9M/sWuRAAAAAElFTkSuQmCC'
              priority={props.priority}
              fill
              quality={props.quality ?? 70}
              loading='lazy'
              objectFit='contain'
              style={{ objectFit: 'contain' }}
              css={{ width: '100%' }}
            />
          </div>
        </PopupImageWrapper>
      )}
    </>
  );
});

export default ImageInstance;
