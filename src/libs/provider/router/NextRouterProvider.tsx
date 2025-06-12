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
  const isBrowserNavigation = useRef(false);
  const isBackNavigation = useRef(false); // back 네비게이션인지 구분
  const pendingScrollPosition = useRef<number | null>(null);
  const currentUrl = useRef<string>('');
  const shouldRestoreScroll = useRef(false);
  const scrollSaveInterval = useRef<NodeJS.Timeout | null>(null);

  // URL 정규화 함수 (쿼리 파라미터 포함하여 더 정확한 매칭)
  const normalizeUrl = useCallback((url: string) => {
    try {
      const urlObj = new URL(url, window.location.origin);
      // 쿼리 파라미터도 포함하여 더 정확한 URL 매칭
      return urlObj.pathname + urlObj.search;
    } catch {
      return url.split('#')[0]; // 해시만 제거
    }
  }, []);

  // 현재 URL 추적
  useEffect(() => {
    currentUrl.current = normalizeUrl(nextRouter.asPath);
  }, [nextRouter.asPath, normalizeUrl]);

  // 브라우저의 기본 스크롤 복원 비활성화
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // 스크롤 중 저장 (back 관련 네비게이션이 아닐 때만)
  useEffect(() => {
    const handleScroll = () => {
      // back 네비게이션이 아닐 때만 스크롤 위치 저장
      if (!isBackNavigation.current && !isRestoringScroll.current) {
        if (scrollSaveInterval.current) {
          clearTimeout(scrollSaveInterval.current);
        }

        scrollSaveInterval.current = setTimeout(() => {
          const position = window.scrollY;
          if (position > 0) {
            saveScrollPosition(currentUrl.current, position);
          }
        }, 150);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollSaveInterval.current) {
          clearTimeout(scrollSaveInterval.current);
        }
      };
    }
  }, []);

  // 페이지 언로드 시 스크롤 위치 저장 (back 네비게이션이 아닐 때만)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!isBackNavigation.current) {
        const position = window.scrollY;
        saveScrollPosition(currentUrl.current, position);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isBackNavigation.current) {
        const position = window.scrollY;
        saveScrollPosition(currentUrl.current, position);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', handleBeforeUnload);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);

  // beforePopState를 사용한 브라우저 네비게이션 감지
  useEffect(() => {
    const handleBeforePopState = (state: any) => {
      // 현재 스크롤 위치 저장
      const currentPosition = window.scrollY;
      saveScrollPosition(currentUrl.current, currentPosition);

      isBrowserNavigation.current = true;
      isBackNavigation.current = true;
      shouldRestoreScroll.current = true;

      return true; // 네비게이션 허용
    };

    nextRouter.beforePopState(handleBeforePopState);

    return () => {
      nextRouter.beforePopState(() => true);
    };
  }, [nextRouter]);

  // popstate 이벤트로 브라우저 네비게이션 완료 감지
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (shouldRestoreScroll.current && isBackNavigation.current) {
        // 다중 시도로 안정적인 스크롤 복원 (back 네비게이션에서만)
        const attemptScrollRestore = (attemptCount = 0) => {
          const newUrl = normalizeUrl(window.location.pathname + window.location.search + window.location.hash);
          const savedPosition = getScrollPosition(newUrl);

          if (savedPosition > 0) {
            window.scrollTo(0, savedPosition);

            // 복원 확인 및 재시도
            setTimeout(() => {
              const currentScroll = window.scrollY;
              if (Math.abs(currentScroll - savedPosition) > 10 && attemptCount < 3) {
                attemptScrollRestore(attemptCount + 1);
              } else {
                shouldRestoreScroll.current = false;
                isBrowserNavigation.current = false;
                isBackNavigation.current = false;
              }
            }, 50);
          } else {
            shouldRestoreScroll.current = false;
            isBrowserNavigation.current = false;
            isBackNavigation.current = false;
          }
        };

        // 초기 시도는 조금 지연
        setTimeout(() => attemptScrollRestore(), 100);
      } else {
        // back 네비게이션이 아니면 상태만 초기화
        shouldRestoreScroll.current = false;
        isBrowserNavigation.current = false;
        isBackNavigation.current = false;
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  // 스크롤 위치 저장 함수
  const saveScrollPosition = useCallback(
    (url: string, position: number) => {
      try {
        const normalizedUrl = normalizeUrl(url);
        const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');

        // 이전 위치와 다를 때만 저장 (불필요한 저장 방지)
        if (positions[normalizedUrl] !== position) {
          positions[normalizedUrl] = position;
          sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
        }
      } catch (error) {
        console.warn('Failed to save scroll position:', error);
      }
    },
    [normalizeUrl]
  );

  // 스크롤 위치 가져오기 함수
  const getScrollPosition = useCallback(
    (url: string): number => {
      try {
        const normalizedUrl = normalizeUrl(url);
        const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');
        const position = positions[normalizedUrl] || 0;

        return position;
      } catch (error) {
        console.warn('Failed to get scroll position:', error);
        return 0;
      }
    },
    [normalizeUrl]
  );

  // 스크롤 위치 삭제 함수
  const removeScrollPosition = useCallback(
    (url: string) => {
      try {
        const normalizedUrl = normalizeUrl(url);
        const positions = JSON.parse(sessionStorage.getItem(SCROLL_POSITIONS_KEY) || '{}');
        delete positions[normalizedUrl];
        sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
      } catch (error) {
        console.warn('Failed to remove scroll position:', error);
      }
    },
    [normalizeUrl]
  );

  // 강력한 스크롤 복원 함수 (back에서만 사용)
  const forceScrollRestore = useCallback((targetPosition: number, maxAttempts = 5) => {
    let attempts = 0;

    const attemptRestore = () => {
      attempts++;
      window.scrollTo(0, targetPosition);

      setTimeout(() => {
        const currentPosition = window.scrollY;
        if (Math.abs(currentPosition - targetPosition) > 5 && attempts < maxAttempts) {
          attemptRestore();
        } else {
          isRestoringScroll.current = false;
          isBackNavigation.current = false;
          pendingScrollPosition.current = null;
        }
      }, 50);
    };

    attemptRestore();
  }, []);

  // 새 페이지로 이동시 스크롤을 상단으로 (push/replace에서 사용)
  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  // 페이지 변경 시 스크롤 위치 저장 및 복원
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      if (isBackNavigation.current || isRestoringScroll.current) {
        // back 네비게이션에서만 복원할 스크롤 위치 미리 준비
        const targetUrl = normalizeUrl(url);
        pendingScrollPosition.current = getScrollPosition(targetUrl);
      } else {
        // 일반 네비게이션에서 현재 스크롤 위치 저장
        const currentPosition = window.scrollY;
        saveScrollPosition(currentUrl.current, currentPosition);
        pendingScrollPosition.current = null;
      }
    };

    const handleRouteChangeComplete = (url: string) => {
      if (
        (isRestoringScroll.current || isBackNavigation.current) &&
        !isBrowserNavigation.current &&
        pendingScrollPosition.current !== null
      ) {
        // router.back()으로 온 경우에만 스크롤 위치 복원

        // 강력한 스크롤 복원 사용
        requestAnimationFrame(() => {
          if (pendingScrollPosition.current !== null) {
            forceScrollRestore(pendingScrollPosition.current);
          }
        });
      } else if (!isBackNavigation.current && !isBrowserNavigation.current) {
        // push/replace로 온 경우 항상 상단으로 스크롤
        requestAnimationFrame(() => {
          scrollToTop();
          // 상태 초기화
          isRestoringScroll.current = false;
          isBackNavigation.current = false;
          pendingScrollPosition.current = null;
        });
      } else {
        // 브라우저 네비게이션에서는 상태만 초기화 (popstate에서 처리됨)
        if (!isBrowserNavigation.current) {
          isRestoringScroll.current = false;
          isBackNavigation.current = false;
          pendingScrollPosition.current = null;
        }
      }
    };

    const handleRouteChangeError = () => {
      // 라우팅 에러 시 상태 초기화
      isRestoringScroll.current = false;
      isBrowserNavigation.current = false;
      isBackNavigation.current = false;
      pendingScrollPosition.current = null;
      shouldRestoreScroll.current = false;
    };

    nextRouter.events.on('routeChangeStart', handleRouteChangeStart);
    nextRouter.events.on('routeChangeComplete', handleRouteChangeComplete);
    nextRouter.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      nextRouter.events.off('routeChangeStart', handleRouteChangeStart);
      nextRouter.events.off('routeChangeComplete', handleRouteChangeComplete);
      nextRouter.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [nextRouter, saveScrollPosition, getScrollPosition, normalizeUrl, forceScrollRestore, scrollToTop]);

  // 확장된 back 함수
  const extendedBack = useCallback(() => {
    // 현재 스크롤 위치를 한번 더 저장
    const currentPosition = window.scrollY;
    saveScrollPosition(currentUrl.current, currentPosition);

    isRestoringScroll.current = true;
    isBackNavigation.current = true;
    isBrowserNavigation.current = false; // 프로그래밍 방식 네비게이션
    nextRouter.back();
  }, [nextRouter, saveScrollPosition]);

  // 새로운 scrollResetBack 함수
  const scrollResetBack = useCallback(() => {
    isRestoringScroll.current = false;
    isBackNavigation.current = true; // 여전히 back 네비게이션
    isBrowserNavigation.current = false;
    pendingScrollPosition.current = null;
    // 현재 페이지의 스크롤 위치를 삭제하여 다음에 이 페이지로 올 때 최상단에서 시작하도록 함
    removeScrollPosition(currentUrl.current);
    nextRouter.back();
  }, [nextRouter, removeScrollPosition]);

  // push와 replace 함수 래핑 (스크롤 복원 완전 비활성화)
  const extendedPush = useCallback(
    (url: any, as?: any, options?: any) => {
      // 현재 스크롤 위치를 한번 더 저장
      const currentPosition = window.scrollY;
      saveScrollPosition(currentUrl.current, currentPosition);

      // push에서는 스크롤 복원 관련 플래그 모두 비활성화
      isRestoringScroll.current = false;
      isBackNavigation.current = false;
      isBrowserNavigation.current = false;
      pendingScrollPosition.current = null;
      return nextRouter.push(url, as, options);
    },
    [nextRouter, saveScrollPosition]
  );

  const extendedReplace = useCallback(
    (url: any, as?: any, options?: any) => {
      // 현재 스크롤 위치를 한번 더 저장
      const currentPosition = window.scrollY;
      saveScrollPosition(currentUrl.current, currentPosition);

      // replace에서는 스크롤 복원 관련 플래그 모두 비활성화
      isRestoringScroll.current = false;
      isBackNavigation.current = false;
      isBrowserNavigation.current = false;
      pendingScrollPosition.current = null;
      return nextRouter.replace(url, as, options);
    },
    [nextRouter, saveScrollPosition]
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
