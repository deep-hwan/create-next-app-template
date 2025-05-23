/** @jsxImportSource @emotion/react */
"use client";
import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Types = {
  children: ReactNode;
  maxWidth?: number;
  gap?: number;
  scrollBarActive?: boolean;
  snap?: boolean;
  /** Horizontal padding to preserve during scrolling (in px) */
  preservePadding?: { left?: number; right?: number };
  /** Factor to control scroll speed (default: 2.5) */
  speedFactor?: number;
} & HTMLAttributes<HTMLDivElement>;

const DragHorizontalLayer = ({
  children,
  maxWidth,
  gap,
  scrollBarActive = false,
  snap = false,
  preservePadding,
  speedFactor = 2.5,
  ...props
}: Types) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [momentum, setMomentum] = useState<number>(0);
  const [lastClientX, setLastClientX] = useState<number>(0);
  const [lastTimestamp, setLastTimestamp] = useState<number>(0);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const velocityTracker = useRef<Array<{ x: number; time: number }>>([]);

  // Detect touch device on mount
  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Extract padding values from children if needed
  useEffect(() => {
    if (containerRef.current && ref.current) {
      // Default padding to apply if no specific padding is found or provided
      let leftPadding = preservePadding?.left ?? 20;
      let rightPadding = preservePadding?.right ?? 20;

      // Try to find Layer component with padding
      const firstLayer = ref.current.querySelector('[class*="dble-layer"]');
      if (firstLayer) {
        const computedStyle = window.getComputedStyle(firstLayer);
        // Get the actual computed padding values
        const computedPaddingLeft =
          parseInt(computedStyle.paddingLeft, 10) || 0;
        const computedPaddingRight =
          parseInt(computedStyle.paddingRight, 10) || 0;

        // If explicit padding is provided in preservePadding, use that instead
        if (preservePadding?.left !== undefined) {
          leftPadding = preservePadding.left;
        } else if (computedPaddingLeft > 0) {
          leftPadding = computedPaddingLeft;
        }

        if (preservePadding?.right !== undefined) {
          rightPadding = preservePadding.right;
        } else if (computedPaddingRight > 0) {
          rightPadding = computedPaddingRight;
        }
      }

      // Always apply some padding to ensure content doesn't touch the edges
      containerRef.current.style.paddingLeft = `${leftPadding}px`;
      containerRef.current.style.paddingRight = `${rightPadding}px`;
    }
  }, [preservePadding, children]);

  // Apply momentum scrolling
  useEffect(() => {
    if (momentum !== 0 && !isDragging) {
      let friction = 0.9; // Further reduced friction for faster deceleration
      let currentMomentum = momentum;

      const animateMomentum = () => {
        if (Math.abs(currentMomentum) < 1.0 || !ref.current) {
          // Higher threshold for earlier stopping
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
          return;
        }

        currentMomentum *= friction;
        if (ref.current) {
          ref.current.scrollLeft -= currentMomentum;
        }

        animationRef.current = requestAnimationFrame(animateMomentum);
      };

      animationRef.current = requestAnimationFrame(animateMomentum);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      };
    }
  }, [momentum, isDragging]);

  const calculateMomentum = useCallback(() => {
    if (velocityTracker.current.length < 2) return 0;

    // Get the last 5 points or all if less than 5
    const recentPoints = velocityTracker.current.slice(-5);

    // Calculate velocity from the first and last point
    const first = recentPoints[0];
    const last = recentPoints[recentPoints.length - 1];
    const dx = last.x - first.x;
    const dt = last.time - first.time;

    if (dt === 0) return 0;

    // Calculate velocity and amplify it
    const velocity = (dx / dt) * 35; // Amplify momentum effect

    return velocity;
  }, []);

  const startDrag = useCallback(
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      const targetTag = (e.target as HTMLElement).tagName.toLowerCase();
      if (["input", "select", "textarea", "button", "a"].includes(targetTag)) {
        return;
      }

      const clientX = e.type.includes("touch")
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;

      setIsDragging(true);
      setStartX(clientX);
      setLastClientX(clientX);
      setLastTimestamp(Date.now());
      setScrollLeft(ref.current?.scrollLeft || 0);
      setMomentum(0);

      // Reset velocity tracker
      velocityTracker.current = [{ x: clientX, time: Date.now() }];

      // Stop any ongoing momentum animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      if (e.cancelable) {
        e.preventDefault();
      }
    },
    []
  );

  const doDrag = useCallback(
    (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
      if (!isDragging || !ref.current) return;

      const currentTime = Date.now();
      const clientX = e.type.includes("touch")
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;

      // Track velocity with timestamp
      velocityTracker.current.push({ x: clientX, time: currentTime });

      // Keep only the last 10 points for efficiency
      if (velocityTracker.current.length > 10) {
        velocityTracker.current.shift();
      }

      // Calculate enhanced movement distance - apply higher speed factor for touch devices
      const actualSpeedFactor = isTouchDevice ? speedFactor * 1.2 : speedFactor;
      const dx = (clientX - startX) * actualSpeedFactor;

      // Direct scrolling without animation for more immediate response
      ref.current.scrollLeft = scrollLeft - dx;

      setLastClientX(clientX);
      setLastTimestamp(currentTime);

      if (e.cancelable) {
        e.preventDefault();
      }
    },
    [
      isDragging,
      startX,
      scrollLeft,
      lastClientX,
      lastTimestamp,
      speedFactor,
      isTouchDevice,
    ]
  );

  const endDrag = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    // Calculate momentum based on recent movement
    const calculatedMomentum = calculateMomentum();
    setMomentum(calculatedMomentum);

    // Apply snap if needed
    if (snap && ref.current) {
      const elements = Array.from(ref.current.children) as HTMLElement[];
      const scrollerRect = ref.current.getBoundingClientRect();

      // Find the closest element to the viewport center
      const viewportCenter = scrollerRect.left + scrollerRect.width / 2;
      const closestElement = elements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const childCenter = box.left + box.width / 2;
          const distance = Math.abs(childCenter - viewportCenter);

          if (distance < closest.distance) {
            return { distance, element: child };
          }
          return closest;
        },
        {
          distance: Number.POSITIVE_INFINITY,
          element: null as HTMLElement | null,
        }
      );

      if (closestElement.element) {
        // Override momentum for snap
        setMomentum(0);

        closestElement.element.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }

    // Clear velocity tracker
    velocityTracker.current = [];
  }, [snap, isDragging, calculateMomentum]);

  return (
    <div
      className="dble-drag-horizontal-layer"
      ref={containerRef}
      css={{
        width: "100%",
        maxWidth: maxWidth ? `${maxWidth}px` : "100%",
        position: "relative",
        overflow: "hidden",
        padding: 0,
        // Default padding will be applied via useEffect
      }}
    >
      <div
        ref={ref}
        onMouseDown={startDrag}
        onTouchStart={startDrag}
        onMouseMove={doDrag}
        onTouchMove={doDrag}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onTouchEnd={endDrag}
        css={{
          width: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          columnGap: gap ? `${gap}px` : undefined,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          scrollBehavior: isDragging ? "auto" : "smooth", // Use auto during drag for more responsive feel
          scrollSnapType: isDragging ? "none" : snap ? "x mandatory" : "none",
          "& > *": {
            scrollSnapAlign: snap ? "center" : "none",
            flexShrink: 0,
          },
          "&::-webkit-scrollbar": {
            display: scrollBarActive ? "flex" : "none",
            height: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: scrollBarActive
              ? "rgba(0, 0, 0, 0.2)"
              : "transparent",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export default DragHorizontalLayer;
