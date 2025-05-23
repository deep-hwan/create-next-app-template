/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { useCallback, useMemo } from "react";
import { TrafficType } from "../types/piece/TrafficType";
import { DividerPropsType, DividerType } from "../types/props/DividerPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const Divider = React.forwardRef<HTMLDivElement, DividerPropsType>(
  function Solid(
    {
      direc = "horizontal",
      w,
      h,
      color = "#e9e9e9",
      radius,
      spacing,
      _mq = {},
      css: cssProp,
      ...props
    },
    ref
  ) {
    type NumbericType = number | string;

    const Types = useCallback(
      (props: { w?: NumbericType; h?: NumbericType }) => ({
        width: direc === "horizontal" ? props.w ?? "100%" : props.w ?? 1,
        minWidth: direc === "horizontal" ? props.w ?? "100%" : props.w ?? 1,
        maxWidth: direc === "horizontal" ? props.w ?? "100%" : props.w ?? 1,
        height: direc === "vertical" ? props.h ?? "100%" : props.h ?? 1,
        minHeight: direc === "vertical" ? props.h ?? "100%" : props.h ?? 1,
        maxHeight: direc === "vertical" ? props.h ?? "100%" : props.h ?? 1,
      }),
      [direc]
    );

    const getSpacing = useCallback(
      (spacing?: TrafficType, direction?: string) => {
        if (!spacing) return undefined;

        // Return specific margin value based on the direction
        if (direction === "top")
          return spacing.all ?? spacing.vertical ?? spacing.top;
        if (direction === "bottom")
          return spacing.all ?? spacing.vertical ?? spacing.bottom;
        if (direction === "left")
          return spacing.all ?? spacing.horizontal ?? spacing.left;
        if (direction === "right")
          return spacing.all ?? spacing.horizontal ?? spacing.right;

        return undefined;
      },
      []
    );

    const DividerStyle = useCallback(
      (props: DividerType) =>
        css({
          backgroundColor: props.color,
          transition: "0.25s ease-in-out",
          borderRadius: props.radius,
          marginTop: getSpacing(props.spacing, "top"),
          marginBottom: getSpacing(props.spacing, "bottom"),
          marginLeft: getSpacing(props.spacing, "left"),
          marginRight: getSpacing(props.spacing, "right"),
          ...Types({ w: props.w, h: props.h }),
        }),
      [Types, getSpacing]
    );

    const mediaStyles = useMemo(
      () => createMediaStyles(_mq, DividerStyle),
      [_mq, DividerStyle]
    );

    const combinedClassName = cx("dble-divider", props.className);

    return (
      <div
        ref={ref}
        className={combinedClassName}
        css={css([
          DividerStyle({ direc, w, h, spacing, color, radius }),
          ...mediaStyles,
          cssProp,
        ])}
        {...props}
      />
    );
  }
);

export default React.memo(Divider);
