/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { flexStylesProps } from "../styles/flexStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { spaceStylesProps } from "../styles/spaceStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import { LayerLayoutElement, LayerType } from "../types/props/LayerPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Layer = React.forwardRef<
  HTMLElement,
  LayerLayoutElement & LayoutPropsRef
>((props, ref) => {
  const {
    as,
    children,
    className,

    // layout
    w,
    maxW,
    minW,
    h,
    maxH,
    minH,

    // flex
    flex,
    direc,
    isReverse,
    align,
    justify,
    gap,
    order,

    // position
    position,

    // padding
    padding,

    // margin
    margin,

    // background
    fill,
    border,
    shadow,
    blur,
    opacity,
    scale,
    rotate,

    //
    zIndex,
    transition,
    cursor,
    userSelect,

    //active
    _hover,
    _focus,
    _active,
    _mq = {},
    css: cssProp,
    ...rest
  } = props;

  const pPs = {
    // layout
    w,
    maxW,
    minW,
    h,
    maxH,
    minH,

    // flex
    flex,
    direc,
    isReverse,
    align,
    justify,
    gap,
    order,

    // position
    position,

    // padding
    padding,

    // margin
    margin,

    // background
    fill,
    border,
    shadow,
    blur,
    opacity,
    scale,
    rotate,
  };

  const Component = as || "div";

  //
  // extended props styles
  const ExtendedStyles = (props: LayerType) => {
    return {
      width: props?.w,
      maxWidth: props?.maxW,
      minWidth: props?.minW,
      height: props?.h,
      maxHeight: props?.maxH,
      minHeight: props?.minH,

      // flex
      ...flexStylesProps({
        flex: props.flex,
        direc: props.direc,
        isReverse: props.isReverse,
        align: props.align,
        justify: props.justify,
        gap: props.gap,
        wrap: props.wrap,
        order: props.order,
      }),

      // position
      position: props?.position?.type,
      top: props?.position?.top,
      bottom: props?.position?.bottom,
      left: props?.position?.left,
      right: props?.position?.right,
      transform: props?.axis
        ? `translate(${
            typeof props?.axis?.x === "number"
              ? `${props?.axis?.x}px`
              : props?.axis?.x ?? "0"
          }, ${
            typeof props?.axis?.y === "number"
              ? `${props?.axis?.y}px`
              : props?.axis?.y ?? "0"
          })`
        : undefined,

      // padding
      ...spaceStylesProps({
        padding: {
          all: props.padding?.all,
          horizontal: props.padding?.horizontal,
          vertical: props.padding?.vertical,
          top: props.padding?.top,
          bottom: props.padding?.bottom,
          left: props.padding?.left,
          right: props.padding?.right,
        },
        margin: {
          all: props.margin?.all,
          horizontal: props.margin?.horizontal,
          vertical: props.margin?.vertical,
          top: props.margin?.top,
          bottom: props.margin?.bottom,
          left: props.margin?.left,
          right: props.margin?.right,
        },
      }),

      // background
      backgroundColor: props.fill,
      ...(props.border && borderStylesProps(props.border)),
      ...(props.shadow && shadowStylesProps(props.shadow)),
      ...transformStylesProps({
        scale: props.scale,
        rotate: props.rotate,
      }),
      opacity: props.opacity,
    };
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
  // pseudos
  const pseudoStyles = useMemo(
    () =>
      css({
        "&:hover": ExtendedStyles({ ..._hover }),
        "&:focus": ExtendedStyles({ ..._focus }),
        "&:active": ExtendedStyles({ ..._active }),
      }),
    [_hover, _focus, _active]
  );

  //
  // combined styles
  const combinedStyles = useMemo(
    () => css`
      ${baseStyle}
      ${ExtendedStyles({
        ...pPs,
        w: pPs.w ?? "100%",
        h: pPs.h ?? (pPs.flex === 1 ? "100%" : undefined),
        direc: pPs.direc ?? "column",
      })}
      ${mediaStyles}
      ${pseudoStyles}
    `,
    [baseStyle, pPs, mediaStyles, pseudoStyles]
  );

  const combinedClassName = cx(`dble-layer${as ? `-${as}` : ""}`, className);
  return (
    <Component
      ref={ref}
      className={combinedClassName}
      css={css([combinedStyles, cssProp])}
      {...(rest as any)}
    >
      {children}
    </Component>
  );
});

export default Layer;
