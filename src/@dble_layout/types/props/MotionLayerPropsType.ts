import { CSSObject } from '@emotion/react';
import { HTMLMotionProps, PanInfo, TargetAndTransition, VariantLabels, Variants } from 'framer-motion';
import { ElementType, ReactNode, RefObject } from 'react';
import { BorderType } from '../piece/BorderType';
import { CursorType } from '../piece/CursorType';
import { LayoutElementType } from '../piece/LayoutElementType';
import { MediaQueryType } from '../piece/MediaQueryType';
import { ExcludedProps } from '../piece/PipeLinePropsType';
import { PositionType } from '../piece/PositionType';
import { ShadowType } from '../piece/ShadowType';
import { TrafficType } from '../piece/TrafficType';
import { TransitionType } from '../piece/TransitionType';

/**
 * MotionLayerType - 기본 동작 레이어 타입
 *
 * 이 인터페이스는 HTMLMotionProps<'div'>를 확장합니다. framer-motion의 기본 속성들:
 * - animate: 요소가 애니메이션되어야 하는 최종 상태를 정의합니다 (예: { opacity: 1, x: 0 })
 * - initial: 요소의 초기 상태를 정의합니다 (예: { opacity: 0, x: -100 })
 * - exit: 요소가 제거될 때의 애니메이션 상태를 정의합니다
 * - transition: 애니메이션의 타이밍 및 물리적 속성을 제어합니다
 * - variants: 애니메이션의 사전 정의된 상태 집합을 정의합니다
 * - whileHover: 마우스 오버 시 적용할 애니메이션 상태를 정의합니다
 * - whileTap: 요소를 누르고 있을 때 적용할 애니메이션 상태를 정의합니다
 * - whileDrag: 드래그 중일 때 적용할 애니메이션 상태를 정의합니다
 * - whileFocus: 포커스 상태일 때 적용할 애니메이션 상태를 정의합니다
 * - whileInView: 요소가 뷰포트 내에 있을 때 적용할 애니메이션 상태를 정의합니다
 * - viewport: 뷰포트 관련 옵션을 정의합니다 (예: { once: true, margin: "100px" })
 */
export interface MotionLayerType extends Omit<HTMLMotionProps<'div'>, ExcludedProps | 'initial'> {
  w?: number | string;
  maxW?: number | string;
  minW?: number | string;
  h?: number | string;
  maxH?: number | string;
  minH?: number | string;

  //flex
  flex?: string | number;
  direc?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  isReverse?: boolean;
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch'; // align-items
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'; // justify-content
  gap?: string | number;
  order?: number;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'; // flex-wrap

  // position
  position?: PositionType;
  axis?: { x?: string | number; y?: string | number };

  // padding
  padding?: TrafficType;

  // margin
  margin?: TrafficType;

  // background
  fill?: string;
  border?: BorderType;
  shadow?: ShadowType;
  blur?: number;
  opacity?: number;
  scale?: number;
  rotate?: string | number;
}

export interface MotionLayerPropsType<T extends ElementType = 'div'> extends Omit<MotionLayerType, ExcludedProps> {
  as?: T;
  children: ReactNode;
  css?: CSSObject;
  zIndex?: number;
  transition?: TransitionType;
  cursor?: CursorType;
  userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all';
  _mq?: MediaQueryType<MotionLayerType>;
  _hover?: Partial<MotionLayerType>;
  _focus?: Partial<MotionLayerType>;
  _active?: Partial<MotionLayerType>;

  // --- 모션 관련 속성 ---

  // 애니메이션 설정 속성

  /**
   * 애니메이션 시작 시 Y축 초기 위치 (px 단위)
   * 양수값: 아래에서 위로 움직임, 음수값: 위에서 아래로 움직임
   * 'initial' 속성이 제공되면 이 값은 무시됩니다.
   * @default 10
   */
  initialY?: number;

  /**
   * 애니메이션 시작 시 X축 초기 위치 (px 단위)
   * 양수값: 오른쪽에서 왼쪽으로 움직임, 음수값: 왼쪽에서 오른쪽으로 움직임
   * 'initial' 속성이 제공되면 이 값은 무시됩니다.
   * @default 0
   */
  initialX?: number;

  /**
   * 애니메이션 시작 시 초기 투명도 (0~1 사이 값)
   * 0: 완전 투명, 1: 완전 불투명
   * 'initial' 속성이 제공되면 이 값은 무시됩니다.
   * @default 0
   */
  initialOpacity?: number;

  /**
   * 애니메이션 시작 전 지연 시간 (초 단위)
   * 요소가 화면에 나타난 후 애니메이션이 시작되기까지의 대기 시간
   * @default 0
   */
  delay?: number;

  /**
   * 애니메이션 지속 시간 (초 단위)
   * 애니메이션이 시작부터 끝까지 완료되는 데 걸리는 시간
   * @default 0.25
   */
  duration?: number;

  /**
   * 애니메이션 활성화 여부
   * true: 애니메이션 활성화, false: 애니메이션 비활성화
   * 요소가 뷰포트에 들어왔을 때 동작하는 애니메이션 트리거 설정
   * @default true
   */
  activeAnimation?: boolean;

  // 트랜지션 물리 속성

  /**
   * 애니메이션 전환 유형
   * 'tween': 일반적인 부드러운 애니메이션 (기본값)
   * 'spring': 물리적인 스프링 효과가 있는 애니메이션
   * 'inertia': 관성을 가진 감속 애니메이션
   * 'just': 즉시 값 변경
   */
  transitionType?: 'tween' | 'spring' | 'inertia' | 'just';

  /**
   * 스프링 애니메이션의 강성도
   * 값이 클수록 더 빠르고 강한 스프링 효과 생성 (spring 타입에서만 사용)
   * 일반적으로 100-500 사이의 값 사용 (기본값: 100)
   */
  stiffness?: number;

  /**
   * 스프링 애니메이션의 감쇠 계수
   * 값이 클수록 진동이 빨리 안정화 (spring 타입에서만 사용)
   * 일반적으로 10-100 사이의 값 사용 (기본값: 10)
   */
  damping?: number;

  /**
   * 스프링 애니메이션의 질량
   * 값이 클수록 더 무겁고 느린 움직임 (spring 타입에서만 사용)
   * 일반적으로 1-10 사이의 값 사용 (기본값: 1)
   */
  mass?: number;

  /**
   * 스프링 애니메이션의 탄성
   * 값이 클수록 더 많이 튀는 효과 (spring 타입에서만 사용)
   * 0-1 사이의 값 사용 (기본값: 0.25)
   */
  bounce?: number;

  /**
   * 애니메이션이 멈추는 속도 임계값
   * 애니메이션 속도가 이 값보다 낮아지면 자동으로 종료 (spring 타입에서만 사용)
   * 기본값: 0.01
   */
  restSpeed?: number;

  /**
   * 애니메이션이 멈추는 거리 임계값
   * 최종 위치와의 거리가 이 값보다 작아지면 자동으로 종료 (spring 타입에서만 사용)
   * 기본값: 0.01
   */
  restDelta?: number;

  // Framer Motion 네이티브 속성 (더 나은 문서화를 위해 명시적으로 추가)

  /**
   * 애니메이션 상태 변형 집합
   * 여러 애니메이션 상태를 미리 정의하여 쉽게 전환할 수 있게 함
   * 예: variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
   */
  variants?: Variants;

  /**
   * 초기 애니메이션 상태
   * 컴포넌트가 처음 마운트될 때의 상태 정의
   * 문자열이면 variants에 정의된 상태 이름, 객체면 직접 스타일 정의
   * 이 속성을 사용하면 initialY, initialX, initialOpacity는 무시됨
   */
  initial?: boolean | VariantLabels | TargetAndTransition;

  /**
   * 목표 애니메이션 상태
   * 컴포넌트가 변해야 할 최종 상태 정의
   * 문자열이면 variants에 정의된 상태 이름, 객체면 직접 스타일 정의
   */
  animate?: VariantLabels | TargetAndTransition;

  /**
   * 종료 애니메이션 상태
   * 컴포넌트가 언마운트될 때의 상태 정의 (AnimatePresence 내에서만 작동)
   * 문자열이면 variants에 정의된 상태 이름, 객체면 직접 스타일 정의
   */
  exit?: VariantLabels | TargetAndTransition;

  /**
   * 호버 상태 애니메이션
   * 마우스를 요소 위에 올렸을 때 적용될 애니메이션 정의
   * _hover 속성과 통합되어 사용됨
   */
  whileHover?: VariantLabels | TargetAndTransition;

  /**
   * 탭/클릭 상태 애니메이션
   * 요소를 클릭했을 때 적용될 애니메이션 정의
   */
  whileTap?: VariantLabels | TargetAndTransition;

  /**
   * 포커스 상태 애니메이션
   * 요소가 포커스되었을 때 적용될 애니메이션 정의
   * _focus 속성과 통합되어 사용됨
   */
  whileFocus?: VariantLabels | TargetAndTransition;

  /**
   * 드래그 상태 애니메이션
   * 요소를 드래그할 때 적용될 애니메이션 정의
   */
  whileDrag?: VariantLabels | TargetAndTransition;

  /**
   * 뷰포트 진입 시 애니메이션
   * 요소가 뷰포트에 들어왔을 때 적용될 애니메이션 정의
   */
  whileInView?: VariantLabels | TargetAndTransition;

  /**
   * 뷰포트 설정
   * whileInView와 함께 사용되어 뷰포트 감지 옵션을 설정
   * 예: { once: true, amount: "some" }
   */
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: 'some' | 'all' | number;
    root?: RefObject<Element>;
  };

  // 드래그 기능

  /**
   * 드래그 활성화
   * 요소를 드래그할 수 있게 함
   * true: 모든 방향, "x": 수평 방향만, "y": 수직 방향만
   */
  drag?: boolean | 'x' | 'y';

  /**
   * 드래그 제약 조건
   * 드래그할 수 있는 영역 제한
   * 객체: { top, right, bottom, left } 또는 참조 요소
   */
  dragConstraints?:
    | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      }
    | RefObject<Element>;

  /**
   * 드래그 탄성
   * 제약 조건을 넘어설 때의 탄성도
   * 0: 전혀 넘어갈 수 없음, 1: 제약 없음 (기본값: 0.5)
   */
  dragElastic?:
    | number
    | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };

  /**
   * 드래그 모멘텀
   * 드래그 후 관성 효과 활성화 여부
   * true: 활성화, false: 비활성화
   */
  dragMomentum?: boolean;

  /**
   * 드래그 시작 이벤트 리스너
   * 드래그가 시작될 때 호출될 함수
   */
  onDragStart?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;

  /**
   * 드래그 중 이벤트 리스너
   * 드래그 중에 호출될 함수
   */
  onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;

  /**
   * 드래그 종료 이벤트 리스너
   * 드래그가 끝날 때 호출될 함수
   */
  onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;

  // 레이아웃 애니메이션

  /**
   * 레이아웃 애니메이션
   * 요소의 크기나 위치가 변경될 때 자동으로 애니메이션 적용
   * true: 활성화, false: 비활성화, "position": 위치만, "size": 크기만
   */
  layout?: boolean | 'position' | 'size';

  /**
   * 레이아웃 ID
   * 서로 다른 컴포넌트 간에 애니메이션 전환을 공유하기 위한 식별자
   */
  layoutId?: string;
}

export type MotionLayerLayoutElement = Omit<MotionLayerPropsType<LayoutElementType>, ExcludedProps>;
