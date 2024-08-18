import { useCallback, useEffect, useState } from "react";

export type ScrollPosType = {
  x: number;
  y: number;
};

export const useScrollPosition = (): ScrollPosType => {
  const [scrollPos, setScrollPos] = useState<ScrollPosType>(() => {
    return { x: 0, y: 0 };
  });

  const getScrollPosition = useCallback(
    () => ({
      x: Math.round(window.scrollX),
      y: Math.round(window.scrollY),
    }),
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(getScrollPosition());
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [getScrollPosition]);

  return scrollPos;
};
