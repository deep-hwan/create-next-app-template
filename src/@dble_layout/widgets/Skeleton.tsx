/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { ForwardedRef, useMemo } from "react";
import {
  SkeletonPropsType,
  SkeletonType,
} from "../types/props/SkeletonPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Skeleton = React.forwardRef(
  (
    {
      w,
      h,
      radius = 8,
      primaryColor = "#e2e2e2",
      moveColor = "#f5f5f5",
      _mq = {},
      css: cssProp,
      ...props
    }: SkeletonPropsType,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const loadAnimation = `
      @keyframes load {
        100% {
          background-position: -100% 0;
        }
      }
    `;

    const baseStyle = useMemo(() => {
      return css({
        width: "100%",
      });
    }, []);

    const ExtendedStyles = useMemo(() => {
      return (props: SkeletonType) =>
        css({
          minWidth: props.w,
          maxWidth: props.w,
          height: props.h,
          minHeight: props.h,
          maxHeight: props.h,
          borderRadius: props.radius,
          background: `linear-gradient(120deg, ${props.primaryColor} 30%, ${props.moveColor} 38%, ${props.moveColor} 40%, ${props.primaryColor} 48%)`,
          backgroundSize: "200% 100%",
          backgroundPosition: "100% 0",
          animation: "load 1s infinite",
          transition: "0.2s ease-in-out",
        });
    }, []);

    const mediaStyles = useMemo(
      () => createMediaStyles(_mq, ExtendedStyles),
      [_mq, ExtendedStyles]
    );

    const combinedClassName = cx("dble-skeleton", props.className);

    return (
      <>
        <style>{loadAnimation}</style>
        <div
          ref={ref}
          className={combinedClassName}
          css={css([
            baseStyle,
            ExtendedStyles({
              w,
              h,
              radius,
              primaryColor,
              moveColor,
            }),
            ...mediaStyles,
            cssProp,
          ])}
          {...props}
        />
      </>
    );
  }
);

Skeleton.displayName = "Skeleton";

export default React.memo(Skeleton);
