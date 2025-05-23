/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, SerializedStyles } from "@emotion/react";
import React, { useCallback, useMemo } from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { spaceStylesProps } from "../styles/spaceStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import {
  PaddingLayoutElement,
  PaddingType,
} from "../types/props/PaddingPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Padding = React.forwardRef<
  HTMLElement,
  PaddingLayoutElement & LayoutPropsRef
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
    all,
    horizontal,
    vertical,
    top,
    bottom,
    left,
    right,
    zIndex,
    transition,
    _mq = {},
    css: cssProp,
    ...rest
  } = props;

  // pPs 객체를 useMemo로 감싸서 불필요한 재생성을 방지
  const pPs = useMemo(
    () => ({
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      all,
      horizontal,
      vertical,
      top,
      bottom,
      left,
      right,
    }),
    [
      w,
      maxW,
      minW,
      h,
      maxH,
      minH,
      all,
      horizontal,
      vertical,
      top,
      bottom,
      left,
      right,
    ]
  );

  const Component = as || "div";

  // ExtendedStyles 함수의 반환 타입을 SerializedStyles로 변경
  const ExtendedStyles = useCallback((props: PaddingType): SerializedStyles => {
    return css({
      width: props?.w,
      maxWidth: props?.maxW,
      minWidth: props?.minW,
      height: props?.h,
      maxHeight: props?.maxH,
      minHeight: props?.minH,
      ...spaceStylesProps({
        padding: {
          all: props.all,
          horizontal: props.horizontal,
          vertical: props.vertical,
          top: props.top,
          bottom: props.bottom,
          left: props.left,
          right: props.right,
        },
      }),
    });
  }, []);

  // base style
  const baseStyle = useMemo(
    () =>
      css({
        position: "relative",
        display: "flex",
        flexDirection: "column",
        ...baseStylesProps({
          transition,
          zIndex,
        }),
      }),
    [transition, zIndex]
  );

  // media-query styles
  const mediaStyles = useMemo(
    () => createMediaStyles(_mq, ExtendedStyles),
    [_mq, ExtendedStyles]
  );

  // combined styles: 배열로 결합하여 css 함수를 사용
  const combinedStyles = useMemo(
    () =>
      css([
        baseStyle,
        ExtendedStyles({
          ...pPs,
          w: pPs.w ?? "100%",
        }),
        mediaStyles,
      ]),
    [baseStyle, pPs, mediaStyles, ExtendedStyles]
  );

  const combinedClassName = cx(`dble-padding${as ? `-${as}` : ""}`, className);
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

// displayName 추가하여 ESLint 경고 해결
Padding.displayName = "Padding";

export default Padding;
