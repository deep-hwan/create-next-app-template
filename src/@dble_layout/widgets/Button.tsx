/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, CSSObject, SerializedStyles } from "@emotion/react";
import React, { ComponentPropsWithoutRef, useCallback, useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { gradientStylesProps } from "../styles/gradientStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { typographyStylesProps } from "../styles/typographyStylesProps";
import { BorderType } from "../types/piece/BorderType";
import { GradientType } from "../types/piece/GradientType";
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
    // pPs 객체를 useMemo로 감싸서 의존성 경고 해결
    const pPs = useMemo(
      () => ({
        w,
        maxW,
        minW,
        h,
        maxH,
        minH,
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
      }),
      [
        w,
        maxW,
        minW,
        h,
        maxH,
        minH,
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
      ]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (rest?.onClick) rest?.onClick(event);
      },
      [rest]
    );

    //
    // ExtendedStyles: 반환 타입을 CSSObject로 지정
    const ExtendedStyles = (props: ButtonType) => {
      const styles = {
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

      return styles as CSSObject;
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
      () =>
        createMediaStyles(_mq, (styles: ButtonType) =>
          css(ExtendedStyles(styles))
        ),
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
    // combined styles: 템플릿 리터럴 대신 배열을 사용하여 여러 스타일을 병합
    const combinedStyles: SerializedStyles = useMemo(
      () =>
        css([
          baseStyle,
          ExtendedStyles({
            ...pPs,
            w: pPs.w ?? 100,
            h: pPs.h ?? 48,
            txtAlign: pPs.txtAlign ?? "center",
            fill: pPs.fill ?? "#5b94f0",
            gradient: {
              ...pPs.gradient,
              type: pPs.gradient?.type ?? "linear",
            } as GradientType,
            border: {
              ...pPs.border,
              radius: pPs.border?.radius ?? 15,
            } as BorderType,
            txtSize: pPs.txtSize ?? 15,
            txtColor: pPs.txtColor ?? "#fbfbfb",
            whiteSpace: pPs.whiteSpace ?? "nowrap",
          }),
          mediaStyles,
          pseudoStyles,
        ]),
      [baseStyle, pPs, mediaStyles, pseudoStyles]
    );

    const combinedClassName = cx("dble-button", className);

    return (
      <button
        ref={ref}
        className={combinedClassName}
        css={css([combinedStyles, cssProp])}
        onClick={handleClick}
        {...(rest as ComponentPropsWithoutRef<"button">)}
      >
        {children}
      </button>
    );
  }
);

// eslint 경고 해결을 위해 displayName 지정
Button.displayName = "Button";

export { Button };
