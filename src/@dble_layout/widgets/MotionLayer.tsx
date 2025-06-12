/** @jsxImportSource @emotion/react */
"use client";

import { cx } from "@emotion/css";
import { css, SerializedStyles } from "@emotion/react";
import { motion, useInView, UseInViewOptions } from "framer-motion";
import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { baseStylesProps } from "../styles/baseStylesProps";
import { borderStylesProps } from "../styles/borderStylesProps";
import { flexStylesProps } from "../styles/flexStylesProps";
import { shadowStylesProps } from "../styles/shadowStylesProps";
import { spaceStylesProps } from "../styles/spaceStylesProps";
import { transformStylesProps } from "../styles/transformStylesProps";
import { LayoutPropsRef } from "../types/piece/PipeLinePropsType";
import {
  MotionLayerLayoutElement,
  MotionLayerType,
} from "../types/props/MotionLayerPropsType";
import { createMediaStyles } from "../utils/createMediaStyles";

const MotionLayer = memo(
  forwardRef<HTMLDivElement, MotionLayerLayoutElement & LayoutPropsRef>(
    (props, ref) => {
      const {
        as,
        children,
        className,

        // layout
        w,
        maxW,
        minW,
        h,
        maxH,
        minH,

        // flex
        flex,
        direc,
        isReverse,
        align,
        justify,
        gap,
        order,
        wrap,

        // position
        position,

        // padding
        padding,

        // margin
        margin,

        // background
        fill,
        border,
        shadow,
        blur,
        scale,
        rotate,

        //
        zIndex,
        transition,
        cursor,
        userSelect,

        //active
        _hover,
        _focus,
        _active,
        _mq = {},
        css: cssProp,

        // Motion-specific props
        initialY = 15, // 초기 Y축 위치 오프셋 (px)
        initialX = 0, // 초기 X축 위치 오프셋 (px)
        initialOpacity = 0, // 초기 투명도 (0-1)
        delay = 0, // 애니메이션 시작 전 지연 시간 (초)
        duration = 0.5, // 애니메이션 지속 시간 (초)
        activeAnimation = true, // 애니메이션 활성화 여부 (뷰포트 진입 시 자동 애니메이션)
        observer, // 외부 상태 관찰자 - 이 값이 변경될 때마다 애니메이션 다시 실행
        transitionType, // 애니메이션 타입 (spring, tween, inertia 등)
        stiffness, // 스프링 강성 - 값이 클수록 더 빠르게 움직임 (spring 타입)
        damping, // 스프링 감쇠 - 값이 클수록 빨리 정지함 (spring 타입)
        mass, // 스프링 질량 - 값이 클수록 느리게 반응 (spring 타입)
        bounce, // 스프링 탄성 - 값이 클수록 더 많이 튀어오름 (spring 타입)
        restSpeed, // 스프링이 멈추는 속도 기준값 (spring 타입)
        restDelta, // 스프링이 멈추는 거리 기준값 (spring 타입)

        // Framer Motion 네이티브 props
        initial, // 요소의 초기 상태 (렌더링 시점)
        animate, // 요소의 애니메이션 후 상태
        exit, // 요소가 사라질 때 애니메이션 상태 (AnimatePresence와 함께 사용)
        variants, // 여러 애니메이션 상태를 그룹화하여 이름으로 관리
        whileHover, // 마우스 호버 시 적용될 스타일/애니메이션
        whileTap, // 클릭하거나 터치할 때 적용될 스타일/애니메이션
        whileFocus, // 포커스 상태일 때 적용될 스타일/애니메이션
        whileDrag, // 드래그하는 동안 적용될 스타일/애니메이션
        whileInView, // 요소가 뷰포트에 보일 때 적용될 스타일/애니메이션
        viewport, // 뷰포트 감지 옵션 설정 (amount, once 등)

        // 드래그 기능
        drag, // 드래그 활성화 및 방향 설정 (true, false, "x", "y")
        dragConstraints, // 드래그 가능 범위 제한 (객체 또는 ref)
        dragElastic, // 드래그 제한 경계의 탄성도 (0-1)
        dragMomentum, // 드래그 후 관성 효과 여부
        onDragStart, // 드래그 시작 이벤트 핸들러
        onDrag, // 드래그 중 이벤트 핸들러
        onDragEnd, // 드래그 종료 이벤트 핸들러

        // 레이아웃 애니메이션
        layout, // 요소 크기나 위치 변경 시 자동 애니메이션
        layoutId,

        ...rest
      } = props;

      // 내부 참조 처리
      const innerRef = useRef<HTMLDivElement>(null);
      const motionRef = useRef<HTMLDivElement>(null);
      const currentRef = ref || motionRef;

      // viewport 옵션 타입 안전하게 변환
      const inViewOptions: UseInViewOptions = {
        once: false, // DOM에 처음 진입할 때뿐만 아니라 매번 진입할 때마다 애니메이션 재생
      };

      // 사용자 정의 viewport 설정이 있으면 안전하게 적용
      if (viewport) {
        if (viewport.once !== undefined) inViewOptions.once = viewport.once;
        if (viewport.amount !== undefined)
          inViewOptions.amount = viewport.amount;
        if (viewport.root !== undefined) inViewOptions.root = viewport.root;
        if (viewport.margin !== undefined) {
          inViewOptions.margin = viewport.margin as any;
        }
      }

      // useInView hook to detect if the element is in the viewport
      const isInViewStep1 = useInView(innerRef, { once: false });

      // 참조 전달 설정
      useImperativeHandle(
        ref,
        () => innerRef.current || document.createElement("div")
      );

      // 애니메이션 상태
      const [shouldAnimate, setShouldAnimate] = useState(false);
      const [animationKey, setAnimationKey] = useState(0); // 애니메이션 강제 재시작용 키

      // Update animation state based on activeAnimation and isInViewStep1
      useEffect(() => {
        if (currentRef) {
          if (activeAnimation && isInViewStep1) {
            setShouldAnimate(true);
          } else {
            setShouldAnimate(false);
          }
        } else {
          setShouldAnimate(true);
        }
      }, [activeAnimation, isInViewStep1, currentRef, animationKey]); // animationKey 의존성 추가

      // Observer 기능: 외부 상태 변경 시 애니메이션 다시 실행
      useEffect(() => {
        if (observer !== undefined && activeAnimation) {
          // observer 값이 변경되면 애니메이션을 다시 실행
          setShouldAnimate(false);

          // 애니메이션 키를 변경하여 강제 재시작
          setAnimationKey((prev) => prev + 1);

          // 짧은 지연 후 애니메이션 다시 시작
          const timer = setTimeout(() => {
            setShouldAnimate(true);
          }, 100); // 100ms로 지연 시간 증가

          return () => clearTimeout(timer);
        }
      }, [observer, activeAnimation]);

      // Extended props styles function
      const ExtendedStyles = (props: MotionLayerType): SerializedStyles => {
        return css({
          width: props?.w,
          maxWidth: props?.maxW,
          minWidth: props?.minW,
          height: props?.h,
          maxHeight: props?.maxH,
          minHeight: props?.minH,

          // flex
          ...flexStylesProps({
            flex: props.flex,
            direc: props.direc,
            isReverse: props.isReverse,
            align: props.align,
            justify: props.justify,
            gap: props.gap,
            wrap: props.wrap,
            order: props.order,
          }),

          // position
          position: props?.position?.type,
          top: props?.position?.top,
          bottom: props?.position?.bottom,
          left: props?.position?.left,
          right: props?.position?.right,
          transform: props?.axis
            ? `translate(${
                typeof props?.axis?.x === "number"
                  ? `${props?.axis?.x}px`
                  : props?.axis?.x ?? "0"
              }, ${
                typeof props?.axis?.y === "number"
                  ? `${props?.axis?.y}px`
                  : props?.axis?.y ?? "0"
              })`
            : undefined,

          // padding
          ...spaceStylesProps({
            padding: {
              all: props.padding?.all,
              horizontal: props.padding?.horizontal,
              vertical: props.padding?.vertical,
              top: props.padding?.top,
              bottom: props.padding?.bottom,
              left: props.padding?.left,
              right: props.padding?.right,
            },
            margin: {
              all: props.margin?.all,
              horizontal: props.margin?.horizontal,
              vertical: props.margin?.vertical,
              top: props.margin?.top,
              bottom: props.margin?.bottom,
              left: props.margin?.left,
              right: props.margin?.right,
            },
          }),

          // background
          backgroundColor: props.fill,
          ...(props.border && borderStylesProps(props.border)),
          ...(props.shadow && shadowStylesProps(props.shadow)),
          ...transformStylesProps({
            scale: props.scale,
            rotate: props.rotate,
          }),
        });
      };

      // Base style
      const baseStyle = React.useMemo(
        () =>
          css({
            position: "relative",
            display: "flex",
            flexDirection: "column",
            ...baseStylesProps({
              transition,
              zIndex,
              cursor,
              userSelect,
              onClick: rest.onClick,
              onMouseEnter: rest.onMouseEnter,
            }),
          }),
        [
          cursor,
          rest.onClick,
          rest.onMouseEnter,
          transition,
          zIndex,
          userSelect,
        ]
      );

      // Move pPs initialization inside useMemo
      const pPs = React.useMemo(
        () => ({
          // layout
          w,
          maxW,
          minW,
          h,
          maxH,
          minH,

          // flex
          flex,
          direc,
          isReverse,
          align,
          justify,
          gap,
          order,
          wrap,

          // position
          position,

          // padding
          padding,

          // margin
          margin,

          // background
          fill,
          border,
          shadow,
          blur,
          scale,
          rotate,
        }),
        [
          w,
          maxW,
          minW,
          h,
          maxH,
          minH,
          flex,
          direc,
          isReverse,
          align,
          justify,
          gap,
          order,
          position,
          padding,
          margin,
          fill,
          border,
          shadow,
          blur,
          scale,
          rotate,
          wrap,
        ]
      );

      // Media-query styles
      const mediaStyles = React.useMemo(
        () => createMediaStyles(_mq, ExtendedStyles),
        [_mq]
      );

      // Pseudo styles
      const pseudoStyles = React.useMemo(
        () =>
          css({
            "&:hover": ExtendedStyles({ ..._hover }),
            "&:focus": ExtendedStyles({ ..._focus }),
            "&:active": ExtendedStyles({ ..._active }),
          }),
        [_hover, _focus, _active]
      );

      // Combined styles
      const combinedStyles = React.useMemo(
        () => css`
          ${baseStyle}
          ${ExtendedStyles({
            ...pPs,
            w: pPs.w ?? "100%",
            h: pPs.h ?? (pPs.flex === 1 ? "100%" : undefined),
            direc: pPs.direc ?? "column",
          })}
        ${mediaStyles}
        ${pseudoStyles}
        `,
        [baseStyle, pPs, mediaStyles, pseudoStyles]
      );

      const combinedClassName = cx(
        `dble-motion-layer${as ? `-${as}` : ""}`,
        className
      );

      // 초기 애니메이션 상태 결정 - 제공된 initial이 있으면 사용, 없으면 기본값 사용
      const initialState = initial || {
        opacity: initialOpacity,
        y: initialY,
        x: initialX,
      };

      // Determine animation state
      const animateState = animate || {
        opacity: shouldAnimate || !activeAnimation ? 1 : initialOpacity,
        y: shouldAnimate || !activeAnimation ? 0 : initialY,
        x: shouldAnimate || !activeAnimation ? 0 : initialX,
      };

      // 트랜지션 속성 설정
      const transitionObject = {
        duration, // 애니메이션 지속 시간 (초)
        delay, // 애니메이션 시작 전 지연 시간 (초)
        ...(transitionType && { type: transitionType }), // 애니메이션 유형 (spring, tween 등)
        ...(stiffness && { stiffness }), // 스프링 강성 (spring에서만 사용)
        ...(damping && { damping }), // 스프링 감쇠 (spring에서만 사용)
        ...(mass && { mass }), // 스프링 질량 (spring에서만 사용)
        ...(bounce && { bounce }), // 스프링 탄성 (spring에서만 사용)
        ...(restSpeed && { restSpeed }), // 스프링 정지 속도 (spring에서만 사용)
        ...(restDelta && { restDelta }), // 스프링 정지 위치 오차 (spring에서만 사용)
        ...(transition || {}), // 사용자 지정 트랜지션 속성
      };

      // 유효한 컴포넌트 확보
      let MotionComponent: React.ElementType = motion.div;
      if (as && typeof as === "string") {
        const requestedComponent = motion[as as keyof typeof motion];
        if (requestedComponent) {
          MotionComponent = requestedComponent as React.ElementType;
        }
      }

      return (
        <MotionComponent
          key={observer !== undefined ? `motion-${animationKey}` : undefined}
          ref={innerRef}
          className={combinedClassName}
          css={css([combinedStyles, cssProp])}
          // 기본 애니메이션 속성
          initial={initialState} // 초기 상태 (요소가 처음 렌더링될 때)
          animate={animateState} // 일반 상태 (애니메이션 후 최종 상태)
          exit={exit} // 요소가 제거될 때 애니메이션
          transition={transitionObject} // 애니메이션 동작 방식 정의
          // 애니메이션 바리언트: 여러 애니메이션 상태를 미리 정의해 이름으로 전환
          variants={variants}
          // 인터랙션 애니메이션
          whileHover={whileHover || (_hover && { ..._hover })} // 마우스 호버 시 애니메이션
          whileTap={whileTap} // 클릭/탭 시 애니메이션
          whileFocus={whileFocus || (_focus && { ..._focus })} // 포커스 시 애니메이션
          whileDrag={whileDrag} // 드래그 시 애니메이션
          whileInView={whileInView} // 화면에 보일 때 애니메이션
          // 드래그 관련 속성
          drag={drag} // 드래그 가능 여부/방향 ("x", "y", true, false)
          dragConstraints={dragConstraints} // 드래그 제한 범위
          dragElastic={dragElastic} // 드래그 탄성 (0-1)
          dragMomentum={dragMomentum} // 드래그 관성 여부
          onDragStart={onDragStart} // 드래그 시작 이벤트
          onDrag={onDrag} // 드래그 중 이벤트
          onDragEnd={onDragEnd} // 드래그 종료 이벤트
          // 레이아웃 애니메이션
          layout={layout} // 요소의 레이아웃 변경 시 자동 애니메이션
          layoutId={layoutId} // 서로 다른 컴포넌트 간 애니메이션 전환을 위한 ID
          // 뷰포트 감지 옵션
          viewport={viewport} // 요소의 가시성 감지 옵션
          {...(rest as React.HTMLProps<HTMLDivElement>)}
        >
          {children}
        </MotionComponent>
      );
    }
  )
);

MotionLayer.displayName = "MotionLayer";

export default MotionLayer;
