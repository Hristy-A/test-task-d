import { useEffect } from 'react';
import { getBottomOffset } from '@/utils/getBottomOffset';
import { throttle } from '@/utils/throttle';

export function useInfinityScroll(onPageEnd, offset = 50, throttleMs = 50) {
  useEffect(() => {
    const scrollHandler = throttle(() => {
      if (getBottomOffset(window) < offset) {
        onPageEnd();
      }
    }, throttleMs);

    document.addEventListener('scroll', scrollHandler);

    return () => document.addEventListener('scroll', scrollHandler);
  }, [onPageEnd, offset, throttleMs]);
}
