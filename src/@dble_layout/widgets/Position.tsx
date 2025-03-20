/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { ComponentPropsWithoutRef, useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { LayoutElementType } from "../types/piece/LayoutElementType";
import {
  PositionPropsType,
  PositionType,
} from "../types/props/PositionPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Position = React.forwardRef<
  HTMLElement,
  PositionPropsType<LayoutElementType> &
    ComponentPropsWithoutRef<LayoutElementType>
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
    type,
    top,
    bottom,
    left,
    right,
    axis,
    zIndex,
    transition,
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
    type,
    top,
    bottom,
    left,
    right,
    axis,
  };

  const Component = as || "div";

  //
  // extended props styles
  const ExtendedStyles = (props: PositionType) => {
    return {
      width: props?.w,
      maxWidth: props?.maxW,
      minWidth: props?.minW,
      height: props?.h,
      maxHeight: props?.maxH,
      minHeight: props?.minH,

      display: "flex",

      position: props.type,
      top: props.top,
      bottom: props.bottom,
      left: props.left,
      right: props.right,
      transform: axis
        ? `translate(${
            typeof axis.x === "number" ? `${axis.x}px` : axis.x ?? "0"
          }, ${typeof axis.y === "number" ? `${axis.y}px` : axis.y ?? "0"})`
        : undefined,
    };
  };

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
      ${baseStylesProps({ transition, zIndex })}
      ${ExtendedStyles({ ...pPs, type: pPs.type ?? "relative" })}
      ${mediaStyles}
    `,
    [pPs, mediaStyles]
  );

  const combinedClassName = cx("dble-position", className);
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

export default Position;
