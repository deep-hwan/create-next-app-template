/** @jsxImportSource @emotion/react */
'use client';

import { CSSObject, Interpolation, Theme, css, keyframes } from '@emotion/react';
import React, { ReactNode, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// ============================================================================
// 타입 정의
// ============================================================================

/**
 * 확인창 설정을 위한 인터페이스
 */
interface ConfirmOptions {
  type?: 'primary' | 'success' | 'failed';
  title?: string;
  message?: string;
  onConfirm?: () => void;
}

/**
 * Confirm 컨텍스트 인터페이스
 */
interface ConfirmContextType {
  onConfirm: (options: ConfirmOptions) => void;
  addConfirm: (options: ConfirmOptions) => void;
}

/**
 * BottomConfirmBox 컴포넌트 Props
 */
interface ConfirmBoxProps {
  type: 'primary' | 'success' | 'failed';
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}

/**
 * 체크 아이콘 컴포넌트 Props
 */
interface CheckIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  backgroundColor?: string;
  duration?: number;
  type?: 'success' | 'failed';
}

/**
 * 확인창 제목 컴포넌트 Props
 */
interface ConfirmTitleProps {
  title: string;
  message: string;
}

/**
 * Fixed 컴포넌트 Props
 */
interface FixedProps {
  children: ReactNode;
  open: boolean;
}

// ============================================================================
// 애니메이션 정의
// ============================================================================

/**
 * 원 그리기 애니메이션
 */
const drawCircle = keyframes`
  0% {
    stroke-dashoffset: 283;
    transform: rotate(-90deg);
  }
  100% {
    stroke-dashoffset: 0;
    transform: rotate(0deg);
  }
`;

/**
 * 체크표시 그리기 애니메이션
 */
const drawCheck = keyframes`
  0% {
    stroke-dashoffset: 50;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

/**
 * X표시 그리기 애니메이션
 */
const drawX = keyframes`
  0% {
    stroke-dashoffset: 60;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

/**
 * 펄스 효과 애니메이션
 */
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

/**
 * 배경 페이드인 애니메이션
 */
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.1;
  }
`;

/**
 * 실패 시 모달 흔들림 애니메이션
 */
const shakeAnimation = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  10% { transform: translate(-6px, -4px) rotate(-1deg); }
  20% { transform: translate(5px, 3px) rotate(1deg); }
  30% { transform: translate(-5px, -3px) rotate(-0.5deg); }
  40% { transform: translate(4px, 4px) rotate(0.5deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  60% { transform: translate(-4px, -3px) rotate(-0.5deg); }
  70% { transform: translate(5px, 2px) rotate(0.5deg); }
  80% { transform: translate(-3px, -2px) rotate(-0.5deg); }
  90% { transform: translate(3px, 2px) rotate(0.5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

// ============================================================================
// 스타일 정의
// ============================================================================

/**
 * 공통 Flex 스타일
 */
const flexT: Interpolation<Theme> = {
  width: '100%',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: '0.2s ease-in-out',
};

// ============================================================================
// 컴포넌트 정의
// ============================================================================

// 컨텍스트 생성
const ConfirmContext = createContext<ConfirmContextType | null>(null);

/**
 * 확인창 제목 컴포넌트
 */
const ConfirmTitle: React.FC<ConfirmTitleProps> = ({ title, message }) => {
  // 공통 스타일
  const initialStyle: CSSObject = {
    whiteSpace: 'pre-line',
    textAlign: 'center',
    userSelect: 'none',
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  };

  return (
    <>
      {/* 제목 */}
      <b
        css={{
          fontSize: '1rem',
          color: '#5e5f69',
          ...initialStyle,
        }}
      >
        {title}
      </b>

      {/* 간격 */}
      <div css={{ minHeight: 6 }} />

      {/* 메시지 */}
      <p
        css={{
          fontSize: '0.875rem',
          color: '#87888a',
          ...initialStyle,
        }}
      >
        {message}
      </p>
    </>
  );
};

/**
 * 애니메이션 체크/X 아이콘 컴포넌트
 */
const CheckAnimateIcon: React.FC<CheckIconProps> = ({
  size = 48,
  color,
  strokeWidth = 3,
  className,
  backgroundColor,
  duration = 0.7,
  type = 'success',
}) => {
  // 타입에 따른 색상 및 배경색 설정
  const iconColor = color || (type === 'success' ? '#4CAF50' : '#FF5252');
  const bgColor = backgroundColor || (type === 'success' ? '#7fd5a1' : '#ffcdd2');

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      css={css`
        /* 배경 애니메이션 */
        .background {
          opacity: 0;
          animation: ${fadeIn} ${duration * 0.5}s ease forwards;
          animation-delay: ${duration * 0.7}s;
        }
        /* 원 그리기 애니메이션 */
        .circle {
          stroke-dasharray: 283;
          stroke-dashoffset: 283;
          transform-origin: center;
          animation: ${drawCircle} ${duration}s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        /* 체크표시 애니메이션 */
        .check {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: ${drawCheck} ${duration * 0.4}s ease forwards;
          animation-delay: ${duration * 0.9}s;
        }
        /* X표시 애니메이션 (선 1, 선 2) */
        .x-line1,
        .x-line2 {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: ${drawX} ${duration * 0.3}s ease forwards;
        }
        .x-line1 {
          animation-delay: ${duration * 0.9}s;
        }
        .x-line2 {
          animation-delay: ${duration * 1.1}s;
        }
        /* 아이콘 펄스 효과 */
        .icon-container {
          animation: ${pulse} ${duration * 0.5}s cubic-bezier(0.65, 0, 0.35, 1) forwards;
          animation-delay: ${duration * 1.3}s;
          transform-origin: center;
        }
      `}
    >
      <g className='icon-container'>
        {/* 배경 원 */}
        <circle className='background' cx='24' cy='24' r='22' fill={bgColor} />

        {/* 테두리 원 */}
        <circle
          className='circle'
          cx='24'
          cy='24'
          r='20'
          stroke={iconColor}
          strokeWidth={strokeWidth}
          fill='none'
          strokeLinecap='round'
        />

        {/* 성공 또는 실패 아이콘 */}
        {type === 'success' ? (
          // 체크 표시
          <path
            className='check'
            d='M16 24L22 30L34 18'
            stroke={iconColor}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='none'
          />
        ) : (
          // X 표시
          <>
            <path
              className='x-line1'
              d='M16 16L32 32'
              stroke={iconColor}
              strokeWidth={strokeWidth}
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
            <path
              className='x-line2'
              d='M32 16L16 32'
              stroke={iconColor}
              strokeWidth={strokeWidth}
              strokeLinecap='round'
              strokeLinejoin='round'
              fill='none'
            />
          </>
        )}
      </g>
    </svg>
  );
};

/**
 * 고정 위치 컨테이너 컴포넌트
 */
const Fixed: React.FC<FixedProps> = ({ children, open }) => {
  // 세이프 에리어 고려
  const bottom = `max(${20}px, env(safe-area-inset-bottom))`;
  const left = `max(${5}px, env(safe-area-inset-left))`;
  const right = `max(${5}px, env(safe-area-inset-right))`;

  return (
    <div
      css={{
        ...flexT,
        overscrollBehavior: 'contain',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        opacity: open ? 1 : 0,
        zIndex: 1000000000,
        paddingBottom: bottom,
        paddingLeft: left,
        paddingRight: right,
      }}
    >
      {children}
    </div>
  );
};

/**
 * 하단 확인 대화상자 컴포넌트
 */
const BottomConfirmBox: React.FC<ConfirmBoxProps> = ({ type, open, title, message, onConfirm, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 상태 관리
  const [delayedOpen, setDelayedOpen] = useState(false);
  const [isAutoClosing, setIsAutoClosing] = useState(false);
  const [showShake, setShowShake] = useState(false);

  // 모달 열림/닫힘 효과
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => setDelayedOpen(true), 50);
      return () => clearTimeout(timeout);
    } else {
      setDelayedOpen(false);
    }
  }, [open]);

  // Failed 타입일 때 흔들림 애니메이션 처리
  useEffect(() => {
    if (delayedOpen && type === 'failed') {
      const animationTimeout = setTimeout(() => {
        setShowShake(true);

        const resetTimeout = setTimeout(() => {
          setShowShake(false);
        }, 1000);

        return () => clearTimeout(resetTimeout);
      }, 100);

      return () => clearTimeout(animationTimeout);
    }
  }, [delayedOpen, type]);

  // 모달 닫기 핸들러
  const handleCancel = () => {
    setDelayedOpen(false);
    const timeout = setTimeout(() => onClose(), 100);
    return () => clearTimeout(timeout);
  };

  // Success 타입일 때 자동 닫힘 처리
  useEffect(() => {
    if (delayedOpen && type === 'success') {
      setIsAutoClosing(true);

      const autoCloseTimeout = setTimeout(() => {
        handleCancel();
        setIsAutoClosing(false);
      }, 1200);

      return () => {
        clearTimeout(autoCloseTimeout);
        setIsAutoClosing(false);
      };
    }
  }, [delayedOpen, type]);

  // 모달 외부 클릭 핸들러
  const clickOutSideClose = !isAutoClosing && type !== 'failed';
  const clickModalOutside = useCallback(
    (event: MouseEvent) => {
      if (
        clickOutSideClose &&
        open &&
        ref &&
        'current' in ref &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        handleCancel();
      }
    },
    [open, handleCancel, clickOutSideClose, ref]
  );

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {
      document.removeEventListener('mousedown', clickModalOutside);
    };
  }, [clickModalOutside]);

  return (
    <>
      {open && (
        <Fixed open={delayedOpen}>
          <div
            ref={ref}
            css={{
              ...flexT,
              height: 'auto',
              maxWidth: type === 'success' ? 86 : 340,
              minWidth: type === 'success' ? 86 : 320,
              padding: 18,
              borderRadius: 24,
              overscrollBehavior: 'contain',
              backgroundColor: '#fafafa',
              border: '1px solid #e2e2e2',
              boxShadow: `0 0 16px 0 ${type === 'failed' ? 'rgba(255, 0, 0, 0.12)' : 'rgba(66, 102, 193, 0.16)'}`,
              transition: '0.2s ease-in-out',
              animation: showShake ? `${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both` : 'none',
              animationIterationCount: '1',
            }}
          >
            <div css={flexT}>
              {/* 성공 타입 UI */}
              {type === 'success' && <CheckAnimateIcon />}

              {/* 기본 타입 UI */}
              {type === 'primary' && (
                <>
                  <ConfirmTitle title={title} message={message} />
                  <div css={{ minHeight: 10 }} />
                  <button type='button' onClick={onConfirm} css={{ padding: 5, cursor: 'pointer', outline: 'none' }}>
                    <CheckAnimateIcon duration={0} size={28} />
                  </button>
                </>
              )}

              {/* 실패 타입 UI */}
              {type === 'failed' && (
                <>
                  <CheckAnimateIcon size={32} type='failed' />
                  <div css={{ minHeight: 15 }} />
                  <ConfirmTitle title={title} message={message} />
                  <div css={{ minHeight: 20 }} />
                  <button
                    type='button'
                    onClick={onClose}
                    css={{
                      userSelect: 'none',
                      padding: '5px 14px',
                      cursor: 'pointer',
                      outline: 'none',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #e2e2e2',
                      fontSize: '0.875rem',
                      color: '#89888a',
                      borderRadius: 100,
                    }}
                  >
                    확인
                  </button>
                </>
              )}
            </div>
          </div>
        </Fixed>
      )}
    </>
  );
};

/**
 * 확인창 Provider 컴포넌트
 */
export const ConfirmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'primary' | 'success' | 'failed'>('primary');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [callback, setCallback] = useState<(() => void) | undefined>(undefined);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 모달 열기 함수
  const onConfirm = ({ type = 'primary', title, message, onConfirm }: ConfirmOptions) => {
    // 타입별 기본값 설정
    let modalTitle = '';
    let modalMessage = '';

    if (type === 'primary') {
      modalTitle = title || '아래 버튼을 클릭하세요';
      modalMessage = message || '취소 및 닫기는 외부를 클릭하면 모달이 사라져요';
    } else if (type === 'failed') {
      modalTitle = title || '요청에 실패했어요';
      modalMessage = message || '확인 후 다시 한번 시도해주세요';
    } else if (type === 'success') {
      modalTitle = title || '성공했습니다!';
      modalMessage = message || '';
    }

    // 애니메이션 처리 로직
    if (isOpen && !isTransitioning) {
      // 이미 모달이 열려있는 경우, 애니메이션 효과를 위해 잠시 닫았다가 다시 열기
      setIsTransitioning(true);
      setIsOpen(false);

      // 모달이 닫힌 후 새 내용으로 다시 열기
      setTimeout(() => {
        setType(type);
        setTitle(modalTitle);
        setMessage(modalMessage);
        setCallback(() => onConfirm);
        setIsOpen(true);

        // 전환 상태 해제 (빠른 연속 호출 방지)
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 300);
    } else if (!isTransitioning) {
      // 모달이 닫혀있거나 전환 중이 아닌 경우 바로 열기
      setType(type);
      setTitle(modalTitle);
      setMessage(modalMessage);
      setCallback(() => onConfirm);
      setIsOpen(true);
    }
  };

  // 모달 닫기 함수
  const handleClose = () => {
    setIsOpen(false);
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    if (type === 'primary') {
      // Primary 타입일 때는 확인 후 모달 닫기
      setIsOpen(false);
    }
    // 콜백 함수 실행 (모든 타입에서 실행)
    if (callback) callback();
  };

  return (
    <ConfirmContext.Provider value={{ onConfirm, addConfirm: onConfirm }}>
      {children}
      <BottomConfirmBox
        type={type}
        open={isOpen}
        title={title}
        message={message}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </ConfirmContext.Provider>
  );
};

/**
 * useConfirm 훅
 * 컴포넌트에서 확인창을 쉽게 사용할 수 있게 해주는 커스텀 훅
 */
export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};

/**
 * 컴포넌트 내보내기 (필요한 경우)
 */
export { CheckAnimateIcon, ConfirmTitle };
