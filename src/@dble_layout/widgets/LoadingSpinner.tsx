/** @jsxImportSource @emotion/react */
"use client";

import { keyframes } from "@emotion/react";
import { ForwardedRef, HTMLAttributes, forwardRef, memo } from "react";

// --------------------------------------------
// -------------- Type Interface --------------
// --------------------------------------------
interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: never[];
  size?: number;
  storkeSize?: number;
  color?: string;
}

// --------------------------------------------
// -------------- LoadingSpinner --------------
// --------------------------------------------
const LoadingSpinnerUi = forwardRef(
  (
    { size = 40, storkeSize = 3, color = "#eee", ...props }: Props,
    ref?: ForwardedRef<HTMLDivElement>
  ) => {
    const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

    return (
      <div
        ref={ref}
        css={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        {...props}
      >
        <div
          css={{
            width: `${size}px`,
            minWidth: `${size}px`,
            maxWidth: `${size}px`,
            height: `${size}px`,
            minHeight: `${size}px`,
            maxHeight: `${size}px`,
            border: `${storkeSize}px solid ${color}`,
            borderBottomColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
            boxSizing: "border-box",
            animation: `${rotation} 1s linear infinite`,
          }}
        />
      </div>
    );
  }
);
LoadingSpinnerUi.displayName = "LoadingSpinnerUi";

export const LoadingSpinner = memo(LoadingSpinnerUi);
