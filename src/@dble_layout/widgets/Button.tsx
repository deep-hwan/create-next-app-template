/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { ComponentPropsWithoutRef, useCallback, useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { gradientStylesProps } from "../styles/gradientStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { typographyStylesProps } from "../styles/typographyStylesProps";
import {
  ButtonLayoutElement,
  ButtonType,
} from "../types/props/ButtonPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonLayoutElement & ComponentPropsWithoutRef<"button">
>(
  (
    {
      children,
      className,
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,

      // typography
      txtSize,
      txtWeight,
      txtAlign,
      txtColor,
      txtShadow,
      txtTransform,
      lineHeight,
      whiteSpace,

      fill,
      gradient,
      border,
      shadow,
      opacity,
      scale,

      zIndex,
      cursor,
      userSelect = "none",
      transition = { duration: 0.2, type: "ease-in-out" },

      _hover,
      _focus,
      _active,
      _disabled,
      _mq = {},
      css: cssProp,
      ...rest
    },
    ref
  ) => {
    const pPs = {
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      //
      txtSize,
      txtWeight,
      txtAlign,
      txtColor,
      txtShadow,
      txtTransform,
      lineHeight,
      whiteSpace,

      //
      fill,
      gradient,
      border,
      shadow,
      opacity,
      scale,
    };

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (rest?.onClick) rest?.onClick(event);
      },
      [rest?.onClick]
    );

    //
    // extended props styles
    const ExtendedStyles = (props: ButtonType) => {
      return {
        width: props?.w,
        maxWidth: props?.maxW,
        minWidth: props?.minW,
        height: props?.h,
        maxHeight: props?.maxH,
        minHeight: props?.minH,

        ...typographyStylesProps({
          txtSize: props.txtSize,
          txtWeight: props.txtWeight,
          txtAlign: props.txtAlign,
          txtColor: props.txtColor,
          txtShadow: props.txtShadow,
          txtTransform: props.txtTransform,
          lineHeight: props.lineHeight,
          whiteSpace: props.whiteSpace,
        }),
        opacity: props.opacity,
        backgroundColor: props.fill,
        ...gradientStylesProps(props.gradient),
        ...borderStylesProps(props.border ?? {}),
        ...shadowStylesProps(props.shadow),
        ...transformStylesProps({ scale: props.scale }),
      };
    };

    //
    // base style
    const baseStyle = useMemo(
      () =>
        css({
          position: "relative",
          display: "inline-block",
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
          "&:hover": ExtendedStyles({
            ..._hover,
            opacity: _hover?.opacity ?? 0.9,
          }),
          "&:focus": ExtendedStyles(_focus || {}),
          "&:active": ExtendedStyles({
            ..._active,
            opacity: _active?.opacity ?? 0.75,
          }),
          "&:disabled": ExtendedStyles({
            ..._disabled,
            fill: "#f0f0f0",
            txtColor: _disabled?.txtColor ?? "#aaa",
          }),
        }),
      [_hover, _focus, _active, _disabled]
    );

    //
    // combined styles
    const combinedStyles = useMemo(
      () => css`
        ${baseStyle}
        ${ExtendedStyles({
          ...pPs,
          w: pPs.w ?? 100,
          h: pPs.h ?? 48,
          txtAlign: pPs.txtAlign ?? "center",
          fill: pPs.fill ?? "#5b94f0",

          gradient: {
            ...pPs.gradient,
            type: pPs.gradient?.type ?? "linear",
          } as any,

          border: {
            ...pPs.border,
            radius: pPs.border?.radius ?? 15,
          } as any,
          txtSize: pPs.txtSize ?? 15,
          txtColor: pPs.txtColor ?? "#fbfbfb",
          whiteSpace: pPs.whiteSpace ?? "nowrap",
        })}
    ${mediaStyles}
    ${pseudoStyles}
      `,
      [baseStyle, pPs, mediaStyles, pseudoStyles]
    );

    const combinedClassName = cx("dble-button", className);

    return (
      <button
        ref={ref}
        className={combinedClassName}
        css={css([combinedStyles, cssProp])}
        onClick={handleClick}
        {...(rest as any)}
      >
        {children}
      </button>
    );
  }
);

export { Button };
