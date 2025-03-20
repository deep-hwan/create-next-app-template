/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
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

      // flex
      direc,
      isReverse,
      align,
      justify,
      gap,
      wrap,

      // typography
      txtSize,
      txtWeight,
      txtAlign,
      txtColor,
      txtShadow,
      txtTransform,
      lineHeight,
      whiteSpace,

      // padding
      padding,

      // background
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
    const pPs = {
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,

      //
      direc,
      isReverse,
      align,
      justify,
      gap,
      wrap,

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
      padding,

      //
      fill,
      gradient,
      border,
      shadow,
      opacity,
      scale,
    };

    const Component = as || "div";

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (rest?.onClick) rest?.onClick(event as any);
      },
      [rest?.onClick]
    );

    //
    // extended props styles
    const ExtendedStyles = (
      props: TouchableOpacityType & { as?: TouchableOpacityType }
    ) => {
      return {
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
      };
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
          "&:active": ExtendedStyles({
            ..._active,
            opacity: _active?.opacity ?? 0.75,
          }),
          "&:disabled": ExtendedStyles({
            ..._disabled,
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
          direc: pPs.direc ?? "row",
          txtSize: pPs.txtSize ?? 15,
          txtColor: pPs.txtColor ?? "#5b94f0",
          whiteSpace: pPs.whiteSpace ?? "nowrap",
        })}
    ${mediaStyles}
    ${pseudoStyles}
      `,
      [baseStyle, pPs, mediaStyles, pseudoStyles]
    );

    const combinedClassName = cx(
      `dble-touchableOpacity${as ? `-${as}` : ""}`,
      className
    );

    return (
      <Component
        ref={ref}
        className={combinedClassName}
        css={css([combinedStyles, cssProp])}
        onClick={disabled ? undefined : handleClick}
        disabled={disabled}
        {...(rest as any)}
      >
        {children}
      </Component>
    );
  }
);

export default TouchableOpacity;
