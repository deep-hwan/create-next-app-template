/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, SerializedStyles } from "@emotion/react";
import React, { useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { gridStylesProps } from "../styles/gridStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import { GridLayoutElement, GridType } from "../types/props/GridPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Grid = React.forwardRef<HTMLElement, GridLayoutElement & LayoutPropsRef>(
  (props, ref) => {
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
      templateColumns,
      templateRows,
      templateAreas,
      gap,
      autoFlow,
      autoColumns,
      autoRows,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      zIndex,
      transition,
      _mq = {},
      css: cssProp,
      ...rest
    } = props;

    const Component = as || "div";

    //
    // extended props styles
    const ExtendedStyles = (props: GridType): SerializedStyles => {
      return css({
        width: props?.w,
        maxWidth: props?.maxW,
        minWidth: props?.minW,
        height: props?.h,
        maxHeight: props?.maxH,
        minHeight: props?.minH,

        display: "grid",

        ...gridStylesProps({
          templateColumns: props.templateColumns,
          templateRows: props.templateRows,
          templateAreas: props.templateAreas,
          gap: props.gap,
          autoFlow: props.autoFlow,
          autoColumns: props.autoColumns,
          autoRows: props.autoRows,
          justifyItems: props.justifyItems,
          alignItems: props.alignItems,
          justifyContent: props.justifyContent,
          alignContent: props.alignContent,
        }),
      });
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
          }),
        }),
      [transition, zIndex]
    );

    //
    // media-query styles
    const mediaStyles = useMemo(
      () => createMediaStyles(_mq, ExtendedStyles),
      [_mq]
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
        templateColumns,
        templateRows,
        templateAreas,
        gap,
        autoFlow,
        autoColumns,
        autoRows,
        justifyItems,
        alignItems,
        justifyContent,
        alignContent,
      };

      return css`
        ${baseStyle}
        ${ExtendedStyles({
          ...pPs,
          w: pPs.w ?? "100%",
        })}
          ${mediaStyles}
      `;
    }, [
      baseStyle,
      mediaStyles,
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      templateColumns,
      templateRows,
      templateAreas,
      gap,
      autoFlow,
      autoColumns,
      autoRows,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
    ]);

    const combinedClassName = cx(`dble-grid${as ? `-${as}` : ""}`, className);
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
  }
);

Grid.displayName = "Grid";

export default Grid;
