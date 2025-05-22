import { useState, useEffect, useCallback, RefObject } from 'react';

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export interface ElementConfig {
  ref: RefObject<HTMLElement | null>;
  subtractContainerLeft?: boolean;
  offsetX?: number;
  offsetY?: number;
}

export const useRelativeElementPositions = (
  containerRef: RefObject<HTMLElement | null>,
  elementConfigs: ElementConfig[],
) => {
  const [positions, setPositions] = useState<DOMRect[]>([]);
  const [dimensionsVersion, setDimensionsVersion] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setDimensionsVersion((prev) => prev + 1);
    };
    const debouncedHandleResize = debounce(handleResize, 150);
    window.addEventListener('resize', debouncedHandleResize);
    
    const initialTimeout = setTimeout(() => {
      handleResize();
    }, 0);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(initialTimeout);
    };
  }, []);

  const calculate = useCallback(() => {
    if (!containerRef.current || elementConfigs.some(config => !config.ref.current)) {
      setPositions([]);
      return;
    }
    const containerRect = containerRef.current.getBoundingClientRect();

    const calculated = elementConfigs.map((config) => {
      const element = config.ref.current!;
      const rect = element.getBoundingClientRect();
      
      const relativeX = rect.left - (config.subtractContainerLeft ? containerRect.left : 0);
      const relativeY = rect.top - containerRect.top;

      return new DOMRect(
        relativeX + (config.offsetX || 0),
        relativeY + (config.offsetY || 0),
        rect.width,
        rect.height
      );
    });
    setPositions(calculated);
  }, [containerRef, elementConfigs]);

  useEffect(() => {
    calculate();
  }, [dimensionsVersion, calculate]);

  return positions;
};