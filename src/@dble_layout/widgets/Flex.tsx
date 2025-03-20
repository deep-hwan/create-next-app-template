/** @jsxImportSource @emotion/react */
import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { flexStylesProps } from "../styles/flexStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import { FlexLayoutElement, FlexType } from "../types/props/FlexPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Flex = React.forwardRef<HTMLElement, FlexLayoutElement & LayoutPropsRef>(
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
      flex,
      direc,
      isReverse,
      align,
      justify,
      gap,
      order,
      grow,
      shrink,
      basis,
      alignContent,
      alignSelf,
      wrap,
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
      flex,
      direc,
      isReverse,
      align,
      justify,
      gap,
      order,
      grow,
      shrink,
      basis,
      alignContent,
      alignSelf,
      wrap,
    };

    const Component = as || "div";

    //
    // extended props styles
    const ExtendedStyles = (props: FlexType) => {
      return {
        width: props?.w,
        maxWidth: props?.maxW,
        minWidth: props?.minW,
        height: props?.h,
        maxHeight: props?.maxH,
        minHeight: props?.minH,
        display: "flex",

        ...flexStylesProps({
          flex: props.flex,
          direc: props.direc,
          isReverse: props.isReverse,
          align: props.align,
          justify: props.justify,
          gap: props.gap,
          wrap: props.wrap,
          order: props.order,
          grow: props.grow,
          shrink: props.shrink,
          basis: props.basis,
          alignContent: props.alignContent,
          alignSelf: props.alignSelf,
        }),
      };
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
    const combinedStyles = useMemo(
      () => css`
        ${baseStyle}
        ${ExtendedStyles({
          ...pPs,
          w: pPs.w ?? "100%",
          direc: pPs.direc ?? "column",
        })}
    ${mediaStyles}
      `,
      [baseStyle, pPs, mediaStyles]
    );

    const combinedClassName = cx(`dble-flex${as ? `-${as}` : ""}`, className);
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

export default Flex;
