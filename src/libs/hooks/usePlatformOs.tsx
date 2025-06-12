import { useEffect, useState } from 'react';

export function usePlatformOs() {
  // 초기값은 서버사이드 렌더링과 동일하게 설정
  const [platform, setPlatform] = useState<'android' | 'ios' | 'PC' | 'Unknown'>('Unknown');

  useEffect(() => {
    // 클라이언트에서만 실행되도록 보장
    if (typeof window !== 'undefined' && 'userAgent' in navigator) {
      const UA = navigator?.userAgent?.toLowerCase();

      // Check for Android devices
      if (UA.includes('android')) {
        setPlatform('android');
        return;
      }

      // Check for Apple devices
      if (UA.includes('iphone') || UA.includes('ipad') || UA.includes('ipod') || UA.includes('macintosh')) {
        setPlatform('ios'); // All Apple devices, including Macs, are treated as "iOS"
        return;
      }

      // Everything else is considered "PC"
      setPlatform('PC');
    }
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  return platform;
}
