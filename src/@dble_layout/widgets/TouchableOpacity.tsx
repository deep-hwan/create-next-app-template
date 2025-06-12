/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, CSSObject } from "@emotion/react";
import React, { useCallback, useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { flexStylesProps } from "../styles/flexStylesProps";
import { gradientStylesProps } from "../styles/gradientStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { spaceStylesProps } from "../styles/spaceStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { typographyStylesProps } from "../styles/typographyStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import {
  TouchableOpacityLayoutElement,
  TouchableOpacityType,
} from "../types/props/TouchableOpacitPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const TouchableOpacity = React.forwardRef<
  HTMLElement,
  TouchableOpacityLayoutElement & LayoutPropsRef
>(
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
      direc,
      isReverse,
      align,
      justify,
      gap,
      wrap,
      txtSize,
      txtWeight,
      txtAlign,
      txtColor,
      txtShadow,
      txtTransform,
      lineHeight,
      whiteSpace,
      padding,
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
      disabled,
      css: cssProp,
      ...rest
    },
    ref
  ) => {
    const Component = as || "div";

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (rest?.onClick)
          rest?.onClick(event as React.MouseEvent<HTMLElement>);
      },
      [rest]
    );

    //
    // extended props styles
    const ExtendedStyles = (
      props: TouchableOpacityType & { as?: TouchableOpacityType }
    ) => {
      const styles = {
        width: props?.w,
        maxWidth: props?.maxW,
        minWidth: props?.minW,
        height: props?.h,
        maxHeight: props?.maxH,
        minHeight: props?.minH,

        ...flexStylesProps({
          direc: props.direc,
          isReverse: props.isReverse,
          align: props.align,
          justify: props.justify,
          gap: props.gap,
          wrap: props.wrap,
        }),

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

        ...spaceStylesProps({ padding: props.padding }),

        opacity: props.opacity,
        backgroundColor: props.fill,
        ...gradientStylesProps(props.gradient),
        ...borderStylesProps(props.border ?? {}),
        ...shadowStylesProps(props.shadow),
        ...transformStylesProps({ scale: props.scale }),

        // Ensure txtColor has proper specificity
        ...(props.txtColor && {
          color: `${props.txtColor} !important`,
          "& *": {
            color: `inherit !important`,
          },
        }),
      };

      return css(styles as CSSObject);
    };

    //
    // base style
    const baseStyle = useMemo(
      () =>
        css({
          position: "relative",
          display: "flex",
          ...baseStylesProps({
            transition,
            zIndex,
            cursor: disabled ? "default" : cursor,
            userSelect: userSelect ?? (rest?.onClick && "none"),
            onClick: rest.onClick,
            onMouseEnter: rest.onMouseEnter,
          }),
          ...(rest?.onClick
            ? {
                "div, h1, h2, h3, h4, h5, h6, p, a, li, ul, span, b": {
                  userSelect: "none",
                  // Don't override color here, let txtColor prop take precedence
                },
              }
            : {}),
          // Ensure button/link styling doesn't override txtColor
          "&, & *": {
            ...(txtColor && { color: txtColor }),
          },
        }),
      [
        cursor,
        disabled,
        rest.onClick,
        rest.onMouseEnter,
        transition,
        zIndex,
        userSelect,
        txtColor,
      ]
    );

    //
    // media-query styles
    const mediaStyles = useMemo(() => {
      const stylesFunction = (styles: TouchableOpacityType) => {
        return ExtendedStyles(styles);
      };
      return createMediaStyles(_mq, stylesFunction);
    }, [_mq]);

    //
    // pseudos
    const pseudoStyles = useMemo(() => {
      const hoverStyles = _hover ? ExtendedStyles(_hover) : css({});
      const focusStyles = _focus
        ? ExtendedStyles({
            ..._focus,
            opacity: _focus?.opacity ?? 0.75,
            scale: _focus?.scale ?? 0.98,
          })
        : css({
            opacity: 0.75,
            transform: "scale(0.98)",
          });
      const activeStyles = _active
        ? ExtendedStyles({
            ..._active,
            opacity: _active?.opacity ?? 0.75,
            scale: _active?.scale ?? 0.98,
          })
        : css({
            opacity: 0.75,
            transform: "scale(0.98)",
          });
      const disabledStyles = _disabled
        ? ExtendedStyles({
            ..._disabled,
            txtColor: _disabled?.txtColor ?? "#aaa",
          })
        : css({});

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
        &:disabled {
          ${disabledStyles}
        }
      `;
    }, [_hover, _focus, _active, _disabled]);

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
        direc,
        isReverse,
        align,
        justify,
        gap,
        wrap,
        txtSize,
        txtWeight,
        txtAlign,
        txtColor,
        txtShadow,
        txtTransform,
        lineHeight,
        whiteSpace,
        padding,
        fill,
        gradient,
        border,
        shadow,
        opacity,
        scale,
      };

      const baseProps = {
        ...pPs,
        direc: pPs.direc ?? "row",
        txtSize: pPs.txtSize ?? 15,
        txtColor: pPs.txtColor,
        whiteSpace: pPs.whiteSpace ?? "nowrap",
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
      direc,
      isReverse,
      align,
      justify,
      gap,
      wrap,
      txtSize,
      txtWeight,
      txtAlign,
      txtColor,
      txtShadow,
      txtTransform,
      lineHeight,
      whiteSpace,
      padding,
      fill,
      gradient,
      border,
      shadow,
      opacity,
      scale,
    ]);

    const combinedClassName = cx(
      `dble-touchableOpacity${as ? `-${as}` : ""}`,
      className
    );

    // Define a proper type for rest props
    type RestProps = Omit<
      React.HTMLAttributes<HTMLElement>,
      keyof TouchableOpacityLayoutElement & LayoutPropsRef
    >;

    return (
      <Component
        ref={ref}
        className={combinedClassName}
        css={css([combinedStyles, cssProp])}
        onClick={disabled ? undefined : handleClick}
        disabled={disabled}
        {...(rest as RestProps)}
      >
        {children}
      </Component>
    );
  }
);

TouchableOpacity.displayName = "TouchableOpacity";

export default TouchableOpacity;
