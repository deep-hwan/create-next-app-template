/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { spaceStylesProps } from "../styles/spaceStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { typographyStylesProps } from "../styles/typographyStylesProps";
import {
  TextElementType,
  TextLayoutElement,
  TextPropsRef,
  TextType,
} from "../types/props/TextPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Text = React.forwardRef<HTMLElement, TextLayoutElement & TextPropsRef>(
  (
    {
      as,
      children,
      className,
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      padding,
      margin,
      size,
      weight,
      align,
      color,
      shadow,
      transform,
      decoration,
      lineHeight,
      whiteSpace,
      ellipsis,
      opacity,
      scale,
      rotate,
      zIndex,
      userSelect,
      transition = { duration: 0.25, type: "ease-in-out" },
      _hover,
      _focus,
      _active,
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
      padding,
      margin,
      size,
      weight,
      align,
      color,
      shadow,
      transform,
      decoration,
      lineHeight,
      whiteSpace,
      ellipsis,
      opacity,
      scale,
      rotate,
    };

    const Component = as || "p";

    //
    // extended props styles
    const ExtendedStyles = (props: TextType & { as?: TextElementType }) => {
      return {
        width: props?.w,
        maxWidth: props?.maxW,
        minWidth: props?.minW,
        height: props?.h,
        maxHeight: props?.maxH,
        minHeight: props?.minH,

        opacity: props.opacity,

        ...typographyStylesProps({
          as: props.as,
          txtSize: props.size,
          txtWeight: props.weight,
          txtAlign: props.align,
          txtColor: props.color,
          txtShadow: props.shadow,
          txtTransform: props.transform,
          lineHeight: props.lineHeight,
          whiteSpace: props.whiteSpace,
          ellipsis: props.ellipsis,
          txtDecoration: props.decoration,
        }),

        ...spaceStylesProps({ padding: props.padding, margin: props.margin }),

        ...transformStylesProps({
          scale: props.scale,
          rotate: props.rotate,
        }),
      };
    };

    //
    // base style
    const baseStyle = useMemo(
      () =>
        css({
          ...baseStylesProps({
            transition,
            zIndex,
            userSelect,
            onClick: rest.onClick,
            onMouseEnter: rest.onMouseEnter,
          }),
        }),
      [rest.onClick, rest.onMouseEnter, transition, zIndex, userSelect]
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
          "&:hover": ExtendedStyles(_hover || {}),
          "&:focus": ExtendedStyles(_focus || {}),
          "&:active": ExtendedStyles(_active || {}),
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
          size: pPs.size ?? 15,
          color: pPs.color ?? "#5d5d5f",
          whiteSpace: pPs.whiteSpace ?? "pre-line",
          align: pPs.align ?? "start",
        })}
    ${mediaStyles}
    ${pseudoStyles}
      `,
      [baseStyle, pPs, mediaStyles, pseudoStyles]
    );

    const combinedClassName = cx(`dble-text${as ? `-${as}` : ""}`, className);

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
  }
);

export default Text;
