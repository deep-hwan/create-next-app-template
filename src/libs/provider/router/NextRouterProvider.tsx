'use client';

import type { NextRouter } from 'next/router';
import { useRouter as useNextRouter } from 'next/router';
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from 'react';

interface ExtendedRouter extends NextRouter {
  scrollResetBack: () => void;
}

interface NextRouterContextType {
  router: ExtendedRouter;
}

const NextRouterContext = createContext<NextRouterContextType | null>(null);

interface NextRouterProviderProps {
  children: ReactNode;
}

const SCROLL_POSITIONS_KEY = 'scroll_positions';

export function NextRouterProvider({ children }: NextRouterProviderProps) {
  const nextRouter = useNextRouter();
  const isRestoringScroll = useRef(false);

  // 스크롤 위치 저장 함수
  const saveScrollPosition = useCallback((url: string, position: number) => {
    try {
      const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');
      positions[url] = position;
      sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
    } catch (error) {
      console.warn('Failed to save scroll position:', error);
    }
  }, []);

  // 스크롤 위치 가져오기 함수
  const getScrollPosition = useCallback((url: string): number => {
    try {
      const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');
      return positions[url] || 0;
    } catch (error) {
      console.warn('Failed to get scroll position:', error);
      return 0;
    }
  }, []);

  // 스크롤 위치 삭제 함수
  const removeScrollPosition = useCallback((url: string) => {
    try {
      const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');
      delete positions[url];
      sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
    } catch (error) {
      console.warn('Failed to remove scroll position:', error);
    }
  }, []);

  // 페이지 변경 시 스크롤 위치 저장
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (!isRestoringScroll.current) {
        const currentPosition = window.scrollY;
        saveScrollPosition(nextRouter.asPath, currentPosition);
      }
    };

    const handleRouteChangeComplete = (url: string) => {
      // 뒤로가기로 온 경우 스크롤 위치 복원
      if (isRestoringScroll.current) {
        const savedPosition = getScrollPosition(url);
        setTimeout(() => {
          window.scrollTo(0, savedPosition);
          isRestoringScroll.current = false;
        }, 100);
      }
    };

    nextRouter.events.on('routeChangeStart', handleRouteChangeStart);
    nextRouter.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      nextRouter.events.off('routeChangeStart', handleRouteChangeStart);
      nextRouter.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [nextRouter, saveScrollPosition, getScrollPosition]);

  // 확장된 back 함수
  const extendedBack = useCallback(() => {
    isRestoringScroll.current = true;
    nextRouter.back();
  }, [nextRouter]);

  // 새로운 scrollResetBack 함수
  const scrollResetBack = useCallback(() => {
    isRestoringScroll.current = false;
    // 현재 페이지의 스크롤 위치를 삭제하여 다음에 이 페이지로 올 때 최상단에서 시작하도록 함
    removeScrollPosition(nextRouter.asPath);
    nextRouter.back();
  }, [nextRouter, removeScrollPosition]);

  // push와 replace 함수 래핑
  const extendedPush = useCallback(
    (url: any, as?: any, options?: any) => {
      isRestoringScroll.current = false;
      return nextRouter.push(url, as, options);
    },
    [nextRouter]
  );

  const extendedReplace = useCallback(
    (url: any, as?: any, options?: any) => {
      isRestoringScroll.current = false;
      return nextRouter.replace(url, as, options);
    },
    [nextRouter]
  );

  // 확장된 라우터 객체 - next/router의 모든 프로퍼티와 메서드를 포함
  const extendedRouter: ExtendedRouter = {
    // 기존 next/router의 모든 프로퍼티들
    route: nextRouter.route,
    pathname: nextRouter.pathname,
    query: nextRouter.query,
    asPath: nextRouter.asPath,
    basePath: nextRouter.basePath,
    locale: nextRouter.locale,
    locales: nextRouter.locales,
    defaultLocale: nextRouter.defaultLocale,
    domainLocales: nextRouter.domainLocales,
    isReady: nextRouter.isReady,
    isPreview: nextRouter.isPreview,
    isLocaleDomain: nextRouter.isLocaleDomain,
    isFallback: nextRouter.isFallback,
    events: nextRouter.events,

    // 기존 next/router의 모든 메서드들
    push: extendedPush,
    replace: extendedReplace,
    reload: nextRouter.reload,
    back: extendedBack, // 스크롤 위치 복원 기능이 추가된 back
    forward: nextRouter.forward,
    prefetch: nextRouter.prefetch,
    beforePopState: nextRouter.beforePopState,

    // 새로 추가된 메서드
    scrollResetBack, // 스크롤 위치 초기화하여 뒤로가기
  };

  return <NextRouterContext.Provider value={{ router: extendedRouter }}>{children}</NextRouterContext.Provider>;
}

export function useRouter(): ExtendedRouter {
  const context = useContext(NextRouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a NextRouterProvider');
  }
  return context.router;
}
