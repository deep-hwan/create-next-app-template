/** @jsxImportSource @emotion/react */
"use client";

import { Padding, TouchableOpacity } from "@/@dble_layout";
import onScrollToNextRef from "@/libs/handler/onScrollToRef";
import { useRef } from "react";

type Types = {
  children?: null[];
  minWidth?: number;
  key?: string | number;
  id?: string | number;
  name: string;
  checked?: boolean;
  onClick?: () => void;
  isPathIcon?: boolean;
  icon?: React.ReactNode;
  isFocus?: boolean;
};

export default function TagSwitch({
  key,
  id,
  name,
  checked,
  onClick,
  isPathIcon = false,
  icon,
  isFocus = true,
  minWidth,
}: Types) {
  const tabRef = useRef<HTMLDivElement>(null);

  return (
    <TouchableOpacity
      key={key}
      ref={tabRef}
      id={(id as any) ?? 1}
      onClick={() => {
        onClick?.();
        if (isFocus) onScrollToNextRef(tabRef);
      }}
      justify="center"
      align="center"
      gap={4}
      padding={{ vertical: 5, horizontal: 8 }}
      minW={minWidth}
      border={{ stroke: 1, color: checked ? "#4581e2" : "#e2e2e2", radius: 12 }}
      fill={checked ? "#4581e2" : "transparent"}
      txtColor={checked ? "#fff" : "#979eb0"}
      txtSize={13}
    >
      {icon}

      {name}

      {isPathIcon && (
        <Padding w="auto" top={1}>
          <svg
            width={10}
            height={10}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.83917 2.123L13.53 10.8669L6.03637 19.9001C5.82606 20.1311 5.71101 20.4307 5.71368 20.7405C5.7114 21.0709 5.8423 21.3888 6.07783 21.6249C6.19327 21.7423 6.33141 21.836 6.48417 21.9004C6.63693 21.9648 6.80123 21.9987 6.96748 22C7.13691 21.9966 7.30398 21.9603 7.459 21.8931C7.61403 21.8258 7.75392 21.7291 7.87057 21.6084L16.162 11.6908C16.3819 11.4551 16.5027 11.1463 16.5 10.8267C16.4973 10.5071 16.3713 10.2003 16.1474 9.9682L7.63191 0.3828C7.51828 0.26188 7.38037 0.165376 7.22686 0.0993699C7.07336 0.0333642 6.9076 -0.00071251 6.74002 -0.000712495C6.57244 -0.00071248 6.40668 0.0333642 6.25317 0.0993699C6.09967 0.165376 5.96176 0.26188 5.84813 0.3828C5.62621 0.619355 5.5021 0.928636 5.50003 1.25022C5.49795 1.57181 5.61807 1.88261 5.83692 2.1219"
              fill={checked ? "#fff" : "#979eb0"}
            />
          </svg>
        </Padding>
      )}
    </TouchableOpacity>
  );
}
