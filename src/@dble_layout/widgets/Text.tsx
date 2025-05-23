/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, CSSObject } from "@emotion/react";
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
      wordBreak = "keep-all",
      wordWrap = "break-word",
      overflowWrap = "break-word",
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
    const Component = as || "p";

    //
    // extended props styles
    const ExtendedStyles = (props: TextType & { as?: TextElementType }) => {
      const styles = {
        width: props?.w,
        maxWidth: props?.maxW,
        minWidth: props?.minW,
        height: props?.h,
        maxHeight: props?.maxH,
        minHeight: props?.minH,

        opacity: props.opacity,
        wordBreak: props.wordBreak,
        wordWrap: props.wordWrap,
        overflowWrap: props.overflowWrap,

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

      // Using a type assertion to solve the CSSObject type issue
      return css(styles as CSSObject);
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
    const mediaStyles = useMemo(() => {
      // This conversion is needed to fix the type issue with createMediaStyles
      const stylesFunction = (styles: TextType) => {
        return ExtendedStyles(styles);
      };
      return createMediaStyles(_mq, stylesFunction);
    }, [_mq]);

    //
    // pseudos
    const pseudoStyles = useMemo(() => {
      const hoverStyles = _hover ? ExtendedStyles(_hover) : css({});
      const focusStyles = _focus ? ExtendedStyles(_focus) : css({});
      const activeStyles = _active ? ExtendedStyles(_active) : css({});

      return css`
        &:hover {
          ${hoverStyles}
        }
        &:focus {
          ${focusStyles}
        }
        &:active {
          ${activeStyles}
        }
      `;
    }, [_hover, _focus, _active]);

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
        wordBreak,
        wordWrap,
        overflowWrap,
      };

      const baseProps = {
        ...pPs,
        size: pPs.size ?? 15,
        color: pPs.color ?? "#414243",
        whiteSpace: pPs.whiteSpace ?? "pre-line",
        align: pPs.align ?? "start",
      };

      const baseStyles = ExtendedStyles(baseProps);

      return css`
        ${baseStyle}
        ${baseStyles}
          ${mediaStyles}
          ${pseudoStyles}
      `;
    }, [
      baseStyle,
      mediaStyles,
      pseudoStyles,
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
      wordBreak,
      wordWrap,
      overflowWrap,
    ]);

    const combinedClassName = cx(`dble-text${as ? `-${as}` : ""}`, className);

    // Define a proper type for rest props
    type RestProps = Omit<
      React.HTMLAttributes<HTMLElement>,
      keyof TextLayoutElement & TextPropsRef
    >;

    return (
      <Component
        // Using `as any` here is acceptable as we need to deal with complex component ref typing
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={combinedClassName}
        css={css([combinedStyles, cssProp])}
        {...(rest as RestProps)}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export default Text;
