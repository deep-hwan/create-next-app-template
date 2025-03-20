import { Skeleton } from '@/@dble_layout';
import React, { HTMLAttributes, SVGProps, useEffect, useRef, useState } from 'react';
import ImageInstance from './Image';
import { PopupAvatarWrapper } from './instances/PopupAvatarWrapper';

//
type Types = {
  source: string;
  alt: string;
  size?: number | string;
  borderRadius?: number | string;
  zoomUp?: boolean;
  zoomUpImageSize?: number;
  isLoading?: boolean;
} & HTMLAttributes<HTMLImageElement>;

//
const Avatar = ({
  source,
  alt,
  size = 30,
  borderRadius = 1000,
  zoomUp,
  zoomUpImageSize,
  onClick,
  isLoading,
  ...props
}: Types) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [zoomImg, setZoomImg] = useState(false);
  const [showZoomImage, setShowZoomImage] = useState(false);

  const source_instance = !!source || (!!source && /\.(png|jpg|jpeg|webp)$/.test(source));

  const sizes = {
    width: size,
    minWidth: size,
    maxWidth: size,
    height: size,
    minHeight: size,
    maxHeight: size,
  };

  useEffect(() => {
    const clickModalOutside = (event: MouseEvent) => {
      if (zoomImg && imgRef.current && !imgRef.current.contains(event.target as Node)) setZoomImg(false);
    };

    if (zoomImg) document.body.style.overflowY = 'hidden';
    else document.body.style.overflowY = 'auto';

    document.addEventListener('mousedown', clickModalOutside);
    return () => {
      document.removeEventListener('mousedown', clickModalOutside);
    };
  }, [zoomImg]);

  useEffect(() => {
    if (zoomImg) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.overflowY = 'hidden';

      const timer = setTimeout(() => {
        setShowZoomImage(true);
      }, 200);

      return () => clearTimeout(timer);
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflowY = 'auto';

      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      setShowZoomImage(false);
    }
  }, [zoomImg]);

  //
  // handleOnClick
  const handleOnClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!!source && zoomUp) {
      setZoomImg(true);
      onClick && onClick(event);
    } else if (onClick) onClick(event);
  };

  return (
    <>
      {isLoading ? (
        <Skeleton radius={borderRadius} w={size as number} h={size as number} />
      ) : (
        <>
          {source_instance ? (
            <ImageInstance
              source={source}
              alt={alt}
              size={sizes}
              borderRadius={borderRadius}
              objectFit='cover'
              onClick={handleOnClick}
              {...props}
            />
          ) : (
            <svg
              className='cache-avatar-icon'
              viewBox='0 0 22 22'
              fill='none'
              css={sizes}
              {...(props as SVGProps<SVGSVGElement>)}
            >
              <path
                d='M11 22.0001C17.0751 22.0001 22 17.0752 22 11.0001C22 4.92493 17.0751 6.10352e-05 11 6.10352e-05C4.92487 6.10352e-05 0 4.92493 0 11.0001C0 17.0752 4.92487 22.0001 11 22.0001Z'
                fill='white'
              />
              <path
                d='M10.995 3.56006e-07C8.72889 0.00107183 6.51838 0.702112 4.66572 2.00708C2.81306 3.31205 1.40865 5.15726 0.644483 7.29065C-0.119684 9.42404 -0.206321 11.7414 0.396436 13.9259C0.999194 16.1104 2.26191 18.0554 4.01198 19.495V19.4591C4.06681 17.9537 4.7006 16.5275 5.78114 15.4779C6.86169 14.4283 8.30565 13.8362 9.81203 13.8251H9.88899C9.78199 13.7941 9.67202 13.7711 9.57002 13.7321C9.4499 13.6825 9.33242 13.6267 9.21803 13.5651C9.11803 13.5121 9.00602 13.4651 8.90602 13.4021C8.79845 13.3341 8.6946 13.2602 8.59498 13.181C8.50098 13.11 8.40702 13.0391 8.32002 12.9611C8.23302 12.8831 8.14503 12.7901 8.06203 12.7001C7.97903 12.6101 7.90003 12.517 7.82503 12.42C7.75003 12.323 7.68701 12.2311 7.62501 12.1321C7.56301 12.0331 7.49502 11.911 7.43702 11.796C7.37902 11.681 7.33698 11.596 7.29298 11.488C7.24425 11.363 7.20221 11.2356 7.16701 11.1061C7.13601 10.9991 7.10203 10.895 7.08003 10.785C7.05389 10.6415 7.03585 10.4966 7.02601 10.3511C7.01701 10.2511 7.00098 10.1511 6.99898 10.0421C6.99898 10.0241 6.99898 10.006 6.99898 9.98804C6.99898 9.86304 7.02502 9.74602 7.03602 9.62402C7.04702 9.50202 7.04202 9.40206 7.06202 9.28906C7.06202 9.27406 7.07203 9.26 7.07503 9.245C7.11208 9.07526 7.16048 8.90822 7.21998 8.745C7.24798 8.659 7.26698 8.56808 7.30098 8.48608C7.37012 8.32783 7.44999 8.17449 7.53999 8.0271C7.58299 7.9511 7.61699 7.86902 7.66499 7.79602C7.76843 7.64852 7.88135 7.50787 8.003 7.375C8.053 7.319 8.09401 7.25503 8.14601 7.20203C8.29094 7.05956 8.44635 6.92825 8.61098 6.80908C8.65098 6.77908 8.68698 6.74211 8.72798 6.70911C8.90502 6.59011 9.09128 6.48533 9.28499 6.396C9.32399 6.378 9.35802 6.35306 9.39802 6.33606C9.57779 6.26112 9.76295 6.19997 9.95198 6.15308C10.016 6.13508 10.076 6.10899 10.142 6.09399C10.3115 6.06219 10.4828 6.04116 10.655 6.03101C10.749 6.02301 10.84 6.00505 10.936 6.00305C10.96 6.00305 10.983 5.99609 11.007 5.99609C11.18 6.0028 11.3524 6.02079 11.523 6.05005C11.586 6.05805 11.647 6.05009 11.71 6.06409C11.7182 6.06693 11.7265 6.06923 11.735 6.07105C11.9489 6.11385 12.1589 6.17411 12.363 6.2511C12.409 6.2681 12.463 6.27702 12.505 6.29602C12.6933 6.37638 12.8752 6.47107 13.049 6.5791C13.098 6.6081 13.149 6.63001 13.2 6.66101C13.3589 6.77137 13.5099 6.8927 13.652 7.02405C13.699 7.06605 13.752 7.101 13.8 7.146C13.9337 7.28288 14.0574 7.42937 14.17 7.58411C14.209 7.63511 14.256 7.68406 14.292 7.73206C14.3891 7.88152 14.4763 8.03713 14.553 8.198C14.589 8.269 14.635 8.33508 14.667 8.40808C14.7204 8.54521 14.7665 8.68502 14.805 8.82703C14.839 8.93703 14.882 9.04408 14.905 9.15808C14.928 9.27208 14.933 9.39108 14.948 9.50708C14.9713 9.65645 14.986 9.80696 14.992 9.95801C14.992 9.97401 14.997 9.989 14.997 10.005C14.9951 10.227 14.9746 10.4485 14.936 10.6671C14.936 10.6821 14.936 10.6971 14.936 10.7111C14.8953 10.9307 14.8361 11.1465 14.759 11.3561C14.741 11.4081 14.715 11.4561 14.694 11.5071C14.6328 11.6602 14.5623 11.8095 14.483 11.9541C14.452 12.0101 14.416 12.0611 14.383 12.1151C14.3011 12.2475 14.2116 12.375 14.115 12.4971C14.074 12.5481 14.031 12.597 13.987 12.646C13.8842 12.761 13.7754 12.8705 13.661 12.974C13.613 13.017 13.561 13.059 13.515 13.099C13.3897 13.2004 13.258 13.294 13.121 13.379C13.073 13.41 13.026 13.4411 12.977 13.4701C12.813 13.5629 12.6426 13.6437 12.467 13.712C12.438 13.724 12.41 13.739 12.381 13.749C12.302 13.779 12.221 13.8011 12.14 13.8251H12.182C13.6892 13.8354 15.1342 14.4271 16.2159 15.4767C17.2976 16.5263 17.9324 17.9529 17.988 19.4591V19.495C19.7386 18.0549 21.0015 16.1092 21.6041 13.924C22.2066 11.7387 22.1193 9.42074 21.3541 7.28699C20.589 5.15324 19.1833 3.30789 17.3294 2.00354C15.4754 0.69919 13.2638 -0.00057621 10.997 3.56006e-07H10.995Z'
                fill='#e3e3e3'
              />
            </svg>
          )}
        </>
      )}

      {!isLoading && zoomImg && showZoomImage && (
        <PopupAvatarWrapper>
          <div
            className='zoom-image'
            ref={imgRef}
            css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ImageInstance
              source={source}
              alt={alt}
              size={{
                width: '100%',
                height: '100%',
                maxWidth: zoomUpImageSize ? zoomUpImageSize : (size as number) * 3.5,
                minWidth: zoomUpImageSize ? zoomUpImageSize : (size as number) * 3.5,
                maxHeight: zoomUpImageSize ? zoomUpImageSize : (size as number) * 3.5,
                minHeight: zoomUpImageSize ? zoomUpImageSize : (size as number) * 3.5,
              }}
              objectFit='cover'
              borderRadius={borderRadius}
              onClick={handleOnClick}
            />
          </div>
        </PopupAvatarWrapper>
      )}
    </>
  );
};

export default Avatar;
