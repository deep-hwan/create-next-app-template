/** @jsxImportSource @emotion/react */
"use client";

import onScrollToNextRef from "@/libs/handler/onScrollToRef";
import { colors } from "@/libs/themes";
import React, { ForwardedRef, useRef } from "react";

type Menu = {
  id: string | number;
  name: string;
  onClick: () => void;
  children?: never[];
};

type SlideSwitchProps = {
  menus: Menu[]; // Ensure menus is always an array
  maxWidth?: number;
  backgroundColor?: string;
  checkedMenuId: string | number; // Optional: Name of the checked menu
  children?: never[];
};

const SlideSwitch = React.forwardRef(
  (
    {
      maxWidth,
      menus = [],
      backgroundColor,
      checkedMenuId = "1",
    }: SlideSwitchProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const slideRef = useRef<HTMLDivElement>(null);
    const slideP =
      menus.length > 0
        ? menus.findIndex((menu) => menu.id === checkedMenuId)
        : 0;

    const memoizedMenus = menus ?? [];

    return (
      <div
        className="slide-switch"
        css={{
          position: "relative",
          width: "100%",
          display: "flex",
          maxWidth,
          padding: 3,
          backgroundColor: backgroundColor ?? "#f8f8f8",
          borderRadius: 15,
        }}
        ref={slideRef}
      >
        {/* Overlay for the active menu */}
        <div
          css={{
            position: "absolute",
            top: 3,
            bottom: 3,
            left: `calc(${(100 / memoizedMenus.length) * slideP}% + 3px)`,
            width: `calc(${100 / memoizedMenus.length}% - 6px)`,
            transition: "all 0.3s ease",
          }}
        >
          <div
            css={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.keyColor,
              borderRadius: 15,
            }}
          >
            {""}
          </div>
        </div>

        {/* Render menu buttons */}
        {memoizedMenus.map((item, i) => (
          <div
            css={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 40,
              padding: 8,
              width: `${100 / memoizedMenus.length}%`,
              zIndex: 2,
              fontSize: "0.875rem",
              cursor: "pointer",
              color: slideP === i ? "#fff" : "#aaa",
              userSelect: "none",
              transition: "all 0.25s ease",
            }}
            key={item.id}
            onClick={() => {
              item.onClick();
              onScrollToNextRef(ref || (slideRef as any));
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
  }
);

export default SlideSwitch;
