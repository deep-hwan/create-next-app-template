/** @jsxImportSource @emotion/react */
"use client";

import { CSSObject } from "@emotion/react";
import React from "react";
import { CursorType } from "../types/piece/CursorType";
import { TransitionType } from "../types/piece/TransitionType";

export const baseStylesProps = ({
  cursor,
  transition,
  zIndex,
  userSelect,
  onClick,
  onMouseEnter,
}: {
  cursor?: CursorType;
  transition?: TransitionType;
  zIndex?: number;
  userSelect?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
}) => {
  return {
    zIndex,
    userSelect,
    cursor: cursor ? cursor : (onClick || onMouseEnter) && "pointer",
    transition:
      transition && transition?.duration && transition?.duration > 0
        ? `all ${transition.duration}s ${transition.type ?? "ease-in-out"}`
        : undefined,

    listStyle: "none",
    outline: "none",
    borderWidth: 0,
  } as CSSObject;
};
