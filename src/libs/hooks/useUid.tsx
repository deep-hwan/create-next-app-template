import { useId, useRef } from 'react';

export const useUid = ({ length = 10 }: { length?: number } = {}): string => {
  const id = useId();
  const counterRef = useRef(0);
  counterRef.current += 1;
  return `${id}-${counterRef.current}`;
};
