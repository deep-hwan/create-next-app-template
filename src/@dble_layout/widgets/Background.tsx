/** @jsxImportSource @emotion/react */

"use client";
import { cx } from "@emotion/css";
import { css, SerializedStyles } from "@emotion/react";
import { ElementType, forwardRef, useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { gradientStylesProps } from "../styles/gradientStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import {
  BackgroundLayoutElement,
  BackgroundType,
} from "../types/props/BackgroundPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

// Use a polymorphic component pattern with proper typing
const Background = forwardRef<
  HTMLElement,
  BackgroundLayoutElement & LayoutPropsRef
>((props, ref) => {
  const {
    as,
    children,
    className,
    w,
    maxW,
    minW,
    h,
    maxH,
    minH,
    flex,
    fill,
    imageFill,
    gradient,
    border,
    shadow,
    blur,
    opacity,
    scale,
    rotate,
    zIndex,
    transition,
    cursor,
    userSelect,
    _mq = {},
    css: cssProp,
    ...rest
  } = props;

  //
  // extended props styles
  const ExtendedStyles = (props: BackgroundType): SerializedStyles => {
    return css({
      width: props?.w,
      maxWidth: props?.maxW,
      minWidth: props?.minW,
      height: props?.h,
      maxHeight: props?.maxH,
      minHeight: props?.minH,
      flex: props?.flex,
      backgroundColor: props.fill,
      backgroundRepeat: props.imageFill?.repeat,
      backgroundSize: props.imageFill?.size,
      backgroundPosition: props.imageFill?.position,
      backgroundImage: props.imageFill?.url
        ? `url(${props.imageFill.url})`
        : undefined,
      backgroundClip: props.imageFill?.clip,
      filter: !!props.blur ? `blur(${props.blur}px)` : undefined,
      ...gradientStylesProps(props.gradient),
      ...(props.border && borderStylesProps(props.border)),
      ...(props.shadow && shadowStylesProps(props.shadow)),
      ...transformStylesProps({
        scale: props.scale,
        rotate: props.rotate,
      }),
      opacity: props.opacity,
    });
  };

  //
  // base style
  const baseStyle = useMemo(
    () =>
      css({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...baseStylesProps({
          transition,
          zIndex,
          cursor,
          userSelect,
          onClick: rest.onClick,
          onMouseEnter: rest.onMouseEnter,
        }),
      }),
    [cursor, rest.onClick, rest.onMouseEnter, transition, zIndex, userSelect]
  );

  //
  // media-query styles
  const mediaStyles = useMemo(
    () => createMediaStyles(_mq, ExtendedStyles),
    [_mq]
  );

  //
  // combined styles
  const combinedStyles = useMemo(() => {
    const pPs = {
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      flex,
      fill,
      imageFill,
      gradient,
      border,
      shadow,
      blur,
      opacity,
      scale,
      rotate,
    };

    return css`
      ${baseStyle}
      ${ExtendedStyles({
        ...pPs,
        w: pPs.w ?? "100%",
        h: pPs.h ?? (pPs.flex === 1 ? "100%" : undefined),
      })}
        ${mediaStyles}
    `;
  }, [
    baseStyle,
    mediaStyles,
    w,
    maxW,
    minW,
    h,
    maxH,
    minH,
    flex,
    fill,
    imageFill,
    gradient,
    border,
    shadow,
    blur,
    opacity,
    scale,
    rotate,
  ]);

  const Component = (as || "div") as ElementType;
  const combinedClassName = cx(
    `dble-background${as ? `-${as}` : ""}`,
    className
  );

  return (
    <Component
      ref={ref}
      className={combinedClassName}
      css={css([combinedStyles, cssProp])}
      {...rest}
    >
      {children}
    </Component>
  );
});

Background.displayName = "Background";

export default Background;
