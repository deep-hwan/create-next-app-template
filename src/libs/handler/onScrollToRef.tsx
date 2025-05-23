"use client";
import { MutableRefObject } from "react";

export default function onScrollToNextRef(
  ref: MutableRefObject<HTMLElement | null>,
  position?: number,
  behavior?: "smooth" | "instant"
) {
  const scrollHandler = () => {
    if (!ref || !ref.current) {
      console.warn("Ref is not initialized or current is null");
      return;
    }

    const element = ref.current;
    if (element instanceof HTMLElement) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - (position ?? 90),
        behavior: behavior ?? "smooth",
      });
    } else {
      console.warn("Ref is not attached to a valid HTML element");
    }
  };

  const timeoutId = setTimeout(() => scrollHandler(), 100);
  return () => clearTimeout(timeoutId);
}
