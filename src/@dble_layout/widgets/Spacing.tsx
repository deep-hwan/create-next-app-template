/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css } from "@emotion/react";
import React, { useMemo } from "react";
import { SpacingPropsType } from "../types/props/SpacingPropsType";
import { mediaScreenSize } from "../utils/mediaScreenSize";

const SizeTheme = ({
  direc,
  size,
}: Pick<SpacingPropsType, "direc" | "size">) => ({
  width: direc === "row" ? `${size}px` : "100%",
  minWidth: direc === "row" ? `${size}px` : "100%",
  maxWidth: direc === "row" ? `${size}px` : "100%",
  height: direc === "column" ? `${size}px` : "100%",
  minHeight: direc === "column" ? `${size}px` : "100%",
  maxHeight: direc === "column" ? `${size}px` : "100%",
});

const Spacing = React.forwardRef(function Spacing(
  { direc = "column", size, _mq, css: cssProp, ...props }: SpacingPropsType,
  ref?: React.Ref<HTMLDivElement>
) {
  const baseStyle = useMemo(() => {
    const sizeTheme = SizeTheme({ direc, size });
    return css({
      display: "flex",
      transition: "0.2s ease-in-out",
      ...sizeTheme,
    });
  }, [direc, size]);

  const mediaStyles = useMemo(() => {
    if (!_mq) return [];
    return mediaScreenSize.map((size) => {
      const breakpointKey = `w${size}` as keyof typeof _mq;
      const styles = _mq[breakpointKey];
      return styles
        ? css`
            @media (max-width: ${size}px) {
              ${SizeTheme({
                direc,
                ...(styles as Pick<SpacingPropsType, "direc" | "size">),
              })}
            }
          `
        : "";
    });
  }, [_mq, direc]);

  const combinedClassName = cx("dble-spacing", props.className);

  return (
    <div
      ref={ref}
      className={combinedClassName}
      css={[baseStyle, ...mediaStyles, cssProp]}
      {...props}
    />
  );
});

export default React.memo(Spacing);
