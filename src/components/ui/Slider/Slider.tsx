"use client";

// Dependencies
import {
  CSSProperties,
  FC,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

// Styles
import styles from "./styles.module.scss";
import useElementSize from "@/hooks/useElementSize";

type Props = PropsWithChildren<{
  className?: string;
  time: number;
  gap?: number;
  hoverable?: boolean;
}>;

const Slider: FC<Props> = ({
  children,
  className,
  gap,
  hoverable = false,
  time,
}) => {
  // Local State
  const [ready, setReady] = useState(false);
  const [animate, setAnimate] = useState(false);

  // References
  const listRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Hooks
  const { width: listWidth } = useElementSize(listRef.current);
  const { width: wrapperWidth } = useElementSize(wrapperRef.current);

  // Effects
  useEffect(() => {
    if (!!listRef.current && !!wrapperRef.current) {
      setReady(true);
    }

    return () => {
      setReady(false);
    };
  }, [listRef, wrapperRef]);

  useEffect(() => {
    if (listWidth >= wrapperWidth && !!ready) {
      setTimeout(() => {
        setAnimate(true);
      }, 2000);
    }
  }, [listWidth, wrapperWidth, ready]);

  return (
    <div
      className={`${styles.slider} ${className} ${hoverable ? styles.hoverable : ""}`}
      style={
        {
          "--quantity": 3,
          "--time": `${time}s`,
          "--slider-width": `calc(${Math.round(listWidth)}px + ${gap || 0}px)`,
          "--slide-gap": `${gap || 0}px`,
        } as CSSProperties
      }
      data-animate={ready && animate}
      ref={wrapperRef}
    >
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={styles.list}
            ref={index === 0 ? listRef : undefined}
            style={
              {
                "--index": index + 1,
              } as CSSProperties
            }
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
