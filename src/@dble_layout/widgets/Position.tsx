/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, SerializedStyles } from "@emotion/react";
import React, { ComponentPropsWithoutRef, useCallback, useMemo } from "react";
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

  const Component = as || "div";

  //
  // extended props styles
  const ExtendedStyles = useCallback(
    (props: PositionType): SerializedStyles => {
      return css({
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
      });
    },
    [axis]
  );

  //
  // media-query styles
  const mediaStyles = useMemo(
    () => createMediaStyles(_mq, ExtendedStyles),
    [_mq, ExtendedStyles]
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
      type,
      top,
      bottom,
      left,
      right,
      axis,
    };

    return css`
      ${baseStylesProps({ transition, zIndex })}
      ${ExtendedStyles({ ...pPs, type: pPs.type ?? "relative" })}
        ${mediaStyles}
    `;
  }, [
    mediaStyles,
    ExtendedStyles,
    transition,
    zIndex,
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
  ]);

  const combinedClassName = cx("dble-position", className);
  return (
    <Component
      ref={ref as never}
      className={combinedClassName}
      css={css([combinedStyles, cssProp])}
      {...(rest as React.HTMLAttributes<HTMLElement>)}
    >
      {children}
    </Component>
  );
});

Position.displayName = "Position";

export default Position;
