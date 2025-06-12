/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, CSSObject } from "@emotion/react";
import Link from "next/link";
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
  LinkHrefLayoutElement,
  LinkHrefType,
} from "../types/props/LinkHrefPropsType";

const LinkHref = React.forwardRef<
  HTMLAnchorElement,
  LinkHrefLayoutElement & LayoutPropsRef
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
      href,
      target,
      ...rest
    },
    ref
  ) => {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        if (rest?.onClick) {
          rest?.onClick(event);
        }
      },
      [disabled, rest]
    );

    //
    // extended props styles
    const ExtendedStyles = (props: LinkHrefType & { as?: LinkHrefType }) => {
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
          textDecoration: "none",
          ...baseStylesProps({
            transition,
            zIndex,
            cursor: disabled ? "default" : cursor,
            userSelect,
            onClick: rest.onClick,
            onMouseEnter: rest.onMouseEnter,
          }),
        }),
      [
        cursor,
        disabled,
        rest.onClick,
        rest.onMouseEnter,
        transition,
        zIndex,
        userSelect,
      ]
    );

    //
    // media-query styles
    const mediaStyles = useMemo(() => {
      if (!_mq || Object.keys(_mq).length === 0) {
        return css({});
      }

      const mediaStylesObject: { [key: string]: any } = {};

      // Process each breakpoint in _mq
      Object.entries(_mq).forEach(([breakpoint, styles]) => {
        if (styles) {
          // Extract the numeric value from breakpoint (e.g., 'w600' -> '600')
          const breakpointValue = breakpoint.substring(1);
          const mediaQuery = `@media (max-width: ${breakpointValue}px)`;

          // Apply ExtendedStyles to the breakpoint styles
          const breakpointStyles = ExtendedStyles(styles as LinkHrefType);
          mediaStylesObject[mediaQuery] = breakpointStyles;
        }
      });

      return css(mediaStylesObject);
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
        txtColor: pPs.txtColor ?? "#5b94f0",
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

    const combinedClassName = cx(`dble-linkHref`, className);

    // Extract only the Link specific props
    const linkProps = {
      href,
      passHref: true,
      legacyBehavior: true,
    };

    // Extract only the anchor specific props
    const anchorProps = {
      className: combinedClassName,
      onClick: handleClick,
      ref,
      target: target,
    };

    // If disabled, prevent navigation by using div instead of Link
    if (disabled) {
      return (
        <div
          className={combinedClassName}
          css={css([combinedStyles, cssProp])}
          aria-disabled="true"
        >
          {children}
        </div>
      );
    }

    return (
      <Link itemProp="url" {...linkProps}>
        <a {...anchorProps} css={css([combinedStyles, cssProp])} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);

LinkHref.displayName = "LinkHref";

export default LinkHref;
