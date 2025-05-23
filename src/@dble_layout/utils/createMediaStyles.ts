import { css, SerializedStyles } from "@emotion/react";
import { mediaScreenSize } from "./mediaScreenSize";

type MediaQueryStyles<T> = {
  [key: string]: T;
};

export function createMediaStyles<T>(
  _mq: MediaQueryStyles<T>,
  ExtendedStyles: (styles: T) => SerializedStyles
) {
  return mediaScreenSize.map((size) => {
    const breakpointKey = `w${size}` as keyof typeof _mq;
    const styles = _mq?.[breakpointKey];

    return css`
      @media (max-width: ${size}px) {
        ${styles ? ExtendedStyles(styles) : ""}
      }
    `;
  });
}
