/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import {
  BorderLayoutElement,
  BorderType,
} from "../types/props/BorderPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Border = React.forwardRef<
  HTMLElement,
  BorderLayoutElement & LayoutPropsRef
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
    fill,
    radius,
    stroke,
    position,
    strokeColor,
    shape,
    shadow,
    opacity,
    zIndex,
    transition,
    cursor,
    userSelect,
    _mq = {},
    css: cssProp,
    ...rest
  } = props;

  const pPs = {
    w,
    maxW,
    minW,
    h,
    maxH,
    minH,
    fill,
    radius,
    stroke,
    position,
    strokeColor,
    shape,
    shadow,
    opacity,
  };

  const Component = as || "div";

  //
  // extended props styles
  const ExtendedStyles = (props: BorderType) => {
    return {
      width: props?.w,
      maxWidth: props?.maxW,
      minWidth: props?.minW,
      height: props?.h,
      maxHeight: props?.maxH,
      minHeight: props?.minH,
      backgroundColor: props?.fill,
      ...borderStylesProps({
        radius: props.radius,
        stroke: props.stroke,
        position: props.position,
        color: props.strokeColor,
        shape: props.shape,
      }),
      ...(props.shadow && shadowStylesProps(props.shadow)),
      opacity: props.opacity,
    };
  };

  //
  // base style
  const baseStyle = useMemo(
    () =>
      css({
        position: "relative",
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
  const combinedStyles = useMemo(
    () => css`
      ${baseStyle}
      ${ExtendedStyles({
        ...pPs,
        radius: pPs.radius ?? 16,
        w: pPs.w ?? "100%",
      })}
      ${mediaStyles}
    `,
    [baseStyle, pPs, mediaStyles]
  );

  const combinedClassName = cx(`dble-border${as ? `-${as}` : ""}`, className);
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

export default Border;
